import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PaginationMeta } from '../../types';

export default function TracksPagination({ metaData }: { metaData: PaginationMeta }) {
  const [activePage, setActivePage] = useState(1);

  const pagesCount = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center gap-4 text-white">
      <button className="glass-btn cursor-pointer p-3">
        <img src="/assets/left.svg" />
      </button>
      <div className="glass flex min-w-[500px] items-center justify-center gap-8 px-4 py-2">
        {pagesCount.map((num) => {
          const isActive = activePage === num;

          return (
            <button
              key={uuidv4()}
              className={`${isActive ? 'bg-[#e4e3de] text-black' : ''} flex h-4 w-4 cursor-pointer items-center justify-center rounded-full p-5 text-xl`}
              disabled={isActive}
            >
              {num}
            </button>
          );
        })}
      </div>
      <button className="glass-btn cursor-pointer rounded-full p-3">
        <img src="/assets/right.svg" />
      </button>
    </div>
  );
}
