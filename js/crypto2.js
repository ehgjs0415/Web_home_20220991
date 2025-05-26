// crypto2.js

const SECRET_KEY = "my-super-secret-key-for-aes256!!";
const ENCODE = new TextEncoder();
const DECODE = new TextDecoder();

// Key 유도 함수
export async function deriveKey() {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    ENCODE.encode(SECRET_KEY),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: ENCODE.encode("salt123"),
      iterations: 100000,
      hash: "SHA-256"
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

// 암호화 함수
export async function encryptTextGCM(plainText) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey();

  const encrypted = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv
    },
    key,
    ENCODE.encode(plainText)
  );

  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted))
  };
}

// 복호화 함수
export async function decryptTextGCM(data, iv) {
  const key = await deriveKey();

  const decrypted = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: new Uint8Array(iv)
    },
    key,
    new Uint8Array(data)
  );

  return DECODE.decode(decrypted);
}

// 세션에 저장하는 함수 (로그인 시 호출)
export async function saveEncryptedPass2(password) {
  const result = await encryptTextGCM(password);
  sessionStorage.setItem("Session_Storage_pass2", JSON.stringify(result));
}

// 세션에서 불러와 복호화 (로그인 후 페이지에서 호출)
export async function loadAndDecryptGCM() {
  const stored = sessionStorage.getItem("Session_Storage_pass2");
  if (!stored) {
    console.log("🔐 Session_Storage_pass2 없음");
    return;
  }

  const parsed = JSON.parse(stored);
  const decrypted = await decryptTextGCM(parsed.data, parsed.iv);
  console.log("🔓 복호화된 비밀번호(GCM):", decrypted);
}
