import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Forcing tailwind to create css for the possible tailwind styles to be sent from server.
export const safelist = 'p-2 p-4 p-12 gap-2 gap-4 w-fit text-xl font-semibold';
