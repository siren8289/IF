## IF Spring Backend 구조·유지보수 기준

이 문서는 고령자 노동·돌봄 규제 판단 웹앱의 **Spring + PostgreSQL 백엔드** 구조를 정리한 것이다.  
핵심 목표는 **HUMAN / AI 책임 경계가 코드 레벨에서 보이고**, 기능 추가·변경 시 영향 범위를 쉽게 파악하는 것이다.

---

### 1. 패키지 레이어 개념

- **domain**: DB 테이블에 1:1 매핑되는 JPA 엔티티
- **repository**: 엔티티에 대한 영속성 접근 (`JpaRepository` 등)
- **service** (추가 예정): 비즈니스 로직, 트랜잭션 경계
- **controller** (추가 예정): HTTP API 엔드포인트
- **dto** (추가 예정): 요청/응답, 외부 노출 모델

레벨 간 의존성 방향:

`controller → service → repository → domain`

---

### 2. HUMAN / AI 책임 분리

상위 패키지에서 역할을 분리한다.

- `com.example.demo.domain.human`
  - 사람(행정)이 **입력·판단·기록**하는 모든 엔티티
  - `AdminUser`, `Applicant`, `HealthSnapshot`, `Job`, `Assessment`, `SelectionLog`, `AuditLog`
- `com.example.demo.domain.ai`
  - AI가 **계산·산출·설명**만 담당하는 엔티티
  - `AIJobRiskProfile`, `AIRiskResult`, `AIRiskContribution`

레지스토리도 동일하게 HUMAN / AI 로 분리한다.

- `com.example.demo.repository.human.*Repository`
- `com.example.demo.repository.ai.*Repository`

이렇게 하면:

- HUMAN 책임 변경(예: 행정 프로세스) 시 **human 패키지 안에서만 영향**을 주로 확인하면 되고,
- AI 모델/스코어 변경은 **ai 패키지 안**에서 주로 끝난다.

---

### 3. 엔티티 설계 규칙

- 모든 엔티티는 **ERD 테이블 이름을 그대로 `@Table(name = "...")` 로 사용**한다.
- 기본 키는 `bigint` → `Long` + `@GeneratedValue(strategy = IDENTITY)` 를 기본으로 사용한다.
- 연관관계는 실무 쿼리 기준으로 최소한만 잡는다.
  - 예: `Assessment` 는 `Applicant`, `Job`, `HealthSnapshot`, `AdminUser`, `AIRiskResult` 를 참조.
  - AI 쪽은 `AIJobRiskProfile.job`, `AIRiskResult.assessment`, `AIRiskContribution.aiResult` 정도로 한정.
- 시간 필드는 일관되게 `OffsetDateTime` 사용 (`created_at`, `assessed_at`, `generated_at` 등).
- boolean 컬럼(`*_flag`) 은 `Boolean` 으로 매핑한다.

---

### 4. 리포지토리 규칙

- 모든 리포지토리는 **기능 + HUMAN/AI 기준 패키지**에 둔다.

예시:

- `com.example.demo.repository.human.AssessmentRepository`
- `com.example.demo.repository.ai.AIRiskResultRepository`

규칙:

- 인터페이스 이름은 **엔티티 + Repository** (`AssessmentRepository`).
- 기본은 `JpaRepository<Entity, Long>` 만 상속하고,  
  커스텀 쿼리가 필요하면 메서드 이름 규칙으로 우선 해결한다.

---

### 5. 향후 controller / service / dto 구조 가이드

프론트 기준 “기능 단위”로 이하 패키지를 만든다.

- `com.example.demo.controller.assessment`
- `com.example.demo.service.assessment`
- `com.example.demo.dto.assessment`

다른 기능도 동일하게:

- `applicant`, `job`, `admin`, `ai` 등 기능 이름을 하위 패키지로 사용.

예시(Assessment 기준):

- `controller.assessment.AssessmentController`
  - HTTP 엔드포인트 정의
  - DTO ↔ 도메인 간 변환은 서비스/mapper 에 위임
- `service.assessment.AssessmentService`
  - 트랜잭션 경계, 비즈니스 규칙
  - HUMAN / AI 책임을 명확히 분리
- `dto.assessment.AssessmentRequestDto / AssessmentResponseDto`
  - 프론트와의 계약 모델

---

### 6. 데이터베이스 / JPA 설정

- `application.yml` 에서 Postgres + Hibernate 설정을 관리한다.
- 로컬 개발 기본값:
  - DB 이름: `if_spring`
  - JPA: `ddl-auto: validate` (DDL 은 DDL 툴 또는 마이그레이션 도구로 관리)
- Lazy 로딩 기본 (`fetch = LAZY`) 으로 두고,  
  조회 API 에서는 **service 계층에서 필요한 연관만 fetch join** 하거나 DTO projection 을 사용한다.

---

### 7. 유지보수 팁

- 새 기능 추가 시 체크리스트:
  1. 이게 HUMAN 책임인가, AI 책임인가? → 상위 패키지 선택.
  2. 엔티티가 필요한가? → `domain.(human|ai)` 에 추가.
  3. DB 접근이 필요한가? → 맞는 위치에 `repository.(human|ai)` 추가.
  4. 외부(프론트)와 통신하는가? → 전용 `controller / service / dto` 패키지로 분리.
- HUMAN / AI 간 책임이 섞이기 시작하면, 패키지 의존성이 뒤엉이는 신호이므로  
  **패키지 의존 방향을 다시 점검**한다.

