"use client";
import React, { useRef, useState, useEffect } from "react";
import { Eye, Download, Edit, Copy, Save, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";

const LinkedinOptimizer = () => {
  // State management
  const [selectedGenerator, setSelectedGenerator] = useState(null);
  const [msgLoading, setMsgLoading] = useState({});
  const [streamedData, setStreamedData] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [isCopied, setIsCopied] = useState({});
  const [savedContent, setSavedContent] = useState({});
  const [showSaved, setShowSaved] = useState({});
  const [isSaving, setIsSaving] = useState({});
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  const componentRef = useRef(null);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userData); // Assuming you have user data in Redux

  // Load saved content on component mount
  useEffect(() => {
    if (session?.user?.email) {
      loadSavedContent();
    }
  }, [session?.user?.email]);

  const loadSavedContent = async () => {
    try {
      const response = await fetch("/api/linkedin/get?type=all");
      if (response.ok) {
        const result = await response.json();
        setSavedContent(result.data);
      }
    } catch (error) {
      console.error("Error loading saved content:", error);
    }
  };

  // Utility function to show credit popup
  const showCreditLimitPopup = () => {
    setShowCreditPopup(true);
    setTimeout(() => {
      setShowCreditPopup(false);
    }, 3000);
  };

  // Utility function to check if error is credit related
  const isCreditsError = (error) => {
    return (
      error.message &&
      (error.message.includes("credit") ||
        error.message.includes("limit") ||
        error.message.includes("Credit"))
    );
  };

  const generators = [
    {
      id: 1,
      title: "Headline Generator",
      description:
        "✨ Craft A Keyword-Optimized LinkedIn Headline To Boost Your Visibility And Ranking In Recruiter Searches.",
      icon: "💼",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      id: 2,
      title: "About Generator",
      description:
        "🚀 Transforming My Career Journey Into Impact & Innovation.",
      icon: "👤",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      id: 3,
      title: "Job Description Generator",
      description:
        "💼 Transform Your Work Experience Into A Compelling Narrative That Showcases Your Top Achievements And Drives Recruiter Interest.",
      icon: "📋",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
    {
      id: 4,
      title: "Keywords Generator",
      description:
        "📊 Generate Top Skills And Industry-Specific Keywords Aligned With Your Target Role To Boost Your Ranking And Stand Out To Potential Employers.",
      icon: "🔑",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  const handleView = (generatorId) => {
    setSelectedGenerator(generatorId);
  };

  const handleGenerate = (generatorId) => {
    setSelectedGenerator(generatorId);
    if (generatorId === 1) {
      handleHeadlineGenerate();
    } else if (generatorId === 2) {
      handleAboutGenerate();
    } else if (generatorId === 3) {
      handleJobDescriptionGenerate();
    } else if (generatorId === 4) {
      handleKeywordsGenerate();
    }
  };

  const handleHeadlineGenerate = async () => {
    if (!session?.user?.email) {
      return;
    }

    if (!userData) {
      return;
    }

    setMsgLoading((prev) => ({ ...prev, 1: true }));
    setStreamedData((prev) => ({ ...prev, 1: "" }));

    try {
      const payload = {
        personName: `${userData.firstName} ${userData.lastName}`,
        email: session.user.email,
        creditsUsed: "1",
        trainBotData: {
          userEmail: session.user.email,
          fileAddress: userData.fileName || "resume.pdf",
        },
        userData: userData,
      };

      const response = await fetch("/api/generate-linkedin-headline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 402 || response.status === 429) {
          showCreditLimitPopup();
          return; // Return early instead of throwing
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setStreamedData((prev) => ({ ...prev, 1: (prev[1] || "") + chunk }));
      }
    } catch (error) {
      console.error("Error generating headline:", error);
      if (isCreditsError(error)) {
        showCreditLimitPopup();
      }
    } finally {
      setMsgLoading((prev) => ({ ...prev, 1: false }));
    }
  };

  const handleAboutGenerate = async () => {
    if (!session?.user?.email) {
      return;
    }

    if (!userData) {
      return;
    }

    setMsgLoading((prev) => ({ ...prev, 2: true }));
    setStreamedData((prev) => ({ ...prev, 2: "" }));

    try {
      const payload = {
        personName: `${userData.firstName} ${userData.lastName}`,
        email: session.user.email,
        creditsUsed: "1",
        trainBotData: {
          userEmail: session.user.email,
          fileAddress: userData.fileName || "resume.pdf",
        },
        userData: userData,
      };

      const response = await fetch("/api/generate-linkedin-about", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 402 || response.status === 429) {
          showCreditLimitPopup();
          return; // Return early instead of throwing
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setStreamedData((prev) => ({ ...prev, 2: (prev[2] || "") + chunk }));
      }
    } catch (error) {
      console.error("Error generating about section:", error);
      if (isCreditsError(error)) {
        showCreditLimitPopup();
      }
    } finally {
      setMsgLoading((prev) => ({ ...prev, 2: false }));
    }
  };

  const handleJobDescriptionGenerate = async () => {
    if (!session?.user?.email) {
      return;
    }

    if (!userData) {
      return;
    }

    setMsgLoading((prev) => ({ ...prev, 3: true }));
    setStreamedData((prev) => ({ ...prev, 3: "" }));

    try {
      const payload = {
        personName: `${userData.firstName} ${userData.lastName}`,
        email: session.user.email,
        creditsUsed: "1",
        trainBotData: {
          userEmail: session.user.email,
          fileAddress: userData.fileName || "resume.pdf",
        },
        userData: userData,
      };

      const response = await fetch("/api/generate-linkedin-jobdescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 402 || response.status === 429) {
          showCreditLimitPopup();
          return; // Return early instead of throwing
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setStreamedData((prev) => ({ ...prev, 3: (prev[3] || "") + chunk }));
      }
    } catch (error) {
      console.error("Error generating job description:", error);
      if (isCreditsError(error)) {
        showCreditLimitPopup();
      }
    } finally {
      setMsgLoading((prev) => ({ ...prev, 3: false }));
    }
  };

  const handleKeywordsGenerate = async () => {
    if (!session?.user?.email) {
      return;
    }

    if (!userData) {
      return;
    }

    setMsgLoading((prev) => ({ ...prev, 4: true }));
    setStreamedData((prev) => ({ ...prev, 4: "" }));

    try {
      const payload = {
        personName: `${userData.firstName} ${userData.lastName}`,
        email: session.user.email,
        creditsUsed: "1",
        trainBotData: {
          userEmail: session.user.email,
          fileAddress: userData.fileName || "resume.pdf",
        },
        userData: userData,
      };

      const response = await fetch("/api/generate-linkedin-keywords", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 402 || response.status === 429) {
          showCreditLimitPopup();
          return; // Return early instead of throwing
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setStreamedData((prev) => ({ ...prev, 4: (prev[4] || "") + chunk }));
      }
    } catch (error) {
      console.error("Error generating keywords:", error);
      if (isCreditsError(error)) {
        showCreditLimitPopup();
      }
    } finally {
      setMsgLoading((prev) => ({ ...prev, 4: false }));
    }
  };

  const copyText = async (text, generatorId) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied((prev) => ({ ...prev, [generatorId]: true }));
      setTimeout(
        () => setIsCopied((prev) => ({ ...prev, [generatorId]: false })),
        2000
      );
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleEdit = (generatorId) => {
    setIsEditing((prev) => ({ ...prev, [generatorId]: true }));
    setTimeout(() => {
      const editor = document.getElementById(`editor-${generatorId}`);
      if (editor) {
        editor.innerHTML = streamedData[generatorId] || "";
        editor.focus();
      }
    }, 100);
  };

  const handleSave = (generatorId) => {
    const editor = document.getElementById(`editor-${generatorId}`);
    if (editor) {
      setStreamedData((prev) => ({
        ...prev,
        [generatorId]: editor.innerHTML.replace(/<[^>]*>/g, ""),
      }));
    }
    setIsEditing((prev) => ({ ...prev, [generatorId]: false }));
  };

  const saveToDatabase = async (generatorId) => {
    const content = streamedData[generatorId];
    if (!content) {
      return;
    }

    setIsSaving((prev) => ({ ...prev, [generatorId]: true }));

    try {
      const typeMap = {
        1: "headline",
        2: "about",
        3: "jobDescription",
        4: "keywords",
      };

      const titleMap = {
        1: "LinkedIn Headline",
        2: "LinkedIn About Section",
        3: "LinkedIn Job Description",
        4: "LinkedIn Keywords",
      };

      const response = await fetch("/api/linkedin/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: typeMap[generatorId],
          content: content,
          title: `${
            titleMap[generatorId]
          } - ${new Date().toLocaleDateString()}`,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Reload saved content
        await loadSavedContent();
      } else {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
    } finally {
      setIsSaving((prev) => ({ ...prev, [generatorId]: false }));
    }
  };

  const toggleSavedView = (generatorId) => {
    setShowSaved((prev) => ({ ...prev, [generatorId]: !prev[generatorId] }));
  };

  const getSavedCount = (generatorId) => {
    const typeMap = {
      1: "headlines",
      2: "abouts",
      3: "jobDescriptions",
      4: "keywords",
    };
    const type = typeMap[generatorId];
    return savedContent[type]?.length || 0;
  };

  const deleteFromDatabase = async (type, itemId) => {
    try {
      const response = await fetch(
        `/api/linkedin/delete?type=${type}&id=${itemId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Reload saved content
        await loadSavedContent();
      } else {
        throw new Error("Failed to delete content");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };

  const getResponseTitle = (generatorId) => {
    switch (generatorId) {
      case 1:
        return "AI Generated Headline";
      case 2:
        return "AI Generated About Section";
      case 3:
        return "AI Generated Job Description";
      case 4:
        return "AI Generated Keywords";
      default:
        return "AI Generated Content";
    }
  };

  return (
    <div className="min-h-screen rounded bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            LinkedIn Optimizer
          </h1>
          <p className="text-gray-600">
            Optimize your LinkedIn profile with AI-powered tools
          </p>
        </div>

        {/* Generator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {generators.map((generator) => (
            <div key={generator.id} className="space-y-4">
              <div
                className={`${generator.bgColor} ${generator.borderColor} border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:border-purple-300`}
              >
                {/* Card Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-sm">
                    {generator.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {generator.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {generator.description}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleView(generator.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors"
                  >
                    <Eye size={16} />
                    View
                  </button>
                  <button
                    onClick={() => handleGenerate(generator.id)}
                    disabled={msgLoading[generator.id]}
                    className={`flex items-center gap-2 px-4 py-2 ${generator.buttonColor} text-white rounded-lg font-medium transition-colors disabled:opacity-50`}
                  >
                    {msgLoading[generator.id] ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <Download size={16} />
                        Generate
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => toggleSavedView(generator.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg text-green-700 font-medium hover:bg-green-50 hover:border-green-400 transition-colors"
                  >
                    <Eye size={16} />
                    Saved ({getSavedCount(generator.id)})
                  </button>
                </div>
              </div>

              {/* AI Response Section for each generator */}
              {streamedData[generator.id] && (
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                      {getResponseTitle(generator.id)}
                    </span>
                  </h3>
                  <div
                    className="font-sans text-gray-900 mb-4"
                    ref={componentRef}
                  >
                    {isEditing[generator.id] ? (
                      <div
                        id={`editor-${generator.id}`}
                        contentEditable={true}
                        className="text-gray-900 border border-gray-300 rounded-lg p-3 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onBlur={() => handleSave(generator.id)}
                      ></div>
                    ) : (
                      <div className="text-gray-900 p-3 bg-gray-50 rounded-lg border">
                        {streamedData[generator.id]}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      disabled={msgLoading[generator.id]}
                      onClick={() =>
                        copyText(streamedData[generator.id], generator.id)
                      }
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Copy size={16} />
                      <span className="text-sm">
                        {isCopied[generator.id] ? "Copied!" : "Copy"}
                      </span>
                    </button>
                    <button
                      type="button"
                      disabled={msgLoading[generator.id]}
                      onClick={() => handleEdit(generator.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      <Edit size={16} />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button
                      type="button"
                      disabled={
                        msgLoading[generator.id] || isSaving[generator.id]
                      }
                      onClick={() => saveToDatabase(generator.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSaving[generator.id] ? (
                        <>
                          <div className="w-4 h-4 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></div>
                          <span className="text-sm">Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          <span className="text-sm">Save</span>
                        </>
                      )}
                    </button>
                    {isEditing[generator.id] && (
                      <button
                        type="button"
                        onClick={() => handleSave(generator.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                      >
                        <Save size={16} />
                        <span className="text-sm">Save Edit</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Saved Content Section */}
              {showSaved[generator.id] && (
                <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                  <h3 className="text-2xl font-bold mb-4">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Saved{" "}
                      {getResponseTitle(generator.id).replace(
                        "AI Generated ",
                        ""
                      )}
                      s
                    </span>
                  </h3>
                  {getSavedCount(generator.id) === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No saved content yet.</p>
                      <p className="text-sm mt-2">
                        Generate content and save it to see it here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {(() => {
                        const typeMap = {
                          1: "headlines",
                          2: "abouts",
                          3: "jobDescriptions",
                          4: "keywords",
                        };
                        const type = typeMap[generator.id];
                        const items = savedContent[type] || [];

                        return items.map((item, index) => (
                          <div
                            key={item._id || index}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900">
                                {item.title}
                              </h4>
                              <span className="text-sm text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="text-gray-700 text-sm mb-3 bg-gray-50 p-3 rounded border">
                              {item.content}
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() =>
                                  copyText(
                                    item.content,
                                    `saved-${generator.id}-${index}`
                                  )
                                }
                                className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded text-sm transition-colors"
                              >
                                <Copy size={12} />
                                Copy
                              </button>
                              <button
                                onClick={() => {
                                  setStreamedData((prev) => ({
                                    ...prev,
                                    [generator.id]: item.content,
                                  }));
                                  setShowSaved((prev) => ({
                                    ...prev,
                                    [generator.id]: false,
                                  }));
                                }}
                                className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded text-sm transition-colors"
                              >
                                <Edit size={12} />
                                Use This
                              </button>
                              <button
                                onClick={() => {
                                  if (
                                    confirm(
                                      "Are you sure you want to delete this content?"
                                    )
                                  ) {
                                    const typeMap = {
                                      1: "headline",
                                      2: "about",
                                      3: "jobDescription",
                                      4: "keywords",
                                    };
                                    deleteFromDatabase(
                                      typeMap[generator.id],
                                      item._id
                                    );
                                  }
                                }}
                                className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm transition-colors"
                              >
                                <Trash2 size={12} />
                                Delete
                              </button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Credit Limit Popup */}
      {showCreditPopup && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border-2 border-red-500 text-red-700 p-4 px-8 rounded-xl shadow-lg animate-bounce">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            <span className="font-semibold">Credit Limit Reached!</span>
          </div>
          <p className="text-sm mt-1">
            Please upgrade your plan to continue generating LinkedIn content.
          </p>
        </div>
      )}
    </div>
  );
};

export default LinkedinOptimizer;
