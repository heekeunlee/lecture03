import { motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  Database,
  FileSpreadsheet,
  FileText,
  Filter,
  Gauge,
  LineChart,
  PlayCircle,
  Sparkles,
  Table2,
  TimerReset,
} from 'lucide-react';

const lessonFlow = [
  { time: '5분', label: '지난 시간 연결', detail: '좋은 지시문이 왜 자동화 결과를 바꾸는지 복습' },
  { time: '8분', label: 'MES 데이터 구조', detail: '라인, 공정, 모델, Lot, 수율, 불량 컬럼 읽는 법' },
  { time: '15분', label: '실습 1: 요약 자동화', detail: '수만 줄 CSV를 AI에게 맡겨 핵심 표와 차트 만들기' },
  { time: '12분', label: '실습 2: 하락 원인 찾기', detail: '전일 대비 3% 이상 하락 조건으로 우선순위 도출' },
  { time: '8분', label: '보고서 앱 만들기', detail: '현장 회의용 HTML 대시보드 구성' },
  { time: '5분', label: '검증과 과제', detail: 'AI 결과를 엔지니어 기준으로 확인하는 체크리스트' },
];

const learningGoals = [
  'MES/수율 CSV에서 AI에게 알려줘야 할 컬럼과 기준을 구분한다.',
  'TCREI 프롬프트를 실제 데이터 자동화 지시문으로 확장한다.',
  '수율 하락 라인, 공정, 모델을 자동으로 찾아 보고서 초안을 만든다.',
  'AI가 만든 결과를 현장 기준으로 검증하고 수정 지시를 줄 수 있다.',
];

const mesColumns = [
  { name: 'date', meaning: '생산일', example: '2026-05-01' },
  { name: 'line', meaning: '라인', example: 'A_LINE' },
  { name: 'process', meaning: '공정', example: 'Photo' },
  { name: 'model', meaning: '제품 모델', example: 'OLED-17' },
  { name: 'lot_id', meaning: 'Lot 번호', example: 'L250501-083' },
  { name: 'input_qty', meaning: '투입 수량', example: '12,000' },
  { name: 'good_qty', meaning: '양품 수량', example: '10,884' },
  { name: 'yield', meaning: '수율', example: '90.7%' },
  { name: 'defect_top1', meaning: '최다 불량', example: 'Particle' },
];

const rawRows = [
  ['05-01', 'A', 'Photo', 'OLED-17', '91.8', 'Particle', 'OK'],
  ['05-01', 'B', 'Photo', 'OLED-17', '94.2', 'Scratch', 'OK'],
  ['05-01', 'C', 'Etch', 'OLED-14', '93.6', 'Open', 'OK'],
  ['05-02', 'A', 'Photo', 'OLED-17', '90.9', 'Particle', 'OK'],
  ['05-02', 'B', 'Photo', 'OLED-17', '93.7', 'Scratch', 'OK'],
  ['05-02', 'C', 'Etch', 'OLED-14', '92.8', 'Open', 'OK'],
  ['05-03', 'A', 'Photo', 'OLED-17', '86.4', 'Particle', 'CHECK'],
  ['05-03', 'B', 'Photo', 'OLED-17', '93.1', 'Scratch', 'OK'],
  ['05-03', 'C', 'Etch', 'OLED-14', '88.9', 'Open', 'CHECK'],
];

const summaryCards = [
  { label: '분석 대상', value: '18,420 rows', icon: Database },
  { label: '하락 감지', value: '2개 조합', icon: AlertTriangle },
  { label: '보고서 초안', value: '1 page', icon: FileText },
  { label: '수작업 절감', value: '4시간 -> 10분', icon: TimerReset },
];

const yieldDrops = [
  {
    rank: 1,
    target: 'A Line / Photo / OLED-17',
    yesterday: 90.9,
    today: 86.4,
    diff: -4.5,
    cause: 'Particle 불량 증가, PR dispense pressure 변동 이력 확인 필요',
  },
  {
    rank: 2,
    target: 'C Line / Etch / OLED-14',
    yesterday: 92.8,
    today: 88.9,
    diff: -3.9,
    cause: 'Open 불량 증가, Chamber pressure hunting 로그 확인 필요',
  },
];

const promptBlocks = [
  {
    title: '나쁜 지시',
    tone: 'bad',
    text: 'MES 데이터 분석해줘. 수율 떨어진 곳 있으면 알려줘.',
    result: 'AI가 컬럼 의미와 판정 기준을 되묻거나, 일반론 위주의 답변을 냅니다.',
  },
  {
    title: '3강 실습 지시',
    tone: 'good',
    text: `역할: 당신은 디스플레이 수율 데이터 분석을 돕는 공정 엔지니어입니다.
작업: 업로드한 MES CSV에서 line/process/model별 일별 수율을 계산하고, 전일 대비 3%p 이상 하락한 조합을 찾아주세요.
맥락: 아침 생산 회의에서 10분 안에 우선 확인 대상을 정해야 합니다.
입력: date, line, process, model, lot_id, input_qty, good_qty, defect_top1 컬럼이 있습니다. yield는 good_qty/input_qty*100으로 계산하세요.
결과: 1) 하락 TOP 표 2) 7일 수율 추세 3) 원인 후보 3개 4) 엔지니어 확인 질문을 HTML 대시보드 형태로 만들어주세요.`,
    result: 'AI가 계산 기준, 필터 조건, 산출물 형식을 바로 이해하고 실행 가능한 코드와 보고서를 만듭니다.',
  },
];

