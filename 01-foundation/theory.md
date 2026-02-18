# Phase 1 Theory — Java로 배우는 백엔드 Foundation (확장 버전)

이 Phase는 자료구조/알고리즘/Java 기본기를 **실무 적용 가능한 수준**으로 확장하는 것을 목표로 합니다.

---

## 학습 범위 (기존 최소보다 확장)

### A. 자료구조
- Array/List/Set/Map/Queue/Deque/Heap/Tree/Graph 기초
- Hash 충돌과 load factor 개념
- 정렬/검색/순회 시 구조 선택 기준
- 메모리 사용량과 시간복잡도 동시 고려

### B. 알고리즘
- 복잡도 분석(Big-O)
- Top-K, BFS/DFS, Sliding Window, Two Pointers
- Prefix Sum, Binary Search(결정 문제), Greedy 기초
- 알고리즘 선택 근거 문서화 훈련

### C. Java 기본기
- `record`, `enum`, `Optional`, `Stream`의 안전한 사용 기준
- 예외 계층 분리(비즈니스/시스템)
- 불변 객체, 캡슐화, 테스트 가능한 설계
- 로그 구조화와 디버깅 가능한 메시지 설계

---

## 1) 자료구조 Deep Dive

### 1.1 List vs Map 조회
```java
public int findQtyBySkuWithList(List<StockItem> items, String sku) {
    for (StockItem item : items) {
        if (item.sku().equals(sku)) return item.quantity();
    }
    throw new IllegalArgumentException("SKU not found: " + sku);
}

public int findQtyBySkuWithMap(Map<String, Integer> stockMap, String sku) {
    Integer qty = stockMap.get(sku);
    if (qty == null) throw new IllegalArgumentException("SKU not found: " + sku);
    return qty;
}
```

해석:
- List는 단순하지만 데이터 증가 시 조회 비용이 선형으로 증가
- Map은 키 설계가 정확하면 조회 성능이 안정적

### 1.2 Queue/Deque 사용 기준
- 주문 이벤트를 시간 순으로 처리할 때 `ArrayDeque`
- 최근 요청 N개 추적 시 `Deque`로 앞/뒤 삽입 삭제

### 1.3 Heap 사용 기준
- 전체 정렬 대신 상위 k개만 필요하면 `PriorityQueue`

---

## 2) 알고리즘 Deep Dive

### 2.1 Top-K (Heap)
```java
public List<ProductScore> topK(List<ProductScore> items, int k) {
    if (k <= 0) return List.of();

    Comparator<ProductScore> minHeapOrder = Comparator
            .comparingDouble(ProductScore::score)
            .thenComparing(ProductScore::productId, Comparator.reverseOrder());

    PriorityQueue<ProductScore> heap = new PriorityQueue<>(minHeapOrder);

    for (ProductScore item : items) {
        if (heap.size() < k) {
            heap.offer(item);
            continue;
        }
        if (minHeapOrder.compare(item, heap.peek()) > 0) {
            heap.poll();
            heap.offer(item);
        }
    }

    return heap.stream()
            .sorted(Comparator.comparingDouble(ProductScore::score).reversed()
                    .thenComparing(ProductScore::productId))
            .toList();
}
```

### 2.2 DFS/BFS + 사이클 검출
```java
private void dfs(long node,
                 Map<Long, List<Long>> tree,
                 Set<Long> visited,
                 Set<Long> path,
                 List<Long> result) {
    if (path.contains(node)) throw new IllegalStateException("Cycle: " + node);
    if (visited.contains(node)) return;

    path.add(node);
    visited.add(node);
    result.add(node);

    for (Long child : tree.getOrDefault(node, List.of())) {
        dfs(child, tree, visited, path, result);
    }

    path.remove(node);
}
```

### 2.3 Sliding Window
- 최근 5분 이벤트 집계 시 전체 재계산 대신 "추가/제거" 방식
- 실시간 대시보드 지표에 유용

### 2.4 Binary Search(결정 문제)
- "처리 용량 X에서 SLA 만족 가능한가"를 조건 함수로 바꿔 탐색

---

## 3) Java Deep Dive

### 3.1 record로 도메인 의도 표현
```java
public record StockEvent(String eventId, String type, String sku, int qty) {}
```

### 3.2 멱등성 구현
```java
public class StockService {
    private final Set<String> processedEventIds = new HashSet<>();
    private final Map<String, Integer> stock = new HashMap<>();

    public void apply(StockEvent event) {
        if (processedEventIds.contains(event.eventId())) return;

        int current = stock.getOrDefault(event.sku(), 0);
        int next = switch (event.type()) {
            case "ORDER_CREATED" -> current - event.qty();
            case "ORDER_CANCELLED" -> current + event.qty();
            default -> throw new IllegalArgumentException("Unknown type=" + event.type());
        };

        if (next < 0) throw new IllegalStateException("Negative stock: " + event.sku());

        stock.put(event.sku(), next);
        processedEventIds.add(event.eventId());
    }
}
```

### 3.3 예외/로그 분리
```java
try {
    stockService.apply(event);
    log.info("stock_applied traceId={} eventId={} sku={} qty={}", traceId, event.eventId(), event.sku(), event.qty());
} catch (IllegalStateException e) {
    log.warn("stock_business_error traceId={} eventId={} reason={}", traceId, event.eventId(), e.getMessage());
    throw e;
} catch (Exception e) {
    log.error("stock_system_error traceId={} eventId={}", traceId, event.eventId(), e);
    throw e;
}
```

---

## 4) Foundation 이후 확장 로드
- 자료구조: ConcurrentHashMap, Disjoint Set, Segment Tree, Trie
- 알고리즘: Dijkstra, DP, Graph SCC, String matching
- Java: JVM GC 튜닝, JIT/escape analysis, lock-free 구조

---

## 5) 확장 완료 체크리스트
- [ ] Map/Heap/Deque/Tree를 문제 유형별로 선택해 설명할 수 있다.
- [ ] Top-K, DFS/BFS, Sliding Window, Binary Search를 직접 구현했다.
- [ ] 예외와 로그를 운영 목적에 맞게 분리했다.
- [ ] 시간복잡도뿐 아니라 메모리/가독성 트레이드오프를 설명할 수 있다.
- [ ] 다음 단계 확장 주제를 본인 학습 계획으로 연결할 수 있다.
