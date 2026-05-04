import { motion } from 'framer-motion';
import {
  Activity,
  BarChart3,
  Bot,
  Boxes,
  CircuitBoard,
  Code2,
  Database,
  Factory,
  FileSpreadsheet,
  Gauge,
  GitBranch,
  Layers3,
  LineChart,
  Monitor,
  MousePointer2,
  PackageCheck,
  PlayCircle,
  ScanLine,
  Search,
  Sparkles,
  TerminalSquare,
  TimerReset,
  Wand2,
} from 'lucide-react';

type TermProps = {
  children: string;
  note: string;
};

function Term({ children, note }: TermProps) {
  return (
    <span className="term" data-note={note}>
      {children}
    </span>
  );
}

const lessonFlow = [
  { time: '5분', label: '문제 제시', detail: '엑셀로 CVD 두께 데이터를 확인하는 기존 업무의 한계를 보여줍니다.' },
  { time: '8분', label: 'CVD 공정 이해', detail: '증착 공정 흐름과 MES에 쌓이는 주요 공정 데이터를 연결합니다.' },
  { time: '8분', label: '데이터셋 만들기', detail: '수 micrometer 단위의 증착 두께 120개 샘플을 생성하고 컬럼 의미를 설명합니다.' },
  { time: '10분', label: 'IDE 선택', detail: 'Cursor, Antigravity 같은 AI IDE가 엑셀 자동화와 어떻게 다른지 비교합니다.' },
  { time: '12분', label: 'Antigravity 실습', detail: '설치, 화면 구조, 메뉴 사용법, 프롬프트 입력 흐름을 단계별로 안내합니다.' },
  { time: '10분', label: '대시보드 완성', detail: '엑셀에서 보기 어려운 히트맵, 분포, 이상 패턴, 공정 단계별 상관 시각화를 만듭니다.' },
];

const goals = [
  'MES 공정관리 데이터가 어떤 의미의 업무 기록인지 설명한다.',
  'CVD 증착 공정의 시간 흐름과 측정 데이터를 연결한다.',
  '엑셀 수작업의 한계를 바이브 코딩 과제로 바꾼다.',
  'Antigravity에서 데이터 요약 대시보드를 만들도록 AI에게 지시한다.',
  '엑셀 표/차트 수준을 넘어서는 시각화 아이디어를 구현한다.',
];

const processTerms = [
  { term: 'MES', note: 'Manufacturing Execution System. 생산 현장의 Lot, 장비, 공정 조건, 검사 결과를 시간순으로 기록하는 실행 관리 시스템입니다.' },
  { term: 'Lot', note: '동일 조건으로 함께 처리되는 웨이퍼나 패널 묶음입니다. 분석할 때 추적 단위가 됩니다.' },
  { term: 'Recipe', note: '온도, 압력, 가스 유량, 시간처럼 설비가 따라야 하는 공정 조건 묶음입니다.' },
  { term: 'CVD', note: 'Chemical Vapor Deposition. 반응 가스를 기판 표면에서 화학 반응시켜 박막을 형성하는 증착 공정입니다.' },
  { term: 'Deposition Thickness', note: '증착된 박막의 두께입니다. 여기서는 micrometer 단위로 측정합니다.' },
  { term: 'Uniformity', note: '한 웨이퍼나 패널 안에서 두께가 얼마나 균일한지 나타내는 지표입니다.' },
  { term: 'Spec Limit', note: '공정이 허용하는 상한/하한 기준입니다. 기준 밖 데이터는 공정 이상 후보가 됩니다.' },
  { term: 'SPC', note: 'Statistical Process Control. 관리도와 통계 기준으로 공정 상태를 감시하는 방식입니다.' },
];

const cvdSteps = [
  { label: 'Load', title: '기판 투입', detail: '웨이퍼 또는 글래스 기판을 챔버에 넣고 공정 대상 Lot을 MES에 연결합니다.' },
  { label: 'Pump Down', title: '진공 형성', detail: '챔버 내부 압력을 낮춰 반응 환경을 안정화합니다.' },
  { label: 'Heat', title: '온도 안정화', detail: '기판 온도를 Recipe 목표값까지 올리고 안정 시간을 확보합니다.' },
  { label: 'Gas Flow', title: '반응 가스 주입', detail: 'SiH4, NH3, N2O 같은 반응 가스와 캐리어 가스를 정해진 유량으로 주입합니다.' },
  { label: 'Deposition', title: '박막 증착', detail: '기판 표면에서 화학 반응이 일어나 박막 두께가 시간에 따라 증가합니다.' },
  { label: 'Purge', title: '잔류 가스 제거', detail: '불필요한 반응 가스를 배출하고 챔버를 다음 공정 상태로 전환합니다.' },
  { label: 'Measure', title: '두께 측정', detail: '계측 장비에서 위치별 두께를 측정하고 MES 또는 품질 DB에 저장합니다.' },
];

