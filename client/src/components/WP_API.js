import jquery from 'jquery';
module.exports = {
  wp_feed: (wpkey,callback)=>{
    let wpquery = 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key='+nytkey;
    let storiesquery = jquery.ajax({
      url:wpquery,
      type:"GET",
      success:(stories)=>{
        console.log('stories: ',stories.results);
        stories = stories.results;
        callback(stories);
      }
    });
  }
}
