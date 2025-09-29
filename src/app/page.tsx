"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import { getSourcePhotos } from "@/app/get-photos";
import { Comparison } from "@/components/comparison";

export default function Home() {
  const [photo, setPhoto] = useQueryState<number>(
    "photo",
    parseAsInteger.withDefault(1),
  );
  const handleImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoto(Number(event.target.value));
  };

  const sourcePhotos = getSourcePhotos(photo);
  const imageKey = `${sourcePhotos.pSource.src}-${sourcePhotos.vSource.src}`;

  return (
    <div className="flex h-dvh flex-col overflow-x-hidden bg-gradient-to-br from-25% from-[#ffffff] to-95% to-[#fff9d9]">
      <header className="flex items-center justify-between border-black/10 border-b px-3 py-2 lg:px-5">
        <div>🌓</div>
        <label htmlFor="slika" className="sr-only">
          Slika
        </label>
        <div className="grid grid-cols-1">
          <select
            id="slika"
            name="slika"
            value={photo}
            onChange={handleImageChange}
            className="-outline-offset focus-visible:-outline-offset-2 col-start-1 row-start-1 w-full appearance-none py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 outline-gray-200"
          >
            <option value="1">Slika 1</option>
            <option value="2">Slika 2</option>
            <option value="3">Slika 3</option>
            <option value="4">Slika 4</option>
            <option value="5">Slika 5</option>
            <option value="6">Slika 6</option>
            <option value="7">Slika 7</option>
            <option value="8">Slika 8</option>
            <option value="9">Slika 9</option>
            <option value="10">Slika 10</option>
          </select>
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            data-slot="icon"
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-300 sm:size-4 dark:text-gray-400"
          >
            <path
              d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
              fillRule="evenodd"
            />
          </svg>
        </div>
      </header>

      <Comparison
        key={imageKey}
        pSource={sourcePhotos.pSource}
        vSource={sourcePhotos.vSource}
        pCropped={sourcePhotos.pCropped}
        vCropped={sourcePhotos.vCropped}
      />
    </div>
  );
}
