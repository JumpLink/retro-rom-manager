import "dotenv/load.ts"; // Autoload .env file
import { resolve } from "std/path/mod.ts";

export const HOME = Deno.env.get("HOME") || resolve(".");
export const ROM_SOURCE_PATH =
  Deno.env.get("ROM_SOURCE_PATH") || "~/Roms/SNES/games".replace("~", HOME);
export const ROM_TARGET_PATH =
  Deno.env.get("ROM_TARGET_PATH") || "~/Roms/SNES/games".replace("~", HOME);
