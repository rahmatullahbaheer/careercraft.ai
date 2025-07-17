export const htmlToPlainText = (html: string) => {
  const element = document.createElement("div");
  element.innerHTML = html;

  // Remove style elements
  const styleElements = element.querySelectorAll("style");
  styleElements.forEach((styleElement) => styleElement.remove());

  // Remove unwanted elements, such as script tags or specific classes
  const unwantedElements = element.querySelectorAll("script, .unwanted-class");
  unwantedElements.forEach((unwantedElement) => unwantedElement.remove());

  // Handle list items (ul and ol) with bullet points
  const lists = element.querySelectorAll("ul, ol");
  lists.forEach((list) => {
    const listItems = list.querySelectorAll("li");
    listItems.forEach((listItem) => {
      const bullet = list.nodeName === "OL" ? "1." : "•";
      listItem.textContent = `${bullet} ${listItem.textContent}`;
    });
  });

  // Handle headings (h1, h2, etc.)
  const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
  headings.forEach((heading) => {
    heading.textContent = `${heading.textContent}\n`;
  });

  const text = element.textContent || element.innerText;

  return text.trim();
};
