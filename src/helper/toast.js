import { toast } from 'react-toastify';

export const toastOption = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const toastMessages = (type, messages) => {
  if (type === 'success') {
    toast.success(messages, toastOption);
  } else if (type === 'error') {
    toast.error(messages, toastOption);
  } else {
    toast.error(messages, toastOption);
  }
};
