import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export function initStore(dataType) {
  const file = `./src/models/${dataType}.json`;
  const adapter = new JSONFile(file);

  const db = new Low(adapter, {
    [dataType]: [],
  });

  return db;
}
