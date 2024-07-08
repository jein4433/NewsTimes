let news = [];
const getLatestNews = async () => {

    let url = `https://news-site-e2dedb.netlify.app/top-headlines`
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("news", news);
};
getLatestNews();
