"use client";

import Link from "next/link";
import { NavigationItem } from "../layout";
import { CheckFat, List, Storefront } from "@phosphor-icons/react";
import { createElement } from "react";
import { usePathname } from 'next/navigation';

const CategoryIcons: any = {
  category: List,
  product: Storefront,
  order: CheckFat
}

const NavIcon = ({ name }: { name: string }) => {
  const I = createElement(CategoryIcons[name], {
    size: 20
  });
  return I
}

const Logo = ({active}: {active: boolean}) => {
  return (
    <div className={
      ' sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm'
      
    }>
      <Link
        href="/dashboard"
        className={"flex-0 btn btn-ghost px-2" + ((active ? ` bg-base-300` : ''))}
        data-svelte-h="svelte-pw6yxt"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width={32} height={32}>
          <rect width="256" height="256" fill="none" />
          <circle fill={'#1AD1A5'} cx="80" cy="216" r="16" />
          <circle fill={'#1AD1A5'} cx="184" cy="216" r="16" />
          <path
            d="M42.29,72H224l-28.52,92.71A16,16,0,0,1,180.18,176H84.07a16,16,0,0,1-15.39-11.6L32.51,37.8A8,8,0,0,0,24.82,32H8"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          />
        </svg>
        <div className="font-title inline-flex text-lg md:text-2xl">
          <span className="uppercase">some</span>{" "}
          <span className="lowercase text-[#1AD1A5]">store</span>
        </div>
      </Link>
    </div>
  )
}

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* <div className="dropdown" onClick={toggleDrawer}>
								<label
									tabIndex={0}
									htmlFor="my-drawer-2"
									className="btn btn-ghost btn-circle"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-5 w-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M4 6h16M4 12h16M4 18h7"
										/>
									</svg>
								</label>
							</div> */}
      </div>
      <div className="navbar-center">
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>
  )
}

const DashboardLayout = ({ children, navigation }: {
  children: React.ReactNode,
  navigation: NavigationItem[]
}) => {
  const currentRoute = usePathname();

  function toggleDrawer() { }

  return (
    <div>
      <div className="bg-base-100 drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
          {children}
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="h-full bg-base-200">
            <Logo active={currentRoute == '/dashboard'} />
            <ul className="menu p-4 w-80">
              {navigation.map((n) => {
                return <li key={n.slug}>
                  <Link href={`/dashboard/${n.slug}`} className={
                    currentRoute == `/dashboard/${n.slug}` ? 'active' : ''
                  }>
                    <NavIcon name={n.slug} />
                    {n.title}
                  </Link>
                </li>
              })}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
