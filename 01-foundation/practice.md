# Phase 1 Practice — 핸즈온 실습 (상세)

## 실습 공통 조건
- 언어: Java 17
- 제출: `README + 코드 + 테스트 + 측정결과`
- 테스트 최소 기준: 각 실습당 5개 이상(정상/경계/실패 포함)

---

## 실습 1) Top-K 상품 랭킹
### 목표
대량 데이터(최대 100만 건)에서 Top-K를 안정적으로 계산한다.

### 입력 스펙
```json
{
  "k": 100,
  "items": [
    {"productId": 101, "sales": 300, "views": 5000, "conversionRate": 0.12}
  ]
}
```

### 구현 요구사항
1. `score = sales*0.6 + views*0.2 + conversionRate*1000*0.2`
2. Min-Heap으로 K개 유지
3. 동점 처리: `score DESC`, `productId ASC`

### 테스트 케이스
- k=1, k=n, k>n
- 동점 다수
- 빈 입력
- 음수/이상치 데이터 필터링

### 성능 목표
- 100만 건 기준 2초 내(로컬 기준) 처리 시도
- 전체 정렬 방식 대비 실행시간 비교표 작성

---

## 실습 2) 카테고리 하위 트리 조회
### 목표
DFS/BFS를 모두 구현하고 요구사항별 적합성을 비교한다.

### 입력 예시
```text
1(Beauty)
 ├─ 2(Skincare)
 │   ├─ 4(Cream)
 │   └─ 5(Toner)
 └─ 3(Makeup)
```

### 구현 요구사항
1. DFS(재귀 or 스택), BFS(큐) 모두 구현
2. `collectDescendants(rootId)` 공통 인터페이스 제공
3. 순환 참조 감지 시 `CycleDetectedException`

### 테스트 케이스
- 깊이 1 / 깊이 10+
- 루트 없음
- 사이클 존재(2->4->2)

---

## 실습 3) 재고 이벤트 큐 소비자
### 목표
중복 이벤트/실패 재시도에서도 재고 정합성을 유지한다.

### 이벤트 스펙
```json
{
  "eventId": "evt-20260217-1001",
  "type": "ORDER_CREATED",
  "orderId": "ord-1001",
  "sku": "SKU-AAA",
  "qty": 2,
  "occurredAt": "2026-02-17T09:00:00Z"
}
```

### 구현 요구사항
1. `processed_event` 저장소로 멱등 처리
2. 실패 시 지수 백오프(1s, 2s, 4s)
3. 3회 실패 시 DLQ 전송

### 검증 포인트
- 동일 eventId 2회 입력 시 결과 동일
- 재고 음수 방지
- 로그 필수 필드: traceId/eventId/orderId/sku
