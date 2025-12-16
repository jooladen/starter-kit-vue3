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
  <div class="font-sans p-4 sm:p-6 md:p-8 max-w-full md:max-w-3xl mx-auto">
    <h1 class="text-2xl md:text-3xl mb-3">
      📡 Project Pulse
    </h1>
    

    <div class="text-base md:text-lg mb-5">
      🟢 정상 {{ summary.OK }}
      🟡 주의 {{ summary.WARN }}
      🔴 위험 {{ summary.ERROR }}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      <div
        v-for="s in services"
        :key="s.name"
        class="p-4 rounded-xl text-gray-800 bg-gray-50 shadow-md"
        :class="{
          'border-l-8 border-green-500': getStatus(s) === 'OK',
          'border-l-8 border-yellow-500': getStatus(s) === 'WARN',
          'border-l-8 border-red-500': getStatus(s) === 'ERROR'
        }"
      >
        <h3 class="text-lg font-semibold">{{ s.name }}</h3>
        <p class="font-bold my-2">{{ getStatus(s) }}</p>
        <p class="text-sm">응답속도: {{ s.latency }} ms</p>
        <p class="text-sm">에러율: {{ s.errorRate }} %</p>
      </div>
    </div>
    <div class="bg-red-500 text-white px-2 py-1 rounded text-sm ml-2 mr-4">정상(OK) 2번 연속이면 폭죽</div>
    <v-btn
      @click="simulate"
      prepend-icon="mdi-refresh"
      class="btn-gradient-dark mx-2 sm:mx-6"
      elevation="2"
      rounded="lg"
    >
      상태 변화 시뮬레이션
    </v-btn>
    <v-btn
      @click="fire"
      prepend-icon="mdi-party-popper"
      class="btn-gradient-dark btn-pulse"
      elevation="2"
      rounded="lg"
    >
      박수 짝짝짝
    </v-btn>
  </div>
</template>

<style scoped>
/* 모든 스타일을 Tailwind로 전환 */
</style>

