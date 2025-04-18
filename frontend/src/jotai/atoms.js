import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userAtomStorage = atomWithStorage("user", null, {
    getItem: (key) => {
        const item = sessionStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    setItem: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key) => {
        sessionStorage.removeItem(key);
    },
});

export const isCommentAtom = atom(false);
export const dataDonationsAtom = atom(null);