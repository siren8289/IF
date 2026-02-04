# 폴더 구조 설명

이 문서는 `IF/app` 프로젝트의 폴더 구조를 간단히 설명합니다.

## 핵심 구조

- `src/app/`
  - Expo Router의 라우트 엔트리 파일이 모여있는 폴더
  - 실제 화면 로직은 `src/features/`로 위임하고, 여기서는 화면 연결만 담당
- `src/features/`
  - 기능(도메인) 단위 화면 컴포넌트
  - 예: `auth`, `home`, `jobs`, `records` 등
- `src/shared/`
  - 기능 간 공유되는 데이터/유틸/스토리지
  - 예: `data`, `types`, `utils`, `storage`
- `src/ui/`
  - 공용 UI 컴포넌트
  - 예: `Screen`, `Card`, `PrimaryButton` 등
- `src/theme/`
  - 컬러 팔레트 등 테마 정의
- `src/types/`
  - 전역 타입 선언(필요시)

## 라우팅 규칙

- `src/app/index.tsx`는 스플래시/초기 진입점
- `src/app/(pages)/*` 하위에 페이지 파일이 모여있음
- 각 페이지 파일은 `src/features/*`의 화면 컴포넌트를 export

## 기능 폴더 예시

- `features/auth/`: 로그인 화면
- `features/guide/`: 가이드 화면
- `features/jobs/`: 일자리 리스트/상세/선택 완료 화면
- `features/records/`: 판단 기록 리스트/상세
- `features/risk/`: 위험도 결과 화면
- `features/service/`: 서비스 안내 화면
- `features/splash/`: 스플래시 화면
