import React, { Component } from 'react';
import moment from 'moment';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setStoryLink } from '../actions/index';

class StoryLinks extends Component{
  constructor(props){
    super(props);
    this.state={
      featuresPanel:false
    }
  }
  shareLink(e){
    e.preventDefault();
    console.log('sharing link: ',e.target.id);
    this.props.setStoryLink(e.target.id);
  }
  displayPanel(e){
    e.preventDefault();
    let featuresPanel = !this.state.featuresPanel;
    this.setState({
      featuresPanel
    });
  }
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
            <a href={story.url} target="_blank">{pic}<span className="story-title">{story.title}</span><span  className="story-source">{story.source} - {publishedTime}</span>
            </a>

            <a className="story-source" id={story.url} onClick={this.shareLink.bind(this)} href="#">
              <span id={story.url}>
                <span id={story.url} className="fa fa-share"></span>
                <span id={story.url} >Share</span>
              </span>
            </a>
          </div>
        );
      });
    }
    let newstitle = this.props.newstitle;
    let featuresPanel = (this.state.featuresPanel) ?
    (<ul>
      <li>Three separate public news feeds (Liberal, Conservative, Moderate) filter above</li>
      <li>Share any story or website by typing the URL, or click 'share' button on news on this page</li>
      <li>Edit your user profile in the 'account' section, choose your political affiliation</li>
      <li>Create allegiances with other members</li>
    </ul>)
     : '';
    return(
      <div className="ads-panel">
        <div className="features-panel panel panel-default">
          <h4>Site Features</h4><span onClick={this.displayPanel.bind(this)} className="fa fa-sort-desc pull-right post-header-deleteicon"></span>
          {featuresPanel}
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

function mapStateToProps(state){
  let storyLink = state.allReducers.mainApp.storyLink;
  return{
    storyLink
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    setStoryLink
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(StoryLinks);

// export default StoryLinks;
