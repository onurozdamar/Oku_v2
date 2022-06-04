import * as Actions from '../actions/index';

const initialState = {
  data: [],
  allData: [],
  loading: false,
  item: {},
};

const randevuReducer = function (state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BOOKS:
      return {...state, data: action.payload};

    default:
      return state;
  }
};

export default randevuReducer;