const practiceSteps = [
  {
    icon: FileSpreadsheet,
    title: 'CSV를 업무 언어로 설명',
    body: '컬럼명을 붙여넣는 데서 끝내지 말고, 각 컬럼이 현장에서 무엇을 뜻하는지 AI에게 알려줍니다.',
  },
  {
    icon: Filter,
    title: '판정 기준을 숫자로 고정',
    body: '“수율이 나쁜 곳” 대신 “전일 대비 3%p 이상 하락”처럼 조건을 명시합니다.',
  },
  {
    icon: BarChart3,
    title: '회의에서 볼 결과물 지정',
    body: '표, 추세선, 원인 후보, 확인 질문을 한 화면에 배치하라고 지시합니다.',
  },
  {
    icon: CheckCircle2,
    title: 'AI 결과를 검증',
    body: '집계 단위, 결측치 처리, Lot 중복, 수율 계산식을 사람이 다시 확인합니다.',
  },
];

const reportChecklist = [
  '수율 계산식이 good_qty/input_qty*100인지 확인',
  '라인/공정/모델 단위가 실제 회의 단위와 같은지 확인',
  '전일 대비 기준이 %인지 %p인지 명확히 확인',
  '결측치, 재작업 Lot, 중복 Lot 처리 규칙 확인',
  'AI가 제안한 원인 후보를 설비 이력, 레시피 변경, 자재 Lot와 대조',
];

