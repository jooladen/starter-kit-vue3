<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import confetti from "canvas-confetti"

let timer = null

function fire(){
    //confetti()
    confetti({
    particleCount: 150,
    spread: 80,
    origin: { y: 0.6 },
  })
}

const services = ref([
  { name: 'API 서버', latency: 120, errorRate: 0.2 },
  { name: '배치 작업', latency: 0, errorRate: 2.1 },
  { name: '결제 모듈', latency: 900, errorRate: 12.4 }
])

function getStatus(service) {
  if (service.errorRate > 5 || service.latency > 800) return 'ERROR'
  if (service.errorRate > 1 || service.latency > 300) return 'WARN'
  return 'OK'
}

const summary = computed(() => {
  const result = { OK: 0, WARN: 0, ERROR: 0 }
  services.value.forEach(s => result[getStatus(s)]++)
  console.log("result >>> ", result)
  return result
})

// 🔥 버튼 눌러서 상태 변화 체감용
// function simulate() {
//   services.value = services.value.map(s => ({
//     ...s,
//     latency: Math.max(0, Math.round(s.latency + (Math.random() * 400 - 200))),
//     errorRate: Math.max(0, +(s.errorRate + (Math.random() * 3 - 1.5)).toFixed(1))
//   }))
// }

function simulate() {
  services.value = services.value.map(s => {
    const r = Math.random()

    let status
    if (r < 0.4) status = 'OK'
    else if (r < 0.7) status = 'WARN'
    else status = 'ERROR'

    if (status === 'OK') {
      return {
        ...s,
        latency: Math.round(100 + Math.random() * 150),     // 100~250
        errorRate: +(Math.random() * 0.8).toFixed(1)        // 0~0.8
      }
    }

    if (status === 'WARN') {
      return {
        ...s,
        latency: Math.round(300 + Math.random() * 300),     // 300~600
        errorRate: +(1 + Math.random() * 3).toFixed(1)      // 1~4
      }
    }

    // ERROR
    return {
      ...s,
      latency: Math.round(800 + Math.random() * 500),       // 800~
      errorRate: +(5 + Math.random() * 10).toFixed(1)       // 5~
    }
  })
}


// 자동 실행
onMounted(() => {
  timer = setInterval(() => {
    simulate()
  }, 2000)
})

onUnmounted(() => {
  clearInterval(timer)
})

</script>

<template>
  <div class="container">
    
      <h1>📡 Project Pulse</h1>
  
    <div class="summary">
      🟢 정상 {{ summary.OK }}
      🟡 주의 {{ summary.WARN }}
      🔴 위험 {{ summary.ERROR }}
    </div>

    <div class="cards">
      <div
        v-for="s in services"
        :key="s.name"
        class="card"
        :class="getStatus(s).toLowerCase()"
      >
        <h3>{{ s.name }}</h3>
        <p class="status">{{ getStatus(s) }}</p>
        <p>응답속도: {{ s.latency }} ms</p>
        <p>에러율: {{ s.errorRate }} %</p>
      </div>
    </div>

    <button class="mx-6" @click="simulate">상태 변화 시뮬레이션</button>
    <button @click="fire">박수 짝짝짝</button>
  </div>
</template>

<style scoped>
.container {
  font-family: system-ui, sans-serif;
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

h1 {
  margin-bottom: 10px;
}

.summary {
  font-size: 18px;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.card {
  padding: 16px;
  border-radius: 12px;
  color: #222;
  background: #f5f5f5;
  box-shadow: 0 6px 14px rgba(0,0,0,0.08);
}

.card.ok {
  border-left: 8px solid #3cb371;
}

.card.warn {
  border-left: 8px solid #f0ad4e;
}

.card.error {
  border-left: 8px solid #d9534f;
}

.status {
  font-weight: bold;
  margin: 8px 0;
}

button {
  padding: 10px 16px;
  font-size: 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background: #222;
  color: white;
}
</style>

