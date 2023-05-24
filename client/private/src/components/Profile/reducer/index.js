const initialState = {
  userData: '',
  medicalDetails: '',
  deseaseData: [],
};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PROFILE':
      return {
        ...state,
        userData: action.payload,
        deseaseData: action.disease,
        medicalDetails: action.medicalDetails,
      };
    default:
      return state;
  }
};

export default profileReducer;
