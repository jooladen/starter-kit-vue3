<template>
  <v-app>
    <!-- 모바일 전용 앱바 -->
    <v-app-bar v-if="mobile" color="white" elevation="1" density="compact">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-bold">Admin</v-toolbar-title>
    </v-app-bar>

    <!-- 반응형 네비게이션 드로어 -->
    <v-navigation-drawer
      v-model="drawer"
      :permanent="!mobile"
      :temporary="mobile"
      :width="240"
      class="bg-white"
    >
      <div class="p-4">
        <h2 class="text-xl font-bold mb-6">Admin</h2>
        <nav class="flex flex-col gap-2">
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/logdashboard">
            Log dashboard
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/logdashboard2">
            Log dashboard up
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/remoteapi">
            Remote Api
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/localapi">
            Local Api
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/basic">
            기본 tailwind vuetify
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/dashboard">
            대시보드
          </RouterLink>
          <RouterLink
            class="block px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors router-link-exact-active:bg-blue-50 router-link-exact-active:text-blue-600 router-link-exact-active:font-medium"
            to="/form">
            폼 예제
          </RouterLink>
        </nav>
      </div>
    </v-navigation-drawer>

    <!-- 메인 영역 -->
    <v-main class="bg-gray-100">
      <div class="p-4 md:p-6">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const drawer = ref(true)
const { mobile } = useDisplay()
</script>

<style>
/* 그라데이션 버튼 스타일 */

/* Primary - 파란색 그라데이션 */
.btn-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.btn-gradient-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #5e3c85 100%) !important;
}

/* Success - 초록색 그라데이션 */
.btn-gradient-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
  color: white !important;
}

.btn-gradient-success:hover {
  background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
}

/* Info - 오렌지색 그라데이션 */
.btn-gradient-info {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%) !important;
  color: white !important;
}

.btn-gradient-info:hover {
  background: linear-gradient(135deg, #d97706 0%, #b45309 100%) !important;
}

/* Warning - 주황-빨강 그라데이션 */
.btn-gradient-warning {
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%) !important;
  color: white !important;
}

.btn-gradient-warning:hover {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
}

/* Error - 빨간색 그라데이션 */
.btn-gradient-error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
  color: white !important;
}

.btn-gradient-error:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%) !important;
}

/* Secondary - 보라색 그라데이션 */
.btn-gradient-secondary {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%) !important;
  color: white !important;
}

.btn-gradient-secondary:hover {
  background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%) !important;
}

/* Dark - 회색-검정 그라데이션 */
.btn-gradient-dark {
  background: linear-gradient(135deg, #374151 0%, #1f2937 100%) !important;
  color: white !important;
}

.btn-gradient-dark:hover {
  background: linear-gradient(135deg, #1f2937 0%, #111827 100%) !important;
}

/* Cyan - 청록색 그라데이션 */
.btn-gradient-cyan {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%) !important;
  color: white !important;
}

.btn-gradient-cyan:hover {
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%) !important;
}

/* 공통 트랜지션 효과 */
.btn-gradient-primary,
.btn-gradient-success,
.btn-gradient-info,
.btn-gradient-warning,
.btn-gradient-error,
.btn-gradient-secondary,
.btn-gradient-dark,
.btn-gradient-cyan {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

.btn-gradient-primary:hover,
.btn-gradient-success:hover,
.btn-gradient-info:hover,
.btn-gradient-warning:hover,
.btn-gradient-error:hover,
.btn-gradient-secondary:hover,
.btn-gradient-dark:hover,
.btn-gradient-cyan:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}

/* 펄스 애니메이션 */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.btn-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* 로딩 상태일 때 펄스 효과 */
.v-btn--loading {
  animation: pulse 1.5s ease-in-out infinite;
}

/* Vuetify 버튼 기본 스타일 오버라이드 */
.v-btn {
  text-transform: none !important;
  letter-spacing: normal !important;
}
</style>