const thicknessData = Array.from({ length: 120 }, (_, index) => {
  const zone = ['Center', 'Middle', 'Edge'][index % 3];
  const chamber = ['CVD-01', 'CVD-02', 'CVD-03', 'CVD-04'][index % 4];
  const lotNo = Math.floor(index / 10) + 1;
  const drift = index > 72 && chamber === 'CVD-03' ? 0.24 : 0;
  const edgeBias = zone === 'Edge' ? -0.11 : zone === 'Center' ? 0.06 : 0;
  const wave = Math.sin(index * 0.47) * 0.08 + Math.cos(index * 0.19) * 0.05;
  const thickness = 2.52 + drift + edgeBias + wave;
  return {
    id: index + 1,
    lot: `CVD-L${String(lotNo).padStart(2, '0')}`,
    chamber,
    zone,
    time: `T+${String(index * 3).padStart(3, '0')}m`,
    thickness: Number(thickness.toFixed(3)),
  };
});

const datasetPreview = thicknessData.slice(0, 14);
const avgThickness = thicknessData.reduce((sum, row) => sum + row.thickness, 0) / thicknessData.length;
const maxThickness = Math.max(...thicknessData.map((row) => row.thickness));
const minThickness = Math.min(...thicknessData.map((row) => row.thickness));
const outliers = thicknessData.filter((row) => row.thickness < 2.35 || row.thickness > 2.75);
const chamberNames = ['CVD-01', 'CVD-02', 'CVD-03', 'CVD-04'];
const zoneNames = ['Center', 'Middle', 'Edge'];

const chamberStats = chamberNames.map((chamber) => {
  const rows = thicknessData.filter((row) => row.chamber === chamber);
  const avg = rows.reduce((sum, row) => sum + row.thickness, 0) / rows.length;
  const firstHalf = rows.slice(0, Math.floor(rows.length / 2));
  const secondHalf = rows.slice(Math.floor(rows.length / 2));
  const early = firstHalf.reduce((sum, row) => sum + row.thickness, 0) / firstHalf.length;
  const late = secondHalf.reduce((sum, row) => sum + row.thickness, 0) / secondHalf.length;
  const specOut = rows.filter((row) => row.thickness < 2.35 || row.thickness > 2.75).length;
  return { chamber, avg, drift: late - early, specOut };
});

const zoneStats = zoneNames.map((zone) => {
  const rows = thicknessData.filter((row) => row.zone === zone);
  const avg = rows.reduce((sum, row) => sum + row.thickness, 0) / rows.length;
  return { zone, avg, delta: avg - avgThickness };
});

const lotStats = Array.from(new Set(thicknessData.map((row) => row.lot))).map((lot) => {
  const rows = thicknessData.filter((row) => row.lot === lot);
  const avg = rows.reduce((sum, row) => sum + row.thickness, 0) / rows.length;
  const range = Math.max(...rows.map((row) => row.thickness)) - Math.min(...rows.map((row) => row.thickness));
  const specOut = rows.filter((row) => row.thickness < 2.35 || row.thickness > 2.75).length;
  return { lot, avg, range, specOut };
});

const riskLots = [...lotStats].sort((a, b) => b.range + b.specOut * 0.08 - (a.range + a.specOut * 0.08)).slice(0, 5);
const histogramBins = [
  { label: '<2.35', count: thicknessData.filter((row) => row.thickness < 2.35).length },
  { label: '2.35-2.45', count: thicknessData.filter((row) => row.thickness >= 2.35 && row.thickness < 2.45).length },
  { label: '2.45-2.55', count: thicknessData.filter((row) => row.thickness >= 2.45 && row.thickness < 2.55).length },
  { label: '2.55-2.65', count: thicknessData.filter((row) => row.thickness >= 2.55 && row.thickness < 2.65).length },
  { label: '2.65-2.75', count: thicknessData.filter((row) => row.thickness >= 2.65 && row.thickness <= 2.75).length },
  { label: '>2.75', count: thicknessData.filter((row) => row.thickness > 2.75).length },
];
const maxBinCount = Math.max(...histogramBins.map((bin) => bin.count));

