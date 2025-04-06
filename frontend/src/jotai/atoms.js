import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const emailStorageAtom = atomWithStorage("email", null);
export const tokenStorageAtom = atomWithStorage("token", null);

export const userAtom = atom(null);
export const isCommentAtom = atom(false);
export const dataDonationsAtom = atom(null);