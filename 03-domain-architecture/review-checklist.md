# Phase 3 Review Checklist (상세)

## 1) 도메인 모델
- [ ] Aggregate 경계가 비즈니스 불변식과 일치하는가?
- [ ] Value Object가 primitive obsession을 줄이고 있는가?
- [ ] 도메인 이벤트 명명/페이로드가 일관적인가?

## 2) 아키텍처
- [ ] Port/Adapter 분리가 명확한가?
- [ ] Domain이 프레임워크 의존성 없이 유지되는가?
- [ ] Adapter 교체 시 Domain 변경이 발생하지 않는가?

## 3) 트랜잭션/실패 대응
- [ ] 결제 실패 시 보상 로직이 정의되어 있는가?
- [ ] 멱등 처리(eventId)가 실제 코드에 반영되었는가?
- [ ] DLQ/재시도 정책이 수치로 명시되었는가?

## 4) 테스트
- [ ] Aggregate 단위 테스트로 불변식 검증했는가?
- [ ] Port Contract Test가 있는가?
- [ ] 실패 시나리오(외부 API timeout 등)를 검증했는가?

## 5) 문서/커뮤니케이션
- [ ] Context Map과 Sequence Diagram이 최신 코드와 일치하는가?
- [ ] ADR에 대안 비교 및 트레이드오프가 있는가?
- [ ] 운영 추적 키(traceId/eventId/orderId)가 문서와 코드에서 일관적인가?
