function search_message(){
    alert("검색을 수행합니다.");
}

// 5주차 응용문제 문자열 검사 : 금지 단어 배열
const bannedWords = ["시발", "병신", "개새끼", "시발놈아", "쌍놈"];

document.getElementById("search_btn").addEventListener('click', search_message);

function googleSearch(){
    const searchTerm = document.getElementById("search_input").value.trim(); // 앞뒤 공백 제거

    // 1. 공백 검색어 차단
    if (searchTerm.length === 0) {
        alert("⚠️ 검색어를 입력해주세요!");
        return false;
    }

    // 2. 금지어 포함 여부 확인
    for (let i = 0; i < bannedWords.length; i++) {
        if (searchTerm.includes(bannedWords[i])) {
            alert(`❌ 검색어에 금지된 단어가 포함되어 있습니다: "${bannedWords[i]}"`);
            return false;
        }
    }


    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`; //새창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새 창에서 열기.
    return false;
}

// 5주차 응용문제 : 문자열 검색(비속어검사,공백검사) -> 요구조건 if문,for문,배열 사용 -> 모두 해결!