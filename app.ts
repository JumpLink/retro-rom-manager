import { walk, WalkEntry, ensureDir, copy, move } from "std/fs/mod.ts";
import { ROM_SOURCE_PATH, ROM_TARGET_PATH } from "./settings.ts";
import { resolve } from "std/path/mod.ts";

const listRoms = async () => {
  const roms: WalkEntry[] = [];
  for await (const entry of walk(ROM_SOURCE_PATH)) {
    if (entry.isFile && entry.name.endsWith(".smc")) {
      roms.push(entry);
    }
  }
  return roms;
};

const getBaseName = (rom: WalkEntry) => {
  const infoIndex = rom.name.indexOf("(");
  const baseName = rom.name.slice(0, infoIndex - 1).trim();
  return { baseName };
};

const getTarget = (rom: WalkEntry) => {
  const char = rom.name.charAt(0);
  const { baseName } = getBaseName(rom);
  const dir = resolve(ROM_TARGET_PATH, char, baseName);
  const path = resolve(dir, rom.name);
  return {
    char,
    dir,
    path,
    name: rom.name,
  };
};

const copyRoms = async (roms: WalkEntry[]) => {
  for (const rom of roms) {
    const { path, dir } = getTarget(rom);
    console.debug(`${rom.path} -> ${path}`);
    await ensureDir(dir);
    if (ROM_SOURCE_PATH === ROM_TARGET_PATH) {
      await move(rom.path, path);
    } else {
      await copy(rom.path, path);
    }
  }
};

const roms = await listRoms();
copyRoms(roms);
