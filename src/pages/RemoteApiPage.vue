<script setup>
    import { ref } from 'vue'
    
    const posts = ref([])
    const loading = ref(false)
    const newTitle = ref('')
    const error = ref('')
    
    // GET 요청
    const getPosts = async () => {
      loading.value = true
      error.value = ''
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
        const data = await response.json()
        posts.value = data.map(post => ({
          ...post,
          loadingUpdate: false,
          loadingDelete: false
        }))
      } catch (e) {
        error.value = 'GET 실패: ' + e.message
      }
      loading.value = false
    }
    
    // POST 요청
    const createPost = async () => {
      loading.value = true
      error.value = ''
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: newTitle.value,
            body: '테스트 내용입니다',
            userId: 1
          })
        })
        const data = await response.json()
        posts.value.unshift({
          ...data,
          loadingUpdate: false,
          loadingDelete: false
        })
        newTitle.value = ''
        alert('생성됨! ID: ' + data.id)
      } catch (e) {
        error.value = 'POST 실패: ' + e.message
      }
      loading.value = false
    }
    
    // PUT 요청
    const updatePost = async (id) => {
      const post = posts.value.find(p => p.id === id)
      if (post) post.loadingUpdate = true

      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '수정됨', body: '수정된 내용', userId: 1 })
        })
        const data = await response.json()
        const index = posts.value.findIndex(p => p.id === id)
        if (index !== -1) {
          posts.value[index] = { ...data, loadingUpdate: false, loadingDelete: false }
        }
        alert('수정됨!')
      } catch (e) {
        error.value = 'PUT 실패: ' + e.message
      } finally {
        if (post) post.loadingUpdate = false
      }
    }
    
    // DELETE 요청
    const deletePost = async (id) => {
      const post = posts.value.find(p => p.id === id)
      if (post) post.loadingDelete = true

      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE'
        })
        posts.value = posts.value.filter(p => p.id !== id)
        alert('삭제됨!')
      } catch (e) {
        error.value = 'DELETE 실패: ' + e.message
      } finally {
        if (post) post.loadingDelete = false
      }
    }
    </script>
    
<template>
  <div class="p-4 sm:p-6 max-w-full md:max-w-2xl mx-auto font-sans">
    <h1 class="text-2xl md:text-3xl text-emerald-500">🚀 Fetch API 테스트</h1>

    <div
      v-if="error"
      class="bg-red-50 p-3 rounded-md text-red-600 mb-4 text-sm"
    >
      {{ error }}
    </div>

    <!-- GET 버튼 -->
    <div class="my-5 p-4 bg-gray-100 rounded-lg">
      <v-btn
        @click="getPosts"
        :disabled="loading"
        :loading="loading"
        prepend-icon="mdi-download"
        class="btn-gradient-success"
        size="large"
        elevation="3"
        rounded="lg"
      >
        GET - 게시글 가져오기
      </v-btn>
    </div>

    <!-- POST 입력 -->
    <div class="my-5 p-4 bg-blue-50 rounded-lg">
      <h3 class="mt-0 mb-3 text-lg">➕ POST - 새 게시글 추가</h3>
      <div class="flex flex-col sm:flex-row gap-2">
        <input
          v-model="newTitle"
          placeholder="제목 입력하세요"
          class="px-3 py-2.5 flex-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          @keyup.enter="createPost"
        >
        <v-btn
          @click="createPost"
          :disabled="!newTitle || loading"
          :loading="loading"
          prepend-icon="mdi-plus-circle"
          class="btn-gradient-success"
          elevation="2"
          rounded="lg"
        >
          추가하기
        </v-btn>
      </div>
    </div>

    <!-- 게시글 목록 -->
    <div class="mt-5">
      <h3 class="text-lg md:text-xl mb-3">📋 게시글 목록 ({{ posts.length }}개)</h3>

      <div class="overflow-x-auto">
        <div
          v-for="post in posts"
          :key="post.id"
          class="border border-gray-300 p-4 my-2.5 rounded-lg bg-white shadow-sm min-w-[300px]"
        >
          <h3 class="m-0 mb-2 text-gray-800">
            {{ post.title }}
            <span class="text-gray-400 text-sm font-normal">(ID: {{ post.id }})</span>
          </h3>
          <p class="text-gray-600 m-0 mb-3 leading-relaxed text-sm">{{ post.body }}</p>
          <div class="flex flex-wrap gap-2">
            <v-btn
              @click="updatePost(post.id)"
              prepend-icon="mdi-pencil-box"
              class="btn-gradient-info"
              size="small"
              elevation="2"
              rounded="lg"
              :loading="post.loadingUpdate"
            >
              PUT 수정
            </v-btn>
            <v-btn
              @click="deletePost(post.id)"
              prepend-icon="mdi-trash-can"
              class="btn-gradient-error"
              size="small"
              elevation="2"
              rounded="lg"
              :loading="post.loadingDelete"
            >
              DELETE 삭제
            </v-btn>
          </div>
        </div>
      </div>

      <div
        v-if="posts.length === 0"
        class="text-center py-10 text-gray-400"
      >
        버튼을 눌러서 게시글을 가져오세요
      </div>
    </div>

    <!-- 안내 -->
    <div class="mt-8 p-4 bg-amber-50 rounded-lg text-sm">
      <strong>💡 사용된 API:</strong>
      <ul class="my-2.5 pl-5">
        <li>GET: 게시글 목록 조회</li>
        <li>POST: 새 게시글 생성</li>
        <li>PUT: 게시글 전체 수정</li>
        <li>DELETE: 게시글 삭제</li>
      </ul>
      <small class="text-gray-600">
        JSONPlaceholder는 테스트용 가짜 API라 실제 DB에는 저장 안돼요!
      </small>
    </div>
  </div>
</template>