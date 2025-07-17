export const fetchLIstOfStrings = (text: string) => {
    // Create a new DOMParser
    const parser = new DOMParser();

    // Parse the HTML string into a DOM document
    const doc = parser.parseFromString(text, "text/html");

    // Get the <ul> element
    const ulElement = doc.querySelector("ul");
    if (ulElement) {
        // Get an array of <li> elements
        const liElements = ulElement.querySelectorAll("li");

        // Initialize an array to store the values of <li> elements
        const valuesArray: any = [];

        // Loop through the <li> elements and extract their text content
        liElements.forEach((liElement: any) => {
            valuesArray.push(liElement.textContent.trim());
        });
        return valuesArray;
    }

    return [];
};