const ideCards = [
  {
    name: 'Cursor',
    icon: Code2,
    best: '코드 파일을 직접 수정하며 AI와 짝 프로그래밍하기 좋습니다.',
    use: '이미 프로젝트 구조가 있고, 컴포넌트나 함수 단위로 빠르게 고칠 때 적합합니다.',
    strengths: ['파일 단위 수정이 빠름', '기존 코드 읽기와 부분 리팩터링에 강함', '프론트엔드 컴포넌트 수정 지시가 편함'],
    cautions: ['업무 목표를 너무 크게 주면 중간 확인 없이 엉뚱한 방향으로 갈 수 있음', '데이터 분석 의도를 사용자가 더 자주 쪼개줘야 함'],
    example: '“src/App.tsx의 CVD 두께 차트에 spec 상한/하한 라인을 추가하고, 이탈 포인트만 빨간색으로 표시해줘.”',
  },
  {
    name: 'Antigravity',
    icon: Bot,
    best: '작업 목표를 주면 여러 파일을 탐색하고 계획, 구현, 검증까지 이어가는 에이전트형 IDE입니다.',
    use: '이번 강의처럼 데이터셋, 화면, 분석 로직, 대시보드를 한 번에 만들 때 사용합니다.',
    strengths: ['프로젝트 전체 맥락을 읽고 계획을 세움', '여러 파일을 함께 수정하는 앱 제작 실습에 적합', '실행 결과와 오류를 바탕으로 다음 수정을 이어가기 좋음'],
    cautions: ['처음 목표가 모호하면 보기 좋은 화면만 만들고 공정 의미를 놓칠 수 있음', 'MES 용어와 판정 기준은 엔지니어가 반드시 제공해야 함'],
    example: '“CVD 두께 데이터 120개를 만들고, chamber drift와 zone uniformity를 보여주는 React 대시보드를 구현해줘.”',
  },
  {
    name: 'VS Code + Copilot',
    icon: GitBranch,
    best: '기존 개발 환경에 AI 자동완성을 붙이는 방식입니다.',
    use: '팀 표준 개발 환경을 유지하면서 반복 코드 작성 속도를 높일 때 적합합니다.',
    strengths: ['팀에서 쓰던 확장, 터미널, Git 흐름을 유지', '작은 함수 작성과 테스트 코드 보강이 빠름', '보안 정책상 표준 IDE만 써야 할 때 현실적'],
    cautions: ['대시보드 전체 설계는 사용자가 더 많이 끌고 가야 함', '초보자에게는 파일 구조와 실행 명령을 따로 설명해야 함'],
    example: '“thickness 배열을 chamber별로 groupBy하고 평균, 표준편차, spec out count를 반환하는 함수를 작성해줘.”',
  },
];

const antigravitySteps = [
  { target: 'download', title: '설치 파일 받기', body: '공식 배포 페이지에서 운영체제에 맞는 설치 파일을 내려받고 실행합니다. 회사 PC라면 보안 정책상 설치 권한, 프록시, GitHub 접속 가능 여부를 먼저 확인합니다.', x: 18, y: 18 },
  { target: 'account', title: '로그인과 기본 설정', body: '계정 로그인 후 모델, 테마, 터미널 기본 shell, Git 연동 상태를 확인합니다. 강의에서는 “AI가 파일을 수정하고 실행 결과를 확인하는 흐름”을 보여주기 위해 Agent 권한을 사용합니다.', x: 82, y: 16 },
  { target: 'explorer', title: '프로젝트 폴더 열기', body: '좌측 Explorer에서 lecture03 폴더를 열어 src, public, package.json 구조를 확인합니다. 수강생에게 “App.tsx는 화면, index.css는 디자인, package.json은 실행 명령”이라고 설명합니다.', x: 14, y: 44 },
  { target: 'context', title: '데이터와 요구사항 붙이기', body: 'CVD 두께 데이터 컬럼, spec 기준, MES 용어 설명을 Agent에게 먼저 제공합니다. 이 단계가 빠지면 AI는 일반적인 차트만 만들고 공정 의미를 놓칩니다.', x: 66, y: 38 },
  { target: 'chat', title: 'Agent에게 목표 말하기', body: '오른쪽 채팅/Agent 패널에 “CVD 두께 데이터를 분석하는 대시보드 웹앱을 만들어줘”라고 말하되, 결과물 형식과 검증 조건까지 함께 적습니다.', x: 78, y: 26 },
  { target: 'plan', title: '계획 확인 후 승인', body: 'AI가 제안한 작업 계획에서 데이터 생성, 요약 지표, 시각화, 반응형 화면, 빌드 검증이 포함됐는지 확인합니다. 빠진 항목은 구현 전에 바로 추가 지시합니다.', x: 79, y: 48 },
  { target: 'terminal', title: '실행과 검증', body: '터미널에서 npm install, npm run dev, npm run build를 실행하고 오류를 AI에게 다시 전달합니다. 오류 메시지는 요약하지 말고 원문 그대로 붙이는 편이 좋습니다.', x: 46, y: 84 },
  { target: 'preview', title: '화면 확인 후 수정 지시', body: '미리보기 화면에서 글자 겹침, 차트 의미, 공정 용어 설명, 모바일 폭을 확인합니다. “보기 좋게”보다 “CVD-03 drift가 더 선명하게 보이게”처럼 구체적으로 말합니다.', x: 55, y: 48 },
  { target: 'commit', title: '커밋과 배포', body: '완성 후 git status로 변경 파일을 확인하고, 커밋 메시지를 작성한 뒤 GitHub Pages에 배포합니다. 강의에서는 결과 URL을 열어 수강생에게 완성물을 보여줍니다.', x: 44, y: 16 },
];

