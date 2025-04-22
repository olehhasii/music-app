import axios from 'axios';
import { API_BASE_URL, DELETE_FILE_URL } from '../../api/config';
import { useTracksStore } from '../../store/TracksStore';
import { useToastStore } from '../../store/ToastStore';
import { useEffect, useRef, useState } from 'react';
import { useAudioPlayerStore } from '../../store/AudioPlayerStore';

export default function AuidoPlayer({ audioFile, id }: { audioFile: string; id: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const { fetchTracks } = useTracksStore();
  const { setToastMessage, openToast } = useToastStore();
  const { currentId, setCurrentId } = useAudioPlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const handleStartPlay = () => {
    setCurrentId(id);
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handleStoptPlay = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  const updateProgress = () => {
    const duration = audioRef.current?.duration as number;
    const currentTime = audioRef.current?.currentTime as number;
    const progress = (currentTime / duration) * 100;
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `${progress}%`;
    }
  };

  const handleTimeEnded = () => {
    setIsPlaying(false);
    if (progressBarRef.current) {
      progressBarRef.current.style.width = `0`;
    }
  };

  useEffect(() => {
    if (isPlaying && currentId !== id) {
      handleStoptPlay();
    }
  }, [currentId]);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener('timeupdate', updateProgress);
    audio?.addEventListener('ended', handleTimeEnded);
    return () => {
      audio?.removeEventListener('timeupdate', updateProgress);
      audio?.removeEventListener('ended', handleTimeEnded);
    };
  }, []);

  const handleDeleteAudio = async () => {
    try {
      await axios.delete(DELETE_FILE_URL(id));
      await fetchTracks();
      setToastMessage('Audio file deleted', false);
    } catch (error) {
      setToastMessage('Error, try again', true);
    } finally {
      openToast();
    }
  };

  return (
    <div className="mt-2 flex items-center gap-4" data-testid={`audio-player-${id}`}>
      <audio src={`${API_BASE_URL}/files/${audioFile}`} ref={audioRef}></audio>
      {!isPlaying && (
        <button
          onClick={handleStartPlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-2 max-md:h-10 max-md:w-10"
          data-testid={`play-button-${id}`}
        >
          <img src="/assets/play.svg" alt="play" />
        </button>
      )}
      {isPlaying && (
        <button
          onClick={handleStoptPlay}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-3 max-md:h-10 max-md:w-10"
          data-testid={`pause-button-${id}`}
        >
          <img src="/assets/pause.svg" alt="pause" />
        </button>
      )}
      <div className="glass-progress h-2 w-[300px]">
        <div
          className="h-full w-0 rounded-2xl bg-black"
          id="progressBar"
          ref={progressBarRef}
          data-testid={`audio-progress-${id}`}
        ></div>
      </div>

      <div className="">
        <button
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-red-400 p-1 max-md:h-10 max-md:w-10"
          onClick={handleDeleteAudio}
        >
          <img src="/assets/deleteFile.png" alt="delete audio" />
        </button>
      </div>
    </div>
  );
}
