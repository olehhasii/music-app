import { FieldValues, useForm } from 'react-hook-form';
import InputForm from './InputForm';
import { useState } from 'react';
import SelectGenres from './SelectGenres';
import { createTrack } from '../../api/tracks';
import { TrackFormData } from '../../types';
import { useTracksStore } from '../../store/TracksStore';
import { useToastStore } from '../../store/ToastStore';

export default function CreateTrackForm({ onClose }: { onClose: () => void }) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genresError, setGenresError] = useState('');
  const [isLoadingToServer, setIsLoadingToServer] = useState(false);
  const { fetchTracks } = useTracksStore();
  const { openToast, setToastMessage } = useToastStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    setGenresError('');
    if (selectedGenres.length === 0) {
      setGenresError('Please select atleas 1 genre');
      return;
    }
    try {
      setIsLoadingToServer(true);
      const fullData = { ...data, genres: selectedGenres };
      //const res = await createTrack(fullData as TrackFormData);
      await createTrack(fullData as TrackFormData);
      //onResponse({ sent: true, msg: 'Track created!' });
      setToastMessage('Track created!', false);
      fetchTracks();
    } catch (err: any) {
      if (err.response.status === 409) {
        //onResponse({ sent: true, msg: 'A track with this title already exists', isError: true });
        setToastMessage('A track with this title already exists', true);
      } else {
        //onResponse({ sent: true, msg: 'Track wasnt create, please try again', isError: true });
        setToastMessage('Track wasnt create, please try again', true);
      }
    } finally {
      setIsLoadingToServer(false);
      onClose();
      openToast();
    }
  };

  return (
    <form
      className="scrollable-form relative max-h-[90%] max-w-[400px] overflow-y-auto rounded-2xl bg-[#ddd] pb-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img src="/assets/form-createTrack.png" className="w-[400px] rounded-t-2xl" />
      <div className="mt-2 flex flex-col gap-2 px-6">
        <div>
          <InputForm
            name="title"
            options={{
              required: 'Title is required',
              maxLength: { value: 30, message: 'Title is too long' },
              minLength: { value: 2, message: 'Title is too short' },
            }}
            register={register}
            placeholder="Type Track Title..."
            error={errors.title?.message as string}
          />
        </div>
        <InputForm
          name="artist"
          options={{
            required: 'Artist is required',
            maxLength: { value: 30, message: 'Artist is too long' },
            minLength: { value: 2, message: 'Artist is too short' },
          }}
          register={register}
          placeholder="Type Track Artist..."
          error={errors.artist?.message as string}
        />
        <InputForm
          name="album"
          options={{
            maxLength: { value: 30, message: 'Album is too long' },
            minLength: { value: 2, message: 'Album is too short' },
          }}
          register={register}
          placeholder="Type Track Album..."
          error={errors.album?.message as string}
        />
        <SelectGenres
          onSelectGenre={setSelectedGenres}
          selectedGenres={selectedGenres}
          onSetGenresError={setGenresError}
          error={genresError}
        />
        <InputForm
          name="coverImage"
          options={{
            pattern: {
              value:
                /^(https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&\/=]*)|)$/,
              message: 'Only URLs are allowed',
            },
          }}
          register={register}
          placeholder="Paste url for image cover..."
          error={errors.coverImage?.message as string}
        />
        <button
          className="mx-auto w-1/2 rounded-2xl bg-[#2d2d2d] py-2 font-bold"
          type="submit"
          disabled={isLoadingToServer}
        >
          Submit
        </button>
        <button
          className="absolute top-[10px] left-[20px] h-7 w-7 cursor-pointer rounded-full bg-white text-xl font-bold text-black"
          onClick={onClose}
        >
          X
        </button>
      </div>
    </form>
  );
}
