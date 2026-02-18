# Phase 3 Practice — DDD/Hexagonal 실습 가이드 (확장 버전)

## 실습 운영 기준
- Java 17
- 목표: 도메인 모델 정확성 + 의존성 분리 + 장애 대응
- 테스트: 단위/계약/통합 혼합

---

## 실습 1) Order Aggregate 모델링

### 구현 목표
- `Order` Aggregate Root 작성
- 상태 전이 메서드 정의: `markPaid`, `markPaymentFailed`, `cancel`
- 불변식 위반 시 도메인 예외

### 테스트
- 정상 생성
- 잘못된 상태 전이 예외
- 라인 없는 주문 생성 차단

---

## 실습 2) Value Object 도입

### 구현 목표
- `Money`, `Quantity`, `OrderId` VO 작성
- primitive obsession 제거

### 테스트
- 음수 금액/수량 차단
- 동등성/불변성 검증

---

## 실습 3) Port/Adapter 분리

### 구현 목표
- `RequestPaymentPort`, `SaveOrderPort`, `LoadOrderPort` 정의
- Adapter 2종 구현: `MockPaymentAdapter`, `FailingPaymentAdapter`

### 검증
- 설정 교체만으로 결제 어댑터 변경
- 도메인 코드에 infra import 없음

---

## 실습 4) Domain Event 발행

### 구현 목표
- `OrderPlaced`, `PaymentFailed`, `StockReserved` 이벤트 정의
- 이벤트 공통 필드: `eventId`, `traceId`, `occurredAt`, `version`

### 테스트
- 이벤트 페이로드 스키마 검증
- 버전 필드 누락 방지 테스트

---

## 실습 5) 이벤트 소비 멱등 처리

### 구현 목표
- processed_event 저장소 기반 중복 차단
- 동일 eventId 재수신 시 무해 처리

### 테스트
- 동일 이벤트 2회 수신
- 순서 뒤집힘(out-of-order) 시 처리 전략 검증

---

## 실습 6) 실패/보상 흐름 설계

### 구현 목표
- 결제 실패 시 보상 로직(재고 복원/주문 실패 전이)
- 재시도 3회 + DLQ

### 테스트
- 결제 timeout
- 부분 실패(partial failure)
- DLQ 이동 조건

---

## 실습 7) Contract Test

### 구현 목표
- Port 기준 계약 테스트 작성
- Adapter 교체 시 동일 계약 충족 여부 확인

### 요구사항
- Adapter 최소 3종 테스트
- 실패 메시지 표준 일치 검증

---

## 실습 8) 아키텍처 문서화
- Context Map 작성
- Sequence Diagram 2개(정상/실패)
- ADR 3건 작성

---

## 제출물
- `PRACTICE_RESULT.md`
- `CONTEXT_MAP.md`
- `SEQUENCE_OK.md`, `SEQUENCE_FAIL.md`
- `ADR-001.md`, `ADR-002.md`, `ADR-003.md`
- 테스트 코드 + 결과
- 테스트 총 35개 이상
