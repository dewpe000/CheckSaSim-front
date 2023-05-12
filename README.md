# 건사심 자기평가 웹사이트

> [https://sasimi.site/](https://sasimi.site/)
> 

## 프로젝트 목적

> 한양대학교 교양 수업 ‘건강과 사회 그리고 심리학’을 수강하는 학생들의 편의를 위해 개발한 웹 사이트입니다.
> 

---

## 멤버

> [이주은 ( front )](https://github.com/PLJE)
> 

> [김동성 ( back )](https://github.com/mekind)
> 

> [한관희 ( front )](https://github.com/heegh000)
> 

---

## Tech

### Front

- React  + Typescript
- Material UI

### Back

- Node + Typescript
- Express
- PostgresQL

---

## 환경

### front

- Netlify를 통한 배포

### Back

- AWS EC2를 통한 배포
- AWS RDS 이용
- Route53 + ACM + Load Balancer를 통한 HTTPS 인증

---

## Feature

### 사용자 페이지

- 사용자는 매주 수업에서 모든 학생이 참여하는 자기평가에 메인 페이지와, 사이드바를 통해 접근할 수 있습니다. 
![Untitled 1](https://github.com/heegh000/prosocial-project-web/assets/108382134/4b5cf906-343b-4a01-a962-31ff02e6c055)

    

- 사용자는 자기평가를 진행하고, 채점 유형에 따라 자기 평가 결과를 확인할 수 있습니다.
![Untitled 2](https://github.com/heegh000/prosocial-project-web/assets/108382134/6cb1d50b-b77e-4dac-b6b4-0140d69e3b6f)

    


- 메인 페이지에서 가장 최근 4주차 설문 페이지로 이동하는 버튼을 클릭하여 설문지 페이지로 이동할 수 있습니다.
![Untitled 3](https://github.com/heegh000/prosocial-project-web/assets/108382134/26b2181b-a30c-4fdd-ae39-dd809840b281)

    

### 관리자 페이지

- 어드민 계정으로 로그인하면 좌측 메뉴 바에서 설문 조사 추가하기 버튼이 보입니다.
![Untitled 4](https://github.com/heegh000/prosocial-project-web/assets/108382134/fe4e2d03-e6e2-4506-b0ec-54187254f48e)

    
- 설문 추가하기 페이지에서 설문 조사 제목, 질문, 답변, 답변 별 점수 등을 입력하여 설문지를 추가합니다.
![Untitled 5](https://github.com/heegh000/prosocial-project-web/assets/108382134/4e3a1bf7-4dff-4d3d-9dff-252814499ff6)

    
- 사용자 페이지 접근시 설문지 페이지에서 삭제하기 버튼이 활성화됩니다.
![Untitled](https://github.com/heegh000/prosocial-project-web/assets/108382134/009adc96-4f9e-4218-a08b-743620822266)
