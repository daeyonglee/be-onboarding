# Phase 3 Practice — DDD/Hexagonal 핸즈온 (상세)

## 실습 1) 주문 Aggregate 재설계
### 목표
기존 CRUD 중심 주문 로직을 Aggregate 중심으로 전환한다.

### 요구사항
1. `Order` Aggregate Root 도입
2. 상태 전이 메서드 명시 (`markPaid`, `markPaymentFailed`, `cancel`)
3. 불변식 위반 시 도메인 예외 발생

### 테스트
- 정상 주문 생성
- 결제 실패 후 취소 가능 여부
- PAID 상태에서 라인 수정 시 예외

---

## 실습 2) Port/Adapter 분리
### 목표
외부 결제사 연동 코드를 Domain/Application에서 분리한다.

### 요구사항
- `RequestPaymentPort` 정의
- Adapter A: MockPaymentAdapter
- Adapter B: FailingPaymentAdapter
- 설정만 바꿔 Adapter 교체 가능해야 함

### 검증 포인트
- 도메인 계층 import에 인프라 의존성 없는지 확인
- Adapter 교체 시 테스트 통과

---

## 실습 3) 이벤트 기반 재고 처리
### 목표
OrderPlaced 이벤트를 소비해 재고 예약 프로세스를 분리한다.

### 요구사항
- 이벤트 스키마 정의(`eventId`, `traceId`, `orderId`, `items`)
- 재처리/중복 수신 대비 멱등 처리
- 실패 시 DLQ 라우팅

### 테스트
- 중복 이벤트 수신
- 부분 실패 후 재처리
- DLQ 이동 조건 검증
