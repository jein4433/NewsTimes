const API_KEY = `a097bf899b644c9c962d875fbeab8ca8`;

let news = [];
const getLatestNews = async () => {
    const url = new URL(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
    );
    const response = await fetch(url);
    const data = await response.json();
    news = data.articles;
    console.log("news", news);
};
getLatestNews();