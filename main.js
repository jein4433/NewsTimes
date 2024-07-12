let newsList = [];
const menu = document.querySelectorAll(".menu button")
const sideMenu = document.querySelectorAll(".side-menu-list button")
menu.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))
let inputArea = document.getElementById("input-area")
sideMenu.forEach(sideMenu=>sideMenu.addEventListener("click",(event)=>getNewsByCategory(event)))
let searchButton = document.getElementById("search-button")
inputArea.addEventListener("keydown",(event) => {
  if(event.key === 'Enter') {
    getNewsByKeyword();
  }
})


let url = new URL(`https://news-site-e2dedb.netlify.app/top-headlines`

);

const getNews = async () => {
  try{
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No results for you search.");
      }
      newsList = data.articles;
      render();
    }else{
      throw new Error(data.message)
    }
  }catch(error){
    console.log("error",error.message)
    errorRender(error.message);
}

};

const getLatestNews = async () => {

    let url = new URL(`https://news-site-e2dedb.netlify.app/top-headlines`);
    
    getNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    url = new URL(`https://news-site-e2dedb.netlify.app/top-headlines?country=kr&category=${category}`);

    getNews();
};

const getNewsByKeyword = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL (`https://news-site-e2dedb.netlify.app/top-headlines?country=kr&q=${keyword}`);
  getNews();
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
 
};

const render=()=>{
    const newsHTML = newsList.map(
        (news)=>{
          return ` <div class="row news">
        <div class="col-lg-4">
            <img class="news-img-size" 
            src="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
  }" />
        </div>
        <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
                ${news.description == null || news.description == ""
                    ? "내용없음"
                    : news.description.length > 200
                    ? news.description.substring(0, 200) + "..."
                    : news.description
                }   
            </p>
            <div>${news.source.name || "no source"} | ${moment(
        news.publishedAt
     ).fromNow()}</div>
        </div>
        </div>`
   }).join('');
document.getElementById("news-board").innerHTML=newsHTML;
};

const errorRender = (errorMessage) =>{
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

document.getElementById("news-board").innerHTML = errorHTML;
};

getLatestNews();
