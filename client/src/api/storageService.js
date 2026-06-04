import { mockDb } from "./mockDb";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const storageService = {
  getStorages: async () => {
    await delay(800);
    return [...mockDb.storages];
  },

  getItemsByStorageId: async (storageId) => {
    await delay(600);
    return mockDb.items.filter((item) => item.storageId === parseInt(storageId));
  },

  searchItems: async (query) => {
    await delay(1000);
    if (!query) return [];
    return mockDb.items.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};
