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

#### 손근영 (팀장)




#### 김동규

#### 이승현

#### 장정규

