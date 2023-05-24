const initialState = {
  consultation: [],
  consultationDataId: [],
  // success:
};

const consultationCertificateReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CONSULTATION':
      return {
        ...state,
        consultation: action.payload,
      };
    case 'GET_CONSULTATION_ID':
      return {
        ...state,
        consultationDataId: action.payload,
      };
    default:
      return state;
  }
};

export default consultationCertificateReducer;
