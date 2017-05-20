
const setInitialState = (state,action) => {
  switch(action.type){
    case SET_INITIAL_STATE:
      return state;
      break;
  }
  return state;
}

export default setInitialState;
