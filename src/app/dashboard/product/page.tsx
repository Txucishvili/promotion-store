import { CustomAsyncAdapter } from "@/utils/db-utils";
// import { ProductsPage } from './index'
import prisma from "../../../utils/prisma";
import { ProductsPage } from ".";

export const dynamic = 'force-dynamic'

export default async function Home() {
	const products = await prisma.product
		.findMany({
			include: {
				categories: {
					include: {
						tags: true,
					},
				},
			},
      orderBy: {
        createdAt: 'desc'
      }
		})
		.catch((e) => {
			console.log("error", e);
			return [];
		});
	const categories = await prisma.categorie.findMany().catch((e) => {
		console.log("error", e);
		return [];
	});

	return (
		<main>
			{/* some */}
			<ProductsPage list={products} categories={categories} />
		</main>
	);
}
