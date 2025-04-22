import { useState } from 'react';
import { useToastStore } from '../../store/ToastStore';
import axios from 'axios';
import { UPLOAD_TRACK_URL } from '../../api/config';
import { useTracksStore } from '../../store/TracksStore';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export default function UploadAudio({ id }: { id: string }) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const { fetchTracks } = useTracksStore();
  const { setToastMessage, openToast } = useToastStore();

  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus('uploading');

      const newFile = e.target.files[0];
      if (newFile.size > maxSize) {
        setToastMessage('File is too big', true);
        openToast();
        return;
      }

      if (!allowedMimeTypes.includes(newFile.type)) {
        setToastMessage('File is not audio', true);
        openToast();
        return;
      }

      const data = new FormData();
      data.append('file', newFile);

      try {
        await axios.post(UPLOAD_TRACK_URL(id), data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setToastMessage('File uploaded', false);
        openToast();
        await fetchTracks();
      } catch (error) {
        setToastMessage('Error, file wasn`t uploaded', true);
        openToast();
      }
    }
  };

  return (
    <div>
      <label
        htmlFor={`file-${id}`}
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 max-md:h-10 max-md:w-10"
      >
        <img src="/assets/upload.svg" />
      </label>
      <input
        type="file"
        id={`file-${id}`}
        data-testid={`upload-track-${id}`}
        className="absoulte h-0 w-0 opacity-0"
        onChange={handleFileUpload}
      />
    </div>
  );
}
