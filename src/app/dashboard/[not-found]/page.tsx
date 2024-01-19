import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <>
      <section className="relative z-10 py-[120px]">
        <div className="w-full">
          <div className="mx-auto max-w-[400px] text-center">
            <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
              404
            </h2>
            <h4 className="mb-8 text-[22px] font-semibold leading-tight text-white">
              გვერდი არ მოიძებნა
            </h4>
            {/* <p className="mb-8 text-lg text-white">
              ან წაი
            </p> */}
            
            <Link
              href="/dashboard"
              className="inline-block px-8 py-3 text-base font-semibold text-center text-white transition border border-white rounded-lg hover:bg-white hover:text-primary"
            >
              მთავარი გვერდი
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
