"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";

const page = () => {
  const { data: session, status } = useSession();
  const fileInputRef = useRef(null);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contact: {
      street: "",
      cityState: "",
      country: "",
      postalCode: "",
    },
    skills: [],
    summary: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  // Load profile image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("profileImage");
    if (savedImage) {
      setImagePreview(savedImage);
      setProfile((prev) => ({ ...prev, profileImage: savedImage }));
    }
  }, []);

  // Fetch profile data on component mount
  useEffect(() => {
    if (status === "authenticated") {
      fetchProfile();
    }
  }, [status]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/profile");
      const data = await response.json();
      if (data.success) {
        const profileData = {
          firstName: data.result.firstName || "",
          lastName: data.result.lastName || "",
          email: data.result.email || "",
          phone: data.result.phone || "",
          contact: {
            street: data.result.contact?.street || "",
            cityState: data.result.contact?.cityState || "",
            country: data.result.contact?.country || "",
            postalCode: data.result.contact?.postalCode || "",
          },
          skills: data.result.skills || [],
          summary: data.result.summary || "",
          profileImage: "", // Always empty since we use localStorage
        };
        setProfile(profileData);
      } else {
        setMessage("Failed to load profile data");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setMessage("Error loading profile data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMessage("Image size should be less than 2MB");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        setMessage("Please select a valid image file");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target.result;
        setImagePreview(imageDataUrl);
        setProfile((prev) => ({
          ...prev,
          profileImage: imageDataUrl,
        }));

        // Save to localStorage
        localStorage.setItem("profileImage", imageDataUrl);

        // Dispatch custom event to notify other components
        window.dispatchEvent(new Event("profileImageUpdated"));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview("");
    setProfile((prev) => ({
      ...prev,
      profileImage: "",
    }));
    localStorage.removeItem("profileImage");

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("profileImageUpdated"));

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");

      // Don't send profileImage to API - only localStorage handles it
      const { profileImage, ...profileToSave } = profile;

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileToSave),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("Profile updated successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(data.result || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage("Error saving profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading profile...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-600">
          Please sign in to view your profile.
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen">
        <div className="bg-white shadow-xl border border-gray-300 rounded-2xl p-6 sm:p-10">
          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <div
                className="w-24 h-24 rounded-full border-4 border-purple-400 shadow-md overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                onClick={handleImageClick}
              >
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="Default Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
              </div>
              {imagePreview && (
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors text-xs"
                >
                  ×
                </button>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="text-center mt-3">
              <button
                onClick={handleImageClick}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                {imagePreview ? "Change Photo" : "Upload Photo"}
              </button>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 2MB</p>
            </div>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mb-6 p-3 rounded-lg ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

          {/* Profile Info */}
          <div className="grid sm:grid-cols-2 gap-6 shadow-bottom-left-right">
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                First Name
              </label>
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-700 block mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={profile.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                readOnly
                className="w-full p-3 bg-gray-100 rounded-lg text-gray-600 border border-gray-200 cursor-not-allowed"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-1">
                Street Address
              </label>
              <input
                type="text"
                value={profile.contact.street}
                onChange={(e) =>
                  handleInputChange("contact.street", e.target.value)
                }
                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-900 block mb-1">
                City/State
              </label>
              <input
                type="text"
                value={profile.contact.cityState}
                onChange={(e) =>
                  handleInputChange("contact.cityState", e.target.value)
                }
                className="w-full p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
              />
            </div>
          </div>

          {/* Skills Section */}
          <div className="mt-10">
            <h3 className="text-md font-semibold text-gray-900 mb-3">Skills</h3>

            {/* Add new skill */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="flex-1 p-3 bg-white rounded-lg text-gray-800 border border-gray-200 focus:border-purple-400 focus:outline-none transition-all"
                style={{
                  boxShadow:
                    "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                }}
                onKeyPress={(e) => e.key === "Enter" && addSkill()}
              />
              <button
                onClick={addSkill}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Add
              </button>
            </div>

            {/* Skills display */}
            <div className="flex flex-wrap gap-4 justify-center">
              {profile.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-2 w-fit bg-white rounded-lg text-sm text-gray-900 font-medium hover:bg-purple-600/30 transition-all flex items-center gap-2"
                  style={{
                    boxShadow:
                      "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-1 text-red-500 hover:text-red-700 font-bold text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
              {profile.skills.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No skills added yet. Add some skills to showcase your
                  expertise!
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="mt-10">
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              Summary
            </h3>
            <textarea
              className="w-full bg-white p-4 rounded-lg text-sm text-gray-900 leading-relaxed border border-gray-200 focus:border-purple-400 focus:outline-none transition-all min-h-[200px]"
              value={profile.summary}
              onChange={(e) => handleInputChange("summary", e.target.value)}
              placeholder="Write a brief summary about yourself, your experience, and your goals..."
              style={{
                boxShadow:
                  "0 3px 6px rgba(0, 0, 0, 0.1), 3px 0 6px rgba(0, 0, 0, 0.05), -3px 0 6px rgba(0, 0, 0, 0.05)",
              }}
            />
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
