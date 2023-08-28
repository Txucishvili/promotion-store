import Image from 'next/image'
import { CustomAsyncAdapter } from '@/utils/db-utils'
import {CategoryPage} from './index'
import { CategoryResponseType } from '@/app/api/category/route';

const newDb = new CustomAsyncAdapter<CategoryResponseType>({ path: 'categories' });

export default async function Home() {
  newDb.read();

  return (
    <main>
      <CategoryPage list={newDb.data.result} />
    </main>
  )
}
