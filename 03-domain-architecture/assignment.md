# Phase 3 Assignment — 주문/결제/재고 도메인 경계 재설계

## 과제명
**"Monolith Service를 DDD + Hexagonal 구조로 재구성"**

## 현재 문제
- 주문 서비스 내부에 결제/재고/알림 로직이 강결합
- 결제사 변경 시 주문 서비스 대규모 수정 발생
- 장애 시 원인 파악 어려움(로그/이벤트 추적 부재)

## 목표
- 경계 분리: Order, Payment, Inventory
- 결제사 교체 비용 최소화(Adapter 교체)
- 장애 추적 가능성 확보(traceId/eventId)

---

## 필수 요구사항

### A. 도메인 모델
- 최소 Aggregate 2개(Order, Inventory)
- Value Object 2개 이상(Money, Quantity 등)
- 도메인 이벤트 3개 이상 정의

### B. 아키텍처
- Inbound/Outbound Port 정의
- Adapter 2종 이상 구현(예: Mock/External)
- 의존성 규칙 문서화

### C. 실패/복구 전략
- 결제 실패 보상 흐름
- 이벤트 중복 처리 전략
- 재시도/중단/DLQ 기준

### D. 문서화
- Context Map 1장
- 시퀀스 다이어그램 1장(주문 생성~결제 실패)
- ADR 2건
  1. Aggregate 경계 결정
  2. Port/Adapter 전략 결정

---

## 제출물
1. 코드
2. `CONTEXT_MAP.md`
3. `SEQUENCE_ORDER_PAYMENT.md`
4. `ADR-001-aggregate-boundary.md`
5. `ADR-002-port-adapter-strategy.md`
6. `TEST_REPORT.md`

## 평가 기준 (100)
- 도메인 모델링 정확성 30
- 아키텍처 분리도 30
- 실패 대응 설계 20
- 테스트/문서 품질 20

## 보너스(+10)
- Contract Test(Port 기준) 도입
- 이벤트 스키마 버전 관리 전략 제시
