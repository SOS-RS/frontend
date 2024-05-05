import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function tokenName() {
  const loc = localStorage.getItem("loc") ?? "br";
  const key = `${loc}:token`;
  return key;
}

export { cn, tokenName };
