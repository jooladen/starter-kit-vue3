<template>
    <div class="space-y-6 max-w-xl">
    <h1 class="text-2xl font-semibold">등록 폼</h1>
    
    
    <div class="bg-white rounded-2xl shadow p-6">
    <v-form>
    <div class="grid grid-cols-1 gap-4">
    <v-text-field label="장비명" />
    <v-select :items="['ON', 'OFF']" label="상태" />
    <div class="flex justify-end gap-2">
    <v-btn variant="outlined">취소</v-btn>
    <v-btn color="primary">저장</v-btn>
    </div>
    </div>
    </v-form>
    </div>A
    </div>
    </template>
    
    
    <script setup>
    </script>