function MiniTrend() {
  const values = [91.8, 90.9, 86.4, 88.1, 89.7, 91.2, 92.0];
  const min = 85;
  const max = 95;

  return (
    <div className="trend-chart" aria-label="A Line Photo OLED-17 yield trend">
      {values.map((value, index) => (
        <div className="trend-column" key={`${value}-${index}`}>
          <motion.div
            className={value < 88 ? 'trend-bar alert' : 'trend-bar'}
            initial={{ height: 0 }}
            whileInView={{ height: `${((value - min) / (max - min)) * 100}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
          />
          <span>{value.toFixed(1)}</span>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <header className="main-header">
        <div className="header-top">
          <motion.div className="logo-group" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}>
            <img src="https://heekeunlee.github.io/lecture01/logo.png" alt="내일도렛유인" className="header-logo" />
          </motion.div>
          <div className="header-tag-container">
            <span className="header-tag">첨단 기술 엔지니어를 위한 바이브 코딩 실전</span>
          </div>
        </div>

        <motion.div className="hero-section" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <span className="hero-kicker">Lecture 03 · 데이터 자동화</span>
          <h1>
            바이브 코딩 3강:<br />
            <mark>엑셀 노가다 탈출</mark>, MES 데이터 요약 웹앱 만들기
          </h1>
          <p className="subtitle">
            2강에서 배운 프롬프트 설계를 실제 생산 데이터 자동화로 연결합니다. 수만 줄 CSV를 읽고, 수율 하락 지점을 찾고,
            회의용 대시보드 초안까지 만드는 실전 강의입니다.
          </p>
          <div className="lesson-meta">
            <span>40-60분 강의</span>
            <span>실습 중심</span>
            <span>MES · CSV · 수율 분석</span>
          </div>
        </motion.div>
      </header>

      <section>
        <span className="section-label">00. 오늘의 위치</span>
        <h2>
          <PlayCircle size={24} /> 말 잘하는 법에서 <mark>일을 맡기는 법</mark>으로 넘어갑니다
        </h2>
        <div className="goal-grid">
          {learningGoals.map((goal, index) => (
            <motion.div className="goal-card" key={goal} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{goal}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">01. 강의 운영안</span>
        <h2>
          <ClipboardList size={24} /> 50분 기준 <mark>현장 실습 흐름</mark>
        </h2>
        <div className="timeline">
          {lessonFlow.map((item) => (
            <div className="timeline-item" key={item.label}>
              <strong>{item.time}</strong>
              <div>
                <h3>{item.label}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">02. 실무 문제</span>
        <h2>
          <FileSpreadsheet size={24} /> 반복되는 Excel 업무를 <mark>AI 작업지시서</mark>로 바꿉니다
        </h2>
        <p className="section-intro">
          강의 상황은 아침 생산 회의 전입니다. 엔지니어는 여러 라인의 MES 파일을 열어 수율이 급락한 조합을 찾아야 합니다.
          오늘의 목표는 이 반복 업무를 AI에게 맡길 수 있는 형태로 쪼개는 것입니다.
        </p>
        <div className="case-grid">
          <div className="work-card manual">
            <span>기존 방식</span>
            <h3>파일 열기, 필터, 피벗, 캡처를 반복</h3>
            <ul>
              <li>라인별 Excel 파일을 하나씩 열기</li>
              <li>날짜, 공정, 모델 필터를 매번 적용</li>
              <li>전일 대비 하락 폭을 눈으로 비교</li>
              <li>이상 구간을 캡처해 보고서에 붙이기</li>
            </ul>
          </div>
          <div className="work-card ai">
            <span>바이브 코딩 방식</span>
            <h3>CSV와 기준을 주고 보고서 앱을 생성</h3>
            <ul>
              <li>컬럼 의미와 수율 계산식을 설명</li>
              <li>전일 대비 3%p 하락 조건을 명시</li>
              <li>AI에게 표, 차트, 원인 후보를 생성하게 함</li>
              <li>엔지니어가 검증 후 수정 지시</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <span className="section-label">03. 데이터 읽기</span>
        <h2>
          <Table2 size={24} /> AI가 헷갈리지 않도록 <mark>컬럼 사전</mark>을 먼저 줍니다
        </h2>
        <div className="column-table">
          {mesColumns.map((column) => (
            <div className="column-row" key={column.name}>
              <code>{column.name}</code>
              <strong>{column.meaning}</strong>
              <span>{column.example}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">04. 프롬프트 실습</span>
        <h2>
          <Sparkles size={24} /> 2강의 TCREI를 <mark>MES 분석 지시문</mark>으로 확장합니다
        </h2>
        <div className="prompt-compare-grid">
          {promptBlocks.map((block) => (
            <div className={`prompt-card ${block.tone === 'good' ? 'engineering' : 'general'}`} key={block.title}>
              <span>{block.title}</span>
              <div className="prompt-box">{block.text}</div>
              <p className="prompt-result">{block.result}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">05. 자동 분석 결과</span>
        <h2>
          <Gauge size={24} /> AI가 만들어야 할 결과물을 <mark>눈으로 확인</mark>합니다
        </h2>
        <div className="dashboard">
          <div className="summary-grid">
            {summaryCards.map((card) => (
              <div className="summary-card" key={card.label}>
                <card.icon size={20} />
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </div>

          <div className="dashboard-main">
            <div className="data-panel">
              <h3>원본 데이터 미리보기</h3>
              <div className="mini-table">
                <div className="mini-head">
                  <span>Date</span>
                  <span>Line</span>
                  <span>Proc</span>
                  <span>Model</span>
                  <span>Yield</span>
                  <span>Top Defect</span>
                  <span>Judge</span>
                </div>
                {rawRows.map((row) => (
                  <div className={row[6] === 'CHECK' ? 'mini-row flagged' : 'mini-row'} key={row.join('-')}>
                    {row.map((cell) => (
                      <span key={cell}>{cell}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="chart-panel">
              <h3>A Line / Photo / OLED-17 7일 수율</h3>
              <MiniTrend />
              <p>05-03에 수율 86.4%로 전일 대비 4.5%p 하락했습니다.</p>
            </div>
          </div>

          <div className="drop-list">
            {yieldDrops.map((drop) => (
              <div className="drop-card" key={drop.rank}>
                <span>#{drop.rank}</span>
                <h3>{drop.target}</h3>
                <div className="drop-metric">
                  <strong>{drop.yesterday}%</strong>
                  <ArrowRight size={18} />
                  <strong>{drop.today}%</strong>
                  <b>{drop.diff}%p</b>
                </div>
                <p>{drop.cause}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <span className="section-label">06. 강사용 진행 멘트</span>
        <h2>
          <LineChart size={24} /> 수강생이 따라 할 <mark>실습 순서</mark>
        </h2>
        <div className="practice-grid">
          {practiceSteps.map((step, index) => (
            <div className="practice-card" key={step.title}>
              <step.icon size={24} />
              <span>Step {index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">07. 검증 체크리스트</span>
        <h2>
          <CheckCircle2 size={24} /> AI 결과는 <mark>현장 기준</mark>으로 다시 확인합니다
        </h2>
        <div className="checklist">
          {reportChecklist.map((item) => (
            <div className="check-row" key={item}>
              <CheckCircle2 size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <footer className="philosophy-section">
        <h2>3강의 결론</h2>
        <p>
          바이브 코딩은 “AI에게 분석해줘”라고 말하는 기술이 아닙니다. 현장 문제, 데이터 구조, 판정 기준, 보고서 형식을
          엔지니어가 정의하고 AI에게 반복 업무를 맡기는 실무 자동화 방식입니다.
        </p>
      </footer>
    </div>
  );
}
