"use client";

import { parseAsInteger, parseAsStringLiteral, useQueryState } from "nuqs";
import { getSourcePhotos } from "@/app/get-photos";
import { Comparison } from "@/components/comparison";
import {
  GridContainer,
  GridRow,
  PlusGridItem,
} from "@/components/grid-container";
import { NavButton } from "@/components/nav-button";
import { Columns2Icon, Rows2Icon } from "@/components/svg";

const modes = ["horizontal", "vertical"] as const;

export default function Home() {
  const [mode, setMode] = useQueryState<(typeof modes)[number]>(
    "mode",
    parseAsStringLiteral(modes).withDefault("horizontal"),
  );
  const [photo, setPhoto] = useQueryState<number>(
    "photo",
    parseAsInteger.withDefault(1),
  );
  const handleImageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoto(Number(event.target.value));
  };

  const sourcePhotos = getSourcePhotos(photo);
  const imageKey = `${sourcePhotos.pSource.src}-${sourcePhotos.vSource.src}-${mode}`;

  return (
    <div className="h-dvh pb-2 overflow-x-hidden bg-gradient-to-b from-25% from-[#ffffff] to-95% to-[#fff9d9]">
      <GridContainer>
        <GridRow className="relative flex justify-between px-1.5 md:px-4">
          <PlusGridItem>
            <div aria-hidden="true" className="logo" />
          </PlusGridItem>
          <div className="ml-auto flex gap-x-2 md:gap-x-4">
            <PlusGridItem
              selected={mode === "horizontal"}
              className="group w-12 data-selected:fill-blue-500 md:w-20"
            >
              <NavButton
                onClick={() => setMode("horizontal")}
                label="Comparison View"
              >
                <Columns2Icon className="mx-auto size-5 text-neutral-400 group-data-[selected]:text-blue-500" />
              </NavButton>
            </PlusGridItem>
            <PlusGridItem
              selected={mode === "vertical"}
              className="group w-12 data-selected:fill-blue-500 md:w-20"
            >
              <NavButton
                onClick={() => setMode("vertical")}
                label="Comparison View"
              >
                <Rows2Icon className="mx-auto size-5 text-neutral-400 group-data-[selected]:text-blue-500" />
              </NavButton>
            </PlusGridItem>
            <label htmlFor="slika" className="sr-only">
              Slika
            </label>
            <PlusGridItem className="grid grid-cols-1 focus-within:fill-blue-500">
              <select
                id="slika"
                name="slika"
                value={photo}
                onChange={handleImageChange}
                className="peer col-start-1 row-start-1 w-full appearance-none py-1.5 pr-10 pl-3 text-base text-neutral-600 focus:outline-none"
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
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-300 sm:size-4 peer-focus:text-blue-500"
              >
                <path
                  d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
              </svg>
            </PlusGridItem>
          </div>
        </GridRow>
      </GridContainer>

      <Comparison
        key={imageKey}
        pSource={sourcePhotos.pSource}
        vSource={sourcePhotos.vSource}
        pCropped={sourcePhotos.pCropped}
        vCropped={sourcePhotos.vCropped}
        orientation={mode}
      />
    </div>
  );
}
