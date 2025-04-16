// var close_time; // 시간 정보
// var close_time2 = 10; // 10초 설정
// clearTimeout(close_time); // 재호출 정지
// close_time= setTimeout("close_window()", 10000);

// // 1/1000 초 지정, 바로 시작
// show_time(); // 실시간 시간 보여주기

// function show_time(){
//         let divClock = document.getElementById('Time');
//         divClock.innerText = close_time2; // 10초 삽입 시작
//         close_time2--; // 1초씩 감소
//     setTimeout(show_time, 1000); //1초마다 갱신
// }
// function close_window() { // 함수 정의
//     window.close(); // 윈도우 닫기
// } // 윈도우 창 2개가 닫힘, --> 파일을 2개로 쪼개야함popup2.js로 만들어서 사용. 윈도우 창만 닫기(팝업창만)
    


function pop_up(){
    window.open("../popup/popup.html", "팝업테스트", "width=400, height=300, top=10, left=10");
}

// 1초 마다 갱신을 수행하는 날짜 함수
function show_clock(){
    let currentDate= new Date(); // 현재 시스템 날짜 객체 생성
    let divClock= document.getElementById('divClock');
    let msg = "현재 시간: ";
    if(currentDate.getHours()>12){ // 12시 보다 크면 오후 아니면 오전
        msg += "오후"
        msg += currentDate.getHours()-12 +"시";
    }
    else {
        msg += "오전"
        msg += currentDate.getHours()+"시";
    }
    msg += currentDate.getMinutes()+"분";
    msg += currentDate.getSeconds()+"초";
    divClock.innerText= msg;

    if(currentDate.getMinutes()>58){ //정각 1분전 빨강색 출력
        divClock.style.color="red";
    }
    setTimeout(show_clock, 1000) // 1초마다 갱신
}

// function show_clock(){
//     let currentDate= new Date(); // 현재시스템날짜객체생성
//    let divClock= document.getElementById('divClock');
//     let msg = "현재시간: ";
//     if(currentDate.getHours()>12){  // 12시보다크면오후아니면오전
//    msg += "오후";
//     msg += currentDate.getHours()-12+"시";
//     }
//     else {
//     msg += "오전";
//     msg += currentDate.getHours()+"시";
//     }
//     msg += currentDate.getMinutes()+"분";
//     msg += currentDate.getSeconds()+"초";
//     divClock.innerText= msg;
//     if (currentDate.getMinutes()>58) {    //정각1분전빨강색출력
//    divClock.style.color="red";
//     }
//     setTimeout(show_clock, 1000);  //1초마다갱신
//    }



//이미지 호버 기능
function over(obj){
    obj.src="image/logo.png";
}

// es6버전이후 function으로 안해도 됨 --> 화살표로 표현가능
// const over = (obj) => {
//     obj.src = "image/logo.png";
// }


function out(obj){
    obj.src="image/logo2.jfif";
}