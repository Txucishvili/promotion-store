import Image from 'next/image'
import { CustomAsyncAdapter } from '@/utils/db-utils'
import { CategoryPage } from './index'
import prisma from '../../../utils/prisma'


export default async function Home() {
  const categories = await prisma.categorie.findMany({
    include: {
      tags: !true
    }
  })
    .then((r) => {
      // console.log('r', r)
      return r;
    })

  return (
    <main>
      <CategoryPage list={categories} />
    </main>
  )
}
