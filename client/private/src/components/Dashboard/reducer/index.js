const initialState = {
  counterData: '',
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_COUNTERS':
      return {
        ...state,
        counterData: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
