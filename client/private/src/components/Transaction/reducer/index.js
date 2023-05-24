const initialState = {
  transaction: [],
};

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TRANSACTION':
      return {
        ...state,
        transaction: action.payload,
      };
    default:
      return state;
  }
};

export default transactionReducer;
