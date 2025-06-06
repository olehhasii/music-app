import { useToastStore } from '../../store/ToastStore';

export default function ToastMessage({}: {}) {
  const { message, isToastError, closeToast, isToastOpened } = useToastStore();

  return (
    <div
      className={`${isToastOpened ? 'block' : 'hidden'} absolute right-7 bottom-10 flex max-w-[200px] flex-col rounded-4xl bg-white px-5 py-3 text-center opacity-100 max-md:fixed`}
      data-testid="toast-container"
    >
      <span
        className={`${isToastError ? 'text-red-600' : 'text-black'} font-bold`}
        data-testid={`toast-${isToastError ? 'error' : 'success'}`}
      >
        {message}
      </span>
      <button className="mt-2 cursor-pointer rounded-lg bg-[#2d2d2d]" onClick={closeToast}>
        Okay
      </button>
    </div>
  );
}
