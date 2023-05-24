const initialValues = {
  vaccineData: [],
  hospitalData: [],
};

const vaccinationReducer = (state = initialValues, action) => {
  switch (action.type) {
    case 'GET_VACCINATION':
      return {
        ...state,
        vaccineData: action.payload.vaccineData,
        hospitalData: action.payload.hospitalData,
      };
    default:
      return state;
  }
};

export default vaccinationReducer;
