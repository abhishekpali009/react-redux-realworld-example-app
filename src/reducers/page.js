import { PAGE_LOADED, PAGE_UNLOADED } from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case PAGE_LOADED:
      return {
        ...state,
        tags: action.payload[0].tags
      };
    case PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};