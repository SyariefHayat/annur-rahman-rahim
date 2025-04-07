import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtomStorage = atomWithStorage("user", null);

export const isCommentAtom = atom(false);
export const dataDonationsAtom = atom(null);