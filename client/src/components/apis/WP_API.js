import jquery from 'jquery';
module.exports = {
  wp_feed: (wpkey,callback)=>{
    let wpquery = 'https://newsapi.org/v1/articles?source=the-washington-post&sortBy=top&apiKey='+wpkey;
    let storiesquery = jquery.ajax({
      url:wpquery,
      type:"GET",
      success:(stories)=>{
        // stories=JSON.stringify(stories);
        console.log('stories: ',stories.articles);
        stories = stories.articles;
        let results=stories.map((article)=>{
          let result={};
          result.url=article.url;
          result.photo=article.urlToImage;
          result.title=article.title;
          result.publishedAt=article.publishedAt;
          result.source="(Washington Post)";
          result.affiliation="liberal"
          return result;
        });
        stories = results;
        callback(stories);
      }
    });
  }
}
