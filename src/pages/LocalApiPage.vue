<script setup>
  import { ref } from 'vue'
  
  // 오라클 EMP 테이블 데이터 (JSON)
  const empData = [
    { EMPNO: 7369, ENAME: 'SMITH', JOB: 'CLERK', MGR: 7902, HIREDATE: '1980-12-17', SAL: 800, COMM: null, DEPTNO: 20 },
    { EMPNO: 7499, ENAME: 'ALLEN', JOB: 'SALESMAN', MGR: 7698, HIREDATE: '1981-02-20', SAL: 1600, COMM: 300, DEPTNO: 30 },
    { EMPNO: 7521, ENAME: 'WARD', JOB: 'SALESMAN', MGR: 7698, HIREDATE: '1981-02-22', SAL: 1250, COMM: 500, DEPTNO: 30 },
    { EMPNO: 7566, ENAME: 'JONES', JOB: 'MANAGER', MGR: 7839, HIREDATE: '1981-04-02', SAL: 2975, COMM: null, DEPTNO: 20 },
    { EMPNO: 7654, ENAME: 'MARTIN', JOB: 'SALESMAN', MGR: 7698, HIREDATE: '1981-09-28', SAL: 1250, COMM: 1400, DEPTNO: 30 },
    { EMPNO: 7698, ENAME: 'BLAKE', JOB: 'MANAGER', MGR: 7839, HIREDATE: '1981-05-01', SAL: 2850, COMM: null, DEPTNO: 30 },
    { EMPNO: 7782, ENAME: 'CLARK', JOB: 'MANAGER', MGR: 7839, HIREDATE: '1981-06-09', SAL: 2450, COMM: null, DEPTNO: 10 },
    { EMPNO: 7788, ENAME: 'SCOTT', JOB: 'ANALYST', MGR: 7566, HIREDATE: '1982-12-09', SAL: 3000, COMM: null, DEPTNO: 20 },
    { EMPNO: 7839, ENAME: 'KING', JOB: 'PRESIDENT', MGR: null, HIREDATE: '1981-11-17', SAL: 5000, COMM: null, DEPTNO: 10 },
    { EMPNO: 7844, ENAME: 'TURNER', JOB: 'SALESMAN', MGR: 7698, HIREDATE: '1981-09-08', SAL: 1500, COMM: 0, DEPTNO: 30 },
    { EMPNO: 7876, ENAME: 'ADAMS', JOB: 'CLERK', MGR: 7788, HIREDATE: '1983-01-12', SAL: 1100, COMM: null, DEPTNO: 20 },
    { EMPNO: 7900, ENAME: 'JAMES', JOB: 'CLERK', MGR: 7698, HIREDATE: '1981-12-03', SAL: 950, COMM: null, DEPTNO: 30 },
    { EMPNO: 7902, ENAME: 'FORD', JOB: 'ANALYST', MGR: 7566, HIREDATE: '1981-12-03', SAL: 3000, COMM: null, DEPTNO: 20 },
    { EMPNO: 7934, ENAME: 'MILLER', JOB: 'CLERK', MGR: 7782, HIREDATE: '1982-01-23', SAL: 1300, COMM: null, DEPTNO: 10 }
  ]
  
  // Mock Fetch - 로컬 데이터를 fetch처럼 사용
  const mockFetch = (url) => {
    return new Promise((resolve) => {
      // 실제 네트워크 요청처럼 약간의 지연 추가
      setTimeout(() => {
        let data = []
        
        if (url.includes('/emp')) {
          data = empData
        } else if (url.includes('/dept')) {
          data = [
            { DEPTNO: 10, DNAME: 'ACCOUNTING', LOC: 'NEW YORK' },
            { DEPTNO: 20, DNAME: 'RESEARCH', LOC: 'DALLAS' },
            { DEPTNO: 30, DNAME: 'SALES', LOC: 'CHICAGO' },
            { DEPTNO: 40, DNAME: 'OPERATIONS', LOC: 'BOSTON' }
          ]
        }
        
        resolve({
          ok: true,
          json: async () => data
        })
      }, 300) // 300ms 딜레이 (실제 네트워크처럼)
    })
  }
  
  const employees = ref([])
  const loading = ref(false)
  const error = ref('')
  
  // GET 요청 - EMP 테이블 조회
  const getEmployees = async () => {
    loading.value = true
    error.value = ''
    try {
      const response = await mockFetch('/api/emp')
      employees.value = await response.json()
    } catch (e) {
      error.value = 'GET 실패: ' + e.message
    }
    loading.value = false
  }
  
  // 직책별 필터링
  const filterByJob = async (job) => {
    loading.value = true
    try {
      const response = await mockFetch('/api/emp')
      const data = await response.json()
      employees.value = data.filter(emp => emp.JOB === job)
    } catch (e) {
      error.value = 'Filter 실패: ' + e.message
    }
    loading.value = false
  }
  
  // 급여 포맷팅
  const formatSalary = (sal) => {
    return new Intl.NumberFormat('ko-KR').format(sal)
  }
  </script>
  
