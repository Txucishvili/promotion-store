import type { Metadata } from 'next'
import DashboardLayout from './layout/index'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { SessionProvider } from '.';
import { redirect } from 'next/navigation';

export type NavigationItem = {
  icon: string,
  title: string,
  slug: string,
  sub: string[];
}



export const DashboardNavigation: NavigationItem[] = [
  {
    icon: 'mainIcon',
    title: "მთავარი",
    slug: "main",
    sub: [],
  }, {
    icon: 'categoryIcon',
    title: "კატეგორიები",
    slug: "category",
    sub: [],
  },
  {
    icon: "productIcon",
    title: "პროდუქტები",
    slug: "product",
    sub: [],
  },
  {
    icon: "orderIcon",
    title: "შეკვეთები",
    slug: "order",
    sub: [],
  },
  {
    icon: "settingIcon",
    title: "პარამეტრები",
    slug: "setting",
    sub: [],
  }
];

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect('/auth')
  }
  
  return (
      <SessionProvider session={session}>
        <DashboardLayout navigation={DashboardNavigation}>
          {children}
        </DashboardLayout>
      </SessionProvider>
  )
}
