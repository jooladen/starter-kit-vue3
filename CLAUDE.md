# CLAUDE.md

이 파일은 Claude Code(claude.ai/code)가 이 저장소에서 작업할 때 참고할 가이드입니다.

## 프로젝트 개요

Vite로 구축된 Vue 3 스타터 키트로, **Vuetify 3**(Material Design 컴포넌트)와 **Tailwind CSS 4**를 함께 사용하는 하이브리드 디자인 시스템이 특징입니다. 데이터 테이블, 폼, API 통합, 애니메이션이 포함된 실시간 대시보드 등 다양한 UI 패턴을 시연합니다.

## 기술 스택

- **Vue 3.5.25** - Composition API (`<script setup>` 문법 사용)
- **Vuetify 3.11.3** - Material Design 컴포넌트 프레임워크 (auto-import 활성화)
- **Tailwind CSS 4.1.18** - 유틸리티 우선 CSS 프레임워크
- **Vue Router 4.6.3** - 클라이언트 사이드 라우팅
- **Pinia 3.0.4** - 상태 관리 (store는 `src/stores/`에 위치)
- **Material Design Icons (@mdi/font)** - Vuetify 컴포넌트용 아이콘 세트
- **canvas-confetti** - 인터랙티브 데모에 사용되는 축하 애니메이션
- **Vite 7.2.4** - 빌드 도구 및 개발 서버

## 개발 명령어

```bash
# 의존성 설치
npm install

# 개발 서버 시작 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 빌드 미리보기
npm run preview

# 린트 및 자동 수정
npm run lint

# Prettier로 코드 포맷팅
npm run format
```

## 아키텍처 및 디자인 패턴

### 하이브리드 스타일링 시스템

이 프로젝트는 **Vuetify와 Tailwind CSS를 함께** 사용합니다:

- **Vuetify 컴포넌트** (`v-btn`, `v-data-table`, `v-chip` 등)가 Material Design 위젯 제공
- **Tailwind 유틸리티 클래스**로 레이아웃, 간격, 커스텀 스타일 처리
- **커스텀 그라데이션 클래스** (`src/App.vue`의 `btn-gradient-*`)가 Vuetify 버튼 스타일을 오버라이드하여 모던한 그라데이션 효과 구현

버튼 작업 시 주의사항:
- 항상 `v-btn` 컴포넌트 사용 (HTML `<button>` 사용 금지)
- 그라데이션 클래스 적용: `btn-gradient-primary`, `btn-gradient-success`, `btn-gradient-info`, `btn-gradient-error`, `btn-gradient-secondary`, `btn-gradient-dark`, `btn-gradient-cyan`
- `prepend-icon` prop으로 Material Design Icons 사용 (예: `prepend-icon="mdi-download"`)
- ref 변수에 바인딩된 `:loading` prop으로 로딩 상태 포함

### 애플리케이션 구조

```
src/
├── App.vue           # 전역 그라데이션 버튼 스타일이 포함된 루트 컴포넌트
├── main.js           # 앱 초기화 (Pinia, Router, Vuetify)
├── router/index.js   # 라우트 정의
├── plugins/
│   └── vuetify.js    # Vuetify 설정 (아이콘: mdi)
├── pages/            # 라우트 레벨 페이지 컴포넌트
│   ├── BasicPage.vue       # Vuetify v-data-table을 사용한 사용자 관리 테이블
│   ├── LocalApiPage.vue    # Mock API 데모 (로컬 JSON 데이터, Oracle EMP 테이블)
│   ├── RemoteApiPage.vue   # REST API 데모 (JSONPlaceholder, CRUD 작업)
│   ├── LogDashboardPage.vue  # confetti가 있는 실시간 서비스 모니터링
│   ├── LogDashboardPage2.vue # 마르코프 체인 시뮬레이션이 포함된 개선 버전
│   ├── DashboardPage.vue   # 간단한 장비 상태 테이블
│   └── FormPage.vue        # 폼 예제
├── views/            # 원본 템플릿 뷰 (HomeView, AboutView)
├── stores/           # Pinia 상태 관리
└── assets/           # CSS 및 정적 자산
```

### 주요 페이지 및 패턴

**BasicPage.vue** - 시연 내용:
- 커스텀 컬럼 템플릿이 있는 Vuetify `v-data-table`
- `v-text-field`와 `v-select`를 사용한 검색 폼
- 버튼 로딩 상태 (추가, 검색, 수정, 삭제)
- 검색 액션 시 Confetti 애니메이션

**LocalApiPage.vue** - 시연 내용:
- 로컬 JSON 데이터를 사용한 Mock fetch API 패턴
- 시뮬레이션된 네트워크 지연 (300ms)
- 다양한 직책별 필터 버튼
- Oracle EMP 테이블 샘플 데이터 구조

**RemoteApiPage.vue** - 시연 내용:
- 실제 REST API 통합 (JSONPlaceholder)
- 전체 CRUD 작업 (GET, POST, PUT, DELETE)
- **항목별 개별 로딩 상태** (중요 패턴: 각 post에 `loadingUpdate` 및 `loadingDelete` 속성)
- POST 요청에 대한 입력 유효성 검사

