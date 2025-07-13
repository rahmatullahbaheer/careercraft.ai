"use client";

import React, { useEffect } from "react";
import { Document, pdfjs } from "react-pdf";

// Import CSS for react-pdf
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker with better error handling
if (typeof window !== "undefined") {
  try {
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
  } catch (error) {
    console.warn("Failed to set PDF.js worker:", error);
  }
}

const saveToLocalStorage = (text) => {
  localStorage.setItem("pdfText", text);
};

const FileUploadHandler = ({
  file,
  fetchRegistrationDataFromResume,
  text,
  setText,
}) => {
  const onDocumentLoadSuccess = async () => {
    if (file) {
      try {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const arrayBuffer = reader.result;
            const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;
            const textPromises = [];

            for (let i = 1; i <= numPages; i++) {
              textPromises.push(
                pdf
                  .getPage(i)
                  .then((page) => page.getTextContent())
                  .then((textContent) => {
                    const pageText = textContent.items
                      .map((item) => item.str)
                      .join(" ");
                    return pageText;
                  })
              );
            }

            Promise.all(textPromises)
              .then((pageTexts) => {
                const content = pageTexts.join(" ");
                setText(content);
                saveToLocalStorage(content);
                if (fetchRegistrationDataFromResume !== undefined) {
                  fetchRegistrationDataFromResume(content);
                }
              })
              .catch((error) =>
                console.error("Failed to extract PDF text:", error)
              );
          } catch (error) {
            console.error("Failed to process PDF:", error);
          }
        };

        reader.onerror = (error) => {
          console.error("FileReader error:", error);
        };

        reader.readAsArrayBuffer(file);
      } catch (error) {
        console.error("Failed to read file:", error);
      }
    }
  };

  return (
    <div
      className="hidden card-body scrapped-content"
      style={{ overflow: "auto" }}
    >
      {file && (
        <div>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} />
          <div>{text}</div>
        </div>
      )}
    </div>
  );
};

export default FileUploadHandler;
