# Phase 5 Assignment — Capstone 프로젝트 (확장 버전)

## 과제명
"StyleKorean 주문-결제-재고 플로우 통합 개선 + 운영 검증"

## 학습 안내
- 이 과제는 통합 실무 역량 학습 결과를 검증하는 목적입니다.
- `LEARNING_NOTE.md`에 현재 수준과 다음 학습 목표를 명확히 기록합니다.

---

## 팀 구성
- 2~4인 1팀
- 역할 권장
  - Domain Lead
  - API/Infra Lead
  - Test/Quality Lead
  - Observability Lead

---

## 프로젝트 범위

### 필수 유스케이스
1. 주문 생성 + 결제 승인
2. 결제 실패 + 보상 처리
3. 재고 예약/복원 + 멱등 처리
4. 주문 재시도/복구 API

### 필수 비기능
- 성능: p95/p99 측정
- 안정성: 재시도 + DLQ + Runbook
- 운영성: traceId end-to-end 추적
- 배포성: 롤백 전략 문서화

---

## 필수 구현 요구사항

### A. 기능
- `POST /orders`
- `POST /payments/{orderId}/retry`
- `GET /orders/{orderId}`
- 주문 상태 전이 규칙 문서화

### B. 아키텍처
- DDD + Hexagonal 원칙 적용
- Port/Adapter 구조 유지
- ADR 최소 3건

### C. 테스트
- 단위/통합/API 총 60개 이상
- 장애 주입 테스트 4개 이상
- 성능 테스트 시나리오 2개 이상

### D. 운영
- 구조화 로그(JSON)
- 지표: success rate, p95/p99, retry count, DLQ count
- 알람 기준/소음 억제 전략 문서화

### E. 검증
- 전/후 지표 비교표 필수
- 실패 복구 시간(MTTR) 측정

---

## 심화 요구사항 (기존보다 확장)
- 카나리 또는 feature flag 전략 제시
- 장애 복구 자동화 스크립트
- GameDay 시나리오 1회 실행 보고
- 비용/성능 트레이드오프 분석 1건

---

## 제출물
1. 코드 저장소
2. `README.md` (실행/테스트 방법)
3. `ARCHITECTURE.md`
4. `ADR-001.md`, `ADR-002.md`, `ADR-003.md`
5. `TEST_REPORT.md`
6. `PERF_REPORT.md`
7. `OPS_RUNBOOK.md`
8. `GAMEDAY_REPORT.md`
9. 발표 자료(12~18장)
10. `LEARNING_NOTE.md`

---

## 평가 기준
- 기능 정확성 20
- 아키텍처/설계 20
- 테스트/품질 20
- 성능/운영 25
- 발표/설명력 15
