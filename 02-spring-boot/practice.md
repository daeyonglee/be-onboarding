# Phase 2 Practice — Spring Boot 실습 가이드 (확장 버전)

## 실습 운영 기준
- Java 17, Spring Boot 3.x
- 테스트: JUnit 5 + Spring Boot Test
- 목표: 기능 구현 + 성능/운영 관점 검증

---

## 실습 1) 주문 생성 API 기본 유스케이스

### 구현 대상
- `POST /api/orders`
- 입력 검증, 쿠폰 검증, 재고 확인, 주문 생성

### 요구사항
- 성공: 201 + orderId
- 실패: 공통 에러 포맷
- 테스트: 성공/재고부족/쿠폰만료/입력오류

---

## 실습 2) 트랜잭션 경계 분리

### 목표
- 결제 외부 호출을 분리한 버전과 통합 버전 비교

### 해야 할 일
- `@Transactional` 범위 2가지 구현
- 각 방식의 장단점을 `ADR-001.md`로 정리
- 장애 상황(결제 timeout) 시 상태 일관성 확인

---

## 실습 3) N+1 재현 및 개선

### 구현 대상
- `GET /api/orders?userId={id}`
- `GET /api/orders/{id}`

### 요구사항
- N+1 발생 버전 먼저 구현
- fetch join 또는 EntityGraph로 개선
- SQL 수/응답시간 비교표 작성

---

## 실습 4) 에러 표준 + GlobalExceptionHandler

### 구현 대상
- 에러 코드 규칙: `ORDER-xxx-yyy`
- `@RestControllerAdvice` 기반 통합 처리

### 필수 테스트
- 400/404/409/500 응답 구조 검증
- traceId 포함 여부 검증

---

## 실습 5) Idempotency Key 처리

### 목표
- 동일 요청 중복 호출 시 주문 중복 생성 방지

### 요구사항
- `Idempotency-Key` 헤더 저장/검증
- 중복 호출 시 동일 결과 반환
- 동시성 테스트 2개 이상

---

## 실습 6) 메트릭/로그 관측성

### 구현 대상
- 구조화 로그(JSON)
- endpoint별 latency timer

### 요구사항
- 로그 필드 표준화: traceId, orderId, userId, status
- p95 계산 기준 문서화

---

## 실습 7) 테스트 계층 분리

### 목표
- 단위/통합/API 테스트를 역할별로 분리

### 요구사항
- 단위 15개 이상
- 통합 10개 이상
- API 15개 이상
- 총 테스트 40개 이상

---

## 실습 8) 성능 회고
- 병목 3개 식별
- 개선 우선순위 1~3위 제시
- 다음 스프린트 액션 아이템 작성

---

## 제출물
- `PRACTICE_RESULT.md`
- `ADR-001.md`
- `SQL_COMPARE.md`
- 테스트 코드 + 실행 결과
