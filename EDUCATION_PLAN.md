# 백엔드 3년차 대상 단계별 교육자료 제작 계획 (StyleKorean eCommerce 도메인)

## 1) 목표
- **대상**: 백엔드 경력 3년차 개발자
- **목표**: 실무 맥락(StyleKorean eCommerce)에서 문제 해결력, 설계 역량, 코드 품질 역량을 단계적으로 끌어올린다.
- **범위**: 자료구조, 알고리즘, Java, Spring Boot, DDD, Hexagonal Architecture, Design Pattern, Clean Architecture, Clean Code
- **방식**: 이론 + 도메인 기반 과제 + 코드 리뷰 기준 + 회고

## 2) 참고 자료 활용 방향
- 기존 FE/BE 온보딩 사이트의 구성 방식을 참고하여,
  - 이론(Theory) → 실습(Practice) → 과제(Project) → 리뷰(Review) 구조로 통일한다.
  - 단일 지식 전달이 아니라 **업무 시나리오 기반 학습 경로**로 재구성한다.

## 3) 전체 로드맵 (초안)

### Phase 0. 킥오프 & 진단 (1주)
- 현재 역량 진단: Java/Spring 기본기, SQL/트랜잭션, 테스트 습관, 설계 경험
- 개발 환경 표준화: JDK, 빌드 도구, 코드 스타일, 테스트 실행 방식
- 산출물
  - 개인 역량 체크리스트
  - 학습 우선순위(개인별)

### Phase 1. CS/기초 체력 강화 (2주)
- 자료구조: List/Set/Map, Queue/Deque, Heap, Tree, Graph 실무 선택 기준
- 알고리즘: 정렬/탐색, 그리디, 투포인터, BFS/DFS, 최단경로, 복잡도 분석
- Java 심화: Stream, Optional, 불변성, 동시성 기초, 예외/로깅 전략
- 과제(StyleKorean 맥락)
  - 상품 랭킹 계산(우선순위 큐)
  - 카테고리 트리 탐색(DFS/BFS)
  - 재고 동기화 큐 처리(Queue)

### Phase 2. Spring Boot 실전 역량 (2주)
- 계층형 구조의 장단점, 트랜잭션 경계, 예외 핸들링, 검증, API 설계
- JPA 사용 원칙(N+1, 지연 로딩, 페이징, 벌크 업데이트)
- 테스트 전략: 단위/통합/API 테스트, Testcontainers 개요
- 과제
  - 주문/결제 API의 트랜잭션 경계 설계
  - 쿠폰 적용 정책 검증 로직 구현 및 테스트

### Phase 3. 도메인 중심 설계 (DDD + Hexagonal) (3주)
- DDD 핵심: Ubiquitous Language, Entity/Value Object, Aggregate, Domain Service
- Hexagonal: Port/Adapter, 의존성 역전, 외부 시스템(결제/배송) 분리
- 이벤트 기반 확장 포인트(주문 완료 이벤트, 재고 차감 이벤트)
- 과제
  - 주문 Aggregate 경계 재설계
  - 결제사/배송사 어댑터 교체 가능한 구조 구현

### Phase 4. 아키텍처/패턴/품질 고도화 (2주)
- Clean Architecture 적용: 유스케이스 중심, 프레임워크 독립성
- Design Pattern 실전 적용: Strategy, Factory, Template Method, Adapter
- Clean Code 원칙: 네이밍, 함수 길이, 응집도/결합도, 리팩토링 루프
- 과제
  - 프로모션 엔진(Strategy + Factory)
  - 주문 상태 전이 리팩토링(가독성/테스트 강화)

### Phase 5. 종합 미니 프로젝트 & 발표 (2주)
- 주제: “StyleKorean 주문-결제-재고 핵심 플로우 개선”
- 요구사항
  - 장애 상황(외부 결제 실패, 재고 부족, 중복 요청) 대응
  - 아키텍처 선택 근거 문서화
  - 테스트 커버리지/품질 게이트 충족
- 산출물
  - 코드 저장소
  - 아키텍처 결정 기록(ADR)
  - 기술 발표 자료

## 4) 교육자료 제작 산출물 구조 (초안)
- `01-foundation/` : 자료구조/알고리즘/Java
- `02-spring-boot/` : API, 트랜잭션, 데이터 접근, 테스트
- `03-domain-architecture/` : DDD, Hexagonal, 이벤트
- `04-quality-patterns/` : 디자인패턴, 클린코드, 리팩토링
- `05-capstone/` : 종합 과제/평가 루브릭/발표 가이드

각 모듈은 아래 4개 문서를 공통으로 가진다.
1. `theory.md` (핵심 개념)
2. `practice.md` (핸즈온)
3. `assignment.md` (eCommerce 과제)
4. `review-checklist.md` (리뷰 기준)

## 5) 평가 기준 (초안)
- **정확성**: 요구사항 충족, 예외 상황 처리
- **설계력**: 경계 설정, 책임 분리, 확장 가능성
- **품질**: 테스트 신뢰성, 코드 가독성, 운영 관점(로그/모니터링)
- **설명력**: 의사결정 근거와 트레이드오프 설명

## 6) 다음 단계 제안
다음 작업에서 아래 순서로 진행한다.
1. Phase 1의 `theory.md`/`assignment.md`를 먼저 작성
2. StyleKorean 도메인 용어 사전(유비쿼터스 언어) 정의
3. 과제 난이도(기본/심화) 2단계로 분리
4. 코드 리뷰 체크리스트를 팀 코드리뷰 룰과 매핑

---

> 이번 문서는 **초기 계획 문서**이며, 다음 단계에서 모듈별 상세 교육자료를 순차적으로 작성한다.
