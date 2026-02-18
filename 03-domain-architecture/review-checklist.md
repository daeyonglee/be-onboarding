# Phase 3 Review Checklist — DDD/Hexagonal 확장 점검표

## 0) 학습 범위 인식
- [ ] 현재 역량과 다음 단계 목표를 문서로 분리했는가?

## 1) 도메인 모델
- [ ] Aggregate 경계가 불변식과 일치하는가?
- [ ] Value Object가 primitive obsession을 줄이는가?
- [ ] 상태 전이 규칙이 Aggregate 내부에 캡슐화됐는가?

## 2) 이벤트 모델
- [ ] 이벤트 명명이 과거형으로 일관적인가?
- [ ] eventId/traceId/occurredAt/version이 포함되는가?
- [ ] 중복/순서 뒤집힘 시나리오를 고려했는가?

## 3) 아키텍처
- [ ] Port/Adapter 분리가 명확한가?
- [ ] Domain이 프레임워크 의존성 없이 유지되는가?
- [ ] Adapter 교체 시 Domain 변경이 없는가?
- [ ] ACL(anti-corruption layer) 필요 지점이 정의됐는가?

## 4) 실패/보상
- [ ] 결제 실패 보상 로직이 정의되어 있는가?
- [ ] 재시도/중단/DLQ 기준이 수치로 명시되어 있는가?
- [ ] timeout/partial failure 대응이 코드/문서에 반영됐는가?

## 5) 테스트
- [ ] 테스트 총 35개 이상인가?
- [ ] Aggregate 불변식 테스트가 충분한가?
- [ ] Port Contract 테스트가 있는가?
- [ ] 장애 시나리오 테스트가 있는가?

## 6) 문서/커뮤니케이션
- [ ] Context Map이 최신 코드와 일치하는가?
- [ ] Sequence(정상/실패) 두 장이 있는가?
- [ ] ADR 3건에 대안 비교가 포함되는가?
- [ ] 운영 추적 키(traceId/eventId/orderId)가 일관적인가?

## 7) 회고
- [ ] 아키텍처 부채 3개를 식별했는가?
- [ ] 4주 개선 계획이 현실적인가?
- [ ] 팀 공유 가능한 요약을 작성했는가?
