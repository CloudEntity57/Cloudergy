import jquery from 'jquery';
module.exports = {
  nyt_feed: (nytkey,callback)=>{
    let nytquery = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key='+nytkey;
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
            picurl=article.multimedia[4].url;
          }
          result.url=article.url;
          result.photo=picurl;
          result.title=article.title;
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
