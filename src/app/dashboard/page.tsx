import Image from "next/image";
import { DashboardNavigation } from "./layout";
import DashboardMainComponent from "./index";
import prisma from '@/utils/prisma';

export default async function Home() {
  const counts =  {
    category: await prisma.categorie.count(),
    product: await prisma.product.count(),
    order: await prisma.order.count(),
  }

  return <DashboardMainComponent counts={counts} />;
}
