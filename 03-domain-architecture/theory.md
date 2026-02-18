# Phase 3 Theory — DDD + Hexagonal Deep Dive (확장 버전)

이 Phase는 도메인 경계, Aggregate, Port/Adapter를 실무 유스케이스에 적용하는 아키텍처 심화 단계입니다.

---

## 학습 목표 (Foundation/Phase2 연계)
- Foundation의 모델링 사고 + Spring Boot 유스케이스를 DDD 구조로 승격한다.
- 트랜잭션, 이벤트, 외부 연동을 Port/Adapter로 분리해 변경 비용을 낮춘다.
- 장애 시나리오를 구조 설계에서부터 흡수한다.

---

## 1) Bounded Context 설계

### 1.1 예시 컨텍스트
- `Order Context`: 주문 생성/상태 전이
- `Payment Context`: 승인/취소/실패
- `Inventory Context`: 예약/차감/복원
- `Catalog Context`: 상품/카테고리/검색

### 1.2 규칙
- Context 간 공통 필드는 "같은 의미"일 때만 공유
- 통신은 명시적 API 또는 이벤트 계약으로만 수행
- 내부 모델을 타 Context에 직접 노출하지 않음

---

## 2) Aggregate 설계 Deep Dive

### 2.1 Order Aggregate
```java
public class Order {
    private final OrderId id;
    private final List<OrderLine> lines;
    private OrderStatus status;
    private final Money totalAmount;

    public Order(OrderId id, List<OrderLine> lines, Money totalAmount) {
        if (lines == null || lines.isEmpty()) throw new DomainException("Order line must exist");
        if (totalAmount.isNegative()) throw new DomainException("Total amount must be >= 0");
        this.id = id;
        this.lines = List.copyOf(lines);
        this.totalAmount = totalAmount;
        this.status = OrderStatus.PENDING;
    }

    public void markPaid() {
        if (status != OrderStatus.PENDING) throw new DomainException("Only PENDING can be paid");
        this.status = OrderStatus.PAID;
    }

    public void markPaymentFailed() {
        if (status != OrderStatus.PENDING) throw new DomainException("Only PENDING can fail");
        this.status = OrderStatus.PAYMENT_FAILED;
    }
}
```

핵심:
- 상태 전이는 Aggregate 안에서만 허용
- 불변식은 생성자/행위 메서드에서 강제

### 2.2 Value Object 예시
```java
public record Money(long amount) {
    public Money {
        if (amount < 0) throw new IllegalArgumentException("amount must be >= 0");
    }

    public boolean isNegative() {
        return amount < 0;
    }
}
```

---

## 3) Domain Event 설계

### 3.1 이벤트 모델
```java
public record OrderPlacedEvent(
        String eventId,
        String traceId,
        Long orderId,
        Long userId,
        long totalAmount,
        Instant occurredAt
) {}
```

### 3.2 원칙
- 과거형 명명 (`Placed`, `Failed`, `Reserved`)
- 재처리 가능한 최소 키 포함 (`eventId`, `occurredAt`)
- 버전 전략 필수 (`eventType`, `version` 권장)

---

## 4) Hexagonal 구조

### 4.1 Port 예시
```java
public interface PlaceOrderUseCase {
    OrderResult place(PlaceOrderCommand command);
}

public interface RequestPaymentPort {
    PaymentResult request(Long orderId, Money amount);
}

public interface SaveOrderPort {
    void save(Order order);
}
```

### 4.2 Adapter 예시
- Inbound: REST Controller, Kafka Consumer
- Outbound: JPA Adapter, Payment API Adapter, Message Adapter

### 4.3 의존성 규칙
- Domain은 Spring/JPA/HTTP를 모른다.
- Adapter는 Domain 인터페이스를 구현한다.
- Adapter 교체 시 Domain 변경이 없어야 한다.

---

## 5) 실패/복구 시나리오

### 5.1 결제 실패
- Order 상태를 `PAYMENT_FAILED`로 전이
- 재시도 정책과 중단 기준 분리

### 5.2 이벤트 중복
- `processed_event`(eventId)로 멱등 처리

### 5.3 타임아웃
- 외부 호출 실패를 시스템 예외로 분리
- 재시도 후 DLQ/보상 로직으로 전환

---

## 6) 테스트 전략
- Aggregate 테스트: 불변식/상태 전이
- Port Contract 테스트: adapter 교체 안전성
- 장애 시나리오 테스트: timeout, duplicate, partial failure

---

## 7) Phase 3 이후 확장 로드
- Saga orchestrator/choreography 비교
- Event sourcing/CQRS 적용 판단
- 조직 단위 bounded context 재편 전략
- 스키마 진화/버전 호환성 자동 검증

---

## 8) 완료 체크리스트
- [ ] Bounded Context 경계를 이유와 함께 설명할 수 있다.
- [ ] Aggregate 불변식을 코드로 강제할 수 있다.
- [ ] Port/Adapter 분리로 외부 의존성 교체가 가능하다.
- [ ] 장애/중복/타임아웃 시나리오를 설계에 반영했다.
- [ ] 다음 단계 확장 주제를 본인 학습 계획으로 연결할 수 있다.
