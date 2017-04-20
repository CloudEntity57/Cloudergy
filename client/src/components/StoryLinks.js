import React, { Component } from 'react';

class StoryLinks extends Component{
  render(){
    let stories_array = this.props.stories;
    let stories;
    let pic;

    if(stories_array){
      stories = stories_array.map((story)=>{
        pic=(story.photo) ? (<img className="img-responsive" src={story.photo} alt="pic1"/>) : '';
        return(
          <div className="story">
            {/* {story.title} */}
            <a href={story.url} target="_blank">{pic}<span className="story-title">{story.title}</span><span className="story-source">{story.source}</span></a>
          </div>
        );
      });
    }

    return(
      <div className="ads-panel">
        ADS
        <div className="panel panel-default">
          <ul>
          <li>Nisi veniam deleniti, maxime consequuntur at nesciunt nobis.</li>
          <li>Nisi veniam deleniti, maxime consequuntur at nesciunt nobis.</li>
          <li>Nisi veniam deleniti, maxime consequuntur at nesciunt nobis.</li>
          </ul>
        </div>
        <div id="ads">
          <div className="panel panel-default">
            <h4>Top Politics</h4>
            {stories}
          </div>
          <div className="panel panel-default">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
          </div>
        </div>



         {/* <div className="panel panel-default"><img className="img-responsive" src="./images/pexels-photo-92628.jpeg" alt="pic1"/>Unde necessitatibus reiciendis omnis fugiat at corporis nihil mollitia ex temporibus earum labore maiores officiis inventore eos, repellat est modi, odio impedit?</div>  */}
      </div>
    );
  }
}

export default StoryLinks;
