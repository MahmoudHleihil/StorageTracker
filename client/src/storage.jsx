import React, { useState, useEffect } from "react";
import { storageService } from "./api/storageService";

const Storage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Active Search with Debouncing
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setLoading(true);
        try {
          const data = await storageService.searchItems(searchTerm);
          setResults(data);
        } catch (error) {
          console.error("Active search failed:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    }, 400); // 400ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getBadgeClass = (category) => {
    switch (category.toLowerCase()) {
      case 'food': return 'bg-success';
      case 'equipment': return 'bg-warning text-dark';
      case 'infrastructure': return 'bg-primary';
      case 'automotive': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="container mt-5 pt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-bottom-0 pt-4 px-4">
              <h4 className="fw-bold text-dark mb-1">Global Inventory Search</h4>
              <p className="text-muted small">Instant search updates as you type (minimum 2 chars)</p>
            </div>
            <div className="card-body p-4">
              <div className="mb-4">
                <div className="input-group input-group-lg shadow-sm rounded">
                  <span className="input-group-text bg-white border-end-0">
                    {loading ? (
                      <span className="spinner-border spinner-border-sm text-primary" role="status"></span>
                    ) : (
                      <i className="bi bi-search text-muted"></i>
                    )}
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 ps-0"
                    placeholder="Type to search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoFocus
                  />
                  {searchTerm && (
                    <button 
                      className="btn btn-white border-start-0 text-muted" 
                      onClick={() => setSearchTerm("")}
                      type="button"
                    >
                      <i className="bi bi-x-lg"></i>
                    </button>
                  )}
                </div>
              </div>

              {results.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-end">Storage Facility</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((item) => (
                        <tr key={item.id}>
                          <td className="fw-bold">{item.name}</td>
                          <td>
                            <span className={`badge rounded-pill ${getBadgeClass(item.category)}`}>
                              {item.category}
                            </span>
                          </td>
                          <td className="text-center">{item.quantity}</td>
                          <td className="text-end">
                            <span className="badge bg-light text-dark border">SID: {item.storageId}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                searchTerm.length >= 2 && !loading && (
                  <div className="text-center py-5">
                    <div className="text-muted mb-2">No results found for "<strong>{searchTerm}</strong>"</div>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => setSearchTerm("")}>Clear</button>
                  </div>
                )
              )}
              
              {!searchTerm && !loading && (
                <div className="text-center py-5 opacity-50">
                  <i className="bi bi-search display-1 text-light"></i>
                  <p className="mt-3">Start typing to find items across all warehouses...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
