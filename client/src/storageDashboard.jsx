import React, { useState, useEffect } from "react";
import { storageService } from "./api/storageService";

const StorageDashboard = () => {
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);

  useEffect(() => {
    const fetchStorages = async () => {
      try {
        const data = await storageService.getStorages();
        setStorages(data);
      } catch (error) {
        console.error("Failed to fetch storages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStorages();
  }, []);

  const handleOpenModal = async (storage) => {
    setSelectedStorage(storage);
    setItemsLoading(true);
    try {
      const data = await storageService.getItemsByStorageId(storage.id);
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setItemsLoading(false);
    }
  };

  const getBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'food': return 'bg-success';
      case 'equipment': return 'bg-warning text-dark';
      case 'infrastructure': return 'bg-primary';
      case 'automotive': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getProgressColor = (percent) => {
    if (percent > 85) return "bg-danger";
    if (percent > 60) return "bg-warning";
    return "bg-success";
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Storage Facilities</h2>
      <div className="row">
        {storages.map((storage) => (
          <div key={storage.id} className="col-md-4 mb-3">
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h5 className="card-title fw-bold">{storage.name}</h5>
                <h6 className="card-subtitle mb-3 text-muted">
                  <i className="bi bi-geo-alt"></i> {storage.location}
                </h6>
                
                <div className="mb-3">
                  <div className="d-flex justify-content-between mb-1">
                    <small className="text-muted">Capacity Usage</small>
                    <small className="fw-bold">{storage.usedCapacity}%</small>
                  </div>
                  <div className="progress" style={{ height: "10px" }}>
                    <div 
                      className={`progress-bar progress-bar-striped progress-bar-animated ${getProgressColor(storage.usedCapacity)}`} 
                      role="progressbar" 
                      style={{ width: `${storage.usedCapacity}%` }}
                      aria-valuenow={storage.usedCapacity} 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>

                <p className="card-text small text-secondary">
                  Total Area: {storage.capacity}
                </p>
                <button 
                  className="btn btn-primary w-100"
                  onClick={() => handleOpenModal(storage)}
                >
                  View Inventory
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Item Modal */}
      {selectedStorage && (
        <>
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow">
                <div className="modal-header bg-dark text-white">
                  <h5 className="modal-title">
                    📦 {selectedStorage.name} - Inventory
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedStorage(null)}></button>
                </div>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <span className="text-muted mr-3">Location: <strong>{selectedStorage.location}</strong></span>
                    <span className="text-muted mx-3">|</span>
                    <span className="text-muted">Capacity: <strong>{selectedStorage.capacity}</strong></span>
                  </div>

                  {itemsLoading ? (
                    <div className="text-center my-4">
                      <div className="spinner-border text-primary" role="status"></div>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>Item Name</th>
                            <th>Category</th>
                            <th className="text-center">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.length > 0 ? items.map(item => (
                            <tr key={item.id}>
                              <td className="fw-bold">{item.name}</td>
                              <td>
                                <span className={`badge rounded-pill ${getBadgeClass(item.category)}`}>
                                  {item.category}
                                </span>
                              </td>
                              <td className="text-center">
                                <span className="fw-bold text-primary">{item.quantity}</span>
                              </td>
                            </tr>
                          )) : (
                            <tr><td colSpan="3" className="text-center text-muted">No items found in this storage.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="modal-footer bg-light">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedStorage(null)}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default StorageDashboard;
