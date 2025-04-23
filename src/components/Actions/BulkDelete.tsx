import { useState } from 'react';
import { getAllTrackByLimit } from '../../api/tracks';
import { useBulkDeleteStore } from '../../store/BuldkDeleteStore';
import { useTracksStore } from '../../store/TracksStore';
import { Track } from '../../types';
import { createPortal } from 'react-dom';
import Modal from '../Modal/Modal';
import axios from 'axios';
import { BULK_DELETE_URL } from '../../api/config';
import { useToastStore } from '../../store/ToastStore';

export default function BulkDelete() {
  const [isDeleteOpened, setIsDeleteOpened] = useState(false);
  const { toggleBulkDelete, isBulkDeleteOn, selectedTracks, selectAllTracks, clearSelectedTracks } =
    useBulkDeleteStore();
  const { setToastMessage, openToast } = useToastStore();
  const { fetchTracks } = useTracksStore();

  const handleSelectAll = async () => {
    try {
      const { data: allTracks } = await getAllTrackByLimit(); // geting ids not only for the current page, but for all pages
      const ids = allTracks.map((track: Track) => track.id);
      selectAllTracks(ids);
    } catch (e) {
      console.error('Failed to fetch', e);
    }
  };

  const handleBulkDelete = async () => {
    try {
      await axios.post(BULK_DELETE_URL, { ids: selectedTracks });
      setToastMessage('Tracks deleted!', false);
      setIsDeleteOpened(false);
      fetchTracks();
    } catch (error) {
      setToastMessage('Error, please try again', true);
    } finally {
      openToast();
    }
  };

  return (
    <div className="flex gap-2">
      <div className="flex items-center gap-2">
        <span>Toggle bulk delete</span>
        <label className="relative inline-block h-8 w-16">
          <input
            type="checkbox"
            className="h-0 w-0 opacity-0"
            data-testid="select-mode-toggle"
            onChange={() => {
              toggleBulkDelete();
            }}
          />
          <span
            className={`${isBulkDeleteOn ? 'bg-black before:translate-x-7' : ''} absolute top-0 right-0 bottom-0 left-0 cursor-pointer rounded-4xl bg-[#ccc] transition-all duration-300 before:absolute before:bottom-0.5 before:left-1 before:h-7 before:w-7 before:rounded-full before:bg-white before:duration-300 before:content-['']`}
          ></span>
        </label>
      </div>
      {isBulkDeleteOn && (
        <button
          className="cursor-pointer rounded-lg bg-[#2d2d2d] px-4 py-2 text-sm font-bold max-md:px-3 max-md:text-sm"
          onClick={handleSelectAll}
          data-testid="select-all"
        >
          Select All
        </button>
      )}
      {selectedTracks.length > 0 && (
        <button
          className="cursor-pointer rounded-lg bg-[#2d2d2d] px-4 py-2 text-sm font-bold max-md:px-3 max-md:text-sm"
          onClick={clearSelectedTracks}
        >
          Undo Selection
        </button>
      )}
      {selectedTracks.length > 0 && (
        <button
          className="cursor-pointer rounded-lg bg-red-800 px-4 py-2 text-sm font-bold max-md:px-3 max-md:text-sm"
          onClick={() => setIsDeleteOpened(true)}
          data-testid="bulk-delete-button"
        >
          Delete Selected Tracks
        </button>
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
                Do you want to delete selected tracks?
              </p>
              <button
                className="h-10 w-10 cursor-pointer rounded-full bg-white text-xl font-bold text-red-400"
                onClick={handleBulkDelete}
                data-testid="confirm-delete"
              >
                Yes
              </button>
            </div>
          </Modal>,
          document.body
        )}
    </div>
  );
}
