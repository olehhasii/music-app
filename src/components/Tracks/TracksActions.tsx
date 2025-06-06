import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import { createPortal } from 'react-dom';
import CreateTrackForm from '../Forms/TrackForm';

import { useToastStore } from '../../store/ToastStore';
import { useTracksStore } from '../../store/TracksStore';
import { createTrack } from '../../api/tracks';
import { FieldValues } from 'react-hook-form';
import { TrackFormData } from '../../types';
import Sort from '../Actions/Sort';
import Filter from '../Actions/Filter';
import BulkDelete from '../Actions/BulkDelete';

export default function TracksActions() {
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genresError, setGenresError] = useState('');

  const { fetchTracks, isLoading } = useTracksStore();
  const { openToast, setToastMessage } = useToastStore();

  const handleCloseForm = () => {
    setIsFormOpened(false);
    setSelectedGenres([]);
  };

  const onSubmit = async (data: FieldValues) => {
    setGenresError('');
    if (selectedGenres.length === 0) {
      setGenresError('Please select atleas 1 genre');
      return;
    }
    try {
      const fullData = { ...data, genres: selectedGenres };
      await createTrack(fullData as TrackFormData);
      setToastMessage('Track created!', false);
      fetchTracks();
    } catch (err: any) {
      if (err.response.status === 409) {
        setToastMessage('A track with this title already exists', true);
      } else {
        setToastMessage('Track wasnt create, please try again', true);
      }
    } finally {
      handleCloseForm();
      openToast();
    }
  };

  const clearUrlParams = () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
    fetchTracks();
  };

  return (
    <div className="glass mb-2 w-full px-4 py-2">
      <div className="flex w-full flex-wrap items-center gap-3 max-md:flex-wrap max-md:gap-2">
        <button
          className="cursor-pointer rounded-lg bg-[#2d2d2d] px-4 py-2 font-bold max-md:px-3 max-md:text-sm"
          onClick={() => setIsFormOpened(true)}
          data-testid="create-track-button"
        >
          Create Track
        </button>
        <Sort />
        <Filter />

        <div>
          <button
            className="cursor-pointer rounded-lg bg-[#2d2d2d] px-4 py-2 font-bold max-md:px-3 max-md:text-sm"
            onClick={clearUrlParams}
          >
            Clear all filters and sorting
          </button>
        </div>
        <BulkDelete />
      </div>

      {isFormOpened &&
        createPortal(
          <Modal isOpen={isFormOpened} onClose={handleCloseForm}>
            <CreateTrackForm
              onClose={handleCloseForm}
              onSetGenresError={setGenresError}
              isLoadingToServer={isLoading}
              onSetSelectedGenres={setSelectedGenres}
              onSubmit={onSubmit}
              selectedGenres={selectedGenres}
              genresError={genresError}
              imgSrc="/assets/form-createTrack.png"
              isEditing={false}
            />
          </Modal>,
          document.body
        )}
    </div>
  );
}
