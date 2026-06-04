export const mockDb = {
  storages: [
    { id: 1, name: "Main Warehouse", location: "Building A", capacity: "1000sqm", usedCapacity: 75 },
    { id: 2, name: "Secondary Garage", location: "Building B", capacity: "500sqm", usedCapacity: 30 },
    { id: 3, name: "Cold Storage", location: "Building C", capacity: "200sqm", usedCapacity: 90 },
  ],
  items: [
    { id: 101, storageId: 1, name: "Pallets", quantity: 50, category: "Infrastructure" },
    { id: 102, storageId: 1, name: "Forklift", quantity: 2, category: "Equipment" },
    { id: 103, storageId: 2, name: "Spare Tires", quantity: 20, category: "Automotive" },
    { id: 104, storageId: 3, name: "Frozen Meat", quantity: 100, category: "Food" },
    { id: 105, storageId: 1, name: "Cardboard Boxes", quantity: 500, category: "Supplies" },
  ],
};
