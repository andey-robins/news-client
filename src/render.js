// let $ = require('jquery');

const refreshBtn = document.getElementById('refreshBtn');
refreshBtn.onclick = refreshPage;

const RSS_URLS = ["https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml", "https://www.democracynow.org/democracynow.rss", "http://tytnetwork.com/category/best-of-the-left-blog/feed/?_ga=2.105237571.1186780435.1589243965-1143117765.1588284640"]

let Parser = require('rss-parser');
let parser = new Parser();

async function refreshPage() {

    // clean up page by removing old elements
    $("article").remove();

    let a = await RSS_URLS.forEach(async (url) => {
        let feed = await parser.parseURL(url);
        console.log(feed);

        let html = ``;

        feed.items.forEach(item => {
            html += `
                <article>
                    <h3>${item.title}</h3>
                    <h3>${(item.creator == undefined) ? feed.title : item.creator}</h3>
                    <p>${item.contentSnippet}</p>
                    <br>
                </article>
            `
        })

        document.body.insertAdjacentHTML("beforeend", html);
    })
}
