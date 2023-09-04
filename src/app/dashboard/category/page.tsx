import Image from "next/image";
import { CustomAsyncAdapter } from "@/utils/db-utils";
import { CategoryPage } from "./index";
import prisma from "../../../utils/prisma";

export const dynamic = 'force-dynamic'

export default async function Home() {
	const categories = await prisma.categorie
		.findMany({
			include: {
				tags: true,
			},
		})
		.then((r) => {
			return r;
		})
		.catch((e) => {
			console.log("error", e);
			return [];
		});

	return (
		<main>
			<CategoryPage list={categories} />
		</main>
	);
}
