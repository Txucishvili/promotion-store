/* eslint-disable @next/next/no-img-element */
'use client'

import { Controller, FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperClass, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { renderToHTML } from "next/dist/server/render";
import { renderToStaticMarkup } from "react-dom/server";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Dispatch, SetStateAction, useRef, useState } from "react";

const CustomPagination = (index, className) => {
  return <div className="h-36 w-36 rounded-2xl overflow-hidden flex items-center justify-center block">
    item
  </div>
}

const nextBtn = () => {

  const el: HTMLElement = document.createElement('div');
  el.className = 'next-btn';

  return el;
}

export const SwiperComponent = ({
  photos
}: any) => {
  const main = useRef<SwiperClass>();
  const gallery = useRef<SwiperClass>();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full flex flex-col flex-1 gap-2">
      <Swiper
        spaceBetween={8}
        navigation={false}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Pagination, Navigation, Controller, Thumbs]}
        className="mainSwiper flex-1 w-full rounded-2xl overflow-hidden"
      >
        {photos.map((i: string, key: number) => {
          return <SwiperSlide
            key={'a' + i + '-' + key}
            className="w-full h-full"
          >
            <div
              className="flex w-full h-full items-center justify-center rounded-2xl overflow-hidden">
              <img
                className="w-full max-h-100 sm:max-h-170 lg:max-h-160 xl:max-h-190 object-contain"
                src={i}
                alt=""
                data-config-id="auto-img-5-1"
              />
            </div>
          </SwiperSlide>
        })}
      </Swiper>
      <div className="relative">

        <div className="cursor-pointer w-8 h-8 top-center -bottom-4 -left-3 z-10 bg-white absolute rounded-full flex items-center justify-center shadow-lg arrow-prev hover:bg-parsley-200 focus:bg-parsley-300"><ArrowLeft /></div>
        <div className="cursor-pointer w-8 h-8 top-center -bottom-4 -right-3 z-10 bg-white absolute rounded-full flex items-center justify-center shadow-lg arrow-next hover:bg-parsley-200 focus-within:bg-parsley-300 "><ArrowRight /></div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={4}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          initialSlide={4}
          navigation={{ nextEl: '.arrow-next', prevEl: '.arrow-prev' }}
          className="gallerySwiper flex-1 w-full flex gap-16"
        >
          {photos.map((i: string, key: number) => {
            return <SwiperSlide
              key={i + '-' + key}
              style={{
                // width: (494 - (8 * 3)) / 4,
                // height: (494 - (8 * 3)) / 4,
              }}
              className="cursor-pointer rounded-2xl overflow-hidden">
              {((e) => {
                return <div
                className="flex items-center justify-center w-full h-full">
                  <img
                    className="w-full max-h-48 object-contain"
                    src={i}
                    alt=""
                    data-config-id="auto-img-1-1"
                  />
                </div>
              })}
            </SwiperSlide>
          })}
        </Swiper>
      </div>
      {/* <div className="w-full text-center flex items-center justify-center gap-4">
        <a
          className="inline-block"
          href="#"
        >
          <svg
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-config-id="auto-svg-3-1"
          >
            <path
              d="M1.54064 7.21015C1.18719 7.59662 0.615928 7.59662 0.265087 7.21015C-0.087058 6.82369 -0.0896663 6.19929 0.265087 5.81282L5.36206 0.289847C5.71421 -0.0966173 6.28416 -0.0966172 6.63892 0.289847L11.7359 5.81282C12.088 6.19785 12.088 6.82369 11.7359 7.21015C11.3824 7.59662 10.8112 7.59662 10.4603 7.21015L5.99853 2.68073L1.54064 7.21015Z"
              fill="currentColor"
            />
          </svg>
        </a>
        {photos.map((i) => {
          return <div
            key={i}
            className="h-36 w-36 rounded-2xl overflow-hidden flex items-center justify-center block">
            <img
              className="h-full"
              src={i}
              alt=""
              data-config-id="auto-img-1-1"
            />
          </div>
        })}
        <a
          className="inline-block "
          href="#"
        >
          <svg
            width={12}
            height={8}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-config-id="auto-svg-4-1"
          >
            <path
              d="M10.4594 0.289849C10.8128 -0.0966154 11.3841 -0.0966154 11.7349 0.289849C12.0871 0.676313 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880364 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.0966159 1.53966 0.289848L6.00147 4.81927L10.4594 0.289849Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </div> */}
    </div>
  )
}