const ideDecisionRows = [
  { situation: '파일 하나의 차트 색상이나 문구를 바꾸는 경우', choice: 'Cursor', reason: '작은 코드 변경과 즉시 수정이 빠릅니다.' },
  { situation: '데이터셋, 계산 로직, 화면, 스타일을 한 번에 만드는 경우', choice: 'Antigravity', reason: '프로젝트 전체 계획을 세우고 여러 파일을 함께 다루기 좋습니다.' },
  { situation: '회사 표준 VS Code 환경을 그대로 써야 하는 경우', choice: 'VS Code + Copilot', reason: '기존 확장과 보안 정책을 유지하면서 AI 도움을 받을 수 있습니다.' },
  { situation: '초보 수강생에게 “AI가 앱을 만들어가는 과정”을 보여주는 경우', choice: 'Antigravity', reason: 'Agent 계획, 파일 수정, 터미널 실행, 미리보기 흐름이 강의에 적합합니다.' },
];

const antigravityMenuGuide = [
  { menu: 'Explorer', job: '파일 구조 확인', example: 'src/App.tsx, src/index.css, package.json을 찾아 “어느 파일이 무엇을 담당하는지” 설명합니다.' },
  { menu: 'Agent / Chat', job: '작업 목표 입력', example: 'CVD 데이터셋 생성, MES 용어 주석, 대시보드 시각화 요구사항을 한 번에 전달합니다.' },
  { menu: 'Editor', job: '코드 확인', example: 'AI가 만든 thicknessData, CvdAnimation, dashboard 컴포넌트가 실제로 들어갔는지 확인합니다.' },
  { menu: 'Terminal', job: '실행 검증', example: 'npm run dev로 화면을 띄우고 npm run build로 배포 가능한지 확인합니다.' },
  { menu: 'Preview', job: '사용자 화면 점검', example: '섹션 간격, 화살표 애니메이션, 모바일 줄바꿈, 툴팁 위치를 확인합니다.' },
  { menu: 'Source Control', job: '변경 이력 관리', example: '수정 파일을 확인하고 “Refine CVD dashboard lesson”처럼 의미 있는 메시지로 커밋합니다.' },
];

const promptExamples = [
  {
    title: '1차 지시: 데이터와 화면 뼈대 만들기',
    body: `CVD 증착 두께 데이터 120개를 React 배열로 생성해줘.
컬럼은 lot, chamber, zone, time, thickness이고 thickness 단위는 micrometer야.
화면에는 평균, min/max, spec out count, chamber별 요약 카드가 있어야 해.`,
  },
  {
    title: '2차 지시: 공정 의미를 더하기',
    body: `MES, Lot, Recipe, CVD, Uniformity, Spec Limit 용어에 물결 밑줄을 넣고 hover 주석을 달아줘.
수강생이 공정 용어를 모르는 상태에서도 데이터가 어떤 업무 의미인지 이해하게 만들어줘.`,
  },
  {
    title: '3차 지시: 엑셀로 어려운 시각화 만들기',
    body: `Excel 기본 차트처럼 막대/꺾은선만 쓰지 말고,
wafer-zone heat strip, spec band timeline, chamber drift map, anomaly ribbon을 추가해줘.
각 시각화 아래에는 “이 차트로 무엇을 판단하는지” 한 문장 설명을 붙여줘.`,
  },
  {
    title: '4차 지시: 검증과 수정',
    body: `npm run build를 실행해서 오류를 고쳐줘.
모바일 화면에서 Antigravity 튜토리얼 영역이 겹치지 않게 반응형 CSS를 조정해줘.
용어 툴팁이 카드 밖으로 너무 크게 튀어나오지 않게 해줘.`,
  },
];

const promptChecklist = [
  '공정 배경: CVD 증착 두께를 왜 보는지 설명했는가?',
  '데이터 구조: 컬럼명, 단위, 샘플 수, spec 기준을 명시했는가?',
  '분석 기준: 평균, 범위, uniformity, drift, spec out을 구분했는가?',
  '시각화 요구: 엑셀 기본 차트와 다른 표현 방식을 지정했는가?',
  '검증 조건: build, 모바일, 용어 주석, 차트 설명까지 확인시켰는가?',
];

const excelPain = [
  '120개 샘플을 Lot, 장비, Zone별로 필터링하며 평균과 편차를 반복 계산',
  'Spec 2.35-2.75 micrometer 밖의 데이터를 조건부 서식으로 찾음',
  'CVD-03의 후반부 drift처럼 시간 순서 패턴을 눈으로 추적',
  'Center/Middle/Edge 위치별 차이를 피벗 테이블과 여러 차트로 따로 확인',
  '보고서용 캡처를 만들 때마다 필터 상태가 바뀌어 재현성이 떨어짐',
];

const dashboardInsights = [
  { label: '평균 두께', value: `${avgThickness.toFixed(3)} micrometer`, icon: Gauge },
  { label: '범위', value: `${minThickness.toFixed(3)} - ${maxThickness.toFixed(3)}`, icon: ScanLine },
  { label: 'Spec 이탈', value: `${outliers.length} points`, icon: Activity },
  { label: '의심 패턴', value: 'CVD-03 late drift', icon: Sparkles },
];

