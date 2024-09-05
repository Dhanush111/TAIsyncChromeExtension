chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension Installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "upload") {
        console.log("Message received for upload:", message);

        chrome.storage.local.get(['repoName', 'token'], (result) => {
            const { repoName, token } = result;

            if (repoName && token) {
                console.log('GitHub credentials found:', repoName, token);

                // Validate and destructure message.data
                const data = message.data || {};
                const { questionName, formattedText, code } = data;

                console.log('Extracted data:', { questionName, formattedText, code });

                if (questionName && formattedText && code) {
                    uploadToGitHub(repoName, token, { questionName, formattedText, code })
                        .then(response => {
                            sendResponse({ status: "success", response });
                        })
                        .catch(error => {
                            console.error('GitHub upload failed:', error);
                            sendResponse({ status: "failure", error: error.message });
                        });
                } else {
                    console.error('Invalid data structure:', data);
                    sendResponse({ status: "failure", error: "Invalid data structure" });
                }
            } else {
                console.log('GitHub credentials not found.');
                sendResponse({ status: "no_credentials" });
            }
        });

        // Required to keep the message channel open for asynchronous response
        return true;
    }
});

async function uploadToGitHub(repoName, token, data) {
    const { questionName, formattedText, code } = data;
    const folderPath = `${questionName.replace(/\s+/g, '-')}`; // Replace spaces with hyphens for safe directory names
    const readmeContent = `# ${questionName}\n\n${formattedText.replace(/\n/g, '\n\n')}`;
    const codeContent = code;

    const headers = {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
    };

    // Function to get the file SHA if it exists
    const getFileSha = async (path) => {
        const url = `https://api.github.com/repos/${repoName}/contents/${path}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (response.status === 200) { // File exists
            const fileData = await response.json();
            return fileData.sha; // Return the SHA
        } else if (response.status === 404) {
            return null; // File does not exist
        } else {
            const error = await response.json();
            throw new Error(`Failed to check file: ${error.message}`);
        }
    };

    const createOrUpdateFile = async (path, content) => {
        const sha = await getFileSha(path); // Get the SHA if the file exists
        const url = `https://api.github.com/repos/${repoName}/contents/${path}`;
        const body = {
            message: `Add or update ${path}`,
            content: btoa(unescape(encodeURIComponent(content))), // Encode content to base64
            sha: sha || undefined // Include SHA if updating, otherwise undefined
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(`Failed to create or update file: ${error.message}`);
        }

        return response.json();
    };

    // Create or update README.md and code.java in the respective folder
    await createOrUpdateFile(`${folderPath}/README.md`, readmeContent);
    await createOrUpdateFile(`${folderPath}/code.java`, codeContent);
}

//save