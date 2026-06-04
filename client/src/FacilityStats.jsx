import React, { useState, useEffect } from "react";
import { storageService } from "./api/storageService";

const FacilityStats = () => {
  const [storages, setStorages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await storageService.getStorages();
      setStorages(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border text-primary"></div></div>;

  const totalUsed = storages.reduce((acc, s) => acc + s.usedCapacity, 0) / storages.length;

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-4">System Analytics</h2>
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 bg-primary text-white h-100">
            <div className="card-body">
              <h6 className="text-uppercase small mb-3">Average Utilization</h6>
              <h2 className="display-4 fw-bold">{totalUsed.toFixed(1)}%</h2>
              <div className="progress mt-3 bg-white bg-opacity-25" style={{ height: "5px" }}>
                <div className="progress-bar bg-white" style={{ width: `${totalUsed}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-uppercase small text-muted mb-3">Total Facilities</h6>
              <h2 className="display-4 fw-bold text-dark">{storages.length}</h2>
              <p className="mb-0 text-success small"><i className="bi bi-arrow-up-right me-1"></i> All operational</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
              <h6 className="text-uppercase small text-muted mb-3">Capacity Warning</h6>
              <h2 className="display-4 fw-bold text-danger">
                {storages.filter(s => s.usedCapacity > 85).length}
              </h2>
              <p className="mb-0 text-muted small">Facilities above 85% capacity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 card shadow-sm border-0 p-4">
        <h5 className="fw-bold mb-4">Storage Distribution</h5>
        {storages.map(s => (
          <div key={s.id} className="mb-4">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-semibold">{s.name}</span>
              <span className="text-muted">{s.usedCapacity}% Full</span>
            </div>
            <div className="progress" style={{ height: "20px" }}>
              <div 
                className={`progress-bar ${s.usedCapacity > 85 ? 'bg-danger' : 'bg-primary'}`} 
                style={{ width: `${s.usedCapacity}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilityStats;
