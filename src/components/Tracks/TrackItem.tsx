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

export default function TrackItem({ track }: { track: Track }) {
  const { id, title, artist, album, genres, slug, coverImage, audioFile, createdAt, updatedAt } =
    track;

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genresError, setGenresError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadingToServer, setIsLoadingToServer] = useState(false);
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);

  const { fetchTracks } = useTracksStore();
  const { openToast, setToastMessage } = useToastStore();

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
      //handleCloseEdit();
      openToast();
    }
  };

  return (
    <>
      <li
        className="glass-track flex items-center justify-between px-4 py-2 text-white"
        data-testid={`track-item-${id}`}
      >
        <div className="flex items-center">
          <img
            src={
              coverImage
                ? coverImage
                : 'https://upload.wikimedia.org/wikipedia/commons/b/b6/12in-Vinyl-LP-Record-Angle.jpg'
            }
            alt={title}
            className="max-h-[60px] max-w-[60px] rounded-lg"
          />
          <div className="ml-6 flex flex-col">
            <h3 className="text-xl font-bold" data-testid={`track-item-${id}-title`}>
              {title}
            </h3>
            <span className="text-lg" data-testid={`track-item-${id}-artist`}>
              {artist}
            </span>
            {album && <span className="text-lg">Album: {album}</span>}
          </div>
        </div>
        <div className="flex gap-3">
          {genres.map((genre) => (
            <span key={uuidv4()} className="rounded-lg bg-black px-4 py-1 text-xl">
              {genre}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1"
            onClick={handleOpenEdit}
          >
            <img src="/assets/edit.svg" className="" />
          </button>
          <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-1">
            <img src="/assets/upload.svg" />
          </button>
          <button
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-400 p-2"
            onClick={() => setIsDeleteOpened(true)}
          >
            <img src="/assets/delete.svg" />
          </button>
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
            <div className="flex items-center gap-4">
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-white text-xl font-bold text-green-400"
                onClick={() => setIsDeleteOpened(false)}
              >
                No
              </button>
              <p className="rounded-3xl bg-[#2d2d2d] px-6 py-5 text-2xl">
                Do you want to delete {title} by {artist}
              </p>
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-white text-xl font-bold text-red-400"
                onClick={handleDeleteTrack}
              >
                Yes
              </button>
            </div>
          </Modal>,
          document.body
        )}
      {/* /*{isToastOpened && createPortal(<ToastMessage />, document.body)}*/}
    </>
  );
}
