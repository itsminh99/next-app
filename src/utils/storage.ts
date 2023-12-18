/* eslint-disable @typescript-eslint/no-explicit-any */
import { parseJSON } from "utils";

const clientStorage = {
  set(key: string, value: any) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Local Storage", error);
    }
  },

  get(key: string, fallback = "") {
    try {
      return parseJSON(localStorage?.getItem(key), fallback);
    } catch (error) {
      console.error("Local Storage", error);
    }
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  clear() {
    localStorage.clear();
  },
};

const SessionStorage = {
  set(key: string, value: any) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Session Storage", error);
    }
  },

  get(key: string, fallback = "") {
    try {
      return parseJSON(sessionStorage.getItem(key), fallback);
    } catch (error) {
      console.error("Session Storage", error);
    }
  },

  remove(key: string) {
    sessionStorage.removeItem(key);
  },

  clear() {
    sessionStorage.clear();
  },
};

export { clientStorage, SessionStorage as sessionStorage };
