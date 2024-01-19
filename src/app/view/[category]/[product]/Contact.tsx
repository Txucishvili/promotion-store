/* eslint-disable @next/next/no-img-element */
"use client";

import { SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { CheckCircle, Phone, PhoneCall, Truck } from "@phosphor-icons/react";
import {
  FormEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { sleep } from "@/utils";

type RequestStete = "LOADING" | "COMPLETED" | "ERROR";

export const ContanctForm = ({ productId, config }: any) => {
  const orderAreaRef = useRef<HTMLDivElement | null>(null);
  const [float, setFloat] = useState(false);
  const [requestState, setRequestState] = useState<RequestStete | null>(null);
  const [formStateErrors, setFormStateErrors] = useState(false);
  const [cityList, setCity]: any = useState(null);

  useEffect(() => {
    if (!orderAreaRef.current) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const intersecting = entry.isIntersecting;
        setFloat(!intersecting);
      }
    });

    observer.observe(orderAreaRef.current);

    if (cityList == null) {
      fetch("/api/cities", {
        method: "GET",
      })
        .then((r) => r.json())
        .then((r) => {
          setCity(r);
        })
        .catch((e) => {
          setCity([])
        });
    }
  }, [cityList]);

  const onFormSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const fullName = target.elements.namedItem("fullName") as HTMLInputElement;
    const phoneNumber = target.elements.namedItem(
      "phoneNumber"
    ) as HTMLInputElement;
    const cityRegion = target.elements.namedItem(
      "cityRegion"
    ) as HTMLInputElement;
    const formState = {
      phoneNumber: phoneNumber.value,
      fullName: fullName.value,
      productId,
      cityRegion: cityRegion.value,
    };

    if (!phoneNumber.value || !fullName.value) {
      setFormStateErrors(true);
      return;
    }

    setRequestState("LOADING");

    fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(formState),
    })
      .then(() => {
        sleep(900).then((r) => {
          setRequestState("COMPLETED");
        });
      })
      .catch((e) => {
        setRequestState("ERROR");
      });
  };

  const onOrderClick = () => {
    if (!orderAreaRef.current) return;

    const formEl = orderAreaRef.current.parentNode as HTMLFormElement;
    (formEl.elements[0] as HTMLInputElement).focus();

    const elRect = orderAreaRef.current.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();

    document.scrollingElement?.scroll({
      top:
        elRect.top - bodyRect.top - window.innerHeight / 2 + elRect.height / 2,
    });

    // orderAreaRef.current.scrollIntoView({
    //   behavior: 'smooth',
    //   block: 'center',
    //   inline: 'center'
    // })
  };

  const phoneNumbmer = useCallback(() => {
    return Number(config.phoneNumber.replaceAll(" ", ""));
  }, [config]);

  return (
    <div>
      {float ? (
        <div className="fixed z-10 outline outline-1 outline-gray-200 bottom-0 left-0 w-full lg:w-auto rounded-t-2xl lg:rounded-t-2px lg:rounded-b-2xl lg:bottom-14 lg:right-14 lg:left-auto bg-gray-50 shadow-lg p-3 gap-4">
          <div className="flex -mx-2">
            <div className="w-full flex-1 px-2">
              <button
                onClick={onOrderClick}
                className="flex w-full text-center gap-2 justify-center py-4 px-6 leading-8 font-heading font-medium tracking-tighter text-xl text-white text-center bg-parsley-500 focus:ring-2 focus:ring-parsley-700  hover:bg-parsley-600 rounded-xl"
                data-config-id="auto-txt-29-1"
              >
                <Truck size={32} />
                <span className="hidden lg:block">შეკვეთის მოთხოვნა</span>
                <span className="lg:hidden">შეკვეთა</span>
              </button>
            </div>
            <div className="px-2">
              <a
                className="flex w-full gap-2 py-4 px-6 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white  text-parsley-500 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
                href={`tel:${phoneNumbmer()}`}
              >
                <Phone size={32} />
                <span className="mr-2" data-config-id="auto-txt-31-1">
                  <span className="hidden lg:block">დარეკვა</span>
                  <span className="lg:hidden">დარეკვა</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      ) : null}
      <div
        id="orderForm"
        className="card overflow-hidden max-w-[700px] mx-auto mt-3 outline outline-1 outline-gray-200 shadow-lg mb-5 p p-6 ap-4"
      >
        {requestState == "LOADING" ? (
          <div className="overlay flex items-center justify-center absolute top-0 left-0 w-full h-full bg-base-200 opacity-60">
            <div className="loading loading-spinner text-success w-12 h-12"></div>
          </div>
        ) : null}
        {requestState == "COMPLETED" ? (
          <div className="overlay success bg-white w-full h-full absolute top-0 left-0 flex items-center justify-center">
            <div className="w-full h-full p-6 flex items-center justify-center flex-col text-center">
              <div className="mb-5">
                <CheckCircle size={112} color="green" />
              </div>
              <h3 className="text-2xl mb-3 font-bold">
                მოთხოვნა წარმატებით გაიგზავნა
              </h3>
              <p className="text-lg">ჩვენი ოპერატორი დაგიკავშირდებათ</p>
            </div>{" "}
          </div>
        ) : null}

        <form onSubmit={onFormSubmit}>
          <div className="py-3">
            <h3 className="text-center text-xl font-medium mb-3">
              შეუკვეთე ახლავე
            </h3>
            <h3 className="text-left text-gray-600 font-medium">
              <p>მიწოდების ღირებულება: </p>
              <p><b>თბილისი - 5 ₾</b></p>
              <p><b>რეგიონები - 10₾</b></p>
            </h3>
          </div>
          <div className="divider"></div>
          {requestState == "ERROR" ? (
            <ul className="mb-4 text-error">
              <li>სამწუხაროდ დაფიქსირდა შეცდომა გთხოვთ სცადოთ მოგვიანებით</li>
            </ul>
          ) : null}
          {formStateErrors ? (
            <ul className="mb-4 text-error">
              <li>გთხოვთ შეავსოთ ქვემოთ მოცემული ველები</li>
            </ul>
          ) : null}
          <div ref={orderAreaRef} className="flex flex-col gap-4">
           <div className="form-control">
              <span
                className="mr-2 mb-3 text-sm"
                data-config-id="auto-txt-31-1"
              >
                ქალაქი/რეგიონი:
              </span>
              <select 
              placeholder="აირჩიეთ მდებარეობა"
              className="form-input px-4 py-3 bg-white outline-2 outline-gray-300 focus-visible:outline-parsley-400 outline-solid rounded-lg"
              name="cityRegion">
                <option defaultValue='null' disabled>აირჩიეთ მდებარეობა</option>
                {cityList !== null ? cityList.map((c: any, key: number) => {
                  return <option key={key} value={c.id}>{c.name}</option>
                }) : null}
              </select>
            </div>
             <div className="form-control">
              <span
                className="mr-2 mb-3 text-sm"
                data-config-id="auto-txt-31-1"
              >
                მობილურის ნომერი:
              </span>
              <input
                name="phoneNumber"
                type="tel"
                placeholder="5•• •• •• ••"
                className="form-input px-4 py-3 bg-white outline-2 outline-gray-300 focus-visible:outline-parsley-400 outline-solid rounded-lg"
              />
            </div>
            
            <div className="form-control">
              <span
                className="mr-2 mb-3 text-sm"
                data-config-id="auto-txt-31-1"
              >
                სახელი გვარი:
              </span>
              <input
                name="fullName"
                type="text"
                placeholder="სახელი გვარი"
                className="form-input px-4 py-3 bg-white outline-2 outline-gray-300 focus-visible:outline-parsley-400 outline-solid rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-2 mt-6">
            <div className="w-full md:w-2/3 px-2 mb-2 md:mb-0">
              <button
                type="submit"
                className="flex w-full gap-2 justify-center py-4 px-2 leading-8 font-heading font-medium tracking-tighter text-xl text-white bg-parsley-500 focus:ring-2 focus:ring-parsley-500 focus:ring-opacity-50 hover:bg-parsley-600 rounded-xl"
                data-config-id="auto-txt-29-1"
              >
                <Truck size={32} />
                <span>შეკვეთის მოთხოვნა</span>
              </button>
            </div>
            <div className="w-full md:w-1/3 px-2">
              <a
                href={`tel:${phoneNumbmer()}`}
                className="flex w-full gap-2 py-4 px-2 items-center justify-center leading-8 font-heading font-medium tracking-tighter text-xl text-center bg-white  text-parsley-500 focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 hover:bg-opacity-60 rounded-xl"
              >
                <Phone size={32} />
                <span className="mr-2" data-config-id="auto-txt-31-1">
                  დარეკვა
                </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
