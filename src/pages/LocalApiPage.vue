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
    <div style="padding: 20px; max-width: 900px; margin: 0 auto; font-family: system-ui;">
      <h1 style="color: #42b983;">🗄️ Oracle EMP 테이블 (로컬 JSON)</h1>
      
      <div v-if="error" style="background: #fee; padding: 10px; border-radius: 5px; color: red; margin-bottom: 15px;">
        {{ error }}
      </div>
      
      <!-- 조회 버튼들 -->
      <div style="margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 8px;">
        <button 
          @click="getEmployees" 
          :disabled="loading"
          style="padding: 10px 20px; background: #42b983; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;"
        >
          📥 전체 사원 조회
        </button>
        
        <button 
          @click="filterByJob('MANAGER')" 
          :disabled="loading"
          style="padding: 10px 20px; background: #FF9800; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; margin-right: 5px;"
        >
          MANAGER
        </button>
        
        <button 
          @click="filterByJob('SALESMAN')" 
          :disabled="loading"
          style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; margin-right: 5px;"
        >
          SALESMAN
        </button>
        
        <button 
          @click="filterByJob('CLERK')" 
          :disabled="loading"
          style="padding: 10px 20px; background: #9C27B0; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 14px;"
        >
          CLERK
        </button>
        
        <span v-if="loading" style="margin-left: 10px; color: #42b983;">⏳ 로딩중...</span>
      </div>
      
      <!-- 사원 목록 테이블 -->
      <div style="margin-top: 20px;">
        <h3>📋 사원 목록 ({{ employees.length }}명)</h3>
        
        <div v-if="employees.length > 0" style="overflow-x: auto;">
          <table style="width: 100%; border-collapse: collapse; background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background: #42b983; color: white;">
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">사원번호</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">사원명</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">직책</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">상사</th>
                <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">입사일</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">급여</th>
                <th style="padding: 12px; text-align: right; border: 1px solid #ddd;">커미션</th>
                <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">부서</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="emp in employees" 
                :key="emp.EMPNO"
                style="border-bottom: 1px solid #ddd;"
              >
                <td style="padding: 10px; border: 1px solid #ddd;">{{ emp.EMPNO }}</td>
                <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">{{ emp.ENAME }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">
                  <span :style="{
                    padding: '4px 8px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    background: emp.JOB === 'MANAGER' ? '#FFE082' : emp.JOB === 'PRESIDENT' ? '#EF9A9A' : emp.JOB === 'ANALYST' ? '#90CAF9' : '#C5E1A5',
                    color: '#333'
                  }">
                    {{ emp.JOB }}
                  </span>
                </td>
                <td style="padding: 10px; border: 1px solid #ddd;">{{ emp.MGR || '-' }}</td>
                <td style="padding: 10px; border: 1px solid #ddd;">{{ emp.HIREDATE }}</td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right; font-weight: bold;">
                  ${{ formatSalary(emp.SAL) }}
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">
                  {{ emp.COMM !== null ? '$' + formatSalary(emp.COMM) : '-' }}
                </td>
                <td style="padding: 10px; border: 1px solid #ddd; text-align: center;">{{ emp.DEPTNO }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else style="text-align: center; padding: 40px; color: #999;">
          버튼을 눌러서 사원 정보를 조회하세요
        </div>
      </div>
      
      <!-- 통계 정보 -->
      <div v-if="employees.length > 0" style="margin-top: 20px; padding: 15px; background: #fff3cd; border-radius: 8px;">
        <h4 style="margin-top: 0;">📊 통계</h4>
        <ul style="margin: 0; padding-left: 20px;">
          <li>총 사원 수: {{ employees.length }}명</li>
          <li>평균 급여: ${{ formatSalary(Math.round(employees.reduce((sum, emp) => sum + emp.SAL, 0) / employees.length)) }}</li>
          <li>최고 급여: ${{ formatSalary(Math.max(...employees.map(e => e.SAL))) }}</li>
          <li>최저 급여: ${{ formatSalary(Math.min(...employees.map(e => e.SAL))) }}</li>
        </ul>
      </div>
      
      <!-- 안내 -->
      <div style="margin-top: 30px; padding: 15px; background: #e3f2fd; border-radius: 8px; font-size: 14px;">
        <strong>💡 특징:</strong>
        <ul style="margin: 10px 0; padding-left: 20px;">
          <li>인터넷 연결 없이 로컬 JSON 데이터 사용</li>
          <li>fetch API 방식 그대로 유지 (mockFetch)</li>
          <li>오라클 EMP 테이블 실제 데이터 포함</li>
          <li>300ms 딜레이로 실제 네트워크 효과</li>
        </ul>
      </div>
    </div>
  </template>