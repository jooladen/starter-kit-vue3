<template>
<v-app>
<div class="min-h-screen flex bg-gray-100">
<!-- 사이드바 -->
<aside class="w-60 bg-white shadow p-4">
<h2 class="text-xl font-bold mb-6">Admin</h2>
<nav class="flex flex-col gap-2">
  <RouterLink class="menu" to="/logdashboard">Log dashboard</RouterLink>
  <RouterLink class="menu" to="/logdashboard2">Log dashboard up</RouterLink>
  <RouterLink class="menu" to="/remoteapi">Remote Api</RouterLink>
  <RouterLink class="menu" to="/localapi">Local Api</RouterLink>
  <RouterLink class="menu" to="/basic">기본 tailwind vuetify</RouterLink>
  <RouterLink class="menu" to="/dashboard">대시보드</RouterLink>
  <RouterLink class="menu" to="/form">폼 예제</RouterLink>
  
</nav>
</aside>


<!-- 메인 영역 -->
<main class="flex-1 p-6 overflow-auto">
<RouterView />
</main>
</div>
</v-app>
</template>


<script setup>
</script>


<style scoped>

</style>