const engineerReportPoints = [
  {
    title: '1. 즉시 보고할 결론',
    body: `전체 평균은 ${avgThickness.toFixed(3)} micrometer로 목표 2.50 micrometer 근처지만, CVD-03 후반부에서 두께 상승 drift가 관찰됩니다.`,
  },
  {
    title: '2. 우선 확인 장비',
    body: 'CVD-03의 late run 구간을 우선 확인합니다. 같은 Recipe에서 온도 안정화, gas flow, chamber pressure 로그를 함께 대조해야 합니다.',
  },
  {
    title: '3. 품질 리스크',
    body: `Spec 2.35-2.75 micrometer 기준 이탈 포인트는 ${outliers.length}개입니다. Lot별 range가 큰 묶음은 재측정 또는 hold 판단 후보입니다.`,
  },
  {
    title: '4. 추가 분석 요청',
    body: '두께 데이터만으로 원인을 확정하지 말고, MES의 Recipe 변경 이력, PM 이력, 전구체 가스 Lot, 계측기 보정 이력을 추가로 연결합니다.',
  },
];

const promptText = `역할: 당신은 CVD 공정 데이터 분석 대시보드를 만드는 제조 데이터 엔지니어입니다.
입력: 120개 이상의 thickness dataset이 있고 단위는 micrometer입니다. 컬럼은 lot, chamber, zone, time, thickness입니다.
작업: 1) 전체 평균/범위/Spec 이탈을 요약하고 2) chamber별 drift 3) zone별 uniformity 4) 시간 흐름에 따른 이상 패턴을 시각화하세요.
시각화: Excel 기본 차트로 보기 어려운 wafer-zone heat strip, chamber drift map, spec band timeline, anomaly ribbon을 포함하세요.
결과: 강의용 React 대시보드로 만들고 MES, Lot, Recipe, Uniformity 같은 용어에는 주석형 설명을 붙이세요.`;

