import { session_set, session_get, session_check } from './session.js';
import { encrypt_text, decrypt_text } from './crypto.js';
import { generateJWT, checkAuth } from './jwt_token.js';

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    const emailInput = document.getElementById('typeEmailX');
    const idsave_check = document.getElementById('idSaveCheck');
    let get_id = getCookie("id");

    if(get_id) {
    emailInput.value = get_id;
    idsave_check.checked = true;
    }
    session_check(); // 세션 유무 검사
}

function init_logined(){
    if(sessionStorage){
        decrypt_text(); // 복호화 함수
    }
    else{
        alert("세션 스토리지 지원 x");
    }
}
    
const check_xss = (input) => {
    // DOMPurify 라이브러리 로드 (CDN 사용)
    const DOMPurify = window.DOMPurify;

    // 입력 값을 DOMPurify로 sanitize
    const sanitizedInput = DOMPurify.sanitize(input);

    // Sanitized된 값과 원본 입력 값 비교
    if (sanitizedInput !== input) {
        // XSS 공격 가능성 발견 시 에러 처리
        alert('XSS 공격 가능성이 있는 입력값을 발견했습니다.');
        return false;
    }

    // Sanitized된 값 반환
    return sanitizedInput;
    };


function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; path=/";
}
    
// 수정된 getCookie 함수 (모든 이름 탐색 가능)
function getCookie(name) {
    var cookie = document.cookie;
    if (cookie !== "") {
        var cookie_array = cookie.split("; ");
        for (let i in cookie_array) {
            const [key, value] = cookie_array[i].split("=");
            if (key === name) {
                return unescape(value);
            }
        }
    }
    return null;
}

// 로그인 횟수 카운트 함수 추가
function login_count() {
    let count = parseInt(getCookie("login_cnt")) || 0;
    count += 1;
    setCookie("login_cnt", count, 7);
    console.log("로그인 횟수:", count);
}

// 로그아웃 횟수 카운트 함수 추가
function logout_count() {
    let count = parseInt(getCookie("logout_cnt")) || 0;
    count += 1;
    setCookie("logout_cnt", count, 7);
    console.log("로그아웃 횟수:", count);
}

// 로그인 실패 횟수 체크 및 알림
function login_failed() {
    let failCnt = parseInt(getCookie("login_fail_cnt")) || 0;
    failCnt += 1;
    setCookie("login_fail_cnt", failCnt, 1); // 하루 저장

    if (failCnt >= 3) {
        setCookie("login_block", "true", 0.003); // 약 4분 (0.003일)
        alert("로그인 가능 횟수를 초과했습니다. 4분간 로그인할 수 없습니다.");
    } else {
        alert(`로그인 실패 (${failCnt}/3)`);
    }
}


function logout() {
    logout_count(); // 로그아웃 횟수 증가
    session_del();  // 기존 세션 삭제
    localStorage.removeItem("jwt_token"); // ✅ JWT 토큰 삭제, 11주차 응용문제 토큰 제거
    location.href = '../index.html';
}

function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert("로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// 11주차 세션 암호화 및 복호화 부분 응용문제에서 azync과 await 확인    
const check_input = async () => {
    // 로그인 차단 여부 먼저 확인
    if (getCookie("login_block") === "true") {
        alert("로그인 가능 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
        return false;
    }

    const loginForm = document.getElementById('login_form');
    const loginBtn = document.getElementById('login_btn');
    const emailInput = document.getElementById('typeEmailX');
    const passwordInput = document.getElementById('typePasswordX');

    const c = '아이디, 패스워드를 체크합니다';
    alert(c);

    const emailValue = emailInput.value.trim(); // trim은 앞 뒤 공백 제거해주는 함수
    const passwordValue = passwordInput.value.trim();

    const sanitizedPassword = check_xss(passwordValue);
    // check_xss 함수로 비밀번호 Sanitize
    const sanitizedEmail = check_xss(emailValue);
    // check_xss 함수로 비밀번호 Sanitize

    // 전역 변수 추가, 맨 위 위치
    const idsave_check = document.getElementById('idSaveCheck');
    const payload = {
            id: emailValue,
            exp: Math.floor(Date.now() / 1000) + 3600 // 1시간 (3600초)
    };
    const jwtToken = generateJWT(payload);
        
    if (emailValue === '') {
        alert('이메일을 입력하세요.');
        return false;
    }

    if (passwordValue === '') {
        alert('비밀번호를 입력하세요.');
        return false;
    }

    if (emailValue.length < 5)  {
        alert('아이디는 최소 5글자 이상 입력해야 합니다.');
        return false;
    }


    // 이메일은 최대 10자
    if (emailValue.length > 10) {
        alert('이메일은 10글자 이하여야 합니다.');
        return false;
    }

    if (passwordValue.length < 12) {
        alert('비밀번호는 반드시 12글자 이상 입력해야 합니다.');
        return false;
    }


    //  비밀번호는 최대 15자    
    if (passwordValue.length > 15) {
        alert('비밀번호는 15글자 이하여야 합니다.');
        return false;
    }

    const hasSpecialChar = passwordValue.match(/[!,@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/) !== null;
    if (!hasSpecialChar) {
        alert('패스워드는 특수문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    const hasUpperCase = passwordValue.match(/[A-Z]+/) !== null;
    const hasLowerCase = passwordValue.match(/[a-z]+/) !== null;
    if (!hasUpperCase || !hasLowerCase) {
        alert('패스워드는 대소문자를 1개 이상 포함해야 합니다.');
        return false;
    }

    //  반복된 문자열 (3자 이상) 금지
    if (/(.+)\1{2,}/.test(emailValue) || /(.+)\1{2,}/.test(passwordValue)) {
        alert('3글자 이상 반복되는 문자를 사용할 수 없습니다.');
        return false;
    }

    // 연속된 숫자 2개 이상 반복 금지 (예: 1212, 123123 등)
    if (/(\d{2,})\1+/.test(emailValue) || /(\d{2,})\1+/.test(passwordValue)) {
        alert('연속된 숫자 2개 이상 반복 입력은 허용되지 않습니다.');
        return false;
    }

    if (!sanitizedEmail) {
        // Sanitize된 비밀번호 사용
        return false;
    }
        
    if (!sanitizedPassword) {
        // Sanitize된 비밀번호 사용
        return false;
    }
    
    // 로그인 횟수 증가
    login_count();

    // 검사 마무리 단계 쿠키 저장, 최하단 submit 이전
    if(idsave_check.checked == true) { // 아이디 체크 o
        alert("쿠키를 저장합니다.", emailValue);
        setCookie("id", emailValue, 1); // 1일 저장
        alert("쿠키 값 :" + emailValue);
    }
    else{ // 아이디 체크 x
        setCookie("id", emailValue.value, 0); //날짜를 0 - 쿠키 삭제
    }
        
   
            

        console.log('이메일:', emailValue);
        console.log('비밀번호:', passwordValue);

        // session_set(); // 세션 생성
        await session_set(); // 기존 session_set → await 붙임, 11주차 응용문제 세션 암호화 및 복호화
        localStorage.setItem('jwt_token', jwtToken);
        loginForm.submit();
};
    document.getElementById("login_btn").addEventListener('click', check_input);
    document.addEventListener('DOMContentLoaded', () => {
        checkAuth();
        init_logined();
    });


    