# Phase 3 Theory — DDD + Hexagonal Architecture (구체화)

## 학습 목표 (3주)
- 주문/결제/재고 도메인의 **경계(Bounded Context)** 를 명확히 나눈다.
- Aggregate/Entity/Value Object를 실무 시나리오에 맞게 설계한다.
- Hexagonal Architecture(Port/Adapter)로 외부 의존성을 분리한다.

## Week 1 — DDD Modeling
1. Ubiquitous Language 정리 (Order, Payment, Reservation, Fulfillment)
2. Aggregate 경계 설정 (Order Aggregate, Inventory Aggregate)
3. 도메인 이벤트 정의 (OrderPlaced, PaymentFailed, StockReserved)

## Week 2 — Hexagonal 전환
1. UseCase Port / Repository Port / External Port 정의
2. Adapter 구현 (PaymentProviderAdapter, InventoryAdapter)
3. 의존성 방향 검증 (Domain <- Application <- Adapter)

## Week 3 — 운영/확장
1. 장애 시나리오(결제 지연, 이벤트 중복, 외부 시스템 타임아웃)
2. Saga/보상 트랜잭션 전략 개요
3. ADR 작성 및 아키텍처 리뷰

---

## 1) Bounded Context 설계 예시 (StyleKorean)
- Catalog Context: 상품/카테고리/검색
- Order Context: 주문 생성/상태 전이
- Payment Context: 결제 승인/취소/실패 처리
- Inventory Context: 재고 예약/차감/복원

### 컨텍스트 매핑 규칙
- Payment는 Order의 내부 구현이 아니라 **별도 컨텍스트**로 취급
- Context 간 통신은 이벤트/명시적 API 계약 기반
- 공통 필드라도 의미가 다르면 별도 모델 유지

---

## 2) Aggregate 설계 기준

### Order Aggregate
- 루트: `Order`
- 구성: `OrderLine`, `OrderStatus`, `Money(totalAmount)`
- 불변식
  1. 주문 라인은 1개 이상
  2. 총액은 0 이상
  3. PAID 이후에는 임의 수정 불가

### Inventory Aggregate
- 루트: `StockItem`
- 불변식
  1. 가용 재고는 음수 불가
  2. 예약/확정/복원 이벤트는 멱등 처리

---

## 3) Domain Event 설계

### 핵심 이벤트
- `OrderPlaced(orderId, userId, amount)`
- `PaymentAuthorized(orderId, paymentId)`
- `PaymentFailed(orderId, reason)`
- `StockReserved(orderId, sku, qty)`

### 이벤트 설계 원칙
- 과거형 명명 사용 (`Placed`, `Failed`, `Reserved`)
- 이벤트 페이로드에 추적 키 포함 (`traceId`, `eventId`, `occurredAt`)
- 재처리 대비 멱등 키 정의

---

## 4) Hexagonal 구조 템플릿

### Port
- `PlaceOrderUseCase`
- `LoadOrderPort`
- `SaveOrderPort`
- `RequestPaymentPort`
- `ReserveStockPort`

### Adapter
- Inbound: REST Controller, Batch Job
- Outbound: JPA Repository Adapter, Payment API Adapter, Message Broker Adapter

### 의존성 규칙
- Domain은 Spring/JPA/HTTP 라이브러리를 모른다.
- Adapter 교체 시 Domain 코드 변경이 없어야 한다.

---

## 5) 실패 시나리오 대응
- 결제 승인 실패: Order 상태 `PAYMENT_FAILED` + 재시도 정책
- 재고 예약 실패: 주문 상태 `FAILED` + 사용자 메시지 표준화
- 이벤트 중복 수신: processed_event 테이블 기반 멱등 처리

## 6) 성공 기준
- [ ] Context/Aggregate 경계를 다이어그램으로 설명 가능
- [ ] Port/Adapter 분리 이유를 코드 레벨로 설명 가능
- [ ] 결제사 교체 요구사항을 Domain 수정 없이 대응 가능
