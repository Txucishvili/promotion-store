import { CustomAsyncAdapter } from '@/utils/db-utils'
// import { ProductsPage } from './index'
import prisma from '../../../utils/prisma'

export default async function Home() {
  // const products = await prisma.product.findMany();
  // const categories = await prisma.categorie.findMany();

  // console.log('products', prisma)

  return (
    <main>
      some
      {/* <ProductsPage list={[]} categories={categories} /> */}
    </main>
  )
}
