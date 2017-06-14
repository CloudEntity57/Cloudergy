import React, { Component } from 'react';
import moment from 'moment';

class StoryLinks extends Component{
  render(){
    let stories_array = this.props.stories;
    let stories;
    let pic;

    if(stories_array){
      stories = stories_array.map((story)=>{
        let color = (story.affiliation=='liberal') ? 'liberal band' : 'conservative band';
        let publishedTime = moment(story.publishedAt).format("LLLL");
        pic=(story.photo) ? (<img className="img-responsive" src={story.photo} alt="pic1"/>) : '';
        return(
          <div className="story">
            {/* {story.title} */}
            <div className = {color}></div>
            <a href={story.url} target="_blank">{pic}<span className="story-title">{story.title}</span><span className="story-source">{story.source} - {publishedTime}</span></a>
          </div>
        );
      });
    }
    let newstitle = this.props.newstitle;
    return(
      <div className="ads-panel">
        <div className="features-panel panel panel-default">
          <h4>Site Features</h4>
          <ul>
            <li>Toggle news feed by ideology above</li>
            <li>Edit your user profile in the account section</li>
            <li>Send ally requests to other members</li>
          </ul>
        </div>
        <div id="ads">
          <div className="panel panel-default">
            <h4>{newstitle}</h4>
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
