<template>
    <!-- 페이지 레이아웃 (Tailwind) -->
    <div class="space-y-6">
      <!-- 헤더 -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 class="text-xl md:text-2xl font-semibold">사용자 관리 대시보드</h1>
        <v-btn
          color="primary"
          prepend-icon="mdi-account-plus"
          class="btn-gradient-primary"
          :loading="loadingAdd"
          elevation="2"
          rounded="lg"
        >
          사용자 추가
        </v-btn>
      </div>

      <!-- 검색 영역 -->
      <div class="bg-white rounded-2xl shadow p-3 md:p-4 mb-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <v-text-field label="이름" density="compact" />
          <v-select
            label="상태"
            :items="['활성', '비활성']"
            density="compact"
          />
          <v-select
            label="권한"
            :items="['관리자', '사용자']"
            density="compact"
          />
          <div class="flex items-end">
            <v-btn
              @click="fire"
              color="primary"
              block
              prepend-icon="mdi-magnify"
              class="btn-gradient-primary"
              :loading="loadingSearch"
              elevation="2"
              rounded="lg"
            >
              검색
            </v-btn>
          </div>
        </div>
      </div>

      <!-- 테이블 카드 -->
      <div class="bg-white rounded-2xl shadow p-2 md:p-4">
        <div class="overflow-x-auto">
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="id"
            density="comfortable"
            class="min-w-[600px]"
          >
            <!-- 상태 컬럼 커스터마이징 -->
            <template #item.status="{ item }">
              <v-chip
                :color="item.status === '활성' ? 'green' : 'grey'"
                size="small"
                label
              >
                {{ item.status }}
              </v-chip>
            </template>

            <!-- 액션 컬럼 -->
            <template #item.actions="{ item }">
              <div class="flex gap-2">
                <v-btn
                  size="small"
                  variant="tonal"
                  color="primary"
                  prepend-icon="mdi-pencil"
                  class="btn-gradient-info"
                  :loading="item.loadingEdit"
                  rounded="lg"
                >
                  수정
                </v-btn>
                <v-btn
                  size="small"
                  variant="tonal"
                  color="error"
                  prepend-icon="mdi-delete"
                  class="btn-gradient-error"
                  :loading="item.loadingDelete"
                  rounded="lg"
                >
                  삭제
                </v-btn>
              </div>
            </template>
          </v-data-table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import confetti from "canvas-confetti"

const loadingAdd = ref(false)
const loadingSearch = ref(false)

function fire(){
    //confetti()
    confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
  })
}
  const headers = [
    { text: 'ID', value: 'id' },
    { text: '이름', value: 'name' },
    { text: '이메일', value: 'email' },
    { text: '권한', value: 'role' },
    { text: '상태', value: 'status' },
    { text: '액션', value: 'actions', sortable: false },
  ]

  const users = [
    { id: 1, name: '홍길동', email: 'hong@test.com', role: '관리자', status: '활성', loadingEdit: false, loadingDelete: false },
    { id: 2, name: '김철수', email: 'kim@test.com', role: '사용자', status: '비활성', loadingEdit: false, loadingDelete: false },
    { id: 3, name: '이영희', email: 'lee@test.com', role: '사용자', status: '활성', loadingEdit: false, loadingDelete: false },
  ]
  </script>
  
  <style scoped>
  /* Vuetify 내부 스타일은 건드리지 않음 */
  </style>
  