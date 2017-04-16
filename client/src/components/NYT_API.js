import jquery from 'jquery';
module.exports = {
  nyt_feed: (nytkey,callback)=>{
    let nytquery = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key='+nytkey;
    let storiesquery = jquery.ajax({
      url:nytquery,
      type:"GET",
      success:(stories)=>{
        console.log('stories: ',stories.results);
        stories = stories.results;
        callback(stories);
      }
    });
  }
}
