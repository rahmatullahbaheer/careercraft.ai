"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import "../../templateStyles.css";
import DownloadService from "@/helpers/downloadFile";
import { useSearchParams } from "next/navigation";
import { getTemplates } from "@/components/dashboard/resume-templates/static-templates";
import { formatDate, getFormattedDate } from "@/helpers/getFormattedDateTime";
import Link from "next/link";
import { leftArrowIcon } from "@/helpers/iconsProvider";
import { useReactToPrint } from "react-to-print";
import { RootState } from "@/store/store";
import { Resume } from "@/store/resumeSlice";
const Page = () => {
  const params = useSearchParams();
  const [scale, setScale] = useState<number>(1);
  const [cvMaxHeight, setCvMaxHeight] = useState<number | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const templateId: number = parseInt(params.get("templateId") || "0");
  const resumeId: string = params.get("resumeId") || "";
  let resumeData = useSelector((state: any) => state.resume);
  const userData = useSelector((state: RootState) => state.userData);
  const cvRef = useRef<HTMLDivElement | null>(null);
  let template: any;
  template = getTemplates(templateId);

  useEffect(() => {
    if (resumeData.id === "") {
      resumeData = userData.resumes.find(
        (resume: Resume) => resume.id === resumeId
      );
    }
    const newWorkExperienceArray = resumeData.workExperienceArray.map(
      (job) => {
        return {
          ...job,
          toMonth: job.isContinue ? "Present" : job.toMonth,
        };
      }
    );

    resumeData = {
      ...resumeData,
      workExperienceArray: newWorkExperienceArray,
    }
  }, [templateId, resumeId]);

  const { components, templateLayout, cvHeadings, GenerationOrder } = template;

  let newCvHeadings: any = [];

  for (const singleHeading of Object.entries(resumeData.headings)) {
    const [key, value] = singleHeading;

    let singleValue = cvHeadings.find(
      (heading: any) => heading.headingKey === key
    );
    if (singleValue && singleValue.text !== "") {
      singleValue.text = value;
      newCvHeadings.push(singleValue);
    }
  }

  const dates = ["date", "startDate", "endDate"];

  let spans: any = [];
  let currentPageIndex = 0;
  let pages: any = [];
  let parts: any = [];
  let fragment: any = [];
  let leftSpan: any = [];

  const handlePrintClick = useReactToPrint({
    content: () => cvRef.current,
    pageStyle: `
    @page {
      size: A4;
      margin:0;
    }
  `,
  });

  const normalizeLinkedInURL = (url: string) => {
    // Remove leading/trailing whitespace
    url = url.trim();
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    // Ensure the URL contains the LinkedIn profile path
    const linkedInPattern = /linkedin\.com\/in\/([\w-]+)/;
    const match = url.match(linkedInPattern);

    if (match) {
      const username = match[1];
      return `https://www.linkedin.com/in/${username}`;
    }

    // If no LinkedIn profile pattern is found, assume it's just a username
    if (url.match(/^[\w-]+$/)) {
      return `https://www.linkedin.com/in/${url}`;
    }

    // If it's not recognizable, return the original URL (optionally, you could throw an error or handle it differently)
    return url;
  };
  const getAllSettings = () => {
    if (cvRef.current) {
      const scaling =
        window.innerWidth < 1024
          ? (window.innerWidth * 0.38) / 320
          : ((window.innerWidth - 212) * 0.38) / 320;
      const roundedScale = Math.floor(scaling * 100) / 100;
      setScale(roundedScale);
      const scaledHeight = cvRef.current.offsetHeight; // Get the actual height of the scaled element
      const unscaledHeight = scaledHeight * roundedScale; // Calculate the unscaled height
      setCvMaxHeight(unscaledHeight + 100); // Set the scaled down height plus 100 (adjust as needed)
    }
  };

  const cleanUpHTML = (page: any) => {
    const templateNumber =  page.getAttribute(
      "data-template-no"
    );
    let cleanUpIds
    let containerNames
    if(templateNumber === "2" || templateNumber === "6" || templateNumber === "7" || templateNumber === "8"){
      cleanUpIds = [
        "shortName",
        "email",
        "linkedIn",
        "phone",
        "address",
        "primarySkills",
        "name",
        "jobTitle",
        "summary",
      ];
      containerNames = [
        "header",
        "skills",
        "summary",
        "contact",
        "education",
        "sideBar",
        "trainings",
        "awards",
        "references",
        "certifications",
        "body",
      ];
    } else {
      cleanUpIds = [
        "shortName",
        "email",
        "linkedIn",
        "phone",
        "address",
        "primarySkills",
        "name",
        "jobTitle",
        "summary",
        "languages",
        "interests"
      ];
      containerNames = [
        "header",
        "skills",
        "summary",
        "contact",
        "education",
        "sideBar",
        "trainings",
        "awards",
        "references",
        "languages",
        "interests",
        "certifications",
        "body",
      ];
    }

    

    for (const cleanUpId of cleanUpIds) {
      let emptyIds = page.querySelectorAll(`#${cleanUpId}`);
      for (const emptyId of emptyIds) {
        emptyId.remove();
      }
    }
    for (const containerName of containerNames) {
      let emptyDivs = page.querySelectorAll(
        `[data-container-name="${containerName}"]`
      );
      for (const emptyDiv of emptyDivs) {
        if (emptyDiv.children.length === 0) {
          emptyDiv.remove();
        }
      }
    }
  };

  const cleanUpLastPageHTML = (page: any) => {
    // Function to check if an element has text content
    const hasTextContent = (element: any) => {
      return element.textContent.trim().length > 0;
    };

    // Function to recursively check if any child element has text content
    const hasChildWithTextContent = (element: any) => {
      // Check if the current element has text content
      if (hasTextContent(element)) {
        return true; // Found text content, no need to check further
      }
      // Check text content of child elements recursively
      for (const child of element.children) {
        if (hasChildWithTextContent(child)) {
          return true; // Found text content in child, no need to check further
        }
      }
      return false; // No child has text content
    };

    // Check if the page has any child with text content
    if (!hasChildWithTextContent(page)) {
      // Remove the page if no child has text content
      page.remove();
    }
  };

  function checkOverflow(id: any) {
    var element = document.getElementById(`page-${id}`);
    // Check if element exists
    if (!element) {
      return false;
    }

    var fragment = element.children[0];
    var children: any = fragment.children;

    var totalHeight = 0;

    // Calculate combined height of children
    for (var i = 0; i < children.length; i++) {
      let attr = children[i].getAttribute("data-container-name");
      if (attr === "sideBar") {
      } else {
        totalHeight += children[i].offsetHeight;
      }
    }

    // Check if total height exceeds viewport height
    if (totalHeight > element.clientHeight) {
      return true;
    } else {
      return false;
    }
  }

  const setSidebarHeight = (page: any) => {
    const getSideBar = page.querySelector('div[data-container-name="sideBar"]');
    if (getSideBar) {
      getSideBar.style.height = "29.62cm";
    }
  };

  const canFitEducation = (
    page: any,
    educationHeading: any,
    height: number
  ) => {
    return educationHeading.offsetTop + height < page.clientHeight;
  };

  const languagesDivs = (page: any, nextPage?: any) => {
    const languagesDivs = document.querySelectorAll(
      "[data-languages-container-index]"
    );
    const pageId = page.getAttribute("id");
    let newDiv;
    newDiv = document.createElement("div");
    newDiv.setAttribute("data-container-name", "languages");
    setStylesToElement(newDiv, "m-2 flex gap-4 flex-wrap w-full");
    let newNextDiv;
    newNextDiv = document.createElement("div");
    newNextDiv.setAttribute("data-container-name", "languages");
    setStylesToElement(newNextDiv, "px-6 m-2 flex flex-wrap gap-4 w-full");
    const getLanguagesHeading = page.querySelector(
      "h2[data-name='languages']"
    );
    if (getLanguagesHeading) {
      let indicatorDiv = document.createElement("span");
      indicatorDiv.setAttribute("data-container-name", "languages-indicator");
      indicatorDiv.textContent = "indicator";
      setStylesToElement(indicatorDiv, "w-full h-2 bg-red-600");
      getLanguagesHeading.parentNode.insertBefore(
        indicatorDiv,
        getLanguagesHeading.nextSibling
      );
      if(nextPage){
        cleanUpHTML(nextPage)
      }
      const heights = Array.from(languagesDivs).map((div) => div.clientHeight);
      const maxHeight = Math.max(...heights);
      let isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
      let rowItemCount = 1;
      for (const singleLanguages of Array.from(languagesDivs)) {
        if (isSpaceAvailable && rowItemCount <= 3) {
          if (pageId === "page-0") {
            singleLanguages.className = singleLanguages.className.replace(
              "w-[30%]",
              "w-[45%]"
            );
          }
          newDiv.appendChild(singleLanguages);
          getLanguagesHeading.parentNode.insertBefore(
            newDiv,
            getLanguagesHeading.nextSibling
          );
          rowItemCount++;
        } else {
          isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
          if (isSpaceAvailable) {
            rowItemCount = 1;
            newDiv.appendChild(singleLanguages);
            getLanguagesHeading.parentNode.insertBefore(
              newDiv,
              getLanguagesHeading.nextSibling
            );

            rowItemCount++;
          } else {
            if (nextPage) {
              let referenceDiv = nextPage.querySelector(
                '[data-container-name="languages"]'
              );
              if (referenceDiv) {
                referenceDiv.appendChild(singleLanguages);
              } else {
                newNextDiv.appendChild(singleLanguages);
                nextPage.append(newNextDiv);
              }
            }
          }
        }
      }

      let elementsToRemove = document.querySelectorAll(
        '[data-container-name="languages-indicator"]'
      );

      if (nextPage) {
        cleanUpLastPageHTML(nextPage);
      }
      // Loop through each matching element and remove it from the DOM
      elementsToRemove.forEach((element: any) => {
        element.parentNode.removeChild(element);
      });
    }
  };

  const referencesDivs = (page: any, nextPage?: any) => {
    const referencesDivs = document.querySelectorAll(
      "[data-references-container-index]"
    );
    const pageId = page.getAttribute("id");
    let newDiv;
    newDiv = document.createElement("div");
    newDiv.setAttribute("data-container-name", "references");
    setStylesToElement(newDiv, "m-2 flex gap-4 flex-wrap w-full");
    let newNextDiv;
    newNextDiv = document.createElement("div");
    newNextDiv.setAttribute("data-container-name", "references");
    setStylesToElement(newNextDiv, "px-6 m-2 flex flex-wrap gap-4 w-full");
    const getReferencesHeading = page.querySelector(
      "h2[data-name='references']"
    );
    if (getReferencesHeading) {
      let indicatorDiv = document.createElement("span");
      indicatorDiv.setAttribute("data-container-name", "references-indicator");
      indicatorDiv.textContent = "indicator";
      setStylesToElement(indicatorDiv, "w-full h-2 bg-red-600");
      getReferencesHeading.parentNode.insertBefore(
        indicatorDiv,
        getReferencesHeading.nextSibling
      );
      if(nextPage){
        cleanUpHTML(nextPage)
      }
      const heights = Array.from(referencesDivs).map((div) => div.clientHeight);
      const maxHeight = Math.max(...heights);
      let isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
      let rowItemCount = 1;
      for (const singleReferences of Array.from(referencesDivs)) {
        if (isSpaceAvailable && rowItemCount <= 3) {
          if (pageId === "page-0") {
            singleReferences.className = singleReferences.className.replace(
              "w-[30%]",
              "w-[45%]"
            );
          }
          newDiv.appendChild(singleReferences);
          getReferencesHeading.parentNode.insertBefore(
            newDiv,
            getReferencesHeading.nextSibling
          );
          rowItemCount++;
        } else {
          isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
          if (isSpaceAvailable) {
            rowItemCount = 1;
            newDiv.appendChild(singleReferences);
            getReferencesHeading.parentNode.insertBefore(
              newDiv,
              getReferencesHeading.nextSibling
            );

            rowItemCount++;
          } else {
            if (nextPage) {
              let referenceDiv = nextPage.querySelector(
                '[data-container-name="references"]'
              );
              if (referenceDiv) {
                referenceDiv.appendChild(singleReferences);
              } else {
                newNextDiv.appendChild(singleReferences);
                nextPage.append(newNextDiv);
              }
            }
          }
        }
      }

      let elementsToRemove = document.querySelectorAll(
        '[data-container-name="references-indicator"]'
      );

      if (nextPage) {
        cleanUpLastPageHTML(nextPage);
      }
      // Loop through each matching element and remove it from the DOM
      elementsToRemove.forEach((element: any) => {
        element.parentNode.removeChild(element);
      });
    }
  };

  const educationDivs = (page: any, nextPage?: any) => {
    const educationDivs = document.querySelectorAll(
      "[data-education-container-index]"
    );
    const pageId = page.getAttribute("id");
    let newDiv;
    newDiv = document.createElement("div");
    newDiv.setAttribute("data-container-name", "education");
    setStylesToElement(newDiv, "m-2 flex gap-4 flex-wrap w-full");
    let newNextDiv;
    newNextDiv = document.createElement("div");
    newNextDiv.setAttribute("data-container-name", "education");
    setStylesToElement(newNextDiv, "px-6 m-2 flex flex-wrap gap-4 w-full");
    const getEducationHeading = page.querySelector("h2[data-name='education']");
    if (getEducationHeading) {
      let indicatorDiv = document.createElement("span");
      indicatorDiv.setAttribute("data-container-name", "education-indicator");
      indicatorDiv.textContent = "indicator";
      setStylesToElement(indicatorDiv, "w-full h-2 bg-red-600");
      getEducationHeading.parentNode.insertBefore(
        indicatorDiv,
        getEducationHeading.nextSibling
      );
      if(nextPage){
        cleanUpHTML(nextPage)
      }
      const heights = Array.from(educationDivs).map((div) => div.clientHeight);

      const maxHeight = Math.max(...heights);
      let isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
      let rowItemCount = 1;
      for (const singleEducation of Array.from(educationDivs)) {
        if (isSpaceAvailable && rowItemCount <= 3) {
          if (pageId === "page-0") {
            singleEducation.className = singleEducation.className.replace(
              "w-[30%]",
              "w-[45%]"
            );
          }
          newDiv.appendChild(singleEducation);
          getEducationHeading.parentNode.insertBefore(
            newDiv,
            getEducationHeading.nextSibling
          );
          rowItemCount++;
        } else {
          isSpaceAvailable = canFitEducation(page, indicatorDiv, maxHeight);
          if (isSpaceAvailable) {
            rowItemCount = 1;
            newDiv.appendChild(singleEducation);
            getEducationHeading.parentNode.insertBefore(
              newDiv,
              getEducationHeading.nextSibling
            );

            rowItemCount++;
          } else {
            if (nextPage) {
              let eduDiv = nextPage.querySelector(
                '[data-container-name="education"]'
              );
              if (eduDiv) {
                eduDiv.appendChild(singleEducation);
              } else {
                newNextDiv.appendChild(singleEducation);
                nextPage.append(newNextDiv);
              }
            }
          }
        }
      }

      let elementsToRemove = document.querySelectorAll(
        '[data-container-name="education-indicator"]'
      );

      if (nextPage) {
        cleanUpLastPageHTML(nextPage);
      }
      // Loop through each matching element and remove it from the DOM
      elementsToRemove.forEach((element: any) => {
        element.parentNode.removeChild(element);
      });
    }
  };

  const isContentBleeding = (page: any, checking: any) => {
    let height = 0;
    let margins = 0;
    if (checking === "before") {
      height = 45;
    }
    let getBody = page.querySelector('div[data-container-name="body"]');
    if (getBody) {
      let style = window.getComputedStyle(getBody);
      margins = parseInt(style.marginTop) + parseInt(style.marginBottom);
    } else {
      getBody = page.children[0];
    }
    let isOverflowingVertically =
      getBody.clientHeight + height > 1119 - margins;
    if (isOverflowingVertically) {
      cleanUpHTML(page);
      isOverflowingVertically = getBody.clientHeight + height > 1119 - margins;
      if (!isOverflowingVertically) {
        return false;
      }
    }
    return isOverflowingVertically;
  };

  const setAttributesToElem = (attr: any, elem: any) => {
    attr.map((atr: any) => {
      const [[key, value]] = Object.entries(atr);
      elem.setAttribute(`data-${key}`, value);
    });
  };

  const setStylesToElement = (elem: any, styles: any) => {
    if (styles) {
      styles.split(/\s+/).map((cls: any) => {
        if (cls !== "") {
          elem.classList.add(cls);
        }
      });
    }
  };

  const newPage = () => {
    const div = document.createElement("div");
    div.classList.add("page");
    div.id = "page-" + pages.length;
    pages.push(div);
    if(cvRef.current){
      cvRef.current.append(div);
    }
    return div;
  };

  const createElements = (obj: any) => {
    let [key, value] = obj;

    //   append the attribute to the elements

    let template = components[key];

    let attr = [{ name: key }];
    //   if the value is a object
    if (typeof value === "object" && !Array.isArray(value)) {
      if (template.elements) {
        for (const element of template.elements) {
          if (value.hasOwnProperty(element.id) && value[element.id] !== "") {
            const _element = document.createElement(element.tag);
            if (element.tag === "a") {
              const normalizedLink = normalizeLinkedInURL(value[element.id]);
              _element.setAttribute("href", normalizedLink);
              _element.setAttribute("target", "_blank");
            }
            const styles = element.styles;
            setStylesToElement(_element, styles);
            setAttributesToElem(attr, _element);
            setAttributesToElem([{ name: element.id }], _element);
            _element.textContent = value[element.id].trim();
            spans.push(_element);
          }
        }
      }
    }

    //   if the value is an array
    if (Array.isArray(value)) {
      let i = 1;
      for (const singleItem of value) {
        let newAttr: any = [];
        if (typeof singleItem === "object" && !Array.isArray(singleItem)) {
          if (template.elements) {
            for (const element of template.elements) {
              if (
                singleItem.hasOwnProperty(element.id) &&
                singleItem[element.id] !== ""
              ) {
                if (Array.isArray(singleItem[element.id])) {
                  let k = 1;
                  for (const singleAchievement of singleItem[element.id]) {
                    newAttr.push({ [`${key}-${element.id}-${i}-index`]: k });
                    const _element = document.createElement(element.tag);

                    setAttributesToElem(attr, _element);
                    setAttributesToElem(
                      [{ [`${key}-index`]: i }, { [`${element.id}-index`]: k }],
                      _element
                    );

                    _element.textContent = singleAchievement;
                    const styles = element.styles;
                    setStylesToElement(_element, styles);
                    spans.push(_element);
                    k++;
                  }
                } else {
                  const _element = document.createElement(element.tag);
                  setAttributesToElem(attr, _element);
                  setAttributesToElem(
                    [{ [`${key}-${element.id}-index`]: i }],
                    _element
                  );
                  _element.textContent = singleItem[element.id];
                  const styles = element.styles;
                  setStylesToElement(_element, styles);
                  spans.push(_element);
                }
              } else {
                if (element.container) {
                  const container_element = document.createElement(element.tag);
                  setAttributesToElem(attr, container_element);
                  setAttributesToElem(
                    [{ [`${key}-container-index`]: i }],
                    container_element
                  );
                  for (const item of element.container) {
                    if (
                      singleItem.hasOwnProperty(item.id) &&
                      singleItem[item.id] !== ""
                    ) {
                      const singlespan = document.createElement(item.tag);
                      setAttributesToElem(attr, singlespan);
                      const styles = item.styles;

                      setStylesToElement(singlespan, styles);

                      if (dates.includes(item.id)) {
                        singlespan.textContent = formatDate(
                          singleItem[item.id]
                        );
                      } else { 
                        singlespan.textContent = singleItem[item.id];
                      }

                      container_element.append(singlespan);
                    }
                    if (item.container) {
                      const inner_container_element = document.createElement(
                        item.tag
                      );
                      setAttributesToElem(attr, inner_container_element);
                      setAttributesToElem(
                        [{ [`${key}-inner-container-index`]: i }],
                        inner_container_element
                      );
                      for (const one of item.container) {
                        if (
                          singleItem.hasOwnProperty(one.id) &&
                          singleItem[one.id] !== ""
                        ) {
                          const singlespan = document.createElement(one.tag);
                          setAttributesToElem(attr, singlespan);
                          const styles = one.styles;
                          setStylesToElement(singlespan, styles);
                          singlespan.textContent = singleItem[one.id];
                          inner_container_element.append(singlespan);
                        }
                      }
                      const styles = item.styles;
                      setStylesToElement(inner_container_element, styles);
                      container_element.append(inner_container_element);
                    }
                  }
                  const styles = element.styles;
                  setStylesToElement(container_element, styles);
                  spans.push(container_element);
                }
              }
            }
          }
        } else {
          newAttr.push({ [`${key}-index`]: i });
          const element = document.createElement(template.tag);
          setAttributesToElem(attr, element);
          setAttributesToElem(newAttr, element);
          element.textContent = singleItem;
          const styles = template.styles;
          setStylesToElement(element, styles);
          spans.push(element);
        }
        i++;
      }
    }
    //   if the value is a string
    else {
      const element = document.createElement(template.tag);
      setAttributesToElem(attr, element);
      setAttributesToElem(attr, element);
      element.textContent = value;
      const styles = template.styles;
      setStylesToElement(element, styles);
      spans.push(element);
    }
  };

  const generateElements = (element: any, tag: any) => {
    let elem = document.createElement(tag);
    elem.id = element.id;
    if (tag === "div") {
      elem.textContent = "ok";
    }
    return elem;
  };

  const generateLayout = (page: any) => {
    const currentPage = page.getAttribute("id").split("-").pop();
    for (let templatepart in templateLayout) {
      if (templatepart === "styles") {
        setStylesToElement(page, templateLayout[templatepart]);
      } else if (templatepart === "attributes") {
        setAttributesToElem(templateLayout[templatepart], page);
      } else if (templatepart === "fragment") {
        for (let fragmentpart in templateLayout[templatepart]) {
          if (fragmentpart === "styles") {
          } else {
            const styles = templateLayout[templatepart][fragmentpart].styles;
            let div = document.createElement("div");
            setAttributesToElem([{ "container-name": fragmentpart }], div);
            setStylesToElement(div, styles);
            // styles.split(" ").map((cls: any) => div.classList.add(cls));
            const _elements = templateLayout[templatepart][
              fragmentpart
            ].elements.map((element: any) => {
              if (element.hasOwnProperty("fragment")) {
                return generateElements(element.fragment.elements[0], "div");
              } else {
                return generateElements(element, "span");
              }
            });

            _elements.map((_element: any) => div.append(_element));
            fragment.push({
              [fragmentpart]: div,
            });
          }
        }
        parts.push(fragment);
        fragment = [];
      } else {
        let div = document.createElement("div");
        const styles = templateLayout[templatepart].styles;
        setStylesToElement(div, styles);
        // styles.split(" ").map((cls: any) => div.classList.add(cls));

        const _elements = templateLayout[templatepart].elements.map(
          (element: any) => generateElements(element, "span")
        );

        _elements.map((_element: any) => div.append(_element));

        parts.push({
          [templatepart]: div,
        });
      }
    }

    if (Array.isArray(parts[currentPage])) {
      let container = document.createElement("div");
      templateLayout.fragment.styles
        .split(" ")
        .map((cls: any) => container.classList.add(cls));
      parts[currentPage]
        .map((part: any) => {
          if (typeof part === "object" && !Array.isArray(part)) {
            const [[partName, partElem]]: any = Object.entries(part);
            container.append(partElem);
          }
        })
        .join("");
      page.append(container);
    }
  };

  const getToNode = (span: any, attribute: any, page: any) => {
    const currentPage = page.getAttribute("id").split("-").pop();

    for (const p of parts[currentPage]) {
      const [[key, value]]: any = Object.entries(p);

      const findChild = value.children[attribute];
      const isHeading = span.getAttribute("data-type-heading");
      if (findChild) {
        if (
          attribute === "primarySkills" ||
          attribute === "education" ||
          attribute === "workExperienceArray" ||
          attribute === "publications" ||
          attribute === "certifications" ||
          attribute === "awards" ||
          attribute === "trainings" ||
          attribute === "interests" ||
          attribute === "references" ||
          attribute === "languages" ||
          attribute === "projects"
        ) {
          value.appendChild(span);
          findChild.textContent = "";
        } else {
          if (isHeading) {
            findChild.parentNode.insertBefore(span, findChild);
            findChild.textContent = "";
          } else value.replaceChild(span, value.children[attribute]);
        }
      } else {
      }
    }
  };

  function FinalizeGeneration(span: any, page: any) {
    const attribute = span.getAttribute("data-name");
    const isItBefore = isContentBleeding(page, "before");

    if (attribute && !isItBefore) {
      getToNode(span, attribute, page);
    }
    if (isItBefore) {
      leftSpan.push({ span: span, attribute: attribute });
      return true;
    }

    const isItAfter = isContentBleeding(page, "after");
    return isItAfter;
  }

  const generate = (jsonData: any) => {
    const newJsonObject: any = {};
    GenerationOrder.forEach((key: any) => {
      if (jsonData.hasOwnProperty(key)) {
        newJsonObject[key] = jsonData[key];
      }
    });

    for (const item of Object.entries(newJsonObject)) {
      createElements(item);
    }

    const firstPage = newPage();
    generateLayout(firstPage);
    newCvHeadings.forEach((item: any) => {
      let found = false; // Flag to track if the condition is met
      spans.forEach((singleSpan: any, index: any) => {
        if (found) return; // If the condition is already met, exit the loop
        const getSpan = singleSpan.getAttribute("data-name");
        if (getSpan === item.section) {
          const heading = document.createElement("h2");
          heading.textContent = item.text;
          if (item.attributes.length > 0) {
            setAttributesToElem(item.attributes, heading);
          }
          setAttributesToElem(
            [{ name: item.section }, { "type-heading": true }],
            heading
          );
          const style = item.styles;
          setStylesToElement(heading, style);

          spans.splice(index, 0, heading);
          found = true; // Set the flag to true when the condition is met
        }
      });
    });
    spans.forEach((span: any) => {
      setTimeout(() => {
  
        const gen = FinalizeGeneration(span, pages[currentPageIndex]);

        if (gen) {
          const latestPage = newPage();
          generateLayout(latestPage);
          currentPageIndex = pages.length - 1;
          if (leftSpan.length > 0) {
            const leftOutSpan = FinalizeGeneration(
              leftSpan[0].span,
              pages[currentPageIndex]
            );
            leftSpan.pop();
          }
        }
      }, 100);
    });

    setTimeout(() => {
      pages.map((page: any, index: any) => {
        languagesDivs(pages[index], pages[index + 1]);
        referencesDivs(pages[index], pages[index + 1]);
        educationDivs(pages[index], pages[index + 1]);
        setSidebarHeight(pages[index]);
        checkOverflow(index);
        cleanUpHTML(page);
      });
      getAllSettings();
      // cleanUpHTML(pages[pages.length - 1]);
      // addHeadings()
    }, 100);
  };

  useEffect(() => {
    setFileName(
      `${resumeData?.name
        ?.replaceAll(" ", "-")
        ?.replaceAll(".", "")
        .replaceAll("/", "")}-${resumeData?.jobTitle
        ?.replaceAll(" ", "-")
        ?.replaceAll(".", "")
        .replaceAll("/", "")}`
    );
   
    generate(resumeData);
  }, [resumeData]);

  return (
    <div
      className="lg:ml-[234px] ml-0"
      style={{ maxHeight: `${cvMaxHeight}px` }}
    >
      <div className="container flex items-center justify-between gap-3 xs:pb-0 md:pb-4">
        <Link
          href={`/resume-builder/templates/template?templateId=${templateId}`}
          className="ml-2 my-4 no-underline dark:text-[#b324d7] dark:hover:text-[#e6f85e] text-gray-950 hover:text-[#b324d7] flex flex-row gap-2 items-center hover:opacity-80 transition-all"
        >
          {leftArrowIcon}
          Back
        </Link>
        <div className="flex flex-row items-center justify-between gap-3 ">
          <button
            onClick={handlePrintClick}
            className="w-full hidden md:block sm:max-w-max sm:w-48 lg:px-6 px-4 py-2 rounded-full dark:bg-[#18181b]  border-[1.5px] border-gray-950/80 hover:dark:bg-[#2f2f35]"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-3 h-3 md:w-4 md:h-4 dark:text-gray-100 text-gray-950"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
                />
              </svg>

              <span className="text-xs capitalize dark:text-gray-300 group-hover:dark:text-gray-200 group-hover:font-semibold text-gray-950 md:text-sm">
                Print
              </span>
            </div>
          </button>
          <DownloadService
            componentRef={cvRef}
            fileName={fileName}
            preview={false}
          />
        </div>
      </div>
      <div
        ref={cvRef}
        className="cv-container text-[#000] origin-top-left space-y-4"
        style={{ scale: scale < 1 ? scale : 1 }}
      ></div>
    </div>
  );
};

export default Page;