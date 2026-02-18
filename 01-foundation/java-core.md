# Part 3 — Java 기본기 (Java Core)

## 0) 처음 배우는 사람을 위한 시작 안내
Java 기본기는 문법 암기가 아니라, "안전하고 읽기 쉬운 코드를 만드는 습관"입니다.
이 파트에서는 실무에서 자주 깨지는 부분(예외, null, 중복 이벤트, 로그)을 중심으로 학습합니다.

---

## 1) 학습 목표
- `record`, `enum`, Value Object를 올바르게 사용할 수 있다.
- 예외를 비즈니스/시스템으로 나눠 처리할 수 있다.
- 로그 표준을 적용하고, 테스트 가능한 코드를 작성할 수 있다.

---

## 2) 핵심 개념 설명 (입문용)

### record
- 데이터를 담는 불변 객체를 간결하게 작성
- DTO/이벤트 모델에 적합

### enum
- 허용 가능한 상태/타입을 제한
- 오타 문자열로 인한 버그를 줄임

### Value Object
- 금액/수량처럼 의미 있는 값을 타입으로 표현
- primitive obsession(원시 타입 남용) 방지

### Optional
- null 방지를 위한 반환 타입에서 주로 사용
- 필드 타입으로 남용하면 오히려 복잡도 증가

### 예외 분리
- 비즈니스 예외: 사용자나 도메인 규칙 문제
- 시스템 예외: DB/네트워크/외부 API 장애

### 로그 표준
- 운영 디버깅을 위해 키를 일관되게 남겨야 함
- 필수 예: traceId, eventId, sku, type

---

## 3) 따라하기 코드

### 3.1 record + enum
```java
public record StockEvent(String eventId, EventType type, String sku, int qty) {}

public enum EventType {
    ORDER_CREATED,
    ORDER_CANCELLED
}
```

### 3.2 Value Object
```java
public record Quantity(int value) {
    public Quantity {
        if (value < 0) throw new IllegalArgumentException("Quantity must be >= 0");
    }
}
```

### 3.3 예외 계층
```java
public class BusinessException extends RuntimeException {
    public BusinessException(String message) { super(message); }
}

public class SystemException extends RuntimeException {
    public SystemException(String message, Throwable cause) { super(message, cause); }
}
```

### 3.4 멱등성 + 로그
```java
public void apply(StockEvent event) {
    if (processedEventIds.contains(event.eventId())) {
        return;
    }
    log.info("stock_event traceId={} eventId={} sku={} type={}", traceId, event.eventId(), event.sku(), event.type());
    // business logic
}
```

---

## 4) 파트 미니 과제 (Java Core)

## 과제명
"안전한 Java 도메인 코드 표준화"

### 구현 요구사항
1. 도메인 모델
- `record`, `enum`, VO 최소 3개 도입

2. 예외/응답
- 비즈니스/시스템 예외 분리
- 공통 에러 응답 포맷 정의

3. 로그 표준
- 핵심 흐름에 traceId/eventId/sku/type 적용

4. 리팩토링
- 80줄 이상 메서드 1개 분해
- 매직 넘버 상수화

### 필수 테스트
- VO 유효성 검증
- 예외 분리 동작
- 중복 이벤트 무해 처리
- 로그 필드 누락 방지(검증 로직 또는 테스트)

### 제출물
- `JAVA_GUIDELINE.md`
- `JAVA_TEST_REPORT.md`
- `REFACTORING_NOTE.md`

### 평가 기준
- 정확성 35
- 모델링/예외 설계 30
- 테스트 품질 25
- 설명력 10
