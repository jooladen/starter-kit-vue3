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

// const services = ref([
//   { name: 'API 서버', latency: 120, errorRate: 0.2 },
//   { name: '배치 작업', latency: 0, errorRate: 2.1 },
//   { name: '결제 모듈', latency: 900, errorRate: 12.4 }
// ])
const services = ref([
  { name: 'API 서버', latency: 120, errorRate: 0.2, state: 'OK', okStreak: 0 },
  { name: '배치 작업', latency: 300, errorRate: 1.5, state: 'WARN', okStreak: 0 },
  { name: '결제 모듈', latency: 900, errorRate: 6.0, state: 'ERROR', okStreak: 0 }
])
const transitionTable = {
  OK:   { OK: 0.7, WARN: 0.25, ERROR: 0.05 },
  WARN: { OK: 0.3, WARN: 0.5,  ERROR: 0.2 },
  ERROR:{ OK: 0.1, WARN: 0.4,  ERROR: 0.5 }
}

function nextState(current) {
  const r = Math.random()
  let sum = 0
  for (const [state, prob] of Object.entries(transitionTable[current])) {
    sum += prob
    if (r < sum) return state
  }
  return current
}


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
//   services.value = services.value.map(s => {
//     const r = Math.random()

//     let status
//     if (r < 0.4) status = 'OK'
//     else if (r < 0.7) status = 'WARN'
//     else status = 'ERROR'

//     if (status === 'OK') {
//       return {
//         ...s,
//         latency: Math.round(100 + Math.random() * 150),     // 100~250
//         errorRate: +(Math.random() * 0.8).toFixed(1)        // 0~0.8
//       }
//     }

//     if (status === 'WARN') {
//       return {
//         ...s,
//         latency: Math.round(300 + Math.random() * 300),     // 300~600
//         errorRate: +(1 + Math.random() * 3).toFixed(1)      // 1~4
//       }
//     }

//     // ERROR
//     return {
//       ...s,
//       latency: Math.round(800 + Math.random() * 500),       // 800~
//       errorRate: +(5 + Math.random() * 10).toFixed(1)       // 5~
//     }
//   })
// }

function simulate() {
  services.value = services.value.map(s => {
    const newState = nextState(s.state)

    let latency, errorRate

    if (newState === 'OK') {
      latency = Math.round(100 + Math.random() * 150)
      errorRate = +(Math.random() * 0.8).toFixed(1)
    } else if (newState === 'WARN') {
      latency = Math.round(300 + Math.random() * 300)
      errorRate = +(1 + Math.random() * 3).toFixed(1)
    } else {
      latency = Math.round(800 + Math.random() * 500)
      errorRate = +(5 + Math.random() * 10).toFixed(1)
    }

    const okStreak = newState === 'OK' ? s.okStreak + 1 : 0

    // 🎉 OK 연속 5번이면 자동 폭죽
    if (okStreak === 2) {
      fire()
    }

    return {
      ...s,
      state: newState,
      latency,
      errorRate,
      okStreak
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
    
      <h1>📡 Project Pulse<span class="bg-red ml-4">정상(OK) 2번 연속이면 폭죽</span></h1>
  
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

