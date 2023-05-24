import { toast } from 'react-toastify';
import { RiCheckLine, RiErrorWarningLine } from 'react-icons/ri';

import 'react-toastify/dist/ReactToastify.css';
import '../components/styles/animate.css';
import '../components/styles/custom-toast-styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '../components/styles/toast.css';

const customToast = (message, type) => {
  const icon = type === 'success' ? <RiCheckLine /> : <RiErrorWarningLine />;
  toast[type](
    <span>
      {icon}
      <span>{message}</span>
    </span>
  );
};

export default customToast;
