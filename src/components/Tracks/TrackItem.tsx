import { useState } from 'react';
import { Track, TrackFormData } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import { createPortal } from 'react-dom';
import Modal from '../Modal/Modal';
import TrackForm from '../Forms/TrackForm';
import { FieldValues } from 'react-hook-form';
import { deleteTrack, updateTrack } from '../../api/tracks';
import { useTracksStore } from '../../store/TracksStore';
import { useToastStore } from '../../store/ToastStore';
import UploadAudio from './UploadAudio';
import AuidoPlayer from './AuidoPlayer';
import { useBulkDeleteStore } from '../../store/BuldkDeleteStore';

export default function TrackItem({ track }: { track: Track }) {
  const { id, title, artist, album, genres, slug, coverImage, audioFile } = track;

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genresError, setGenresError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingToServer, setIsLoadingToServer] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);

  const { fetchTracks } = useTracksStore();
  const { openToast, setToastMessage } = useToastStore();
  const { isBulkDeleteOn, selectedTracks, selectTrack, removeTrack } = useBulkDeleteStore();

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setSelectedGenres([]);
    setIsEditing(false);
  };

  const handleDeleteTrack = async () => {
    try {
      await deleteTrack(id);
      setToastMessage('Track deleted!', false);
      setIsDeleteOpened(false);
      fetchTracks();
    } catch (error) {
      setToastMessage('Error, please try again', true);
    } finally {
      openToast();
    }
  };

  const onEditTrack = async (data: FieldValues) => {
    setGenresError('');
    if (selectedGenres.length === 0) {
      setGenresError('Please select atleas 1 genre');
      return;
    }
    try {
      setIsLoadingToServer(true);
      const fullData = { ...data, genres: selectedGenres };
      await updateTrack(id, fullData as TrackFormData);
      setToastMessage('Track updated!', false);
      fetchTracks();
    } catch (err: any) {
      if (err.response.status === 409) {
        setToastMessage('409 error', true);
      } else {
        setToastMessage('Track wasnt updated, please try again', true);
      }
    } finally {
      setIsLoadingToServer(false);
      handleCloseEdit();
      openToast();
    }
  };

  const handleBulkDeleteSelect = () => {
    if (!selectedTracks.includes(id)) {
      selectTrack(id);
    }

    if (selectedTracks.includes(id)) {
      removeTrack(id);
    }
  };

  return (
    <>
      <li
        className="glass-track flex items-center px-4 py-2 text-black max-md:flex-col max-md:justify-center max-md:px-2 max-md:py-1"
        data-testid={`track-item-${id}`}
      >
        <div>
          <div className="flex items-center max-md:flex-col">
            <img
              src={
                coverImage
                  ? coverImage
                  : 'https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg'
              }
              alt={title}
              className="max-h-[60px] max-w-[60px] rounded-lg max-md:max-h-[150px] max-md:max-w-[100%]"
            />
            <div className="m ml-6 flex flex-col max-md:items-center">
              <div className="flex gap-2 max-md:mt-4 max-md:flex-col max-md:items-center">
                <h3
                  className="text-lg font-bold max-md:text-center"
                  data-testid={`track-item-${id}-title`}
                >
                  {title}
                </h3>
                <div className="flex items-center justify-center gap-2 text-white max-md:flex-wrap">
                  {genres.map((genre) => (
                    <span key={uuidv4()} className="grow-0 rounded-lg bg-black px-2 py-1 text-base">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-base" data-testid={`track-item-${id}-artist`}>
                {artist}
              </span>
              <div>{album && <span className="text-base">Album: {album}</span>}</div>
            </div>
          </div>
          {audioFile && <AuidoPlayer audioFile={audioFile} id={id} />}
        </div>

        <div className="ml-auto flex h-12 gap-2 max-md:mt-2 max-md:ml-0">
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1 max-md:h-10 max-md:w-10"
            onClick={handleOpenEdit}
            data-testid={`edit-track-${id}`}
          >
            <img src="/assets/edit.svg" className="edit" />
          </button>
          <UploadAudio id={id} />
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-400 p-2 max-md:h-10 max-md:w-10"
            onClick={() => setIsDeleteOpened(true)}
            data-testid={`delete-track-${id}`}
          >
            <img src="/assets/delete.svg" />
          </button>
          {isBulkDeleteOn && (
            <div className="inline-flex items-center">
              <label className="relative flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer h-8 w-8 cursor-pointer appearance-none rounded border border-white shadow transition-all checked:border-black checked:bg-black hover:shadow-md"
                  id="check"
                  onChange={handleBulkDeleteSelect}
                  checked={selectedTracks.includes(id)}
                  data-testid={`track-checkbox-${id}`}
                />
                <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-white opacity-0 peer-checked:opacity-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
              </label>
            </div>
          )}
        </div>
      </li>

      {isEditing &&
        createPortal(
          <Modal isOpen={isEditing} onClose={handleCloseEdit}>
            <TrackForm
              onClose={handleCloseEdit}
              onSetSelectedGenres={setSelectedGenres}
              selectedGenres={selectedGenres}
              onSetGenresError={setGenresError}
              genresError={genresError}
              isLoadingToServer={isLoadingToServer}
              onSubmit={onEditTrack}
              imgSrc="/assets/editBg.png"
              isEditing={true}
              slug={slug}
            />
          </Modal>,
          document.body
        )}
      {isDeleteOpened &&
        createPortal(
          <Modal isOpen={isDeleteOpened} onClose={() => setIsDeleteOpened(false)}>
            <div className="flex items-center gap-4" data-testid="confirm-dialog">
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-white text-xl font-bold text-green-400"
                onClick={() => setIsDeleteOpened(false)}
                data-testid="cancel-delete"
              >
                No
              </button>
              <p className="rounded-3xl bg-[#2d2d2d] px-6 py-5 text-center text-2xl max-md:px-3 max-md:text-lg">
                Do you want to delete {title} by {artist}
              </p>
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-white text-xl font-bold text-red-400"
                onClick={handleDeleteTrack}
                data-testid="confirm-delete"
              >
                Yes
              </button>
            </div>
          </Modal>,
          document.body
        )}
    </>
  );
}
