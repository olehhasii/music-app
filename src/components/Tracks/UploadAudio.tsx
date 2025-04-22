import { useState } from 'react';

export default function UploadAudio({ id }: { id: string }) {
  const [file, setFile] = useState<File>();

  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-wav'];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <label
        htmlFor="file"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 max-md:h-10 max-md:w-10"
      >
        <img src="/assets/upload.svg" />
      </label>
      <input
        type="file"
        id="file"
        data-testid={`upload-track-${id}`}
        className="absoulte h-0 w-0 opacity-0"
        onChange={handleFileUpload}
      />
    </div>
  );

  /*  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 max-md:h-10 max-md:w-10"
      data-testid={`upload-track-${id}`}
      type="file"
    >
      <img src="/assets/upload.svg" />
    </button>
  ); */
}
