# Phase 4 Theory — Design Pattern + Clean Architecture + Clean Code

## 학습 목표 (2주)
- 유스케이스 중심으로 계층을 재정렬하고 프레임워크 의존성을 줄인다.
- Strategy/Factory/Template Method/Adapter 패턴을 도메인 문제에 적용한다.
- 리팩토링 기준(가독성/응집도/테스트 안정성)을 팀 표준으로 정한다.

## Week 1
1. Clean Architecture 핵심(UseCase, Interface Adapter, Framework)
2. 의존성 역전과 경계 규칙
3. Strategy/Factory 패턴 실습

## Week 2
1. Template Method/Adapter 패턴 실습
2. 클린코드 리팩토링 루프(냄새 탐지 → 테스트 보호 → 개선)
3. 코드리뷰 기준 정렬

---

## 1) Clean Architecture 실전 규칙
- 엔티티/유스케이스는 Spring, DB, 외부 SDK를 모른다.
- Controller는 요청/응답 변환만 하고 유스케이스 호출만 담당한다.
- 데이터베이스 변경이 유스케이스 코드에 영향 최소화되도록 경계 유지.

### 레이어 예시
1. Entities (Order, PromotionPolicy)
2. UseCases (ApplyPromotion, PlaceOrder)
3. Interface Adapters (Controller, Presenter, Gateway Adapter)
4. Frameworks (Spring MVC, JPA, Kafka)

---

## 2) 패턴 적용 가이드 (eCommerce)

### Strategy
- 문제: 쿠폰/프로모션 계산 로직이 if-else로 비대해짐
- 해결: `PromotionStrategy` 인터페이스 + 조건별 구현체

### Factory
- 문제: 채널/국가별 프로모션 전략 선택 로직 산재
- 해결: `PromotionStrategyFactory`에서 조합 생성

### Template Method
- 문제: 결제 승인/취소 플로우가 유사하지만 일부 단계만 다름
- 해결: 공통 흐름 추상화 + 단계별 훅 구현

### Adapter
- 문제: 결제사 API 스펙 변경 시 도메인 영향 큼
- 해결: Provider별 Adapter로 외부 계약 캡슐화

---

## 3) Clean Code 체크 포인트
- 함수는 한 가지 책임만 수행(10~20줄 권장)
- 이름은 도메인 의도 표현(`applyMemberTierDiscount`)
- Primitive obsession 제거(Value Object 사용)
- 매직넘버 금지(정책 상수/설정화)

## 4) 리팩토링 우선순위
1. 중복 제거
2. 조건문 단순화
3. 긴 메서드 분해
4. 테스트 가능성 향상(의존성 주입)

## 5) 성공 기준
- [ ] 프로모션 엔진을 Strategy+Factory로 분리 가능
- [ ] 결제 플로우 공통화에 Template Method 적용 가능
- [ ] 리팩토링 전/후 가독성/테스트 안정성 비교 가능
