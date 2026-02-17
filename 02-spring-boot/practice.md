# Phase 2 Practice — Spring Boot 핸즈온 (상세)

## 실습 1) 주문 생성 트랜잭션 경계 설계
### 요구사항
- API: `POST /api/orders`
- 입력: 상품목록, 쿠폰코드, 결제수단
- 처리:
  1. coupon validate
  2. stock check
  3. order persist(PENDING)
  4. payment request
  5. state update(PAID/FAILED)

### 산출물
- 시퀀스 다이어그램 1장
- 트랜잭션 경계 설명 1페이지

### 테스트
- 결제 성공
- 결제 실패
- 쿠폰 만료
- 재고 부족

---

## 실습 2) 주문 조회 N+1 개선
### 요구사항
- API: `GET /api/orders`, `GET /api/orders/{id}`
- 최초 구현: N+1 발생 버전
- 개선 구현: fetch join/entity graph 적용

### 측정 항목
- SQL 실행 횟수
- p95 응답 시간
- 페이징 1/10/100페이지 비교

---

## 실습 3) 쿠폰 정책 모듈화
### 요구사항
- 정책: 만료일, 최소금액, 회원등급, 채널 제한
- 정책 충돌 시 우선순위 정의
- Strategy 패턴 또는 Rule 객체로 확장 가능 구조

### 테스트
- 정책 단독 4개
- 정책 조합 6개 이상
- 실패 메시지 정합성 검증
