import prisma from "@/utils/prisma";
import Head from "next/head";
import Image from "next/image";
import { SwiperComponent } from "./Swiper";
import { PhoneCall } from "@phosphor-icons/react";
import { ContanctForm } from "./Contact";
import CountDown from "./CountDown";
import { Metadata, ResolvingMetadata } from "next";
import { config } from '../../../middleware';

export async function generateMetadata(
  { params: { product }, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = product;

  const productItem = await prisma.product.findFirst({
    where: {
      id: {
        equals: product,
      },
    },
    include: {
      categories: {
        include: {
          tags: true,
        },
      },
    }
  });


  return {
    title: productItem?.name,
    description: productItem?.descriptions[0],
  }
}
export default async function Home(props) {
  const {
    params: { product },
  } = props;

  const config = await prisma.configs.findFirst({
    where: {
      name: 'contact',
    },
  });


  const productItem = await prisma.product.findFirst({
    where: {
      id: {
        equals: product,
      },
    },
    include: {
      categories: {
        include: {
          tags: true,
        },
      },
    },
  });

  console.log("object", productItem);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:py-9">
      <Head>
        <title>{productItem?.title || "SomeStorePage"}</title>
      </Head>
      <div className="container mx-auto max-w-[1300px]">
        <h2
          className=" lg:hidden text-xl md:text-2xl lg:text-3xl font-heading font-bold text-center mb-4"
          data-config-id="auto-txt-12-1"
        >
          {productItem?.name}
        </h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 lg:mb-0">
            <div className="flex -mx-4 flex-col flex-wrap items-center justify-between lg:justify-start lg:items-start xl:items-center px-4 gap-4">
              <SwiperComponent
                photos={[productItem?.photo_main].concat(
                  productItem?.photo_gallery
                )}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="mt-6 lg:mt-0 max-w-[700] mb-6">
              <h2
                className="hidden lg:block mt-4 mb-4 text-xl md:text-2xl lg:text-3xl font-heading font-bold"
                data-config-id="auto-txt-12-1"
              >
                {productItem?.name}
              </h2>

              <div>
                <span
                  className="text-xs text-gray-400 tracking-wider"
                  data-config-id="auto-txt-11-1"
                >
                  {/* {productItem?.categories.name} */}
                  ფასი:
                </span>

                <p className="flex items-center mb-6">
                  <span
                    className={"text-3xl font-bold" + (productItem?.timer && productItem?.newPrice ? ' line-through text-gray-500' : ' text-parsley-500 ')}
                    data-config-id="auto-txt-15-1"
                  >
                    {productItem?.price || "-"}
                  </span>
                  <span
                    className={"ml-2 text-sm font-medium" + (productItem?.timer && productItem?.newPrice ? ' line-through text-gray-500' : ' text-parsley-500 ')}
                    data-config-id="auto-txt-14-1"
                  >
                    ლარი
                  </span>
                </p>
              </div>
              {productItem?.timer && productItem?.newPrice ? (
                <div>
                  <span
                    className="text-xs text-gray-400 tracking-wider"
                    data-config-id="auto-txt-11-1"
                  >
                    {/* {productItem?.categories.name} */}
                    აქციის ფასი:
                  </span>

                  <p className="flex items-center mb-6">
                    <span
                      className="text-3xl text-parsley-500 font-bold"
                      data-config-id="auto-txt-15-1"
                    >
                      {productItem?.newPrice || "-"}
                    </span>
                    <span
                      className="ml-2 text-sm text-parsley-500 font-medium"
                      data-config-id="auto-txt-14-1"
                    >
                      ლარი
                    </span>
                  </p>
                </div>
              ) : null}

              {productItem?.timer && productItem.endDate ? (
                <div>
                  <div className="divider"></div>
                  <div
                    className="text-xl mb-5 text-center text-gray-600 tracking-wider font-bold"
                    data-config-id="auto-txt-11-1 "
                  >
                    აქციის დასრულებამდე დარჩენილია
                  </div>
                  <CountDown endDate={productItem.endDate} />
                  <div className="divider"></div>
                </div>
              ) : null}

              <span
                className="text-xs text-gray-400 tracking-wider"
                data-config-id="auto-txt-11-1"
              >
                {/* {productItem?.categories.name} */}
                დეტალები:
              </span>
              <p
                className="whitespace-pre-wrap text-lg text-gray-600"
                data-config-id="auto-txt-16-1"
              >
                {productItem?.descriptions[0] || "Sorry no description"}
              </p>
            </div>
            {/* <span
                className="text-xs text-gray-400 tracking-wider"
                data-config-id="auto-txt-11-1"
              >
                შეფასება:
              </span> */}
            {/* <div className="flex mb-6 items-center">
              <div className="inline-flex mr-4">
                <button className="mr-1">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-5-1"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    />
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-6-1"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    />
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-7-1"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    />
                  </svg>
                </button>
                <button className="mr-1">
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-8-1"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    />
                  </svg>
                </button>
                <button>
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-9-1"
                  >
                    <path
                      d="M20 7.91679H12.4167L10 0.416779L7.58333 7.91679H0L6.18335 12.3168L3.81668 19.5835L10 15.0835L16.1834 19.5835L13.8167 12.3168L20 7.91679Z"
                      fill="#C1C9D3"
                    />
                  </svg>
                </button>
              </div>
              <span className="text-md text-gray-400" data-config-id="auto-txt-21-1">
                4.59
              </span>
            </div> */}
            {/* <div className="mb-6">
              <h4 className="mb-3 font-heading font-medium">
                <span data-config-id="auto-txt-22-1">Color:</span>
                <span className="text-gray-400" data-config-id="auto-txt-23-1">
                  Silver
                </span>
              </h4>
              <button className="inline-flex items-center justify-center p-1 rounded-full border border-gray-300">
                <div className="w-6 h-6 rounded-full bg-white" />
              </button>
              <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                <div className="w-6 h-6 rounded-full bg-orange-800" />
              </button>
              <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                <div className="w-6 h-6 rounded-full bg-blue-900" />
              </button>
              <button className="inline-flex items-center justify-center p-1 rounded-full border border-transparent">
                <div className="w-6 h-6 rounded-full bg-yellow-500" />
              </button>
            </div> */}
            {/* <div className="mb-10">
              <h4
                className="mb-3 font-heading font-medium"
                data-config-id="auto-txt-28-1"
              >
                Qty:
              </h4>
              <input
                className="w-24 px-3 py-2 text-center bg-white border-2 border-blue-500 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                type="text"
                placeholder={1}
              />
            </div> */}
            <ContanctForm productId={product} config={config} />
            {/* <div>
              <h4
                className="mb-6 font-heading font-medium"
                data-config-id="auto-txt-32-1"
              >
                More information
              </h4>
              <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 mb-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                <h3
                  className="text-lg font-heading font-medium"
                  data-config-id="auto-txt-34-1"
                >
                  Shipping &amp; returns
                </h3>
                <span>
                  <svg
                    width={12}
                    height={8}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-11-1"
                  >
                    <path
                      d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </button>
              <button className="flex w-full pl-6 lg:pl-12 pr-6 py-4 justify-between items-center leading-7 rounded-2xl border-2 border-blueGray-200 hover:border-blueGray-300">
                <h3
                  className="text-lg font-heading font-medium"
                  data-config-id="auto-txt-36-1"
                >
                  Product details
                </h3>
                <span>
                  <svg
                    width={12}
                    height={8}
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    data-config-id="auto-svg-12-1"
                  >
                    <path
                      d="M10.4594 0.289848C10.8128 -0.096616 11.3841 -0.096616 11.7349 0.289848C12.0871 0.676312 12.0897 1.30071 11.7349 1.68718L6.63794 7.21015C6.28579 7.59662 5.71584 7.59662 5.36108 7.21015L0.264109 1.68718C-0.0880363 1.30215 -0.0880363 0.676312 0.264109 0.289848C0.617558 -0.096616 1.18882 -0.096616 1.53966 0.289848L6.00147 4.81927L10.4594 0.289848Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </button>
            </div> */}
          </div>
          <hr className="my-8 w-full" />
          <div className="px-4 pb-[90px] lg:pb-0">
            <div className="mb-5">
              <span className="title text-xl font-medium px-3">
                <span>ფოტო გალერია </span>
                <span className="text-gray-500">
                  ({productItem?.photo_gallery.length || 0})
                </span>
              </span>
            </div>
            <div className="w-full flex flex-wrap">
              {productItem?.photo_gallery.map((i) => {
                return (
                  <div
                    key={i}
                    className="w-1/2 px-2 py-2 flex items-center justify-center block"
                  >
                    <div
                      key={i}
                      className="w-full rounded-2xl overflow-hidden flex items-center justify-center block"
                    >
                      <img
                        className="h-full"
                        src={i}
                        alt=""
                        data-config-id="auto-img-1-1"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
