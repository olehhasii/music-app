import { RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

type InputFormProps = {
  name: string;
  options?: RegisterOptions;
  placeholder: string;
  register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn;
  error: string;
};

export default function InputForm({ register, name, options, placeholder, error }: InputFormProps) {
  return (
    <div>
      <input
        className="h-13 w-full rounded-xl border-0 bg-white px-5 py-1.5 text-base font-bold text-black opacity-70 outline-none focus:opacity-100"
        placeholder={placeholder}
        {...register(name, options)}
      />
      {error && <span className="ml-2 font-bold text-red-500">{error}</span>}
    </div>
  );
}
