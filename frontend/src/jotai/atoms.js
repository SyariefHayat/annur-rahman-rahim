import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const emailStorageAtom = atomWithStorage("email", null);
export const tokenStorageAtom = atomWithStorage("token", null);

export const dataDonationsAtom = atom(null);