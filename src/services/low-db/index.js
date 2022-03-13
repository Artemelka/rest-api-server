import { join, dirname } from 'path'
import { JSONFile, Low } from 'lowdb';
import { fileURLToPath } from 'url'

export function LowDb({ fileName }) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const pathToFile = join(__dirname, `${fileName}.json`)
  const adapter = new JSONFile(pathToFile);
  const DB = new Low(adapter);

  async function init() {
    await DB.read();
    DB.data = DB.data || { [fileName]: [] };
    await DB.write();
  }

  init()
    .then((res) => console.log('=== LowDb init success ===', DB))
    .catch(error => console.log('=== LowDb init error ===', error))

  this.get = async () => {
    try {
      await DB.read();
      return DB.data?.[fileName] || [];
    } catch (error) {
      console.log(`=== LowDb ${fileName} get error ===`, error);
      return [];
    }
  }

  this.add = (user) => {
    // DB.data[fileName].push(user);
    // await DB.write();
    console.log('=== add ===');
  }

  return this;
}
