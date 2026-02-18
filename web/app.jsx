import React from 'react';
import { createRoot } from 'react-dom/client';
import { marked } from 'marked';
import './styles.css';

const learningTracks = [
  {
    id: 'phase1',
    title: 'Phase 1 Foundation',
    description: '자료구조 · 알고리즘 · Java 기본기',
    steps: [
      { id: 'overview', label: 'Overview', file: '01-foundation/overview.md' },
      { id: 'data-structures', label: 'Data Structures', file: '01-foundation/data-structures.md' },
      { id: 'algorithms', label: 'Algorithms', file: '01-foundation/algorithms.md' },
      { id: 'java-core', label: 'Java Core', file: '01-foundation/java-core.md' },
      { id: 'assignment', label: 'Assignment', file: '01-foundation/assignment.md' },
      { id: 'review', label: 'Review', file: '01-foundation/review-checklist.md' },
    ],
  },
  {
    id: 'phase2',
    title: 'Phase 2 Spring Boot',
    description: '트랜잭션 · JPA · 운영 API',
    steps: [
      { id: 'theory', label: 'Theory', file: '02-spring-boot/theory.md' },
      { id: 'practice', label: 'Practice', file: '02-spring-boot/practice.md' },
      { id: 'assignment', label: 'Assignment', file: '02-spring-boot/assignment.md' },
      { id: 'review', label: 'Review', file: '02-spring-boot/review-checklist.md' },
    ],
  },
  {
    id: 'phase3',
    title: 'Phase 3 DDD / Hexagonal',
    description: '도메인 경계 · 포트/어댑터',
    steps: [
      { id: 'theory', label: 'Theory', file: '03-domain-architecture/theory.md' },
      { id: 'practice', label: 'Practice', file: '03-domain-architecture/practice.md' },
      { id: 'assignment', label: 'Assignment', file: '03-domain-architecture/assignment.md' },
      { id: 'review', label: 'Review', file: '03-domain-architecture/review-checklist.md' },
    ],
  },
  {
    id: 'phase4',
    title: 'Phase 4 Quality / Pattern',
    description: '클린 아키텍처 · 패턴 · 리팩토링',
    steps: [
      { id: 'theory', label: 'Theory', file: '04-quality-patterns/theory.md' },
      { id: 'practice', label: 'Practice', file: '04-quality-patterns/practice.md' },
      { id: 'assignment', label: 'Assignment', file: '04-quality-patterns/assignment.md' },
      { id: 'review', label: 'Review', file: '04-quality-patterns/review-checklist.md' },
    ],
  },
  {
    id: 'phase5',
    title: 'Phase 5 Capstone',
    description: '통합 프로젝트 · 발표 · 운영성 검증',
    steps: [
      { id: 'theory', label: 'Theory', file: '05-capstone/theory.md' },
      { id: 'practice', label: 'Practice', file: '05-capstone/practice.md' },
      { id: 'assignment', label: 'Assignment', file: '05-capstone/assignment.md' },
      { id: 'review', label: 'Review', file: '05-capstone/review-checklist.md' },
    ],
  },
];

function App() {
  const [activeTrackId, setActiveTrackId] = React.useState(learningTracks[0].id);
  const [activeStepId, setActiveStepId] = React.useState(learningTracks[0].steps[0].id);
  const [contentCache, setContentCache] = React.useState({});

  const activeTrack =
    learningTracks.find((track) => track.id === activeTrackId) ?? learningTracks[0];
  const activeStep =
    activeTrack.steps.find((step) => step.id === activeStepId) ?? activeTrack.steps[0];

  React.useEffect(() => {
    setActiveStepId(activeTrack.steps[0].id);
  }, [activeTrackId]);

  React.useEffect(() => {
    if (!activeStep?.file || contentCache[activeStep.file]) return;

    fetch(`/${activeStep.file}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load ${activeStep.file}`);
        }
        return res.text();
      })
      .then((text) => {
        setContentCache((prev) => ({ ...prev, [activeStep.file]: text }));
      })
      .catch(() => {
        setContentCache((prev) => ({
          ...prev,
          [activeStep.file]: `# 문서를 불러오지 못했습니다.\n\n- 경로: ${activeStep.file}`,
        }));
      });
  }, [activeStep, contentCache]);

  const currentContent = contentCache[activeStep.file] ?? '# 문서를 불러오는 중...';

  const renderedMarkdown = React.useMemo(() => {
    marked.setOptions({ breaks: true, gfm: true });
    return marked.parse(currentContent);
  }, [currentContent]);

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">StyleKorean Engineering Academy</p>
          <h1>Backend Onboarding Curriculum</h1>
          <p className="hero-copy">
            챕터별 문서를 한 화면에서 읽고 학습할 수 있습니다.
          </p>
        </div>
      </header>

      <main className="workspace">
        <aside className="track-panel">
          <h2>챕터</h2>
          <div className="track-list">
            {learningTracks.map((track) => (
              <button
                key={track.id}
                className={`track-btn ${track.id === activeTrackId ? 'active' : ''}`}
                onClick={() => setActiveTrackId(track.id)}
              >
                <strong>{track.title}</strong>
                <span>{track.description}</span>
                <em>{track.steps.length} Step{track.steps.length > 1 ? 's' : ''}</em>
              </button>
            ))}
          </div>
        </aside>

        <section className="content-panel">
          <div className="content-head">
            <div>
              <h2>{activeTrack.title}</h2>
              <p>{activeTrack.description}</p>
            </div>
            <div className="step-pills">
              {activeTrack.steps.map((step, idx) => (
                <button
                  key={step.id}
                  className={`step-pill ${step.id === activeStep.id ? 'active' : ''}`}
                  onClick={() => setActiveStepId(step.id)}
                >
                  {idx + 1}. {step.label}
                </button>
              ))}
            </div>
          </div>

          <article className="doc-viewer">
            <div className="doc-meta">
              <span>{activeStep.label}</span>
              <code>{activeStep.file}</code>
            </div>
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderedMarkdown }} />
          </article>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
