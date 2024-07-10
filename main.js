let newsList = [];
const menu = document.querySelectorAll(".menu button")
menu.forEach(menu=>menu.addEventListener("click",(event)=>getNewsByCategory(event)))

const getLatestNews = async () => {

    let url = new URL(`https://news-site-e2dedb.netlify.app/top-headlines`);
    
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
    console.log("news", newsList);
};

const openSearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "inline") {
      inputArea.style.display = "none";
    } else {
      inputArea.style.display = "inline";
    }
  };

  const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
  };
  
  const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  };

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL(`https://news-site-e2dedb.netlify.app/top-headlines?country=kr&category=${category}`);
    //const url = new URL(`https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`);
    const response = await fetch(url);
    const data = await response.json();
    console.log("ddd",data);
    newsList = data.articles;
    render();
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

getLatestNews();
