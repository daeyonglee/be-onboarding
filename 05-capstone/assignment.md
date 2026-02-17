# Phase 5 Assignment — Capstone 프로젝트

## 과제명
**"StyleKorean 주문-결제-재고 핵심 플로우 개선"**

## 팀 구성
- 2~4인 1팀
- 역할 권장
  - Domain Lead
  - API/Infra Lead
  - Test/Quality Lead
  - Observability Lead

## 프로젝트 범위
### 필수 유스케이스
1. 주문 생성 + 결제 승인
2. 결제 실패 + 보상 처리
3. 재고 예약/복원 + 멱등 처리

### 필수 비기능 요구사항
- 성능: p95, p99 지표 측정
- 안정성: 실패 재시도 + DLQ
- 운영성: traceId end-to-end 추적

---

## 상세 요구사항

### A. 기능
- `POST /orders`
- `POST /payments/{orderId}/retry`
- `GET /orders/{orderId}`
- 주문 상태 전이 규칙 문서화

### B. 아키텍처
- DDD + Hexagonal 원칙 적용
- Port/Adapter 구조
- 최소 2개 ADR 제출

### C. 테스트
- 단위 테스트 + 통합 테스트 + API 테스트
- 장애 주입 테스트 2개 이상
- 성능 테스트 시나리오 1개 이상

### D. 운영
- 구조화 로그(JSON)
- 핵심 지표: success rate, p95 latency, retry count, DLQ count
- 알람 기준 명시

---

## 제출물
1. 코드 저장소
2. `README.md` (실행/테스트 방법)
3. `ARCHITECTURE.md`
4. `ADR-001.md`, `ADR-002.md`
5. `TEST_REPORT.md`
6. `PERF_REPORT.md`
7. `OPS_RUNBOOK.md`
8. 발표 자료(10~15장)

## 평가 기준 (100)
- 기능 정확성 25
- 아키텍처/설계 25
- 테스트/품질 20
- 성능/운영 20
- 발표/설명력 10

## 가점(+10)
- 카나리 릴리즈 또는 feature flag 전략 제시
- 장애 복구 자동화 스크립트 제공
