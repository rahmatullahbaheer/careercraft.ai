"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

function page() {
  const { data: session, status } = useSession();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    stripePriceLine: "",
    price: "",
    status: "active",
    description: "",
    features: [],
  });
  const [selectedPackages, setSelectedPackages] = useState([]);

  // Fetch packages data
  const fetchPackages = async (searchQuery = "") => {
    try {
      setLoading(true);
      setError(null);

      const url = searchQuery
        ? `/api/packages/search?q=${encodeURIComponent(
            searchQuery
          )}&limit=${entriesPerPage}&page=${currentPage}`
        : `/api/packages?limit=${entriesPerPage}&page=${currentPage}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.result || "Failed to fetch packages");
      }

      setPackages(data.result || []);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setError(err.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  // Delete package
  const handleDelete = async (packageId) => {
    if (!confirm("Are you sure you want to delete this package?")) return;

    try {
      const response = await fetch(`/api/packages/${packageId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.result || "Failed to delete package");
      }

      // Refresh packages list
      fetchPackages();
    } catch (err) {
      console.error("Error deleting package:", err);
      alert(err.message || "Failed to delete package");
    }
  };

  // Open modal for adding new package
  const handleAddPackage = () => {
    setEditingPackage(null);
    setFormData({
      name: "",
      stripePriceLine: "",
      price: "",
      status: "active",
      description: "",
      features: [],
    });
    setShowModal(true);
  };

  // Open modal for editing package
  const handleEditPackage = (pkg) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      stripePriceLine: pkg.stripePriceLine || "",
      price: pkg.price.toString(),
      status: pkg.status,
      description: pkg.description || "",
      features: pkg.features || [],
    });
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingPackage(null);
    setFormData({
      name: "",
      stripePriceLine: "",
      price: "",
      status: "active",
      description: "",
      features: [],
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle bulk selection
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPackages(packages.map((pkg) => pkg._id));
    } else {
      setSelectedPackages([]);
    }
  };

  const handleSelectPackage = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  // Bulk actions
  const handleBulkAction = async (action) => {
    if (selectedPackages.length === 0) {
      alert("Please select packages first");
      return;
    }

    const actionName =
      action === "delete"
        ? "delete"
        : action === "activate"
        ? "activate"
        : "deactivate";

    if (
      !confirm(
        `Are you sure you want to ${actionName} ${selectedPackages.length} package(s)?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/packages/bulk", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageIds: selectedPackages,
          action: action,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.result || `Failed to ${actionName} packages`);
      }

      setSelectedPackages([]);
      fetchPackages(searchTerm);
      alert(data.message);
    } catch (err) {
      console.error(`Error ${actionName} packages:`, err);
      alert(err.message || `Failed to ${actionName} packages`);
    }
  };

  // Handle features input change
  const handleFeaturesChange = (e) => {
    const value = e.target.value;
    const featuresArray = value
      .split("\n")
      .filter((feature) => feature.trim() !== "");
    setFormData((prev) => ({
      ...prev,
      features: featuresArray,
    }));
  };

  // Submit form (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      alert("Package name is required");
      return;
    }

    if (!formData.stripePriceLine.trim()) {
      alert("Stripe price line is required");
      return;
    }

    if (
      !formData.price ||
      isNaN(formData.price) ||
      parseFloat(formData.price) < 0
    ) {
      alert("Please enter a valid price");
      return;
    }

    try {
      const url = editingPackage
        ? `/api/packages/${editingPackage._id}`
        : "/api/packages";
      const method = editingPackage ? "PUT" : "POST";

      const payload = {
        name: formData.name.trim(),
        stripePriceLine: formData.stripePriceLine.trim(),
        price: parseFloat(formData.price),
        status: formData.status,
        description: formData.description.trim(),
        features: formData.features,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.result ||
            `Failed to ${editingPackage ? "update" : "create"} package`
        );
      }

      // Close modal and refresh packages
      handleCloseModal();
      fetchPackages();

      alert(`Package ${editingPackage ? "updated" : "created"} successfully!`);
    } catch (err) {
      console.error("Error submitting package:", err);
      alert(
        err.message ||
          `Failed to ${editingPackage ? "update" : "create"} package`
      );
    }
  };

  // Handle purchase package (create Stripe payment intent)
  const handlePurchase = async (pkg) => {
    try {
      const response = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          packageId: pkg._id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create payment intent");
      }

      alert(
        `Payment intent created! Amount: $${
          data.package.amount
        }\nClient Secret: ${data.paymentIntent.clientSecret.substring(
          0,
          20
        )}...`
      );

      // In a real implementation, you would redirect to a payment page
      // or open a payment modal with Stripe Elements
      console.log("Payment Intent Data:", data);
    } catch (err) {
      console.error("Error creating payment intent:", err);
      alert(err.message || "Failed to create payment intent");
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPackages(searchTerm);
    }
  }, [status, searchTerm, entriesPerPage, currentPage]);

  // Handle search input with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (status === "authenticated") {
        setCurrentPage(1); // Reset to first page when searching
        fetchPackages(searchTerm);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Pagination
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedPackages = packages.slice(0, entriesPerPage); // Use packages directly since API handles pagination
  const totalPages = Math.ceil(packages.length / entriesPerPage);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="text-center py-8">Loading packages...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="text-center py-8 text-red-600">
          Please log in to view packages
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Packages List</h1>
        <div className="flex space-x-2">
          {selectedPackages.length > 0 && (
            <>
              <button
                onClick={() => handleBulkAction("activate")}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Activate ({selectedPackages.length})
              </button>
              <button
                onClick={() => handleBulkAction("deactivate")}
                className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Deactivate ({selectedPackages.length})
              </button>
              <button
                onClick={() => handleBulkAction("delete")}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm"
              >
                Delete ({selectedPackages.length})
              </button>
            </>
          )}
          <button
            onClick={handleAddPackage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
          >
            + ADD PACKAGE
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center space-x-2 text-sm">
          <span>Show</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 focus:outline-none"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span>Entries</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 px-3 py-1.5 rounded-md text-sm focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    selectedPackages.length === packages.length &&
                    packages.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded"
                />
              </th>
              <th className="px-4 py-3">S NO</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Stripe Price Line</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paginatedPackages.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  {loading ? "Loading packages..." : "No packages found"}
                </td>
              </tr>
            ) : (
              paginatedPackages.map((pkg, index) => (
                <tr key={pkg._id} className="border-t">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg._id)}
                      onChange={() => handleSelectPackage(pkg._id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-4 py-3">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 capitalize">{pkg.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {pkg.stripePriceLine}
                  </td>
                  <td className="px-4 py-3">$ {pkg.price}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-white text-xs px-2 py-1 rounded-full ${
                        pkg.status === "active" ? "bg-green-500" : "bg-gray-400"
                      }`}
                    >
                      {pkg.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">
                    {pkg.description || "No description"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditPackage(pkg)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                        title="Edit Package"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536M9 13h3l9-9a1.414 1.414 0 00-2-2l-9 9v3z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(pkg._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                        title="Delete Package"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3H4m16 0h-4"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
            {Math.min(currentPage * entriesPerPage, packages.length)} of{" "}
            {packages.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const pageNum = idx + 1;
              if (
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 border border-gray-300 rounded text-sm ${
                      currentPage === pageNum
                        ? "bg-purple-600 text-white border-purple-600"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              } else if (
                pageNum === currentPage - 2 ||
                pageNum === currentPage + 2
              ) {
                return (
                  <span key={pageNum} className="px-2">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {editingPackage ? "Edit Package" : "Add New Package"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Package Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter package name"
                  required
                />
              </div>

              {/* Stripe Price Line */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stripe Price Line *
                </label>
                <input
                  type="text"
                  name="stripePriceLine"
                  value={formData.stripePriceLine}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="price_1234567890"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  required
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Enter package description"
                  rows="3"
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Features (one per line)
                </label>
                <textarea
                  name="features"
                  value={formData.features.join("\n")}
                  onChange={handleFeaturesChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                  placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                  rows="4"
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  {editingPackage ? "Update Package" : "Create Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
