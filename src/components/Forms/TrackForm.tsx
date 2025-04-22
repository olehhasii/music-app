import { FieldValues, useForm } from 'react-hook-form';
import InputForm from './InputForm';

import SelectGenres from './SelectGenres';
import { useEffect, useState } from 'react';
import { getTrackBySlug } from '../../api/tracks';
import { ClipLoader } from 'react-spinners';

export default function TrackForm({
  onClose,
  onSubmit,
  onSetSelectedGenres,
  onSetGenresError,
  genresError,
  isLoadingToServer,
  selectedGenres,
  imgSrc,
  isEditing,
  slug,
}: {
  onClose: () => void;
  onSubmit: (data: FieldValues) => void;
  onSetSelectedGenres: (genres: string[]) => void;
  onSetGenresError: (err: string) => void;
  isLoadingToServer: boolean;
  selectedGenres: string[];
  genresError: string;
  imgSrc: string;
  isEditing: boolean;
  slug?: string;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isEditing && slug) {
      const getPreffiledData = async () => {
        try {
          setIsLoading(true);
          const preffiledData = await getTrackBySlug(slug);
          setValue('title', preffiledData.title);
          setValue('artist', preffiledData.artist);
          setValue('album', preffiledData.album);
          setValue('coverImage', preffiledData.coverImage);
          onSetSelectedGenres(preffiledData.genres);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      getPreffiledData();
    }
  }, []);

  if (isLoading) {
    return (
      <div data-loading="true">
        <ClipLoader />
      </div>
    );
  }

  return (
    <form
      className="scrollable-form relative max-h-[90%] max-w-[400px] overflow-y-auto rounded-2xl bg-[#ddd] pb-3"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="track-form"
    >
      <img className="w-[400px] rounded-t-2xl" src={imgSrc} />
      <div className="mt-2 flex flex-col gap-2 px-6">
        <div>
          <InputForm
            name="title"
            options={{
              required: 'Title is required',
              maxLength: { value: 50, message: 'Title is too long' },
              minLength: { value: 2, message: 'Title is too short' },
            }}
            register={register}
            placeholder="Type Track Title..."
            error={errors.title?.message as string}
            dataTestId="input-title"
            errorTestid="error-title"
          />
        </div>
        <InputForm
          name="artist"
          options={{
            required: 'Artist is required',
            maxLength: { value: 50, message: 'Artist is too long' },
            minLength: { value: 2, message: 'Artist is too short' },
          }}
          register={register}
          placeholder="Type Track Artist..."
          error={errors.artist?.message as string}
          dataTestId="input-artist"
          errorTestid="error-artist"
        />
        <InputForm
          name="album"
          options={{
            maxLength: { value: 50, message: 'Album is too long' },
          }}
          register={register}
          placeholder="Type Track Album..."
          error={errors.album?.message as string}
          dataTestId="input-album"
          errorTestid="error-album"
        />
        <SelectGenres
          onSelectGenre={onSetSelectedGenres}
          selectedGenres={selectedGenres}
          onSetGenresError={onSetGenresError}
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
          dataTestId="input-cover-image"
          errorTestid="error-cover-image"
        />
        <button
          className="mx-auto w-1/2 rounded-2xl bg-[#2d2d2d] py-2 font-bold"
          type="submit"
          disabled={isLoadingToServer}
          aria-disabled={isLoadingToServer}
          data-testid="submit-button"
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
