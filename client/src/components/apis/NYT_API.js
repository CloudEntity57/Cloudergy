import jquery from 'jquery';
module.exports = {
  nyt_feed: (nytkey,callback)=>{
    let nytquery = 'https://api.nytimes.com/svc/topstories/v2/fashion.json?api-key='+nytkey;
    let storiesquery = jquery.ajax({
      url:nytquery,
      type:"GET",
      success:(stories)=>{
        console.log('stories: ',stories.results.slice(0,10));
        stories = stories.results.slice(0,10);
        let results=stories.map((article)=>{
          let result={};
          let picurl;
          if(article.multimedia.length>0){
            console.log('nyt api multimedia: ',article.multimedia);
            picurl=(article.multimedia[4]) ? article.multimedia[4].url : article.multimedia[3].url;
          }
          result.url=article.url;
          result.photo=picurl;
          result.title=article.title;
          result.publishedAt=article.published_date;
          result.source="(New York Times)";
          result.affiliation="liberal";
          return result;
        });
        // stories = results.slice(,11);
        callback(results);
      }
    });
  }
}
