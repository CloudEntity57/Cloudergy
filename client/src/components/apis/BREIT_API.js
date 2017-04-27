import jquery from 'jquery';
module.exports = {
  breitbart_feed: (callback)=>{
    const breit_query = 'https://newsapi.org/v1/articles?source=breitbart-news&sortBy=top&apiKey=8ff98eca726d4f62b1c8acd3ba489ff5';
    let storiesquery = jquery.ajax({
      url:breit_query,
      type:"GET",
      success:(stories)=>{
        console.log('stories: ',stories.articles);
        stories = stories.articles;
        let results=stories.map((article)=>{
          let object={};
          object.url=article.url;
          object.publishedAt=article.publishedAt;
          object.photo=article.urlToImage;
          object.title=article.title;
          object.source="(Breitbart News)";
          object.affiliation="conservative";
          return object;
        });
        stories = results;
        callback(stories);
      }
    });
  }
}
