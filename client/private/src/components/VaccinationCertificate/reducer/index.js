const initialState = {
  vaccination: [],
};

const vaccinationCertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_VACCINATIONS':
      return {
        ...state,
        vaccination: action.payload,
      };
    default:
      return state;
  }
};

export default vaccinationCertificateReducer;
