"use client";

import Link from "next/link";
import { NavigationItem } from "../layout";
import {
  CheckFat,
  DotsThree,
  Gear,
  HouseSimple,
  List,
  ListBullets,
  Plus,
  Power,
  Shuffle,
  SignOut,
  Storefront,
} from "@phosphor-icons/react";
import { Fragment, createElement, useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const CategoryIcons: any = {
  category: List,
  product: Storefront,
  order: CheckFat,
  main: HouseSimple,
  setting: Gear
};

const NavIcon = ({ name }: { name: string }) => {
  const Component = CategoryIcons[name]
  if (!Component) return null
  const I = createElement(Component, {
    size: 20,
  });
  return I;
};

export const Logo = ({ active }: { active?: boolean }) => {
  return (
    <div
      className={
        " sticky top-0 z-1 items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm"
      }
    >
      <Link
        href="/dashboard"
        className={"flex-0 btn btn-ghost px-2" + (active ? ` bg-base-300` : "")}
        data-svelte-h="svelte-pw6yxt"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          width={32}
          height={32}
        >
          <rect width="256" height="256" fill="none" />
          <circle fill={"#1AD1A5"} cx="80" cy="216" r="16" />
          <circle fill={"#1AD1A5"} cx="184" cy="216" r="16" />
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
  );
};

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
  );
};

const DashboardLayout = ({
  children,
  navigation,
}: {
  children: React.ReactNode;
  navigation: NavigationItem[];
}) => {
  const currentRoute = usePathname();
  const session = useSession();

  useEffect(() => {
    console.log('sessiong', session)
    if (!session.data) {
      // redirect('/auth');
    }

  }, [session])

  // console.log('session, token', session)
  // useEffect(() => {
  //   session.update()
  // }, [])

  function toggleDrawer() { }

  return (
    <div>
      <div className="bg-base-100 drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content relative overflow-hidden">
          {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
          <div className="navbar outline outline-2 outline-base-200 bg-base-100">
            <div className="flex-none flex gap-2">
              <div className="lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
                  <List size={24} />
                </label>
              </div>

            </div>
            <div className="flex-1">
              {/* <div className="lg:hidden">
                <Logo />
              </div> */}
              <div className="block">
                <div className="dropdown">
                  <button className="flex btn-sm gap-3 btn btn-outline btn-success">
                    <Plus size={24} />
                    <span>ახალი</span>
                  </button>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-10 menu p-2 shadow-lg bg-base-200 rounded-box w-60"
                  >
                    <li>
                      <a>კატეგორიის დამატება</a>
                    </li>
                    <li>
                      <a>პროდუქტის დამატება</a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
            </div>
            <div className="flex-none">
              {session.status == 'authenticated' ?
                <div className="flex gap-2 items-center">
                  <div>{session.data?.user?.email}</div>
                  <button onClick={() => {
                    signOut({
                      // redirect: false,
                      callbackUrl: '/auth'
                    })
                  }} className="btn btn-circle btn-sm btn-outline btn-error">
                    <SignOut size={18} />
                    {/* <p>გასვლა</p> */}
                  </button>
                  {/* <button className="btn btn-square btn-ghost">
                                <DotsThree size={24} />
                              </button> */}
                  {/* <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                      </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                      <li>
                        <a className="justify-between">
                          Profile
                          <span className="badge">New</span>
                        </a>
                      </li>
                      <li><a>Settings</a></li>
                      <li><a>Logout</a></li>
                    </ul>
                  </div> */}
                </div>
                : null}
            </div>
          </div>
          <div className="w-full overflow-[initial]">{children}</div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <div className="h-full bg-base-200">
            <Logo active={currentRoute == "/dashboard"} />
            <ul className="menu p-4 w-80">
              {navigation.map((n) => {

                return (
                  <li key={n.slug}>
                    <Link
                      href={`/dashboard/${n.slug == 'main' ? '' : n.slug}`}
                      className={
                        currentRoute == `/dashboard/${n.slug}` || currentRoute == "/dashboard" && n.slug == 'main' ? "active" : ""
                      }
                    >
                      <NavIcon name={n.slug} />
                      {n.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div >
  );
};
export default DashboardLayout;
