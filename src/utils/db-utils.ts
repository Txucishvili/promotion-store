import { LowSync, SyncAdapter } from "lowdb";
import { JSONFileSync, TextFileSync } from "lowdb/node";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';

export const rootPath = join(process.cwd(), "/db");


class Adapter<T> implements SyncAdapter<T> {
  adapter: TextFileSync;

  constructor(filename: string) {
    this.adapter = new TextFileSync(filename)
  }

  read(): T | null {
    const data = this.adapter.read()
    if (data === null) {
      return null
    } else {
      return JSON.parse(data) as T
    }
  }

  write(obj: T): void {
    this.adapter.write(JSON.stringify(obj, null, 2))
  }
}
class Adapters {
  // Optional: your adapter can take arguments
  constructor(args: any) {
    // ...
  }
}


class CustomAsyncAdapter<T> extends LowSync<T>  {
	// Optional: your adapter can take arguments
  // db: LowSync;
	constructor(args: any) {
    const { path } = args;
    console.log('path', join(rootPath, path + '.json'))
    super(new Adapter(join(rootPath, path + '.json')), {});

		// this.db = new LowSync(new JSONFileSync(join(rootPath, path)), {});
    
	}
  
}

// db.json file path

export {CustomAsyncAdapter}