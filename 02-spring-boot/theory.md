# Phase 2 Theory — Spring Boot Deep Dive (확장 버전)

이 Phase는 주문/결제 핵심 유스케이스를 Spring Boot로 안정적으로 구현하는 실무형 심화 단계입니다.

---

## 학습 목표 (Foundation 연계)
- Foundation에서 배운 자료구조/알고리즘/Java 기본기를 Spring Boot 계층 설계로 연결한다.
- 트랜잭션 경계, JPA 쿼리, 예외 표준, 관측성(로그/메트릭)을 함께 설계한다.
- 코드가 "동작"하는 수준을 넘어 "운영 가능한 API"까지 완성한다.

---

## 1) 유스케이스 설계: Controller → Application → Domain → Infra

### 1.1 Controller: 입력/출력 경계
```java
@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final PlaceOrderUseCase placeOrderUseCase;

    @PostMapping
    public ResponseEntity<OrderCreateResponse> create(@Valid @RequestBody OrderCreateRequest request) {
        OrderCreateResponse response = placeOrderUseCase.handle(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
```

핵심:
- 검증 실패는 400으로 즉시 종료
- 비즈니스 로직은 Controller에 두지 않음

### 1.2 Application Service: 유스케이스 오케스트레이션
```java
@Service
public class PlaceOrderUseCase {
    private final CouponPolicyService couponPolicyService;
    private final StockService stockService;
    private final OrderRepository orderRepository;
    private final PaymentGateway paymentGateway;

    @Transactional
    public OrderCreateResponse handle(OrderCreateRequest request) {
        couponPolicyService.validate(request.userId(), request.couponCode(), request.totalPrice());
        stockService.check(request.items());

        Order order = Order.pending(request.userId(), request.items());
        orderRepository.save(order);

        PaymentResult result = paymentGateway.request(order.getId(), request.paymentMethod());
        order.applyPaymentResult(result);

        return new OrderCreateResponse(order.getId(), order.getStatus().name());
    }
}
```

---

## 2) 트랜잭션 경계 Deep Dive

### 2.1 기본 원칙
- DB 트랜잭션 안에서 외부 API를 오래 붙잡지 않는다.
- "주문 생성"과 "결제 승인"을 분리할지 ADR로 결정한다.

### 2.2 분리 방식 예시
```java
@Transactional
public Long createPendingOrder(OrderCreateRequest request) {
    // 검증 + PENDING 저장
}

public void approvePayment(Long orderId, PaymentMethod method) {
    // 외부 결제 호출
    // 결과에 따라 별도 트랜잭션에서 상태 전이
}
```

### 2.3 언제 분리하는가
- 결제 API 지연이 길 때
- 실패 재시도가 필요할 때
- "주문 생성 성공 / 결제 미완료" 상태를 명시적으로 다뤄야 할 때

---

## 3) JPA 성능 Deep Dive

### 3.1 N+1 재현
```java
List<Order> orders = orderRepository.findByUserId(userId);
for (Order order : orders) {
    order.getItems().size(); // lazy loading 반복
}
```

### 3.2 fetch join 개선
```java
@Query("select distinct o from Order o join fetch o.items where o.userId = :userId")
List<Order> findByUserIdWithItems(@Param("userId") Long userId);
```

### 3.3 체크 포인트
- fetch join + 페이징 동시 사용 주의
- 벌크 업데이트 후 `clear()`로 영속성 컨텍스트 정리
- keyset pagination 사용 조건 문서화

---

## 4) 예외/에러 응답 표준

### 4.1 공통 에러 포맷
```json
{
  "code": "ORDER-409-001",
  "message": "재고가 부족합니다.",
  "traceId": "tr-abc-123",
  "timestamp": "2026-02-18T10:30:00Z"
}
```

### 4.2 ControllerAdvice 예시
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(OutOfStockException.class)
    public ResponseEntity<ErrorResponse> handleOutOfStock(OutOfStockException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ErrorResponse.of("ORDER-409-001", e.getMessage()));
    }
}
```

---

## 5) 운영성: 로그/메트릭/추적

### 5.1 로그 필수 필드
- `traceId`, `orderId`, `userId`, `paymentProvider`, `status`

### 5.2 메트릭 예시
- `order.create.success.count`
- `order.create.fail.count`
- `payment.request.latency`
- `order.query.p95`

### 5.3 최소 목표
- 실패 원인을 로그 1~2개로 역추적 가능
- p95 지표를 엔드포인트별로 관찰 가능

---

## 6) 테스트 전략 (단위/통합/API)

### 6.1 단위 테스트
- 쿠폰 정책 조합
- 상태 전이 규칙
- 금액 계산/검증 로직

### 6.2 통합 테스트
- 트랜잭션 롤백/커밋
- JPA 쿼리 수 검증
- 리포지토리 + 서비스 연계

### 6.3 API 테스트
- 201/400/409/500 시나리오
- 에러 응답 스키마 검증
- idempotency key 재호출 시나리오

---

## 7) Phase 2 이후 확장 로드
- Outbox/CDC 기반 이벤트 일관성
- 분산 락/사가 패턴
- HikariCP/GC/DB 인덱스 튜닝
- 트래픽 급증 대응(백프레셔/레이트리밋)

---

## 8) 완료 체크리스트
- [ ] 트랜잭션 경계를 코드/ADR로 설명할 수 있다.
- [ ] N+1 개선 전후를 SQL 수치로 비교할 수 있다.
- [ ] 예외 응답을 일관된 코드 체계로 내려줄 수 있다.
- [ ] 로그/메트릭으로 실패 원인을 추적할 수 있다.
- [ ] 다음 단계 확장 주제를 본인 학습 계획으로 연결할 수 있다.
