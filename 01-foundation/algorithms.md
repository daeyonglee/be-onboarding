# Part 2 — 알고리즘 (Algorithms)

## 0) 처음 배우는 사람을 위한 시작 안내
알고리즘은 "문제를 해결하는 절차"입니다.
같은 기능이어도 절차가 비효율적이면 데이터가 커질 때 서비스가 느려지거나 실패합니다.

---

## 1) 학습 목표
- Top-K, DFS/BFS, Sliding Window, Binary Search를 구현할 수 있다.
- 문제에 맞는 알고리즘을 선택하고 이유를 설명할 수 있다.
- 복잡도와 실제 실행 시간을 함께 비교할 수 있다.

---

## 2) 핵심 개념 설명 (입문용)

### Top-K
- 전체 데이터 중 상위 K개만 필요한 문제
- 전체 정렬 대신 Heap을 쓰면 더 빠를 수 있음

### DFS/BFS
- DFS: 깊게 내려가며 탐색
- BFS: 같은 레벨을 넓게 탐색
- 트리/그래프에서 순회 전략을 고르는 기본 패턴

### Sliding Window
- "최근 N분" 같은 구간 집계 문제에 사용
- 매번 전체 재계산하지 않고 들어온 값/빠진 값만 반영

### Binary Search (결정 문제)
- 어떤 값이 조건을 만족하는지 빠르게 찾는 탐색
- "최소/최대 가능한 값" 계산에 자주 사용

---

## 3) 따라하기 코드

### 3.1 Top-K (Heap)
```java
public List<ProductScore> topK(List<ProductScore> items, int k) {
    if (k <= 0) return List.of();

    Comparator<ProductScore> minHeap = Comparator
            .comparingDouble(ProductScore::score)
            .thenComparing(ProductScore::productId, Comparator.reverseOrder());

    PriorityQueue<ProductScore> pq = new PriorityQueue<>(minHeap);

    for (ProductScore item : items) {
        if (pq.size() < k) {
            pq.offer(item);
            continue;
        }
        if (minHeap.compare(item, pq.peek()) > 0) {
            pq.poll();
            pq.offer(item);
        }
    }

    return pq.stream()
            .sorted(Comparator.comparingDouble(ProductScore::score).reversed()
                    .thenComparing(ProductScore::productId))
            .toList();
}
```

### 3.2 DFS + 사이클 검출
```java
private void dfs(long node,
                 Map<Long, List<Long>> tree,
                 Set<Long> visited,
                 Set<Long> path,
                 List<Long> out) {
    if (path.contains(node)) throw new IllegalStateException("Cycle: " + node);
    if (visited.contains(node)) return;

    path.add(node);
    visited.add(node);
    out.add(node);

    for (Long child : tree.getOrDefault(node, List.of())) {
        dfs(child, tree, visited, path, out);
    }
    path.remove(node);
}
```

---

## 4) 파트 미니 과제 (알고리즘)

## 과제명
"Top-K/탐색/윈도우 알고리즘 구현"

### 구현 요구사항
1. Top-K
- Sort 버전/Heap 버전 둘 다 구현
- 결과 동일성 검증

2. Category 탐색
- DFS/BFS 구현
- 사이클 예외 처리

3. Sliding Window
- 최근 5분 요청 수 집계
- naive 버전 대비 성능 비교

4. Binary Search
- "최소 worker 수" 계산 함수 구현

### 입력 예시
- Top-K 입력 크기: 100, 10,000, 1,000,000
- Category 입력: 트리 + 사이클 케이스

### 필수 테스트
- 경계값(k=0, k=1, k>n)
- 동점 처리
- 사이클 검출
- Sliding Window 정확성
- Binary Search 종료조건

### 제출물
- `ALGORITHMS_COMPLEXITY.md`
- `ALGORITHMS_TEST_REPORT.md`
- `ALGORITHMS_BENCHMARK.md`

### 평가 기준
- 정확성 40
- 알고리즘 선택 타당성 30
- 테스트 품질 20
- 설명력 10
