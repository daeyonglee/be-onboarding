# Phase 1 Practice — Java 실습 가이드 (확장 버전)

## 실습 운영 기준
- JDK 17
- 테스트: JUnit 5
- 각 실습은 구현 + 테스트 + 성능/회고 기록까지 제출
- 목표: "동작"이 아니라 "선택 근거"를 남기는 습관

---

## 실습 1) 재고 조회 구조 비교 (List vs Map)

### 구현
```java
public class StockQueryService {
    public int findWithList(List<StockItem> items, String sku) { /* TODO */ }
    public int findWithMap(Map<String, Integer> stockMap, String sku) { /* TODO */ }
}
```

### 요구사항
- 10k / 100k 데이터셋에서 성능 비교
- 예외 메시지에 sku 포함
- 테스트 4개 이상

---

## 실습 2) Top-K 랭킹 (Sort vs Heap)

### 구현
```java
public class RankingService {
    public List<ProductScore> topKWithSort(List<ProductScore> items, int k) { /* TODO */ }
    public List<ProductScore> topKWithHeap(List<ProductScore> items, int k) { /* TODO */ }
}
```

### 요구사항
- 동점 규칙: `score DESC`, `productId ASC`
- `k <= 0`, `k > n` 처리
- n=1,000,000 입력 시 복잡도 설명 작성

---

## 실습 3) 카테고리 탐색 (DFS + BFS 둘 다)

### 구현
```java
public class CategoryService {
    public List<Long> descendantsDfs(long root, Map<Long, List<Long>> tree) { /* TODO */ }
    public List<Long> descendantsBfs(long root, Map<Long, List<Long>> tree) { /* TODO */ }
}
```

### 요구사항
- root 미존재 예외
- 사이클 검출
- DFS/BFS 결과 차이와 장단점 정리

---

## 실습 4) 멱등 이벤트 처리

### 구현
```java
public class StockEventConsumer {
    public void consume(StockEvent event) { /* TODO */ }
    public int getQty(String sku) { /* TODO */ }
}
```

### 요구사항
- 중복 eventId 무시
- ORDER_CREATED / ORDER_CANCELLED 처리
- 음수 재고 방지

---

## 실습 5) 재시도 + DLQ
- 실패 재시도 3회
- 3회 실패 후 DLQ publisher 호출
- 테스트에서 retry 횟수 검증

---

## 실습 6) Sliding Window 집계

### 구현 목표
- 최근 5분 요청 수를 초 단위로 계산
- naive 방식(전체 재계산) vs window 방식 비교

### 제출
- 두 방식 시간 비교표
- 메모리 사용량 차이 간단 분석

---

## 실습 7) Binary Search 결정 문제

### 문제 예시
"처리량 X에서 p95 200ms 이하를 유지할 수 있는 최소 worker 수"를 찾는 함수 작성

### 요구사항
- 조건 함수 분리
- 탐색 범위/종료조건 문서화

---

## 실습 8) Java 코드 품질 리팩토링
- 긴 메서드 분해
- 매직 넘버 상수화
- 예외/로그 메시지 표준화

---

## 제출물
- `practice-result.md`
  - 각 실습 결과
  - 측정값 표
  - 실패 케이스와 수정 내역
- 테스트 최소 30개
