import prisma from "@/utils/prisma";
import Head from "next/head";
import Image from "next/image";
import { SwiperComponent } from "./Swiper";
import { PhoneCall } from "@phosphor-icons/react";
import { ContanctForm } from "./Contact";
import CountDown from "./CountDown";
import { Metadata, ResolvingMetadata } from "next";
import { config } from "../../../middleware";
import { Fragment, useRef } from "react";
import { title } from "process";

import { Noto_Sans_Georgian } from "next/font/google";

// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import Quill from "quill";

const NotoSansFont = Noto_Sans_Georgian({
  subsets: ["georgian"],
  variable: "--font-NotoSans",
});

export async function generateMetadata(
  { params: { product }, searchParams }: any,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = product;

  const productItem = await prisma.product
    .findFirst({
      where: {
        id: {
          equals: product,
        },
      },
      include: {
        categories: {
          include: {
            tags: false,
          },
        },
      },
    })
    .catch((e) => {
      return null;
    });

  if (!productItem) {
    return {
      title: "Promotion Store - Not Found",
    };
  }

  return {
    title: productItem?.name,
    description: `შეიძინეთ - ${productItem?.name} პროდუქცია ადგილზე მიტანის სერვისით`,
    openGraph: {
      title: productItem?.name,
      description: `შეიძინეთ - ${productItem?.name} პროდუქცია ადგილზე მიტანის სერვისით`,
      // url: 'https://example.org',
      // siteName: 'Site.js',
      images: [
        {
          url: productItem.photo_main,
          // width: 800,
          // height: 600,
          alt: productItem.name,
        },
        {
          url: productItem.photo_main,
          // width: 1800,
          // height: 1600,
          alt: productItem.name,
        },
      ],
      locale: "ge_KA",
      type: "website",
    },
  };
}

const noPhotoSRC = 'https://i.ibb.co/xq8K792/no-photo-available.png';

