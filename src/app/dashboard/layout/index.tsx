"use client";

import Link from "next/link";

const DashboardLayout = ({ children }: any) => {
	function toggleDrawer() {}
	return (
		<div>
			<div className="drawer lg:drawer-open">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />{" "}
				<div className="drawer-content flex flex-col">
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
					<div className="divider mx-0 my-0"></div>
					<main>{children}</main>
				</div>
				<div className="drawer-side bg-base-200">
					{/* <label htmlFor="my-drawer-2" className="drawer-overlay"></label> */}
					{/* <ul className="menu bg-base-200 w-">
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                Item 2
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Item 1
              </a>
            </li>
            <li>
              <a>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                Item 3
              </a>
            </li>
          </ul> */}
					<div className=" sticky top-0 z-20 hidden items-center gap-2 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex shadow-sm">
						<Link
							href="/"
							className="flex-0 btn btn-ghost px-2"
							data-svelte-h="svelte-pw6yxt"
						>
							<svg
								width="32"
								height="32"
								viewBox="0 0 415 415"
								xmlns="http://www.w3.org/2000/svg"
							>
								<rect
									x="82.5"
									y="290"
									width="250"
									height="125"
									rx="62.5"
									fill="#1AD1A5"
								></rect>
								<circle
									cx="207.5"
									cy="135"
									r="130"
									fill="black"
									fillOpacity=".3"
								></circle>
								<circle cx="207.5" cy="135" r="125" fill="white"></circle>
								<circle cx="207.5" cy="135" r="56" fill="#FF9903"></circle>
							</svg>
							<div className="font-title inline-flex text-lg md:text-2xl">
								<span className="lowercase">daisy</span>{" "}
								<span className="uppercase text-[#1AD1A5]">UI</span>
							</div>
						</Link>
					</div>
					<ul className="menu p-4 w-80">
						{/* Sidebar content here */}
						{/* <li><Link href={'/dashboard/category'}>კატეგორიები</Link></li> */}
						<li>
							<Link href={"/dashboard/category"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 256 256"
									width={24}
									height={24}
								>
									<rect width="256" height="256" fill="none" />
									<path
										d="M152,208V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54a8,8,0,0,1,2.62,5.92V208a8,8,0,0,1-8,8H160A8,8,0,0,1,152,208Z"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="16"
									/>
								</svg>
								კატეგორიები
							</Link>
						</li>
						<li>
							<Link href={"/dashboard/product"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 256 256"
									width={24}
									height={24}
								>
									<rect width="256" height="256" fill="none" />
									<rect
										x="32"
										y="72"
										width="192"
										height="136"
										rx="8"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="16"
									/>
									<path
										d="M88,96V64a40,40,0,0,1,80,0V96"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="16"
									/>
								</svg>
								პროდუქცია
							</Link>
						</li>
						<li>
							<Link href={"/dashboard/order"}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 256 256"
									width={24}
									height={24}
								>
									<rect width="256" height="256" fill="none" />
									<polyline
										points="88 136 112 160 168 104"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="16"
									/>
									<rect
										x="40"
										y="40"
										width="176"
										height="176"
										rx="8"
										fill="none"
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="16"
									/>
								</svg>
								შეკვეთები
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};
export default DashboardLayout;
