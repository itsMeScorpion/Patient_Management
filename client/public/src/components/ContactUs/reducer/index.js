const initialState = {
  response: '',
};
const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESPONSE':
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
