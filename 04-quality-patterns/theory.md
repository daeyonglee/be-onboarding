# Phase 4 Theory — Quality / Pattern Deep Dive (확장 버전)

이 Phase는 복잡한 비즈니스 로직을 패턴과 품질 기준으로 구조화하는 코드 품질 실전 심화 단계입니다.

---

## 학습 목표 (이전 Phase 연계)
- Phase 1~3에서 만든 도메인/유스케이스를 유지보수 가능한 패턴 구조로 개선한다.
- OCP/SRP/DIP를 코드와 테스트로 검증한다.
- 리팩토링을 "감"이 아니라 지표 기반으로 수행한다.

---

## 1) Clean Architecture 품질 규칙
- UseCase/Domain은 Spring/JPA/외부 SDK를 모른다.
- Adapter는 변환/연동만 담당하고 정책 결정은 하지 않는다.
- 경계 위반은 리뷰가 아니라 테스트/정적 룰로 검증한다.

### 레이어 요약
1. Entities
2. UseCases
3. Interface Adapters
4. Frameworks/Drivers

---

## 2) 패턴 적용 Deep Dive (Java)

### 2.1 Strategy
```java
public interface PromotionStrategy {
    boolean supports(PromotionContext context);
    Money apply(Money original, PromotionContext context);
}

public final class PercentageDiscountStrategy implements PromotionStrategy {
    @Override
    public boolean supports(PromotionContext context) {
        return context.promotionType() == PromotionType.PERCENTAGE;
    }

    @Override
    public Money apply(Money original, PromotionContext context) {
        long discount = original.amount() * context.rate() / 100;
        return new Money(original.amount() - discount);
    }
}
```

### 2.2 Factory
```java
public final class PromotionStrategyFactory {
    private final List<PromotionStrategy> strategies;

    public PromotionStrategyFactory(List<PromotionStrategy> strategies) {
        this.strategies = strategies;
    }

    public PromotionStrategy get(PromotionContext context) {
        return strategies.stream()
                .filter(s -> s.supports(context))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No strategy for " + context));
    }
}
```

### 2.3 Template Method
```java
public abstract class PaymentFlowTemplate {
    public final PaymentResult execute(PaymentCommand command) {
        validate(command);
        preLog(command);
        try {
            PaymentResult result = doExecute(command);
            postLog(command, result);
            return result;
        } catch (Exception e) {
            onFailure(command, e);
            throw e;
        }
    }

    protected abstract PaymentResult doExecute(PaymentCommand command);
    protected void validate(PaymentCommand command) {}
    protected void preLog(PaymentCommand command) {}
    protected void postLog(PaymentCommand command, PaymentResult result) {}
    protected void onFailure(PaymentCommand command, Exception e) {}
}
```

### 2.4 Adapter
```java
public interface PaymentPort {
    PaymentResult authorize(PaymentRequest request);
}

public final class PgXPaymentAdapter implements PaymentPort {
    private final PgXClient client;

    @Override
    public PaymentResult authorize(PaymentRequest request) {
        PgXResponse response = client.request(request);
        return PaymentResult.from(response.code(), response.transactionId());
    }
}
```

---

## 3) Clean Code 기준 (구체)
- 메서드 길이: 가능하면 25줄 이하
- 중첩 depth: 3단 초과 시 리팩토링 우선 후보
- 조건 분기: if-else 사다리보다 polymorphism 우선 검토
- 매직 넘버: 상수/정책 객체로 이동
- 이름: 동사+목적어 형태로 의도 명확화

---

## 4) 리팩토링 루프
1. 코드 스멜 식별
2. 보호 테스트 추가
3. 작은 단위 리팩토링
4. 지표 비교(복잡도/중복/커버리지)
5. 회귀 확인

---

## 5) 품질 지표 기준
- 핵심 유스케이스 커버리지: 80%+
- 복잡도 상위 메서드: 20% 이상 개선
- 중복 라인: 30% 이상 감소
- 신규 전략 추가 시 기존 코드 수정 라인 최소화

---

## 6) Phase 4 이후 확장 로드
- 아키텍처 룰 자동검증(ArchUnit/ErrorProne)
- 모듈 분리/패키지 아키텍처 진화
- 팀 단위 리팩토링 표준/거버넌스
- 레거시 마이그레이션 전략 수립

---

## 7) 완료 체크리스트
- [ ] Strategy/Factory/Template/Adapter를 문제에 맞게 선택할 수 있다.
- [ ] 경계 위반 없는 의존성 구조를 유지할 수 있다.
- [ ] 리팩토링 전후 지표로 개선을 증명할 수 있다.
- [ ] 코드 품질 기준을 팀 룰로 문서화할 수 있다.
- [ ] 다음 단계 확장 주제를 본인 학습 계획으로 연결할 수 있다.
