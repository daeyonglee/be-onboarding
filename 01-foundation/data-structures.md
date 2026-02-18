# Part 1 — 자료구조 (Data Structures)

## 0) 처음 배우는 사람을 위한 시작 안내
자료구조는 "데이터를 어떤 모양으로 보관할지"를 정하는 도구입니다.
같은 기능을 만들어도 자료구조 선택이 다르면 속도/메모리/유지보수 난이도가 달라집니다.

예:
- 재고 조회가 느린 이유: List를 조회용으로 사용
- 중복 쿠폰이 허용된 이유: Set 대신 List 사용

---

## 1) 학습 목표
- List/Map/Set/Deque/PriorityQueue 차이를 설명할 수 있다.
- 문제 유형에 따라 자료구조를 선택할 수 있다.
- 선택 이유를 복잡도 + 메모리 관점으로 문서화할 수 있다.

---

## 2) 핵심 용어 설명 (입문용)

### 시간복잡도 (Big-O)
- 코드 실행 시간이 입력 크기에 따라 얼마나 늘어나는지 나타내는 표기법
- `O(1)`: 입력이 늘어도 거의 일정
- `O(n)`: 입력이 10배면 시간도 대략 10배

### ArrayList
- 인덱스 조회는 빠르지만 중간 삽입/삭제는 느림
- "순서가 중요한 목록"에 적합

### HashMap
- `key -> value` 조회에 강함
- 키가 명확할 때 가장 효과적

### HashSet
- 중복 제거 전용
- 순서가 필요하지 않은 경우에 사용

### ArrayDeque
- Queue/Stack 역할 모두 가능
- 이벤트를 순서대로 처리할 때 유용

### PriorityQueue
- 우선순위가 높은 데이터만 빠르게 꺼낼 수 있음
- Top-K 문제에 적합

---

## 3) 따라하기 코드

### 3.1 List vs Map 조회 비교
```java
public int findWithList(List<StockItem> items, String sku) {
    for (StockItem item : items) {
        if (item.sku().equals(sku)) {
            return item.quantity();
        }
    }
    throw new IllegalArgumentException("SKU not found: " + sku);
}

public int findWithMap(Map<String, Integer> stockMap, String sku) {
    Integer qty = stockMap.get(sku);
    if (qty == null) {
        throw new IllegalArgumentException("SKU not found: " + sku);
    }
    return qty;
}
```

### 3.2 중복 제거
```java
public Set<String> deduplicateCoupons(List<String> couponCodes) {
    return new HashSet<>(couponCodes);
}
```

### 3.3 큐 처리
```java
public class EventQueueService {
    private final ArrayDeque<String> queue = new ArrayDeque<>();

    public void enqueue(String eventId) {
        queue.offerLast(eventId);
    }

    public String dequeue() {
        String value = queue.pollFirst();
        if (value == null) throw new IllegalStateException("Queue is empty");
        return value;
    }
}
```

---

## 4) 파트 미니 과제 (자료구조)

## 과제명
"재고 조회/중복 제거/큐 처리 서비스 구현"

### 구현 요구사항
1. `StockQueryService`
- `findWithList`, `findWithMap` 구현
- 10k, 100k 데이터셋에서 조회 성능 비교

2. `CouponService`
- 중복 제거 기능 구현
- 입력/출력 크기와 중복률 계산

3. `EventQueueService`
- FIFO 보장 구현
- 빈 큐 처리 예외 추가

### 입출력 예시
- 입력: `['A', 'B', 'A', 'C']`
- 출력(Set): `['A', 'B', 'C']`

### 필수 테스트
- 조회 성공/실패
- 중복 제거 정상 동작
- 큐 FIFO 보장
- 빈 큐 예외

### 제출물
- `DATA_STRUCTURES_DECISION.md`
- `DATA_STRUCTURES_TEST_REPORT.md`
- `DATA_STRUCTURES_BENCHMARK.md`

### 평가 기준
- 정확성 40
- 자료구조 선택 타당성 30
- 테스트 품질 20
- 설명력 10
