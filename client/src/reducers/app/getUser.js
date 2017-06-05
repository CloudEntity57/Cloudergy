import { REQUEST_USER_INFO, RECEIVE_USER_INFO } from '../../actions/index.js';

const getUser = (state={user:{},isFetching:false,lastUpdated:'',affiliation:''},action) => {
  console.log('userSubmitted run');
  switch(action.type) {
    case REQUEST_USER_INFO:
      return {
        ...state,
        isFetching:true
  }
    case RECEIVE_USER_INFO:
      return {
        ...state,
        isFetching:false,
        user:action.results,
        first:action.results[0].first_name,
        last:action.results[0].last_name,
        lastUpdated:action.receivedAt,
        affiliation:action.results[0].affiliation,
        invites_sent:action.results[0].ally_requests_sent,
        invites_received:action.results[0].ally_invitations_received
        // invitations_received:action.results[0].,
        // invitations_sent:action.results[0].,
        // userphoto:action.results[0].,
        // large_userphoto:action.results[0].
      }
    default:
      return state;
  }
}

export default getUser;
