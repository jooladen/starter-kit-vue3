<template>
    <div class="space-y-6">
    <h1 class="text-2xl font-semibold">대시보드</h1>
    
    
    <div class="bg-white rounded-2xl shadow p-4">
    <v-data-table
    :headers="headers"
    :items="items"
    >
    <template #item.status="{ item }">
    <v-chip :color="item.status === 'ON' ? 'green' : 'grey'" size="small">
    {{ item.status }}
    </v-chip>
    </template>
    </v-data-table>
    </div>
    </div>
    </template>
    
    
    <script setup>
    const headers = [
    { text: 'ID', value: 'id' },
    { text: '장비명', value: 'name' },
    { text: '상태', value: 'status' },
    ]
    
    
    const items = [
    { id: 1, name: 'PRESS-01', status: 'ON' },
    { id: 2, name: 'ROBOT-02', status: 'OFF' },
    ]
    </script>