function CvdAnimation() {
  return (
    <div className="cvd-animation">
      <div className="chamber">
        <div className="wafer" />
        <motion.div
          className="gas gas-a"
          animate={{ y: [0, 112], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="gas gas-b"
          animate={{ y: [0, 104], opacity: [0, 1, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 0.35, ease: 'easeInOut' }}
        />
        <motion.div
          className="film"
          animate={{ height: [4, 22, 4] }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="cvd-steps">
        {cvdSteps.map((step, index) => (
          <motion.div
            className="cvd-step"
            key={step.label}
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.04, 1] }}
            transition={{ duration: 4.9, repeat: Infinity, delay: index * 0.7 }}
          >
            <span>{step.label}</span>
            <strong>{step.title}</strong>
            <p>{step.detail}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function ThicknessHeatStrip() {
  return (
    <div className="heat-strip">
      {thicknessData.map((row) => {
        const hot = (row.thickness - minThickness) / (maxThickness - minThickness);
        return (
          <span
            key={row.id}
            title={`${row.lot} ${row.chamber} ${row.zone}: ${row.thickness} micrometer`}
            style={{ backgroundColor: `rgb(${60 + hot * 180}, ${170 - hot * 80}, ${120 - hot * 70})` }}
          />
        );
      })}
    </div>
  );
}

function SpecTimeline() {
  return (
    <div className="spec-timeline">
      {thicknessData.slice(0, 72).map((row) => {
        const top = 100 - ((row.thickness - 2.25) / 0.65) * 100;
        const isOut = row.thickness < 2.35 || row.thickness > 2.75;
        return <i key={row.id} className={isOut ? 'point out' : 'point'} style={{ top: `${top}%` }} />;
      })}
      <b className="spec upper">USL 2.75</b>
      <b className="spec lower">LSL 2.35</b>
    </div>
  );
}

function DistributionBars() {
  return (
    <div className="distribution-bars">
      {histogramBins.map((bin) => (
        <div key={bin.label}>
          <span>{bin.label}</span>
          <motion.i initial={{ width: 0 }} whileInView={{ width: `${(bin.count / maxBinCount) * 100}%` }} viewport={{ once: true }} />
          <strong>{bin.count}</strong>
        </div>
      ))}
    </div>
  );
}

function ZoneUniformity() {
  return (
    <div className="zone-uniformity">
      {zoneStats.map((zone) => (
        <div key={zone.zone}>
          <span>{zone.zone}</span>
          <strong>{zone.avg.toFixed(3)}</strong>
          <motion.i
            className={zone.delta < 0 ? 'minus' : 'plus'}
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(Math.abs(zone.delta) * 650, 100)}%` }}
            viewport={{ once: true }}
          />
          <b>{zone.delta >= 0 ? '+' : ''}{zone.delta.toFixed(3)}</b>
        </div>
      ))}
    </div>
  );
}

function RiskLotRanking() {
  return (
    <div className="risk-ranking">
      {riskLots.map((lot, index) => (
        <div key={lot.lot}>
          <span>#{index + 1}</span>
          <strong>{lot.lot}</strong>
          <p>avg {lot.avg.toFixed(3)} · range {lot.range.toFixed(3)} · spec out {lot.specOut}</p>
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
          <span className="hero-kicker">Lecture 03 · MES Dashboard Automation</span>
          <h1>
            바이브 코딩 3강:<br />
            <mark>엑셀 노가다 탈출</mark>과 CVD 공정 데이터 대시보드
          </h1>
          <p className="subtitle">
            <Term note="생산 현장의 공정 실행 데이터를 시간순으로 남기는 시스템입니다.">MES</Term> 공정관리 데이터를 읽고,
            CVD 증착 두께 데이터셋을 만든 뒤, Antigravity로 요약·분석·고급 시각화 대시보드를 완성하는 전 과정을 단계적으로 설명합니다.
          </p>
          <div className="lesson-meta">
            <span>40-60분 강의</span>
            <span>CVD 증착 공정</span>
            <span>Antigravity 실습</span>
            <span>Excel beyond visualization</span>
          </div>
        </motion.div>
      </header>

      <section>
        <span className="section-label">00. 강의 목표</span>
        <h2><PlayCircle size={24} /> 엑셀 표 정리에서 <mark>공정 데이터 앱 제작</mark>으로 넘어갑니다</h2>
        <div className="goal-grid">
          {goals.map((goal, index) => (
            <motion.div className="goal-card" key={goal} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{goal}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">01. 50분 운영안</span>
        <h2><TimerReset size={24} /> 전 과정을 <mark>작은 단계</mark>로 쪼개서 진행합니다</h2>
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
        <span className="section-label">02. 용어 주석</span>
        <h2><Factory size={24} /> MES와 주요 공정 용어를 <mark>먼저 고정</mark>합니다</h2>
        <p className="section-intro">
          화면 안의 물결 밑줄 용어에 마우스를 올리면 설명이 나타납니다. AI에게도 이 수준으로 용어 의미를 알려줘야 엉뚱한 분석을 줄일 수 있습니다.
        </p>
        <div className="term-grid">
          {processTerms.map((item) => (
            <div className="term-card" key={item.term}>
              <strong><Term note={item.note}>{item.term}</Term></strong>
              <p>{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">03. CVD 공정</span>
        <h2><Layers3 size={24} /> CVD 증착은 <mark>시간 흐름</mark>에 따라 데이터가 쌓입니다</h2>
        <p className="section-intro">
          <Term note="Chemical Vapor Deposition. 화학 반응으로 표면에 박막을 쌓는 증착 공정입니다.">CVD</Term>는 기판 투입부터 진공,
          가열, 가스 주입, 증착, purge, 측정으로 이어집니다. 이때 <Term note="설비 조건 묶음. 온도, 압력, 가스 유량, 시간 등을 포함합니다.">Recipe</Term>,
          챔버, 시간, 측정 두께가 모두 데이터가 됩니다.
        </p>
        <CvdAnimation />
      </section>

      <section>
        <span className="section-label">04. 두께 데이터셋</span>
        <h2><Database size={24} /> 120개 CVD 증착 두께 샘플을 <mark>micrometer 단위</mark>로 만듭니다</h2>
        <p className="section-intro">
          목표 두께는 약 2.50 micrometer, 관리 기준은 2.35-2.75 micrometer로 가정합니다. 데이터는 Lot, Chamber, Zone, Time, Thickness로 구성됩니다.
        </p>
        <div className="dataset-panel">
          <div className="column-table">
            {datasetPreview.map((row) => (
              <div className="column-row dataset-row" key={row.id}>
                <code>{row.lot}</code>
                <span>{row.chamber}</span>
                <span>{row.zone}</span>
                <span>{row.time}</span>
                <strong>{row.thickness.toFixed(3)} micrometer</strong>
              </div>
            ))}
          </div>
          <p className="small-note">화면에는 일부만 표시하지만, 앱 내부 데이터셋은 120개 샘플로 구성되어 있습니다.</p>
        </div>
      </section>

      <section>
        <span className="section-label">05. 엑셀 노가다</span>
        <h2><FileSpreadsheet size={24} /> 같은 데이터를 엑셀로만 보면 <mark>패턴을 놓치기 쉽습니다</mark></h2>
        <div className="case-grid">
          <div className="work-card manual">
            <span>기존 방식</span>
            <h3>필터와 피벗을 계속 바꾸는 무모한 반복</h3>
            <ul>
              {excelPain.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="excel-window">
            <div className="excel-toolbar"><span /><span /><span /><b>Excel_CVD_thickness.xlsx</b></div>
            <div className="excel-grid">
              {thicknessData.slice(0, 48).map((row) => (
                <i key={row.id} className={row.thickness > 2.75 || row.thickness < 2.35 ? 'bad' : ''}>{row.thickness.toFixed(2)}</i>
              ))}
            </div>
            <motion.div className="excel-cursor" animate={{ x: [0, 180, 70, 260], y: [0, 55, 150, 190] }} transition={{ duration: 5, repeat: Infinity }} />
          </div>
        </div>
      </section>

      <section>
        <span className="section-label">06. AI IDE 선택</span>
        <h2><Monitor size={24} /> 바이브 코딩은 <mark>AI IDE</mark>에서 일이 됩니다</h2>
        <p className="section-intro">
          일반 코드 편집기는 “내가 코드를 알고 직접 고치는 도구”에 가깝습니다. AI IDE는 “현장 문제를 설명하면 코드, 데이터, 화면,
          실행 검증까지 함께 진행하는 작업 공간”입니다. 3강에서는 엑셀 파일을 만지는 법보다, 공정 데이터를 앱 요구사항으로 바꾸는 법을 먼저 봅니다.
        </p>
        <div className="ide-grid">
          {ideCards.map((ide) => (
            <div className="ide-card" key={ide.name}>
              <ide.icon size={26} />
              <h3>{ide.name}</h3>
              <p>{ide.best}</p>
              <b>{ide.use}</b>
              <div className="ide-detail">
                <span>강점</span>
                <ul>{ide.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="ide-detail">
                <span>주의점</span>
                <ul>{ide.cautions.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="ide-example">
                <strong>CVD 실습 지시 예시</strong>
                <p>{ide.example}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="decision-table">
          <h3>강의 중 선택 기준</h3>
          {ideDecisionRows.map((row) => (
            <div className="decision-row" key={row.situation}>
              <span>{row.situation}</span>
              <strong>{row.choice}</strong>
              <p>{row.reason}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">07. Antigravity 사용법</span>
        <h2><Bot size={24} /> 설치부터 메뉴 사용까지 <mark>화면을 따라갑니다</mark></h2>
        <p className="section-intro">
          이번 강의는 Antigravity를 기준으로 진행합니다. 핵심은 “데이터와 목표를 설명하고, AI가 파일을 만들고, 내가 화면을 보고 다시 지시하는” 반복입니다.
        </p>
        <div className="tutorial-board">
          <div className="mock-ide">
            <aside>
              <b>Explorer</b>
              <span>lecture03</span>
              <span>src/App.tsx</span>
              <span>src/index.css</span>
              <span>package.json</span>
            </aside>
            <main>
              <div className="tabs"><span>App.tsx</span><span>Preview</span><span>Dashboard</span></div>
              <div className="preview-box">
                <PackageCheck size={34} />
                <strong>CVD Thickness Dashboard</strong>
                <p>MES data summary · spec timeline · anomaly ribbon</p>
              </div>
              <div className="terminal"><TerminalSquare size={16} /> npm run dev</div>
            </main>
            <div className="agent-panel">
              <b>Agent</b>
              <p>데이터셋을 읽고 CVD 두께 대시보드를 만들어줘.</p>
              <button><Wand2 size={15} /> Run</button>
            </div>
            {antigravitySteps.map((step, index) => (
              <motion.div
                className="pointer-callout"
                key={step.target}
                style={{ left: `${step.x}%`, top: `${step.y}%` }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.92, 1, 1, 0.92] }}
                transition={{ duration: 10, repeat: Infinity, delay: index * 1.7 }}
              >
                <MousePointer2 size={18} />
                <span>{index + 1}</span>
              </motion.div>
            ))}
          </div>
          <div className="tutorial-steps">
            {antigravitySteps.map((step, index) => (
              <div className="tutorial-step" key={step.title}>
                <strong>{index + 1}</strong>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="menu-guide">
          <h3>메뉴별로 수강생에게 설명할 포인트</h3>
          <div className="menu-grid">
            {antigravityMenuGuide.map((item) => (
              <div className="menu-card" key={item.menu}>
                <strong>{item.menu}</strong>
                <span>{item.job}</span>
                <p>{item.example}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lecture-script">
          <h3>강사용 진행 멘트 예시</h3>
          <p>
            “지금부터는 엑셀을 열지 않고, 공정 엔지니어가 AI에게 업무를 넘기는 장면을 보겠습니다. 왼쪽은 파일 구조, 가운데는 실제 코드와 미리보기,
            오른쪽은 Agent에게 지시하는 공간입니다. 중요한 것은 코드를 외우는 것이 아니라, CVD 두께 데이터의 의미와 보고서 판단 기준을 AI에게 정확히 넘기는 것입니다.”
          </p>
          <p>
            “첫 지시는 크게 줘도 됩니다. 다만 바로 끝내려고 하지 말고, AI가 만든 계획을 보고 누락된 기준을 추가합니다. 예를 들어 spec이 2.35-2.75 micrometer라는 말이 빠지면,
            AI는 보기 좋은 차트만 만들고 공정 이상 판단은 하지 못합니다.”
          </p>
        </div>
      </section>

      <section>
        <span className="section-label">08. 바이브 코딩 지시문</span>
        <h2><Sparkles size={24} /> 데이터셋을 <mark>대시보드 요구사항</mark>으로 바꿉니다</h2>
        <p className="section-intro">
          좋은 지시문은 한 번에 완벽한 문장이 아니라, “초안 생성 → 공정 의미 보강 → 고급 시각화 추가 → 검증”으로 이어지는 작업 흐름입니다.
          아래 예시는 Antigravity Agent에게 순서대로 넣을 수 있는 실전 지시문입니다.
        </p>
        <div className="prompt-card engineering wide">
          <span>Antigravity Agent Prompt</span>
          <div className="prompt-box">{promptText}</div>
        </div>
        <div className="prompt-ladder">
          {promptExamples.map((prompt, index) => (
            <div className="prompt-step" key={prompt.title}>
              <strong>{index + 1}</strong>
              <div>
                <h3>{prompt.title}</h3>
                <pre>{prompt.body}</pre>
              </div>
            </div>
          ))}
        </div>
        <div className="prompt-checklist">
          <h3>지시문 품질 체크리스트</h3>
          {promptChecklist.map((item) => (
            <div className="check-row" key={item}>
              <Sparkles size={16} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <span className="section-label">09. 완성 대시보드</span>
        <h2><BarChart3 size={24} /> 엑셀 기본 차트를 넘어서는 <mark>공정 시각화</mark></h2>
        <p className="section-intro">
          이 섹션의 목적은 예쁜 차트를 많이 만드는 것이 아니라, 120개 두께 데이터에서 “어디가 이상한가, 얼마나 심각한가,
          엔지니어가 무엇을 확인해야 하는가”를 단계적으로 좁혀가는 과정을 보여주는 것입니다.
        </p>
        <div className="dashboard">
          <div className="summary-grid">
            {dashboardInsights.map((card) => (
              <div className="summary-card" key={card.label}>
                <card.icon size={20} />
                <span>{card.label}</span>
                <strong>{card.value}</strong>
              </div>
            ))}
          </div>
          <div className="viz-grid">
            <div className="viz-card large">
              <h3><LineChart size={18} /> Spec band timeline</h3>
              <SpecTimeline />
              <p>관리 상한/하한을 배경 밴드로 두고 시간순 두께 변화를 한눈에 봅니다.</p>
            </div>
            <div className="viz-card">
              <h3><Boxes size={18} /> Wafer-zone heat strip</h3>
              <ThicknessHeatStrip />
              <p>120개 측정값을 위치/시간 순서의 열 지도로 압축합니다.</p>
            </div>
            <div className="viz-card">
              <h3><CircuitBoard size={18} /> Chamber drift map</h3>
              <div className="drift-map">
                {chamberStats.map((tool) => (
                  <div key={tool.chamber}>
                    <span>{tool.chamber}</span>
                    <motion.i initial={{ width: 0 }} whileInView={{ width: `${Math.min(Math.abs(tool.drift) * 420, 100)}%` }} viewport={{ once: true }} />
                    <b>{tool.drift >= 0 ? '+' : ''}{tool.drift.toFixed(3)}</b>
                  </div>
                ))}
              </div>
              <p>CVD-03 후반부에서 두께가 위로 밀리는 drift 후보를 강조합니다.</p>
            </div>
            <div className="viz-card">
              <h3><Search size={18} /> Anomaly ribbon</h3>
              <div className="ribbon">
                {thicknessData.slice(60, 96).map((row) => <span key={row.id} className={row.chamber === 'CVD-03' ? 'hot' : ''} />)}
              </div>
              <p>조건부 서식보다 작은 공간에서 이상 구간의 연속성을 보여줍니다.</p>
            </div>
            <div className="viz-card">
              <h3><Activity size={18} /> Thickness distribution</h3>
              <DistributionBars />
              <p>전체 분포가 목표값 근처에 모여 있는지, spec 밖 꼬리가 생겼는지 확인합니다.</p>
            </div>
            <div className="viz-card">
              <h3><Gauge size={18} /> Zone uniformity delta</h3>
              <ZoneUniformity />
              <p>Center, Middle, Edge 위치별 평균 차이로 막 균일도 문제를 빠르게 봅니다.</p>
            </div>
            <div className="viz-card">
              <h3><Search size={18} /> Risk lot ranking</h3>
              <RiskLotRanking />
              <p>Lot별 range와 spec out을 합쳐 재측정 또는 hold 후보를 정렬합니다.</p>
            </div>
            <div className="viz-card">
              <h3><Sparkles size={18} /> Root-cause hint matrix</h3>
              <div className="cause-matrix">
                <div><span>두께 상승</span><strong>Gas flow / Temp overshoot</strong></div>
                <div><span>Edge 저하</span><strong>Susceptor / showerhead 균일도</strong></div>
                <div><span>후반 drift</span><strong>Chamber seasoning / pressure</strong></div>
                <div><span>Lot range 증가</span><strong>Recipe 안정화 시간</strong></div>
              </div>
              <p>시각화 결과를 공정 확인 항목으로 연결하는 힌트 테이블입니다.</p>
            </div>
          </div>
          <div className="report-panel">
            <h3>엔지니어 최종 보고 포인트</h3>
            <div className="report-grid">
              {engineerReportPoints.map((point) => (
                <div className="report-card" key={point.title}>
                  <strong>{point.title}</strong>
                  <p>{point.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="philosophy-section">
        <h2>3강의 결론</h2>
        <p>
          엑셀을 버리는 것이 목표가 아닙니다. 엑셀이 잘하는 표 확인은 유지하되, 반복 집계와 패턴 발견, 설명 가능한 대시보드 제작은
          바이브 코딩으로 자동화하는 것이 이번 강의의 핵심입니다.
        </p>
      </footer>
    </div>
  );
}
