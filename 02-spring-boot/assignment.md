# Phase 2 Assignment — 주문/결제 API 안정화 프로젝트 (확장 버전)

## 과제명
"Spring Boot 주문/결제 시스템 안정화 + 조회 성능 고도화"

## 학습 안내
- 이 과제는 Spring Boot 실무 심화 학습 결과를 통합 검증하는 목적입니다.
- `LEARNING_NOTE.md`에 현재 수준과 다음 학습 목표를 명확히 기록합니다.

---

## 비즈니스 시나리오
- 프로모션 시간대 주문 급증
- 결제 실패/중복요청/조회 지연으로 CS 증가

핵심 목표:
- 생성 API 성공률 향상
- 조회 API p95 개선
- 상태 불일치 0건

---

## 필수 구현 요구사항

### A. 주문 생성 API
- `POST /api/orders`
- 입력 검증, 쿠폰 정책, 재고 검증, 주문 생성, 결제 처리
- 상태 전이: `PENDING -> PAID | PAYMENT_FAILED`

### B. 주문 조회 API
- `GET /api/orders?userId={id}`
- `GET /api/orders/{orderId}`
- N+1 개선 전/후 비교표 필수

### C. 트랜잭션/일관성
- 결제 외부 호출 경계 설계
- 실패 시 상태 일관성 보장
- 설계 근거를 ADR에 기록

### D. 운영성
- 구조화 로그(JSON)
- traceId 전파
- 메트릭: 성공률, 실패율, p95, 재시도 횟수

### E. 중복요청 방지
- Idempotency-Key 기반 중복 요청 차단
- 동일 키 재요청 시 동일 결과 보장

---

## 심화 요구사항 (기존보다 확장)
- 예외 계층 분리(비즈니스/시스템)
- 공통 에러 코드 체계 적용
- 페이징 전략 선택 근거(Offset vs Keyset)
- 테스트 데이터 셋(소/중/대) 기반 성능 측정

---

## 테스트 기준
- 총 40개 이상
- 최소 구성
  - 단위 15+
  - 통합 10+
  - API 15+

필수 시나리오:
- 결제 성공/실패/타임아웃
- 재고 부족
- 쿠폰 만료
- 중복 요청(idempotency)
- N+1 개선 검증
- 예외 응답 스키마 검증

---

## 제출물
1. `ADR-001-transaction-boundary.md`
2. `ADR-002-pagination-strategy.md`
3. `TEST_REPORT.md`
4. `PERF_REPORT.md`
5. `API_SPEC.md` (또는 OpenAPI)
6. `LEARNING_NOTE.md`

---

## 평가 기준
- 정확성 25
- 트랜잭션/설계 타당성 25
- 성능 개선 근거 20
- 테스트 품질 20
- 운영성/설명력 10