**LogDashboardPage.vue & LogDashboardPage2.vue** - 시연 내용:
- `setInterval`을 사용한 실시간 데이터 시뮬레이션
- 자동 새로고침 패턴 (2초 간격)
- 상태 기반 조건부 스타일링
- 축하 효과를 위한 Canvas-confetti 통합
- 마르코프 체인 상태 전환 (Page2)

## 중요한 코드 패턴

### 로딩 상태 관리

**전역 로딩** (모든 액션에 영향):
```javascript
const loading = ref(false)
// 템플릿에서 사용: :loading="loading" :disabled="loading"
```

**항목별 개별 로딩** (독립적인 버튼 상태):
```javascript
// 각 항목에 로딩 속성 추가
posts.value = data.map(post => ({
  ...post,
  loadingUpdate: false,
  loadingDelete: false
}))

// 비동기 작업 전에 로딩 설정
const post = posts.value.find(p => p.id === id)
if (post) post.loadingUpdate = true

// finally로 정리 보장
try {
  // ... 비동기 작업
} finally {
  if (post) post.loadingUpdate = false
}
```

### Vuetify 버튼 패턴 (업데이트된 표준)

```vue
<v-btn
  @click="handleAction"
  :loading="loadingState"
  :disabled="someCondition"
  prepend-icon="mdi-icon-name"
  class="btn-gradient-success"
  size="large"          <!-- 또는 "default", "small" -->
  elevation="2"         <!-- 주요 액션의 경우 "3" -->
  rounded="lg"
>
  버튼 텍스트
</v-btn>
```

### 반응형 레이아웃 패턴

Tailwind의 반응형 접두사 사용 (`sm:`, `md:`, `lg:`):
```vue
<div class="p-4 sm:p-6 md:p-8 max-w-full md:max-w-3xl mx-auto">
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- 반응형 그리드 콘텐츠 -->
  </div>
</div>
```

## Vuetify 설정

- **Auto-import 활성화** - `vite-plugin-vuetify`를 통해 컴포넌트를 수동으로 import할 필요 없음
- **아이콘 세트**: `@mdi/font`와 함께 Material Design Icons (mdi)
- **테마**: 기본 라이트 테마 (vuetify.js에 커스텀 색상 없음)
- **커스텀 오버라이드**: `App.vue`의 전역 그라데이션 스타일이 `!important`를 사용하여 Vuetify 기본값 오버라이드

## 라우터 설정

- `createWebHistory` 사용 (해시 모드 아님)
- 기본 라우트 (`/`)는 `LogDashboardPage2`를 가리킴
- 직접 import와 lazy loading 혼합 사용 (`/about` 라우트 참조)
- 모든 페이지 라우트는 flat 구조 (중첩 라우트 없음)

## 상태 관리

- **Pinia**가 설치되어 있지만 이 스타터 키트에서는 최소한으로 사용
- 대부분의 상태는 Vue 3 `ref()`와 `reactive()`를 사용하는 컴포넌트 로컬 상태
- Store 예제는 `src/stores/counter.js`에 존재

## 스타일링 접근 방식

### 전역 스타일
- `src/App.vue`의 `<style>` 블록에 정의된 커스텀 버튼 그라데이션 클래스
- 애니메이션: 로딩 상태용 pulse 효과, 호버 시 scale transform
- 모든 그라데이션은 135deg 각도와 이중 색상 정지점 사용

### Tailwind + Vuetify 공존
- Tailwind 담당: 레이아웃 (`flex`, `grid`), 간격 (`p-*`, `m-*`, `gap-*`), 크기, 배경
- Vuetify 담당: 인터랙티브 컴포넌트, 폼 입력, 데이터 테이블, 네비게이션
- 충돌은 필요한 경우 커스텀 CSS의 `!important`로 해결

## Node 버전 요구사항 

- **Node.js**: `^20.19.0 || >=22.12.0`
- 개발 시작 전 `node -v`로 버전 확인

## 브라우저 DevTools 설정

최적의 Vue 3 개발 경험을 위해:
1. Vue.js devtools 브라우저 확장 프로그램 설치
2. DevTools 설정에서 "Custom Object Formatters" 활성화 (Vue 반응성 검사 개선)

## 일반적인 주의사항

1. **Vuetify 컴포넌트는 Vuetify의 props와 함께 사용해야 함** - HTML 속성을 v-컴포넌트와 혼합하지 말 것
2. **로딩 상태는 refs 필요** - `ref(false)` 사용하고 비동기 함수에서 토글
3. **그라데이션 클래스는 elevation prop 필요** - `elevation="2"` 이상 없이는 그림자가 표시되지 않음
4. **MDI 아이콘은 mdi- 접두사 필요** - 예: `mdi-delete`, 단순 `delete` 아님
5. **Mock 데이터는 로딩 속성 필요** - CRUD 추가 시 `loadingUpdate`/`loadingDelete`를 false로 초기화
6. **Confetti 함수는 import 필수** - 사용 전 `import confetti from "canvas-confetti"`
