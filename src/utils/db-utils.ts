import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const rootPath = join(process.cwd(), "/db");

class CustomAsyncAdapter {
	// Optional: your adapter can take arguments

	constructor(args: any) {
    const { path } = args;
    // super(new JSONFileSync(join(rootPath, path)), {});

		this.db = new LowSync(new JSONFileSync(join(rootPath, path)), {});
	}

	async read() {
		return data;
	}

	async write(data) {
		await api.write(data);
	}
}

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(process.cwd(), "/db/db.json");
