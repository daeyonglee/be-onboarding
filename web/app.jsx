const modules = [
  {
    id: 'plan',
    title: '전체 교육 로드맵',
    subtitle: 'EDUCATION_PLAN.md 요약',
    sections: [
      {
        heading: '목표',
        bullets: [
          '3년차 백엔드 개발자의 실무 설계/구현/품질 역량 강화',
          'StyleKorean eCommerce 시나리오 중심 학습',
          '이론 + 실습 + 과제 + 리뷰 + 회고의 반복 루프 운영',
        ],
      },
      {
        heading: 'Phase 구성',
        bullets: [
          'Phase 0: 킥오프 & 진단',
          'Phase 1: 자료구조/알고리즘/Java',
          'Phase 2: Spring Boot 실전',
          'Phase 3: DDD + Hexagonal',
          'Phase 4: Clean Architecture/Pattern/Clean Code',
          'Phase 5: Capstone 프로젝트',
        ],
      },
    ],
  },
  {
    id: 'foundation',
    title: 'Phase 1 Foundation',
    subtitle: 'CS/Java 실무 기초',
    sections: [
      {
        heading: '이론',
        bullets: [
          '자료구조 선택 기준(List/Set/Map/Queue/Heap)',
          '알고리즘 프레임(BFS/DFS, Sliding Window, 복잡도)',
          'Java 불변성, 동시성, 예외/로깅 원칙',
        ],
      },
      {
        heading: '실습/과제',
        bullets: [
          'Top-K 상품 랭킹',
          '카테고리 트리 탐색',
          '재고 이벤트 멱등 처리',
        ],
      },
    ],
  },
  {
    id: 'spring-theory',
    title: 'Phase 2 Spring Theory',
    subtitle: '트랜잭션/JPA/운영 관점 API 설계',
    sections: [
      {
        heading: '핵심 주제',
        bullets: [
          'Controller-Service-Domain-Infrastructure 경계',
          '트랜잭션 경계와 보상 흐름',
          'N+1, 페이징, 벌크 업데이트 실전 이슈',
          '비즈니스 예외 vs 시스템 예외 분리',
        ],
      },
      {
        heading: 'StyleKorean 매핑',
        bullets: [
          '주문 생성 API: 쿠폰/재고/결제 처리',
          '주문 조회 API: 연관 데이터 성능 최적화',
          '쿠폰 정책 API: 조건 검증 표준화',
        ],
      },
    ],
  },
  {
    id: 'spring-practice',
    title: 'Phase 2 Practice & Assignment',
    subtitle: '주문/결제 안정화 실습',
    sections: [
      {
        heading: '핸즈온',
        bullets: [
          '주문 생성 트랜잭션 경계 설계',
          '주문 조회 N+1 제거 전/후 비교',
          '쿠폰 정책 검증 모듈 + 단위 테스트',
        ],
      },
      {
        heading: '과제 산출물',
        bullets: [
          '코드 + 테스트 리포트',
          '성능 비교 문서(SQL 건수/응답시간)',
          'ADR: 트랜잭션 경계 결정 근거',
        ],
      },
    ],
  },
];

function App() {
  const [activeId, setActiveId] = React.useState(modules[0].id);
  const active = modules.find((module) => module.id === activeId) ?? modules[0];

  return (
    <div className="layout">
      <header className="header">
        <h1>StyleKorean Backend Onboarding</h1>
        <p>eCommerce 실무 시나리오 기반 교육자료 포털 (React)</p>
      </header>

      <main className="main">
        <aside className="sidebar">
          <h2>학습 모듈</h2>
          {modules.map((module) => (
            <button
              key={module.id}
              className={`nav-btn ${module.id === activeId ? 'active' : ''}`}
              onClick={() => setActiveId(module.id)}
            >
              {module.title}
            </button>
          ))}
        </aside>

        <section className="content">
          <h2>{active.title}</h2>
          <p className="subtitle">{active.subtitle}</p>
          {active.sections.map((section) => (
            <article className="card" key={section.heading}>
              <h3>{section.heading}</h3>
              <ul>
                {section.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
