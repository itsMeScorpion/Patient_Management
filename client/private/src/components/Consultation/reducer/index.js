const initialState = {
  department: [],
  hospital: [],
  doctor: [],
};
const consultationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONSULTATION_DETAILS':
      return {
        ...state,
        department: action.payload.department,
        hospital: action.payload.hospital,
        doctor: action.payload.doctor,
      };
    default:
      return state;
  }
};

export default consultationReducer;
