# Phase 1 Theory — CS/기초 체력 강화 (StyleKorean eCommerce)

## 학습 목표 (2주)
- 자료구조/알고리즘을 "문제 풀이"가 아닌 **운영 트래픽 대응 도구**로 사용한다.
- Java 코드에서 성능/가독성/안정성 트레이드오프를 수치로 설명한다.
- StyleKorean 핵심 시나리오(랭킹, 카테고리, 재고 이벤트)에 맞는 구현 전략을 선택한다.

## 주차별 학습 계획
### Week 1
1. 자료구조 선택 기준 + 복잡도 분석
2. Top-K / 트리 순회 / 중복 제거 패턴
3. Java 컬렉션/불변성/Stream 성능 포인트

### Week 2
1. BFS/DFS, Sliding Window, Heap 실전 적용
2. 동시성 기초(경쟁 조건, 가시성, 원자성)
3. 예외/로그 표준 + 미니 케이스 리뷰

---

## 1) 자료구조 선택 매트릭스
| 문제 유형 | 추천 구조 | 평균 복잡도 | eCommerce 예시 |
|---|---|---:|---|
| 키 기반 빠른 조회 | HashMap | O(1) | `sku -> 재고수량` 캐시 |
| 중복 제거 | HashSet | O(1) | 쿠폰 중복 적용 방지 |
| 순서 유지 목록 | ArrayList | 조회 O(1), 삽입 O(n) | 검색 결과 목록 |
| FIFO 처리 | ArrayDeque/Queue | O(1) | 재고 이벤트 소비 |
| Top-K 추출 | PriorityQueue | O(n log k) | 실시간 베스트 상품 |
| 계층 탐색 | Tree + DFS/BFS | O(V+E) | 카테고리 하위 집계 |

### 선택 체크리스트
- 읽기/쓰기 비율은? (예: 9:1이면 조회 최적화)
- 정렬/순서 보장이 필요한가?
- 중복 허용 여부는?
- 최악 케이스에서 메모리 상한은?

---

## 2) 알고리즘 실전 프레임

### 2.1 Top-K (Heap)
- 전체 정렬: `O(n log n)`
- Min-Heap K개 유지: `O(n log k)`
- `n=1,000,000`, `k=100`이면 Heap 전략이 유리함.

### 2.2 DFS/BFS
- DFS: 전체 하위 노드 집계, 재귀/스택 방식
- BFS: 레벨 기반 처리(메뉴 depth 제한, breadth 제어)
- 순환 참조 방어: `visited` Set 필수

### 2.3 Sliding Window
- 최근 5분 클릭수/전환율 산출
- 윈도우 이동 시 “들어오는 값 + 나가는 값”만 갱신

---

## 3) Java 실무 원칙

### 3.1 불변성
- Value Object(`Money`, `Quantity`)는 immutable로 유지.
- setter 제거 + 생성자 검증으로 invalid state 차단.

### 3.2 Stream 사용 기준
- 권장: 1~2 단계 변환 + 명확한 의도
- 지양: 5단계 이상 체인/복잡한 side effect
- Hot path는 루프와 비교 벤치마크 후 선택

### 3.3 동시성
- 단일 JVM synchronized만으로 분산 환경 정합성 보장 불가
- 재고 처리: DB 락/낙관적 락/이벤트 큐 중 선택 근거 필요

### 3.4 예외/로그
- 비즈니스 예외: 사용자 교정 가능(예: 재고 부족)
- 시스템 예외: 인프라 장애/타임아웃
- 필수 로그 키: `traceId`, `orderId`, `sku`, `eventId`

---

## 4) 도메인 시나리오별 설계 예시

### 시나리오 A: 상품 랭킹 API
- 입력: `productId`, `sales`, `view`, `conversionRate`
- 점수식 예시: `score = sales*0.6 + view*0.2 + conversion*0.2`
- 출력: Top 100 상품 ID

### 시나리오 B: 카테고리 집계 API
- 입력: 루트 categoryId
- 처리: DFS로 하위 노드 수집 → SKU 합산
- 안전장치: 순환 참조 발견 시 예외 이벤트 발행

### 시나리오 C: 재고 이벤트 소비자
- 이벤트: `ORDER_CREATED`, `ORDER_CANCELLED`
- 멱등성: `eventId` 중복 처리 차단
- 실패 정책: 3회 재시도 후 DLQ

---

## 5) 완료 기준
- [ ] 같은 문제를 2개 구조로 구현 후 선택 근거를 설명한다.
- [ ] 입력 규모(1만/10만/100만)별 복잡도/실행시간을 비교한다.
- [ ] 로그 필수 키를 누락하지 않고 예외 흐름을 분리한다.
