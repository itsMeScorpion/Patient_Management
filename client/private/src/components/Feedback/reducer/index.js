const initialState = {
  feedback: [],
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FEEDBACK':
      return {
        ...state,
        feedback: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
