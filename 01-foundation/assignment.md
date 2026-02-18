# Phase 1 Assignment — Foundation 통합 과제 (구체 구현 버전)

## 과제명
"재고/랭킹/카테고리 기반 Foundation 서비스 구현"

## 과제 목적
분리 학습한 3개 파트(자료구조/알고리즘/Java Core)를 하나의 코드베이스로 통합합니다.

---

## 구현 범위

### API 1) 재고 조회
- `GET /stocks/{sku}`
- 내부 저장구조: `Map<String, Integer>`
- 없는 sku는 명시적 예외 처리

### API 2) Top-K 랭킹
- `GET /rankings/top?k=100`
- Heap(`PriorityQueue`) 기반 구현
- 동점 규칙: `score DESC`, `productId ASC`

### API 3) 카테고리 하위 노드 조회
- `GET /categories/{id}/descendants`
- DFS/BFS 중 1개 필수, 나머지 1개 선택
- 사이클 검출 필수

### Consumer) 재고 이벤트 처리
- `StockEventConsumer.consume(event)`
- eventId 멱등 처리
- 실패 3회 재시도, 실패 시 DLQ

### Utility) 최근 5분 집계
- Sliding Window 기반 `getRecentRequestCount()` 구현
- naive 방식과 성능 비교

---

## 필수 클래스/메서드 시그니처

```java
public class StockQueryService {
    public int findWithMap(Map<String, Integer> stockMap, String sku) { /* TODO */ }
}

public class RankingService {
    public List<ProductScore> topKWithHeap(List<ProductScore> items, int k) { /* TODO */ }
}

public class CategoryService {
    public List<Long> descendantsDfs(long root, Map<Long, List<Long>> tree) { /* TODO */ }
    public List<Long> descendantsBfs(long root, Map<Long, List<Long>> tree) { /* TODO */ }
}

public class StockEventConsumer {
    public void consume(StockEvent event) { /* TODO */ }
    public int getQty(String sku) { /* TODO */ }
}
```

---

## 구현 세부 요구사항

### 1) 자료구조
- Map/Set/Deque/PriorityQueue 사용 근거를 `DECISION.md`에 기록
- 선택하지 않은 대안 2개 이상 비교

### 2) 알고리즘
- Top-K: Sort vs Heap 결과 일치 테스트
- 탐색: DFS/BFS 결과/성능/가독성 비교
- Sliding Window: naive 대비 성능 수치 필수

### 3) Java Core
- `record`, `enum`, Value Object 최소 2개 도입
- 비즈니스/시스템 예외 분리
- 로그 필드: traceId/eventId/sku/type 필수

---

## 테스트 기준
- 총 30개 이상
- 필수 포함
  - 재고 조회 성공/실패
  - Top-K 동점 처리
  - Top-K 경계값(k=0, k=1, k>n)
  - 카테고리 사이클 검출
  - 중복 이벤트 무시
  - 재시도 성공/실패 + DLQ
  - Sliding Window 정확성

---

## 제출물
1. `DECISION.md`
- 자료구조/알고리즘 선택 근거
- 대안 비교

2. `TEST_REPORT.md`
- 테스트 목록/결과
- 실패 재현/수정 과정

3. `BENCHMARK.md`
- List vs Map
- Sort vs Heap
- Naive vs Sliding Window

4. `JAVA_GUIDELINE.md`
- 예외/로그/코드 스타일 기준

5. `LEARNING_NOTE.md`
- 배운 점 5개
- 헷갈리는 점 3개
- 다음 학습 계획 4주

---

## 평가 기준
- 정확성 30
- 자료구조/알고리즘 선택 타당성 25
- Java 코드 품질 20
- 테스트 품질 15
- 성능 분석/설명력 10
