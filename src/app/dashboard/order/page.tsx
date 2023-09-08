import prisma from "../../../utils/prisma";
import { OrderPage } from ".";

export const dynamic = 'force-dynamic'

export default async function Home() {
	const listData = await prisma.order
		.findMany({
			include: {
				product: {
          include: {
            categories: true
          }
        },
			},
      orderBy: {
        createdAt: 'desc'
      }
		})
		.then((r) => {
			return r;
		})
		.catch((e) => {
			return [];
		});

	return (
		<main>
			<OrderPage list={listData} />
		</main>
	);
}
