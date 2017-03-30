import React, { Component } from 'react';
import Header from './Header';
import Post from './Post';

class Newsfeed extends Component{

  render(){
    const profile = this.props.auth.getProfile();
    if(profile !== {}){
      console.log('render profile: ', profile);
    }
    return(
      <div>

          <div className="outer-wrapper">
              <div className="wrapper">
                  <div className="navigation-panel">
                    NAVIGATION
                    <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque corrupti quo voluptas est, incidunt repudiandae, facilis nisi quam possimus quae beatae blanditiis, repellendus, ducimus placeat totam. Aliquid maiores porro harum?</div>
                    <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa nihil optio quae sunt possimus fugit doloribus quidem nisi inventore iusto aut, distinctio hic, maxime adipisci facilis illo sint laboriosam exercitationem.</div>
                    <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis nam sed odit maiores corporis accusantium dignissimos quis consequatur, accusamus et. Sapiente aperiam excepturi, perferendis aliquam cumque amet praesentium quasi adipisci.</div>
                  </div>
                  <div className="live-posts-panel">
                    LIVE POSTS
                    <div className="scroller">
                      <Post />
                      <div className="panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis voluptatibus, excepturi corrupti culpa laborum at tempore nulla quas minima ab perferendis ipsum odio illo dignissimos odit aut, libero nam? Aut.</div>
                      <div className="tall panel panel-default">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste optio, veniam consequatur sed molestias. Corporis temporibus accusamus nesciunt perspiciatis quaerat vel cum omnis modi dolores fugit ex impedit, ullam libero.</div>
                    </div>

                  </div>
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
                      <div className="panel panel-default"><img className="img-responsive" src="../src/images/pexels-photo-24301.jpg" alt="pic1"/>Nisi veniam deleniti, maxime consequuntur at nesciunt nobis, dolorum voluptas ex dolore non sunt. Eos eum earum porro, adipisci magni quae numquam.<img className="img-responsive" src="../images/pexels-photo.jpg" alt="pic2"/>Nisi veniam deleniti, maxime consequuntur at nesciunt nobis, dolorum voluptas ex dolore non sunt. Eos eum earum porro, adipisci magni quae numquam.
                      </div>
                      <div className="panel panel-default">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      </div>
                    </div>

                  </div>
              </div>
          </div>

          <div className="users">
            users
          </div>



    </div>
    )
  }
}

export default Newsfeed;