<template>
  <div class="p-4 sm:p-6 max-w-full md:max-w-4xl mx-auto font-sans">
    <h1 class="text-2xl md:text-3xl text-emerald-500">🗄️ Oracle EMP 테이블 (로컬 JSON)</h1>

    <div
      v-if="error"
      class="bg-red-50 p-3 rounded-md text-red-600 mb-4"
    >
      {{ error }}
    </div>

    <!-- 조회 버튼들 -->
    <div class="my-5 p-4 bg-gray-100 rounded-lg">
      <div class="flex flex-wrap gap-3">
        <v-btn
          @click="getEmployees"
          :disabled="loading"
          :loading="loading"
          prepend-icon="mdi-download"
          class="btn-gradient-success"
          size="large"
          elevation="3"
          rounded="lg"
        >
          전체 사원 조회
        </v-btn>

        <v-btn
          @click="filterByJob('MANAGER')"
          :disabled="loading"
          :loading="loading"
          prepend-icon="mdi-account-tie"
          class="btn-gradient-info"
          elevation="2"
          rounded="lg"
        >
          MANAGER
        </v-btn>

        <v-btn
          @click="filterByJob('SALESMAN')"
          :disabled="loading"
          :loading="loading"
          prepend-icon="mdi-briefcase"
          class="btn-gradient-cyan"
          elevation="2"
          rounded="lg"
        >
          SALESMAN
        </v-btn>

        <v-btn
          @click="filterByJob('CLERK')"
          :disabled="loading"
          :loading="loading"
          prepend-icon="mdi-file-document"
          class="btn-gradient-secondary"
          elevation="2"
          rounded="lg"
        >
          CLERK
        </v-btn>
      </div>
    </div>

    <!-- 사원 목록 테이블 -->
    <div class="mt-5">
      <h3 class="text-lg md:text-xl mb-3">📋 사원 목록 ({{ employees.length }}명)</h3>

      <div v-if="employees.length > 0" class="overflow-x-auto">
        <table class="w-full border-collapse bg-white shadow-md min-w-[800px]">
          <thead>
            <tr class="bg-emerald-500 text-white">
              <th class="p-3 text-left border border-gray-300">사원번호</th>
              <th class="p-3 text-left border border-gray-300">사원명</th>
              <th class="p-3 text-left border border-gray-300">직책</th>
              <th class="p-3 text-left border border-gray-300">상사</th>
              <th class="p-3 text-left border border-gray-300">입사일</th>
              <th class="p-3 text-right border border-gray-300">급여</th>
              <th class="p-3 text-right border border-gray-300">커미션</th>
              <th class="p-3 text-center border border-gray-300">부서</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emp in employees"
              :key="emp.EMPNO"
              class="border-b border-gray-300 hover:bg-gray-50"
            >
              <td class="p-2.5 border border-gray-300 text-sm">{{ emp.EMPNO }}</td>
              <td class="p-2.5 border border-gray-300 font-bold text-sm">{{ emp.ENAME }}</td>
              <td class="p-2.5 border border-gray-300">
                <span
                  class="px-2 py-1 rounded text-xs text-gray-800"
                  :class="{
                    'bg-amber-200': emp.JOB === 'MANAGER',
                    'bg-red-200': emp.JOB === 'PRESIDENT',
                    'bg-blue-200': emp.JOB === 'ANALYST',
                    'bg-green-200': !['MANAGER', 'PRESIDENT', 'ANALYST'].includes(emp.JOB)
                  }"
                >
                  {{ emp.JOB }}
                </span>
              </td>
              <td class="p-2.5 border border-gray-300 text-sm">{{ emp.MGR || '-' }}</td>
              <td class="p-2.5 border border-gray-300 text-sm">{{ emp.HIREDATE }}</td>
              <td class="p-2.5 border border-gray-300 text-right font-bold text-sm">
                ${{ formatSalary(emp.SAL) }}
              </td>
              <td class="p-2.5 border border-gray-300 text-right text-sm">
                {{ emp.COMM !== null ? '$' + formatSalary(emp.COMM) : '-' }}
              </td>
              <td class="p-2.5 border border-gray-300 text-center text-sm">{{ emp.DEPTNO }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-else
        class="text-center py-10 text-gray-400"
      >
        버튼을 눌러서 사원 정보를 조회하세요
      </div>
    </div>

    <!-- 통계 정보 -->
    <div
      v-if="employees.length > 0"
      class="mt-5 p-4 bg-amber-50 rounded-lg"
    >
      <h4 class="mt-0 mb-2">📊 통계</h4>
      <ul class="m-0 pl-5 text-sm">
        <li>총 사원 수: {{ employees.length }}명</li>
        <li>평균 급여: ${{ formatSalary(Math.round(employees.reduce((sum, emp) => sum + emp.SAL, 0) / employees.length)) }}</li>
        <li>최고 급여: ${{ formatSalary(Math.max(...employees.map(e => e.SAL))) }}</li>
        <li>최저 급여: ${{ formatSalary(Math.min(...employees.map(e => e.SAL))) }}</li>
      </ul>
    </div>

    <!-- 안내 -->
    <div class="mt-8 p-4 bg-blue-50 rounded-lg text-sm">
      <strong>💡 특징:</strong>
      <ul class="my-2.5 pl-5">
        <li>인터넷 연결 없이 로컬 JSON 데이터 사용</li>
        <li>fetch API 방식 그대로 유지 (mockFetch)</li>
        <li>오라클 EMP 테이블 실제 데이터 포함</li>
        <li>300ms 딜레이로 실제 네트워크 효과</li>
      </ul>
    </div>
  </div>
</template>