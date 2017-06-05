import {REQUESTING_POSTS, RECEIVING_POSTS} from '../../actions/index.js';
const getAllPosts = (state={posts:{},postsUpdated:false},action) => {
  switch(action.type) {
    case REQUESTING_POSTS:
      return {
        ...state,
        isFetching:true
      }
    case RECEIVING_POSTS:
      console.log('reducks');
      let posts = action.results;
      // posts = posts.filter((val)=>{
      //   return val.postedon=='NA';
      // });
      return{
        ...state,
        isFetching: false,
        posts:posts,
        postsUpdated:true
      }
      default:
        return state;
  }
}

export default getAllPosts;
