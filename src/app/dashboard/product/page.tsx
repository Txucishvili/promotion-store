import { CustomAsyncAdapter } from '@/utils/db-utils'
import {ProductsPage} from './index'
import { CategoryResponseType } from '@/app/api/category/route'

const categoriesDB = new CustomAsyncAdapter<CategoryResponseType>({ path: 'categories' });
const productDB = new CustomAsyncAdapter<CategoryResponseType>({ path: 'products' });

export default async function Home() {
  productDB.read();
  categoriesDB.read();

  return (
    <main>
      <ProductsPage list={productDB.data.result} categories={categoriesDB.data.result} />
    </main>
  )
}
