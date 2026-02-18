# Phase 3 Assignment — DDD + Hexagonal 재설계 프로젝트 (확장 버전)

## 과제명
"Monolith 주문 서비스의 도메인 경계 재설계 + Port/Adapter 전환"

## 학습 안내
- 이 과제는 DDD/Hexagonal 실무 심화 학습 결과를 통합 검증하는 목적입니다.
- `LEARNING_NOTE.md`에 현재 수준과 다음 학습 목표를 명확히 기록합니다.

---

## 현재 문제
- 주문 서비스에 결제/재고/알림 로직이 강결합
- 결제사 변경 시 주문 코드 대규모 수정 발생
- 장애 원인 추적이 어려움(traceId/eventId 부족)

---

## 필수 구현 요구사항

### A. 도메인 모델
- Aggregate 최소 2개 (`Order`, `Inventory`)
- Value Object 최소 3개 (`Money`, `Quantity`, `OrderId` 등)
- 도메인 이벤트 최소 4개 정의

### B. 아키텍처
- Inbound/Outbound Port 정의
- Adapter 최소 3종 구현 (mock/external/failing)
- Domain 계층 프레임워크 의존성 0 유지

### C. 실패/복구
- 결제 실패 보상 흐름
- 이벤트 멱등 처리
- 재시도/중단/DLQ 기준 수치화

### D. 관측성
- traceId/eventId/orderId 로그 표준화
- 실패 시나리오별 로그 키 문서화

### E. 문서화
- Context Map 1장
- Sequence Diagram 2장(정상/실패)
- ADR 3건
  1. Aggregate 경계
  2. Port/Adapter 전략
  3. 실패/보상 정책

---

## 심화 요구사항 (기존보다 확장)
- Contract Test 도입
- 이벤트 스키마 버전 전략 정의
- Context 간 Anti-Corruption Layer 설계 예시
- 도메인 용어 사전(UL) 20개 이상 정리

---

## 테스트 기준
- 총 35개 이상
- 필수 포함
  - Aggregate 불변식
  - 상태 전이
  - Adapter 교체 계약 테스트
  - 이벤트 중복/순서 뒤집힘
  - 결제 timeout/partial failure

---

## 제출물
1. 코드
2. `CONTEXT_MAP.md`
3. `SEQUENCE_OK.md`
4. `SEQUENCE_FAIL.md`
5. `ADR-001-aggregate-boundary.md`
6. `ADR-002-port-adapter-strategy.md`
7. `ADR-003-failure-compensation.md`
8. `TEST_REPORT.md`
9. `LEARNING_NOTE.md`

---

## 평가 기준
- 도메인 모델링 정확성 25
- 아키텍처 분리도 25
- 실패 대응 설계 20
- 테스트 품질 20
- 문서/설명력 10
