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

let totalResults = 0;
let page = 1;
const pageSize = 10; //let
const groupSize = 5;


const getNews = async () => {
  try{
    url.searchParams.set("page",page);
    url.searchParams.set("pageSize",pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200){
      if(data.articles.length === 0){
        throw new Error("No results for you search.");
      }
      newsList = data.articles;
      totalResults = data.totalResults
      render();
      paginationRender();
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

const paginationRender = () => {
  const totalPages = Math.ceil(totalResults / pageSize)
  const pageGroup = Math.ceil(page / groupSize);
  let lastPage = pageGroup * groupSize;
  if (lastPage > totalPages){
    lastPage = totalPages
  }
  const firstPage = lastPage - (groupSize - 1)<=0? 1: lastPage - (groupSize -1);

  let paginationHTML = ``;

  for (let i=firstPage; i<=lastPage; i++){
    paginationHTML+=`<li class="page-item ${i===page?"active":''}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`
  }
  document.querySelector(".pagination").innerHTML=paginationHTML

//   <nav aria-label="Page navigation example">
//   <ul class="pagination">
//     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
//     <li class="page-item"><a class="page-link" href="#">1</a></li>
//     <li class="page-item"><a class="page-link" href="#">2</a></li>
//     <li class="page-item"><a class="page-link" href="#">3</a></li>
//     <li class="page-item"><a class="page-link" href="#">Next</a></li>
//   </ul>
// </nav>
};

const moveToPage = (pageNum) => {
  console.log("move",pageNum);
  page = pageNum;
  getNews();
}

getLatestNews();
