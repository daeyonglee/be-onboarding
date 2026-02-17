# Phase 4 Practice — 품질/패턴 핸즈온 (상세)

## 실습 1) 프로모션 엔진 Strategy + Factory
### 요구사항
- 전략 종류
  1. 정액 할인
  2. 정률 할인
  3. 회원등급 할인
  4. 카테고리 한정 할인
- `PromotionStrategyFactory`가 입력 조건(국가/채널/회원등급)으로 전략 선택

### 테스트
- 전략 단일 적용 4케이스
- 다중 전략 조합 6케이스
- 우선순위 충돌 3케이스

---

## 실습 2) 결제 플로우 Template Method
### 요구사항
- 공통 단계: validate -> preLog -> execute -> postLog
- 구현체
  - `PaymentAuthorizeTemplate`
  - `PaymentCancelTemplate`
- 실패 훅(`onFailure`) 공통 표준화

### 검증
- 승인/취소 코드 중복 라인 수 비교
- 공통 실패 로그 필드 일관성(traceId/orderId)

---

## 실습 3) 클린코드 리팩토링
### 대상
- 길이 80줄 이상 메서드 1개 선정
- 중첩 if 3단 이상 로직 1개 선정

### 요구사항
- 리팩토링 전 테스트 작성
- 메서드 분해/네이밍 개선/Value Object 도입
- 리팩토링 전후 diff와 의도 설명
