# 대구 관광지 소개 사이트 대구의 창

![image](https://github.com/user-attachments/assets/d4c7b4f5-006a-441f-9c7b-a9d6b2b230a2)


- 배포URL : http://llllll18.dothome.co.kr/index/php

## 프로젝트 소개

이 프로젝트는 대구의 다양한 관광 명소를 소개하여 대구를 방문하는 관광객들에게 유용한 정보를 제공하는 것을 목표로 합니다.

- 대구의 주요 관광지를 테마별로 소개합니다.
- 주요 관광지별 상세정보를 보여줍니다.
- 관심있는 관광지는 찜하고 사용자가 다시 볼 수 있습니다.
- 내가 가고싶은 관광지만을 클릭하여 나만의 코스를 만들 수 있습니다.

## 벤치마킹



## 팀원 구성
![image](https://github.com/user-attachments/assets/eb43f0bf-270c-43bd-8f3b-b96f634b991f)


## 1. 개발 환경

- 디자인 : Photoshop, Figma, Illustrator
- 프론트엔드: HTML, CSS, JavaScript
- 백엔드: PHP, SQL
- 데이터베이스: MySQL
- 버전 관리: Github
- 배포 환경: Dothome


## 2. 프로젝트 구조
```
Project
 ┣ 📂.github
 ┃ ┗ 📂workflows
 ┃ ┃ ┗ 📜deploy.yml
 ┣ 📂course
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜styles.css
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜course1.jpg
 ┃ ┃ ┣ 📜course2.jpg
 ┃ ┃ ┣ 📜course3.jpg
 ┃ ┃ ┣ 📜course4.jpg
 ┃ ┃ ┣ 📜course5.jpg
 ┃ ┃ ┣ 📜detail_img_1.jpg
 ┃            .
 ┃            .
 ┃            .
 ┃ ┃ ┗ 📜map_img_plus.jpg
 ┃ ┣ 📂php
 ┃ ┃ ┣ 📜course_create.php
 ┃ ┃ ┣ 📜course_delete.php
 ┃ ┃ ┣ 📜course_user.php
 ┃ ┃ ┣ 📜get_courses.php
 ┃ ┃ ┗ 📜map.php
 ┃ ┗ 📂script
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜map.js
 ┃ ┃ ┣ 📜my_courses.js
 ┃ ┃ ┣ 📜response.json
 ┃ ┃ ┗ 📜ui.js
 ┣ 📂header
 ┃ ┣ 📂header_img
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┗ 📜mobile_logo.png
 ┃ ┣ 📜header.css
 ┃ ┗ 📜header.php
 ┣ 📂index
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜slide.css
 ┃ ┃ ┗ 📜styles.css
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜course1.jpg
 ┃ ┃ ┣ 📜course2.jpg
 ┃ ┃ ┣ 📜course3.jpg
 ┃            .
 ┃            .
 ┃            .
 ┃ ┃ ┗ 📜Untitled5.jpg
 ┃ ┣ 📂php
 ┃ ┃ ┣ 📜index.php
 ┃ ┃ ┗ 📜slide.php
 ┃ ┗ 📂script
 ┃ ┃ ┣ 📜attractionsSlider.js
 ┃ ┃ ┗ 📜slideShow.js
 ┣ 📂login
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜styles.css
 ┃ ┗ 📂php
 ┃ ┃ ┗ 📜login.php
 ┣ 📂map
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜styles.css
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜course1.jpg
 ┃ ┃ ┣ 📜course2.jpg
 ┃ ┃ ┣ 📜detail_img_1.jpg
 ┃ ┃ ┣ 📜detail_img_1.jpg
 ┃            .
 ┃            .
 ┃            .
 ┃ ┃ ┗ 📜map_img_plus.jpg
 ┃ ┣ 📂php
 ┃ ┃ ┣ 📜bookmark.php
 ┃ ┃ ┣ 📜bookmark_handler.php
 ┃ ┃ ┗ 📜map.php
 ┃ ┗ 📂script
 ┃ ┃ ┣ 📜courses.js
 ┃ ┃ ┣ 📜d
 ┃ ┃ ┣ 📜main.js
 ┃ ┃ ┣ 📜map.js
 ┃ ┃ ┣ 📜response.json
 ┃ ┃ ┗ 📜ui.js
 ┣ 📂modal
 ┃ ┣ 📜modal.css
 ┃ ┗ 📜modal.php
 ┣ 📂mypage
 ┃ ┣ 📂css
 ┃ ┃ ┗ 📜styles.css
 ┃ ┣ 📂img
 ┃ ┃ ┣ 📜detail_img_1.jpg
 ┃ ┃ ┣ 📜detail_img_1.jpg
 ┃            .
 ┃            .
 ┃            .
 ┃ ┃ ┗ 📜detail_img_9.jpg
 ┃ ┣ 📂php
 ┃ ┃ ┗ 📜mypage.php
 ┃ ┗ 📂script
 ┃ ┃ ┗ 📜response.json
 ┣ 📂php
 ┃ ┗ 📜map.php
 ┣ 📜env.php
 ┣ 📜logout.php
 ┣ 📜php_login.php
 ┣ 📜README.md
 ┗ 📜user_repository.php
```

## 3. 역할 분담

### 손근영 (팀장)

#### 메인 페이지 슬라이드쇼 구현

- **Swiper.js 기반 이미지 슬라이더**
  - 페이드 효과를 활용한 부드러운 이미지 전환
  - 자동 재생 기능 (3초 간격)
  - 이전/다음 네비게이션 버튼

- **커스텀 프로그레스 바 구현**
  - 슬라이드 진행 상태 시각화
  - 현재 슬라이드 번호 표시 (예: 1/5)
  - 부드러운 프로그레스 바 애니메이션

- **반응형 디자인**
  - 디바이스별 최적화된 이미지 크기 조정
  - 미디어 쿼리를 통한 동적 레이아웃 조정

 #### 코스 관리 기능 구현
 
- **사용자 맞춤형 코스 생성 시스템**
  - 관광지 다중 선택 기능 (최대 7개)
  - 선택된 관광지 지도 마커 자동 표시
  - 코스 이름 설정 및 저장 기능

- **코스 관리 API 연동**
  - 코스 생성 API (`course_create.php`)
    - 사용자별 코스 데이터 저장
    - 선택된 관광지 정보 DB 연동
  - 코스 조회 API (`course_user.php`)
    - 사용자별 저장된 코스 목록 조회
    - 코스별 관광지 정보 통합 조회

- **사용자 인터페이스**
  - 관광지 선택 시 실시간 시각적 피드백
  - 지도 연동 마커 표시 및 자동 위치 조정
  - 코스 목록 실시간 업데이트
 
  #### 카카오맵 API 기반 관광지 지도 시스템 구현
  
- **지도 기본 기능 구현**
  - 대구 중심 지도 초기화 및 설정
  - 관광지 주소 → 좌표 변환 (Geocoding)
  - 동적 마커 생성 및 관리

- **커스텀 오버레이 구현**
  - 관광지 정보 커스텀 오버레이 디자인
  - 관광지 이미지, 이름, 주소 표시
  - 상세정보 모달 연동

- **코스별 관광지 표시 기능**
  - 추천 코스별 관광지 마커 자동 표시
  - 선택된 코스의 관광지 목록 표시
  - 지도 자동 범위 조정 (Bounds)

- **관광지 찜하기 기능**
  - 관광지별 찜하기 토글 기능
  - 찜한 관광지 목록 조회 및 표시
  - 사용자별 찜 목록 DB 연동
 
   #### 관광지 상세정보 모달 시스템 구현
  
- **반응형 모달 디자인**
  - PC, 태블릿, 모바일 대응 레이아웃
  - 유동적 폰트 크기 (vw 단위 활용)
  - 디바이스별 최적화된 이미지 배치

- **동적 모달 콘텐츠 생성**
  - PHP 기반 서버사이드 렌더링
  - JSON 데이터 파싱 및 동적 HTML 생성

- **사용자 인터랙션**
  - 모달 외부 클릭 시 닫기
  - 닫기 버튼 구현
  - 스크롤 가능한 설명 영역



### 김동규

### 이승현

### 장정규


## 4. 개발 기간 및 작업 관리

![image](https://github.com/user-attachments/assets/6d93fff4-2ad9-4423-9833-be6b072f3b49)

- 회의를 통해 전날 한 일 Review 및 오늘 할 일 생성
- 디렉토리 별 branch 생성으로 branch 관리
- Pull Request 와 Merge 는 팀장이 확인 후 진행

## 5. 페이지별 주요기능

#### [로그인 페이지]

- 소셜 로그인으로 바로 회원가입 가능


![image](https://github.com/user-attachments/assets/3dad8bde-87ae-4171-9fef-9f5815da418d)



#### [추천 여행지 페이지]


- 테마별 관광지 소개 및 찜 가능


![image](https://github.com/user-attachments/assets/b24a121d-d3e8-4bd2-8a47-678b3d178f79)


- 로그인 하지 않고 찜기능 이용하려 할 시 경고창


![image](https://github.com/user-attachments/assets/7e0fedb8-4e13-4df9-9f2b-58476c3cc137)


- 내가 찜한 관광지 확인 가능


![image](https://github.com/user-attachments/assets/5f7a9c44-76db-4c0a-af19-dadaec64687f)




#### [나만의 여행지 페이지]


- 원하는 관광지 체크후 나만의 코스 생성 가능


![image](https://github.com/user-attachments/assets/f5cfb0fc-10be-4c92-9c13-48f0bea9cd28)


- 나만의 코스 확인


![image](https://github.com/user-attachments/assets/2eb84e21-a219-4c9a-a131-e7c493b0e64e)


#### [시연영상](https://drive.google.com/file/d/1IRoRE_4x-sIRGmccWpL7VAqZmqnxhi0J/view?usp=drive_link)




## 6. 개선 목표

- 관광지 소개 페이지 인 만큼 외국인의 방문이 잦을 것이므로 영어 페이지를 만들어야 사이트 방문객 수가 증가할 것임.

- 관광지들이 "코스" 라는 이름으로 묶여있으니 관광지별 거리 또는 찾아가는 길 추가

- 관광지 주변 맛집 , 카페 정보 추가

- 나만의 코스를 타 사용자와 공유하는 게시판 기능 추가



## 7. 프로젝트 후기

#### 손근영

3주 이상의 긴 시간 동안 페이지를 구현하다 보니, 개발 과정에서 제가 손대지 않은 파일이
거의 없을 정도로 모든 부분을 관여 했습니다. 많은 역할을 담당하다 보니 git branch관리에 가끔 실수도 있었고, 완성도에 있어서 걱정이 많다 보니 중간중간 기획했던 페이지들을 
변경하기도 했습니다. 다음 프로젝트 때는 이번 프로젝트를 계기로 개발 규모를 현실적으로 설정하고, 일정을 체계적으로 조율해서 더 완성도 있는 프로젝트를 진행 해야겠다는 생각이 듭니다.


#### 김동규

#### 이승현

#### 장정규

php를 처음 다뤄봤는데, js와 html을 동시에 다루는 언어라는 점에서 특이했다. 불편한 점도 있었지만 꽤 편리한 부분 또한 있어서, php 프레임워크를 다뤄보고 싶다는 생각도 들었다.
