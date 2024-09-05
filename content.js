async function extractData() {
    try {
        const extractElementText = (element) => {
            let text = '';
            const children = Array.from(element.childNodes);

            children.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    text += child.textContent;
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const tagName = child.tagName.toLowerCase();

                    if (tagName === 'h4') {
                        text += extractElementText(child) + '\n';
                    } else if (tagName === 'div' || tagName === 'article') {
                        text += extractElementText(child) + '\n';
                    } else if (tagName === 'p') {
                        text += '\n' + extractElementText(child) + '\n';
                    } else if (tagName === 'br') {
                        text += ''; // Handle line breaks
                    } else {
                        text += extractElementText(child); // Recursive call for other tags
                    }
                }
            });

            return text;
        };

        const questionNameElement = document.querySelector('#root > div > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > h3');
        if (!questionNameElement) {
            console.error("Question name element not found.");
            return null;
        }
        const questionName = questionNameElement.textContent.trim();
        console.log("Question Name:", questionName);

        const contentElement = document.querySelector('#root > div > div > div > div:nth-child(2) > div > div > section > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div');
        if (!contentElement) {
            console.error("Content element not found.");
            return null;
        }
        const formattedText = extractElementText(contentElement);
        console.log("Formatted Text extracted.");

        const codeButton = document.querySelector('#root > div > div > div > div:nth-child(2) > div > div > section > div > div:nth-child(1) > button:nth-child(2)');
        if (codeButton) {
            codeButton.click();
            console.log("Code reveal button clicked.");
            await new Promise(resolve => setTimeout(resolve, 2500));
        } else {
            console.error("Code reveal button not found.");
        }

        const codeXPath = '//*[@id="root"]/div/div/div/div[2]/div/div/section/div/div[2]/div/div/div[2]/div/div/div[2]/section/div/div/div[1]/div[2]';
        const codeElement = document.evaluate(codeXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (!codeElement) {
            console.error("Code element not found.");
            return null;
        }

        let fullCode = '';
        let lastLine = '';

        const extractCode = () => {
            const content = extractElementText(codeElement);
            if (content) {
                const lines = content.split('\n').filter(line => line.trim().length > 0); // Remove blank lines
                let newContent = '';

                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i];

                    // Compare first line of the new content with the last line from the previous extraction
                    if (i === 0 && line === lastLine) {
                        continue; // Skip the first line if it's a duplicate
                    }

                    newContent += line + '\n';
                    lastLine = line;
                }

                fullCode += newContent;
                console.log("Current Code Content:", newContent);
            }
        };

        extractCode(); // Initial extraction

        const maxScrolls = 4; // Set the maximum number of scrolls

        for (let scrollCount = 0; scrollCount < maxScrolls; scrollCount++) {
            codeElement.scrollTop += codeElement.clientHeight; // Scroll almost a full view, but slightly less to overlap

            // Wait for new content to load and scroll to complete
            await new Promise(resolve => setTimeout(resolve, 2000));

            extractCode();
        }

        // Final extraction to ensure the last lines are captured
        extractCode();

        const code = fullCode.trim();
        console.log("Full Code extracted.");

        return { questionName, formattedText, code };
    } catch (error) {
        console.error("Error extracting data:", error);
        return null;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "extract") {
        extractData().then(data => {
            console.log("Extracted data:", data);
            sendResponse(data);
        }).catch(error => {
            console.error("Extraction failed:", error);
            sendResponse(null);
        });
        return true;
    }
});


//save