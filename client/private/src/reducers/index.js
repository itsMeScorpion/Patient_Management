import { combineReducers } from 'redux';

import profileReducer from '../components/Profile/reducer';
import consultationReducer from '../components/Consultation/reducer';
import vaccinationReducer from '../components/Vaccination/reducer';
import feedbackReducer from '../components/Feedback/reducer';
import consultationCertificateReducer from '../components/ConsultationCertificate/reducer';
import vaccinationCertificateReducer from '../components/VaccinationCertificate/reducer';
import transactionReducer from '../components/Transaction/reducer';
import dashboardReducer from '../components/Dashboard/reducer';

export default combineReducers({
  profileReducer,
  consultationReducer,
  vaccinationReducer,
  feedbackReducer,
  consultationCertificateReducer,
  vaccinationCertificateReducer,
  transactionReducer,
  dashboardReducer,
});
