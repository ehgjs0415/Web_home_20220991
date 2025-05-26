import { encrypt_text, decrypt_text } from './crypto.js';

// function session_set() { //세션 저장
//     let session_id = document.querySelector("#typeEmailX");
//     if (sessionStorage) {
//         sessionStorage.setItem("Session_Storage_test", session_id.value);
//     } else {
//         alert("로컬 스토리지 지원 x");
//     }
// }

// function session_set() { //세션 저장
//     let session_id = document.querySelector("#typeEmailX"); // DOM 트리에서 ID 검색
//     let session_pass = document.querySelector("#typePasswordX"); // DOM 트리에서 pass 검색
//     if (sessionStorage) {
//         let en_text = encrypt_text(session_pass.value);
//         sessionStorage.setItem("Session_Storage_id", session_id.value);
//         sessionStorage.setItem("Session_Storage_pass", en_text);
//     } else {
//         alert("로컬 스토리지 지원 x");
//     }
// }

// 11차 강의 응용문제(세션암호와 및 복호화)
// export async function session_set() {
//   let session_id = document.querySelector("#typeEmailX");
//   let session_pass = document.querySelector("#typePasswordX");

//   if (sessionStorage) {
//     let en_text = encrypt_text(session_pass.value);
//     sessionStorage.setItem("Session_Storage_id", session_id.value);
//     sessionStorage.setItem("Session_Storage_pass", en_text);

//     // 여기 추가: GCM 암호화된 비밀번호 저장
//     await saveEncryptedPass2(session_pass.value);
//   } else {
//     alert("세션 스토리지 지원 x");
//   }
// }

export async function session_set(){ //세션 저장(객체)
    let id = document.querySelector("#typeEmailX");
    let password = document.querySelector("#typePasswordX");
    let random = new Date(); // 랜덤 타임스탬프

    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }
// 다음 페이지 계속 작성하기

    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = await encrypt_text(objString); // 암호화
    sessionStorage.setItem("Session_Storage_id", id.value);
    sessionStorage.setItem("Session_Storage_object", objString);
    sessionStorage.setItem("Session_Storage_pass", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }
}




// function session_get() { //세션 읽기
//     if (sessionStorage) {
//         return sessionStorage.getItem("Session_Storage_test");
//     } else {
//         alert("세션 스토리지 지원 x");
//     }
// }

export function session_get() { //세션 읽기
    if (sessionStorage) {
        return sessionStorage.getItem("Session_Storage_pass");
    } else {
        alert("세션 스토리지 지원 x");
    }
}

// function session_check() { //세션 검사
//     if (sessionStorage.getItem("Session_Storage_test")) {
//         alert("이미 로그인 되었습니다.");
//         location.href='../login/index_login.html'; // 로그인된 페이지로 이동
//     }
// }

export function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_id")) {
        alert("이미 로그인 되었습니다.");
        location.href='../login/index_login.html'; // 로그인된 페이지로 이동
    }
}

export function session_del() {//세션 삭제
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}