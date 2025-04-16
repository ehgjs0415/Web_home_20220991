document.getElementById("search_btn").addEventListener('click', search_message);

function search_message(){
    alert("검색을 수행합니다.");
}
// es6버전이후 function으로 안해도 됨 --> 화살표로 표현가능
// const search_message = () => {
//     const c = '검색을 수행합니다';
//     alert(c);
//     };
function googleSearch(){
    const searchTerm = document.getElementById("search_input").value; // 검색어로 설정
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`; //새창에서 구글 검색을 수행
    window.open(googleSearchUrl, "_blank"); // 새 창에서 열기.
    return false;
}
