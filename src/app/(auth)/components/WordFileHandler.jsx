"use client";

import React, { useEffect } from "react";
import PizZip from "pizzip";
import { DOMParser } from "@xmldom/xmldom";
import JSZip from "jszip";

const saveToLocalStorage = (text) => {
  localStorage.setItem("pdfText", text);
};

const WordFileHandler = ({
  file,
  fetchRegistrationDataFromResume,
  text,
  setText,
}) => {
  const str2xml = (str) => {
    if (str.charCodeAt(0) === 65279) {
      str = str.substr(1);
    }
    return new DOMParser().parseFromString(str, "text/xml");
  };

  const extractPlainTextFromXML = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");

    const textElements = xmlDoc.getElementsByTagName("w:t");
    let plainText = "";

    for (let i = 0; i < textElements.length; i++) {
      const textContent = textElements[i].textContent;
      const xmlSpace = textElements[i].getAttribute("xml:space");
      const preserveSpace = xmlSpace === "preserve";

      if (preserveSpace) {
        plainText += textContent;
      } else {
        plainText += textContent.trim();
      }
    }

    return plainText;
  };

  const extractHeadersAndFooters = async (arrayBuffer) => {
    const zip = new JSZip();
    return zip.loadAsync(arrayBuffer).then((zip) => {
      const headerPaths = [
        "word/header1.xml",
        "word/header2.xml",
        "word/header3.xml",
      ];
      const footerPaths = [
        "word/footer1.xml",
        "word/footer2.xml",
        "word/footer3.xml",
      ];

      const headers = [];
      const footers = [];

      headerPaths.forEach((path) => {
        if (zip.file(path)) {
          headers.push(zip.file(path).async("string"));
        }
      });

      footerPaths.forEach((path) => {
        if (zip.file(path)) {
          footers.push(zip.file(path).async("string"));
        }
      });

      return Promise.all([...headers, ...footers]);
    });
  };

  const getParagraphs = (content) => {
    const zip = new PizZip(content);
    const xml = str2xml(zip.files["word/document.xml"].asText());

    const paragraphsXml = xml.getElementsByTagName("w:p");
    let _paragraphs = "";

    for (let i = 0, len = paragraphsXml.length; i < len; i++) {
      let fullText = "";
      const textsXml = paragraphsXml[i].getElementsByTagName("w:t");
      for (let j = 0, len2 = textsXml.length; j < len2; j++) {
        const textXml = textsXml[j];
        if (textXml.childNodes) {
          fullText += textXml.childNodes[0].nodeValue;
        }
      }
      if (fullText) {
        _paragraphs += fullText;
      }
    }
    return _paragraphs;
  };

  useEffect(() => {
    if (file) {
      let plainText = "";
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e?.target?.result;
        extractHeadersAndFooters(content).then((results) => {
          results.forEach((content) => {
            plainText = extractPlainTextFromXML(content);
          });
          const paragraphs = getParagraphs(content);
          setText(`${plainText} ${paragraphs}`);
        });
      };

      reader.onerror = (err) => console.error(err);
      reader.readAsArrayBuffer(file);
    }
  }, [file]);

  useEffect(() => {
    if (text !== "") {
      saveToLocalStorage(text);
      if (fetchRegistrationDataFromResume !== undefined) {
        fetchRegistrationDataFromResume(text);
      }
    }
  }, [text]);

  return <></>;
};

export default WordFileHandler;
