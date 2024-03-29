"use client";
import React, { useEffect } from "react";
import { DashboardNavigation } from "./layout";
import { Bag, CheckFat, Gear, HouseSimple, List, Rows, ShoppingCart } from "@phosphor-icons/react";
import Link from "next/link";
import { SessionProvider, useSession } from "next-auth/react";

const IconMap: any = {
  category: <Rows  weight="duotone" size={42} />,
  product: <ShoppingCart  weight="duotone" size={42} />,
  order: <CheckFat  weight="duotone" size={42} />,
  main: <HouseSimple  weight="duotone" size={42} />,
  setting: <Gear  weight="duotone" size={42} />
};

const NON_COUNT = ['setting']

const dashboardNav = Array()
  .concat(DashboardNavigation.filter((n) => n.slug != 'main'))
  .map((n) => {
    const conf: any = {};
    if (NON_COUNT.includes(n.slug)) {
      conf['text'] = 'საიტის კონფიგურაცია'
    }
    
    return {
      ...n,
      icon: IconMap[n.slug],
      ...conf
    };
  });


export default function DashboardMainComponent({ counts }: any) {

  return (
    <main className="p-8 ">
      <h1 className="text-3xl mb-6">მთავარი</h1>
      <div className="divider"></div>
      <div className="flex flex-col sm:flex-row gap-4">
        {dashboardNav.map((im, key) => {
          return (
            <div
              key={key}
              className="card w-full sm:w-96 bg-base-100 outline outline-2 outline-base-200 hover:bg-base-300 cursor-pointer shadow-xl"
            >
              <div className="card-body">
                <p>{im.icon}</p>
                <h2 className="card-title">{im.title}</h2>
                {!im.text ? <span>
                  <span>სულ რაოდენობა:</span>
                  <span className="font-bold ml-3 text-2xl">{counts[im.slug]}</span>
                </span> : im.text}
                <div className="card-actions justify-end">
                  <Link
                    href={`/dashboard/${im.slug}`}
                    className="btn btn-outline">გახსნა</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export {SessionProvider};