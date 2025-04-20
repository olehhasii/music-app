import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';
import CreateTrackForm from '../Forms/CreateTrackForm';
import ToastMessage from '../Forms/ToastMessage';
import { useToastStore } from '../../store/ToastStore';

export default function TracksActions() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  //const [responseStatus, setResponseStatus] = useState({ sent: false, msg: '', isError: false });

  const { isToastOpened } = useToastStore();

  const handleCloseForm = () => {
    setIsFormOpened(false);
  };

  /* const handleCloseToast = () => {
    setResponseStatus({ sent: false, msg: '', isError: false });
  }; */

  return (
    <div className="glass mb-2 w-full px-7 py-2">
      <div>
        <button
          className="rounded-lg bg-[#2d2d2d] px-7 py-2 font-bold"
          onClick={() => setIsFormOpened(true)}
        >
          Create Track
        </button>
      </div>
      {isFormOpened &&
        createPortal(
          <Modal isOpen={isFormOpened} onClose={handleCloseForm}>
            <CreateTrackForm onClose={handleCloseForm} />
          </Modal>,
          document.body
        )}
      {isToastOpened && createPortal(<ToastMessage />, document.body)}
    </div>
  );
}
