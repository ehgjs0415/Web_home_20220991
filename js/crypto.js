import { session_set, session_get, session_check } from './session.js';

function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""), // IV 초기화 벡터
        padding: CryptoJS.pad.Pkcs7, // 패딩
        mode: CryptoJS.mode.CBC // 운영 모드
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}
    

export function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = encodeByAES256(rk, b); // 실제 암호화
    return eb;
    console.log(eb);
}

export function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get(); // 🔐 암호화된 문자열을 가져옴

    if (!eb) {
        console.warn("❌ 세션에서 암호화된 문자열 없음");
        return null;
    }

    try {
        const b = decodeByAES256(rk, eb); // 복호화
        return b; // ✅ 반드시 반환
    } catch (e) {
        console.error("❌ 복호화 실패", e);
        return null;
    }
}
//12주차 회원가입 복호화
export function decrypt_signup() {
    const k = "key";
    const rk = k.padEnd(32, " ");
    const encrypted = sessionStorage.getItem("Session_Storage_encrypted");

    if (!encrypted) {
        console.warn("❌ 암호화된 회원가입 정보 없음");
        return null;
    }

    try {
        const decrypted = decodeByAES256(rk, encrypted);
        return decrypted;
    } catch (e) {
        console.error("❌ 복호화 실패:", e);
        return null;
    }
}