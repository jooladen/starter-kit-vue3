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
        posts.value = await response.json()
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
        posts.value.unshift(data)
        newTitle.value = ''
        alert('생성됨! ID: ' + data.id)
      } catch (e) {
        error.value = 'POST 실패: ' + e.message
      }
      loading.value = false
    }
    
    // PUT 요청
    const updatePost = async (id) => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: '수정됨', body: '수정된 내용', userId: 1 })
        })
        const data = await response.json()
        const index = posts.value.findIndex(p => p.id === id)
        if (index !== -1) posts.value[index] = data
        alert('수정됨!')
      } catch (e) {
        error.value = 'PUT 실패: ' + e.message
      }
    }
    
    // DELETE 요청
    const deletePost = async (id) => {
      try {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { 
          method: 'DELETE' 
        })
        posts.value = posts.value.filter(p => p.id !== id)
        alert('삭제됨!')
      } catch (e) {
        error.value = 'DELETE 실패: ' + e.message
      }
    }
    </script>
    
    <template>
      <div style="padding: 20px; max-width: 700px; margin: 0 auto; font-family: system-ui;">
        <h1 style="color: #42b983;">🚀 Fetch API 테스트</h1>
        
        <div v-if="error" style="background: #fee; padding: 10px; border-radius: 5px; color: red; margin-bottom: 15px;">
          {{ error }}
        </div>
        
        <!-- GET 버튼 -->
        <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
          <button 
            @click="getPosts" 
            :disabled="loading"
            style="padding: 10px 20px; background: #42b983; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;"
          >
            📥 GET - 게시글 가져오기
          </button>
          <span v-if="loading" style="margin-left: 10px; color: #42b983;">⏳ 로딩중...</span>
        </div>
        
        <!-- POST 입력 -->
        <div style="margin: 20px 0; padding: 15px; background: #f0f8ff; border-radius: 8px;">
          <h3 style="margin-top: 0;">➕ POST - 새 게시글 추가</h3>
          <input 
            v-model="newTitle" 
            placeholder="제목 입력하세요" 
            style="padding: 10px; width: 300px; border: 1px solid #ddd; border-radius: 5px; font-size: 14px;"
            @keyup.enter="createPost"
          >
          <button 
            @click="createPost" 
            :disabled="!newTitle || loading"
            style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px; font-size: 14px;"
          >
            추가하기
          </button>
        </div>
        
        <!-- 게시글 목록 -->
        <div style="margin-top: 20px;">
          <h3>📋 게시글 목록 ({{ posts.length }}개)</h3>
          <div 
            v-for="post in posts" 
            :key="post.id" 
            style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"
          >
            <h3 style="margin: 0 0 8px 0; color: #333;">
              {{ post.title }}
              <span style="color: #999; font-size: 14px; font-weight: normal;">(ID: {{ post.id }})</span>
            </h3>
            <p style="color: #666; margin: 0 0 12px 0; line-height: 1.5;">{{ post.body }}</p>
            <div style="display: flex; gap: 8px;">
              <button 
                @click="updatePost(post.id)"
                style="padding: 6px 12px; background: #FF9800; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;"
              >
                ✏️ PUT 수정
              </button>
              <button 
                @click="deletePost(post.id)"
                style="padding: 6px 12px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 13px;"
              >
                🗑️ DELETE 삭제
              </button>
            </div>
          </div>
          
          <div v-if="posts.length === 0" style="text-align: center; padding: 40px; color: #999;">
            버튼을 눌러서 게시글을 가져오세요
          </div>
        </div>
        
        <!-- 안내 -->
        <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 8px; font-size: 14px;">
          <strong>💡 사용된 API:</strong>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>GET: 게시글 목록 조회</li>
            <li>POST: 새 게시글 생성</li>
            <li>PUT: 게시글 전체 수정</li>
            <li>DELETE: 게시글 삭제</li>
          </ul>
          <small style="color: #666;">JSONPlaceholder는 테스트용 가짜 API라 실제 DB에는 저장 안돼요!</small>
        </div>
      </div>
    </template>