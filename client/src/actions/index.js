import fetch from 'isomorphic-fetch';

export const SET_INITIAL_STATE = "SET_INITIAL_STATE";

export const socialApp = (state) => ({
  type:SET_INITIAL_STATE,
  state
})