export default async function Home(props) {
  const {
    params: { product },
  } = props;
  const dateNow = new Date();

  const config = await prisma.configs
    .findFirst({
      where: {
        name: "contact",
      },
    })
    .catch((e) => {
      return null;
    });

  const productItem = await prisma.product
    .findFirst({
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
    })
    .catch((e) => {
      return null;
    });

    const endDate = typeof productItem?.endDate == 'string' ? new Date(productItem?.endDate) : productItem?.endDate;

  const isSale = productItem && productItem.timer && productItem?.endDate  && endDate && (new Date().getTime() <= endDate.getTime()) ? true : false;
    console.log(productItem?.endDate?.getTime())
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 lg:py-9 ${NotoSansFont.variable} font-noto_sans`}
    >
      <div className="logo-area w-60 mt-4 ">
        <svg
          className="hover:scale-[1.09] transition-all"
          viewBox="0 0 943 380"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* <svg width="943" height="380" viewBox="0 0 943 380" fill="none" xmlns="http://www.w3.org/2000/svg"> */}
          <path
            d="M188.333 302.667C188.333 318.8 175.133 332 159 332C142.867 332 129.667 318.8 129.667 302.667C129.667 286.533 142.867 273.333 159 273.333C175.133 273.333 188.333 286.533 188.333 302.667ZM247 273.333C230.867 273.333 217.667 286.533 217.667 302.667C217.667 318.8 230.867 332 247 332C263.133 332 276.333 318.8 276.333 302.667C276.333 286.533 263.133 273.333 247 273.333ZM352.56 73.3333L299.76 264H139.013C113.347 264 91.4933 244.787 88.12 219.413L65.5333 50.3067C65.0933 46.64 61.8667 44 58.2 44H30.3333V0H58.2C83.8667 0 105.72 19.2133 109.093 44.5867L112.907 73.3333H352.56ZM294.773 117.333H118.773L131.68 213.693C132.12 217.36 135.347 220 139.013 220H266.32L294.773 117.333ZM38.9867 73.3333H1V117.333H44.8533L38.9867 73.3333ZM58.4933 220H1V264H76.9733C67.5867 252.707 61.1333 238.773 58.9333 223.373L58.4933 220ZM48.6667 146.667H1V190.667H54.68L48.8133 146.667H48.6667Z"
            fill="#00933B"
          />
          <path d="M0 70H39L47.5 119.5H0V70Z" fill="#FCCF03" />
          <path
            d="M0 218H59.027L59.4788 224.237C61.7375 240.068 70.3629 254.391 80 266H0V218Z"
            fill="#FCCF03"
          />
          <path
            d="M0 145.385H48.9382H49.0888L55.112 190.615H0V145.385Z"
            fill="#FCCF03"
          />
          <g filter="url(#filter0_d_27_32)">
            <rect
              x="237"
              y="190"
              width="86.4"
              height="86.4"
              rx="43.2"
              fill="white"
            />
          </g>
          <path
            d="M280.529 218.326C283.769 218.34 286.919 219.391 289.518 221.325C292.117 223.259 294.028 225.975 294.972 229.075L303.246 232.081C302.972 227.7 301.441 223.491 298.834 219.96C296.228 216.428 292.658 213.724 288.552 212.171C284.446 210.618 279.98 210.284 275.689 211.207C271.398 212.13 267.464 214.272 264.361 217.376C261.257 220.48 259.115 224.413 258.192 228.704C257.268 232.995 257.603 237.462 259.156 241.567C260.708 245.673 263.413 249.243 266.944 251.85C270.476 254.456 274.685 255.988 279.066 256.261L276.074 247.972C272.605 246.905 269.633 244.629 267.7 241.557C265.766 238.485 264.999 234.821 265.539 231.231C266.078 227.642 267.888 224.365 270.639 221.997C273.39 219.628 276.899 218.326 280.529 218.326Z"
            fill="black"
          />
          <path
            d="M280.529 263.935C274.515 263.935 268.637 262.151 263.636 258.81C258.636 255.469 254.739 250.721 252.438 245.165C250.136 239.609 249.534 233.495 250.707 227.597C251.881 221.699 254.777 216.281 259.029 212.029C263.281 207.776 268.699 204.881 274.597 203.707C280.495 202.534 286.609 203.136 292.165 205.438C297.721 207.739 302.469 211.636 305.81 216.636C309.151 221.637 310.935 227.515 310.935 233.529C310.935 233.974 310.885 234.407 310.866 234.848L318.316 237.558C319.162 229.725 317.557 221.822 313.723 214.94C309.888 208.058 304.013 202.534 296.907 199.132C289.801 195.73 281.814 194.617 274.049 195.945C266.283 197.274 259.121 200.979 253.55 206.55C247.979 212.121 244.274 219.283 242.945 227.048C241.617 234.814 242.73 242.801 246.132 249.907C249.535 257.013 255.058 262.888 261.94 266.723C268.822 270.557 276.725 272.162 284.558 271.316L281.848 263.866C281.407 263.885 280.974 263.935 280.529 263.935Z"
            fill="black"
          />
          <path
            d="M378 269.211L307.214 243.5C304.795 242.621 302.175 242.451 299.662 243.008C297.149 243.566 294.847 244.829 293.027 246.649C291.206 248.468 289.943 250.77 289.384 253.282C288.826 255.795 288.995 258.415 289.873 260.835L315.611 331.6L341.998 305.213L360.896 324.11L370.463 314.543L351.613 295.625L378 269.211Z"
            fill="black"
          />
          <path
            d="M404.562 177V75.1818H477.943V97.4545H432.205V114.955H474.165V137.227H432.205V154.727H477.744V177H404.562ZM532.101 177H502.272L535.88 75.1818H573.664L607.272 177H577.442L555.169 103.222H554.374L532.101 177ZM526.533 136.83H582.613V157.511H526.533V136.83ZM682 107C681.734 103.686 680.492 101.1 678.271 99.2443C676.083 97.3883 672.752 96.4602 668.278 96.4602C665.428 96.4602 663.091 96.8082 661.268 97.5043C659.478 98.1671 658.153 99.0786 657.291 100.239C656.429 101.399 655.982 102.724 655.949 104.216C655.882 105.442 656.098 106.553 656.595 107.547C657.125 108.508 657.954 109.386 659.081 110.182C660.208 110.944 661.649 111.64 663.406 112.27C665.163 112.9 667.251 113.463 669.67 113.96L678.022 115.75C683.657 116.943 688.479 118.518 692.49 120.473C696.5 122.429 699.781 124.732 702.333 127.384C704.886 130.002 706.758 132.952 707.951 136.233C709.178 139.514 709.807 143.094 709.841 146.972C709.807 153.667 708.134 159.334 704.819 163.974C701.505 168.615 696.765 172.144 690.6 174.564C684.469 176.983 677.094 178.193 668.477 178.193C659.627 178.193 651.905 176.884 645.309 174.266C638.747 171.647 633.643 167.62 629.997 162.185C626.384 156.716 624.561 149.723 624.528 141.205H650.778C650.944 144.32 651.723 146.938 653.115 149.06C654.507 151.181 656.462 152.788 658.981 153.882C661.533 154.976 664.566 155.523 668.079 155.523C671.029 155.523 673.498 155.158 675.487 154.429C677.476 153.7 678.984 152.689 680.011 151.396C681.038 150.104 681.569 148.629 681.602 146.972C681.569 145.414 681.055 144.055 680.061 142.895C679.1 141.702 677.509 140.641 675.288 139.713C673.067 138.752 670.068 137.857 666.289 137.028L656.147 134.841C647.132 132.885 640.023 129.621 634.819 125.047C629.649 120.44 627.08 114.159 627.113 106.205C627.08 99.7415 628.804 94.0904 632.284 89.2514C635.797 84.3793 640.653 80.5843 646.85 77.8665C653.082 75.1487 660.224 73.7898 668.278 73.7898C676.498 73.7898 683.607 75.1652 689.606 77.9162C695.605 80.6671 700.229 84.545 703.477 89.5497C706.758 94.5213 708.415 100.338 708.449 107H682ZM730.179 75.1818H761.003L780.89 116.545H781.685L801.571 75.1818H832.395L795.009 144.983V177H767.566V144.983L730.179 75.1818Z"
            fill="#00933B"
          />
          <path
            d="M400 228.994L828 216V323.006L400 336V228.994Z"
            fill="#FCCF03"
          />
          <path
            d="M490.869 267C490.71 265.011 489.964 263.46 488.632 262.347C487.32 261.233 485.321 260.676 482.636 260.676C480.926 260.676 479.524 260.885 478.43 261.303C477.357 261.7 476.561 262.247 476.044 262.943C475.527 263.639 475.259 264.435 475.239 265.33C475.199 266.065 475.328 266.732 475.626 267.328C475.945 267.905 476.442 268.432 477.118 268.909C477.794 269.366 478.659 269.784 479.713 270.162C480.767 270.54 482.02 270.878 483.472 271.176L488.483 272.25C491.864 272.966 494.757 273.911 497.163 275.084C499.57 276.257 501.538 277.639 503.07 279.23C504.601 280.801 505.724 282.571 506.44 284.54C507.176 286.509 507.554 288.656 507.574 290.983C507.554 295 506.55 298.401 504.561 301.185C502.572 303.969 499.729 306.087 496.03 307.538C492.351 308.99 487.926 309.716 482.756 309.716C477.446 309.716 472.813 308.93 468.855 307.359C464.918 305.788 461.855 303.372 459.668 300.111C457.5 296.83 456.406 292.634 456.386 287.523H472.136C472.236 289.392 472.703 290.963 473.538 292.236C474.374 293.509 475.547 294.473 477.058 295.129C478.589 295.786 480.409 296.114 482.517 296.114C484.287 296.114 485.768 295.895 486.962 295.457C488.155 295.02 489.06 294.413 489.676 293.638C490.293 292.862 490.611 291.977 490.631 290.983C490.611 290.048 490.303 289.233 489.706 288.537C489.129 287.821 488.175 287.185 486.842 286.628C485.51 286.051 483.71 285.514 481.443 285.017L475.358 283.705C469.949 282.531 465.683 280.572 462.561 277.828C459.459 275.064 457.918 271.295 457.938 266.523C457.918 262.645 458.952 259.254 461.04 256.351C463.148 253.428 466.061 251.151 469.78 249.52C473.518 247.889 477.804 247.074 482.636 247.074C487.568 247.074 491.834 247.899 495.433 249.55C499.033 251.2 501.807 253.527 503.756 256.53C505.724 259.513 506.719 263.003 506.739 267H490.869ZM520.612 261.273V247.909H573.709V261.273H555.334V309H538.987V261.273H520.612ZM644.662 278.455C644.662 285.256 643.339 290.993 640.694 295.666C638.049 300.32 634.48 303.849 629.985 306.256C625.491 308.642 620.48 309.835 614.951 309.835C609.383 309.835 604.352 308.632 599.858 306.226C595.383 303.8 591.823 300.26 589.179 295.607C586.554 290.933 585.241 285.216 585.241 278.455C585.241 271.653 586.554 265.926 589.179 261.273C591.823 256.599 595.383 253.07 599.858 250.683C604.352 248.277 609.383 247.074 614.951 247.074C620.48 247.074 625.491 248.277 629.985 250.683C634.48 253.07 638.049 256.599 640.694 261.273C643.339 265.926 644.662 271.653 644.662 278.455ZM627.599 278.455C627.599 274.795 627.112 271.713 626.137 269.207C625.183 266.682 623.761 264.773 621.872 263.48C620.002 262.168 617.696 261.511 614.951 261.511C612.207 261.511 609.89 262.168 608.001 263.48C606.132 264.773 604.71 266.682 603.735 269.207C602.781 271.713 602.304 274.795 602.304 278.455C602.304 282.114 602.781 285.206 603.735 287.732C604.71 290.237 606.132 292.146 608.001 293.459C609.89 294.751 612.207 295.398 614.951 295.398C617.696 295.398 620.002 294.751 621.872 293.459C623.761 292.146 625.183 290.237 626.137 287.732C627.112 285.206 627.599 282.114 627.599 278.455ZM660.735 309V247.909H687.104C691.639 247.909 695.606 248.734 699.006 250.385C702.407 252.036 705.052 254.412 706.941 257.514C708.83 260.616 709.775 264.335 709.775 268.67C709.775 273.045 708.8 276.734 706.852 279.737C704.923 282.74 702.208 285.007 698.708 286.538C695.228 288.07 691.161 288.835 686.508 288.835H670.758V275.949H683.167C685.116 275.949 686.776 275.71 688.149 275.233C689.541 274.736 690.604 273.95 691.34 272.876C692.096 271.803 692.474 270.401 692.474 268.67C692.474 266.92 692.096 265.499 691.34 264.405C690.604 263.291 689.541 262.476 688.149 261.959C686.776 261.422 685.116 261.153 683.167 261.153H677.32V309H660.735ZM696.531 280.96L711.803 309H693.786L678.872 280.96H696.531ZM725.245 309V247.909H769.273V261.273H741.83V271.773H767.006V285.136H741.83V295.636H769.154V309H725.245Z"
            fill="#003500"
          />
          <path d="M400 344L829.5 331.5V339.5L400 352V344Z" fill="#FCCF03" />
          <path
            d="M826.025 358.624L806.886 282.588C805.904 278.687 808.271 274.728 812.172 273.746L848.268 264.661C870.926 288.805 881.969 316.963 880.254 349.535C879.387 351.547 877.628 353.145 875.34 353.722L834.869 363.909C830.966 364.892 827.006 362.525 826.025 358.624ZM831.751 282.816C833.042 285.255 836.066 286.186 838.504 284.893C840.943 283.6 841.875 280.578 840.582 278.139C839.291 275.7 836.267 274.769 833.828 276.062C831.388 277.351 830.46 280.377 831.751 282.816Z"
            fill="#FF7058"
          />
          <path
            d="M846.237 274.49L848.334 264.341L852.841 242.529C853.675 238.493 857.977 236.215 861.784 237.794L891.928 250.296C896.672 252.263 900.581 255.823 902.983 260.359L937.268 325.109C938.964 328.314 937.743 332.285 934.538 333.983L891.505 356.77C888.299 358.466 884.328 357.245 882.631 354.04L848.346 289.291C845.945 284.752 845.198 279.52 846.237 274.49ZM859.632 255.224C860.923 257.663 863.947 258.594 866.386 257.302C868.824 256.009 869.756 252.986 868.463 250.548C867.172 248.109 864.148 247.178 861.709 248.47C859.272 249.761 858.341 252.785 859.632 255.224Z"
            fill="#E74E3A"
          />
          <path
            d="M829.291 222.308C826.422 223.421 823.194 221.997 822.081 219.128C820.968 216.259 822.392 213.031 825.261 211.918C828.13 210.805 831.358 212.229 832.471 215.098C833.584 217.967 832.16 221.195 829.291 222.308Z"
            fill="#003500"
          />
          <path
            d="M836.836 282.208C837.391 281.993 837.833 281.514 837.976 280.892C842.678 260.424 835.417 234.52 830.643 220.838C842.838 227.594 854.761 240.145 861.852 253.946C862.321 254.858 863.434 255.209 864.353 254.748C865.264 254.279 865.624 253.16 865.155 252.248C856.785 235.952 842.569 221.834 828.061 215.402C827.375 215.1 826.576 215.239 826.033 215.751C825.49 216.265 825.306 217.056 825.572 217.757C834.572 241.537 837.855 264.829 834.355 280.06C834.126 281.058 834.75 282.056 835.749 282.285C836.125 282.374 836.501 282.338 836.836 282.208Z"
            fill="#FCCF03"
          />
          <path
            d="M867.593 343.621C868.455 343.287 868.953 342.356 868.721 341.436C868.472 340.441 867.46 339.838 866.468 340.088L834.63 348.102C833.622 348.336 833.033 349.36 833.283 350.355C833.532 351.351 834.543 351.953 835.536 351.703L867.373 343.689C867.45 343.673 867.523 343.649 867.593 343.621Z"
            fill="#F2F2F2"
          />
          <path
            d="M860.168 332.461C861.029 332.127 861.527 331.196 861.295 330.276C861.046 329.281 860.035 328.678 859.042 328.928L831.757 335.796C830.752 336.027 830.158 337.055 830.409 338.05C830.659 339.045 831.67 339.648 832.663 339.397L859.948 332.529C860.025 332.513 860.097 332.489 860.168 332.461Z"
            fill="#F2F2F2"
          />
          <path
            d="M849.471 322.121C850.333 321.786 850.831 320.856 850.599 319.936C850.349 318.941 849.338 318.338 848.346 318.588L828.907 323.48C827.902 323.708 827.309 324.739 827.56 325.733C827.809 326.728 828.82 327.331 829.813 327.081L849.251 322.189C849.328 322.172 849.4 322.148 849.471 322.121Z"
            fill="#F2F2F2"
          />
          <path
            d="M893.742 330.533C894.048 330.414 894.349 330.275 894.645 330.116C898.59 328.001 900.077 323.073 897.963 319.128C896.939 317.216 895.232 315.82 893.156 315.193C891.08 314.567 888.882 314.79 886.976 315.812C883.031 317.927 881.542 322.855 883.658 326.8C885.614 330.446 889.977 331.993 893.742 330.533ZM889.164 318.686C890.111 318.318 891.147 318.277 892.135 318.576C893.307 318.93 894.271 319.719 894.849 320.799C896.042 323.025 895.203 325.807 892.977 327.003C890.747 328.182 887.969 327.355 886.774 325.129C885.579 322.902 886.42 320.12 888.646 318.925C888.815 318.834 888.987 318.754 889.164 318.686Z"
            fill="#F2F2F2"
          />
          <path
            d="M900.855 306.937C901.166 306.816 901.471 306.675 901.771 306.515C905.716 304.399 907.205 299.471 905.09 295.527C902.974 291.584 898.043 290.09 894.102 292.21C890.157 294.326 888.67 299.253 890.784 303.198C891.808 305.11 893.515 306.506 895.592 307.134C897.341 307.661 899.177 307.587 900.855 306.937ZM896.28 295.088C898.405 294.264 900.869 295.137 901.973 297.196C903.168 299.422 902.327 302.205 900.101 303.4C899.022 303.972 897.784 304.102 896.612 303.749C895.439 303.394 894.476 302.606 893.898 301.526C892.704 299.299 893.544 296.517 895.77 295.322C895.938 295.234 896.108 295.155 896.28 295.088Z"
            fill="#F2F2F2"
          />
          <path
            d="M915.408 318.968C915.897 318.778 916.297 318.373 916.462 317.829C916.744 316.895 916.216 315.91 915.282 315.627L874.491 303.312C873.557 303.03 872.571 303.557 872.288 304.495C872.006 305.429 872.534 306.414 873.468 306.696L914.259 319.011C914.651 319.131 915.052 319.106 915.408 318.968Z"
            fill="#F2F2F2"
          />
          <defs>
            <filter
              id="filter0_d_27_32"
              x="215"
              y="167"
              width="140.4"
              height="140.4"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="3"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_27_32"
              />
              <feOffset dx="5" dy="4" />
              <feGaussianBlur stdDeviation="15" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_27_32"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_27_32"
                result="shape"
              />
            </filter>
          </defs>
        </svg>

        <div className="dvder w-14 bg-gray-100 h-[1px] m-auto mt-4"></div>
        <h3 className="text-center text-md text-gray-400 mt-2">
          ადგილზე მიტანის სერვისი
        </h3>
      </div>
      <div className="divider"></div>
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
                options={{noPhoto: noPhotoSRC}}
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
                    className={
                      "text-3xl font-bold" +
                      (productItem?.timer && productItem?.newPrice && isSale
                        ? " line-through text-gray-500"
                        : " text-parsley-500 ")
                    }
                    data-config-id="auto-txt-15-1"
                  >
                    {productItem?.price || "-"}
                  </span>
                  <span
                    className={
                      "ml-2 text-sm font-medium" +
                      (productItem?.timer && productItem?.newPrice && isSale
                        ? " line-through text-gray-500"
                        : " text-parsley-500 ")
                    }
                    data-config-id="auto-txt-14-1"
                  >
                    ლარი
                  </span>
                </p>
              </div>
              <br/>
              {isSale && productItem?.newPrice ? (
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

              {productItem?.timer && productItem.endDate && isSale ? (
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

              <div
                className="text-xs text-gray-400 tracking-wider mb-2"
                data-config-id="auto-txt-11-1"
              >
                {/* {productItem?.categories.name} */}
                დეტალები:
              </div>
              <div
                style={{
                  listStyle: "initial",
                  backgroundColor: "rgb(128 128 128 / 6%)",
                }}
                className="whitespace-pre-wrap text-lg text-gray-600 p-3 rounded-2xl"
                data-config-id="auto-txt-16-1"
              >
                {/* {productItem?.descriptions[0].toString()} */}
                {(
                  <div
                    dangerouslySetInnerHTML={{
                      __html: productItem?.descriptions[0] as string,
                    }}
                  ></div>
                ) || "Sorry no description"}
              </div>
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
              {productItem?.photo_gallery.map((i, key) => {
                return (
                  <div
                    key={productItem.id.toString() + "-" + key}
                    className="w-1/2 px-2 py-2 flex items-center justify-center block"
                  >
                    <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center block">
                      <img
                        className="h-full"
                        src={i || noPhotoSRC}
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
