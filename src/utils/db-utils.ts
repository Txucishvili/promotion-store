import { LowSync } from "lowdb";
import { JSONFileSync } from "lowdb/node";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const rootPath = join(process.cwd(), "/db");

class CustomAsyncAdapter extends LowSync {
	// Optional: your adapter can take arguments
  // db: LowSync;
	constructor(args: any) {
    const { path } = args;
    console.log('path', join(rootPath, path + '.json'))
    super(new JSONFileSync(join(rootPath, path + '.json')), {});

		// this.db = new LowSync(new JSONFileSync(join(rootPath, path)), {});
	}
}

// db.json file path

export {CustomAsyncAdapter}