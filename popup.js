document.addEventListener('DOMContentLoaded', () => {
    const syncButton = document.getElementById('syncButton');
    const statusText = document.createElement('p');
    statusText.id = 'statusText';
    document.body.appendChild(statusText);

    const loadingSpinner = document.getElementById('loadingSpinner');

    checkGitHubConnection();

    syncButton.addEventListener('click', () => {
        chrome.storage.local.get(['repoName', 'token'], (result) => {
            if (result.repoName && result.token) {
                // Start the sync process
                loadingSpinner.style.display = 'block'; // Show the spinner

                chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                    chrome.tabs.sendMessage(tabs[0].id, { action: "extract" }, (response) => {
                        loadingSpinner.style.display = 'none'; // Hide the spinner when complete

                        if (chrome.runtime.lastError) {
                            console.error("Chrome runtime error:", chrome.runtime.lastError);
                            return;
                        }

                        if (response) {
                            const { questionName, formattedText, code } = response;

                            console.log("Extracted Question Name:", questionName);
                            console.log("Extracted Formatted Text:", formattedText);
                            console.log("Extracted Code:", code);

                            uploadToGitHub({ questionName, formattedText, code });
                        } else {
                            console.error("No response from content script.");
                        }
                    });
                });
            } else {
                alert('GitHub credentials not found. Please sign in.');
                promptForGitHubLogin();
            }
        });
    });

    function checkGitHubConnection() {
        chrome.storage.local.get(['repoName', 'token'], (result) => {
            const { repoName, token } = result;
            if (repoName && token) {
                statusText.textContent = 'GitHub Connected';
            } else {
                statusText.textContent = 'GitHub Not Connected';
                promptForGitHubLogin();
            }
        });
    }

    async function validateGitHubCredentials(token, repoName) {
        const repoUrl = `https://api.github.com/repos/${repoName}`;

        try {
            const response = await fetch(repoUrl, {
                headers: {
                    Authorization: `token ${token}`,
                },
            });

            if (response.ok) {
                return true; // Credentials are valid
            } else {
                return false; // Invalid credentials
            }
        } catch (error) {
            console.error("Error validating GitHub credentials:", error);
            return false;
        }
    }

    function promptForGitHubLogin() {
        const existingLoginButton = document.getElementById('loginButton');
        if (existingLoginButton) return; // Prevent multiple login buttons

        const loginButton = document.createElement('button');
        loginButton.id = 'loginButton';
        loginButton.textContent = 'Login with GitHub token';
        document.body.appendChild(loginButton);

        loginButton.addEventListener('click', async () => {
            const token = prompt('Please enter your GitHub token:');
            const repoName = prompt('Please enter your GitHub repository name:');

            if (token && repoName) {
                const isValid = await validateGitHubCredentials(token, repoName);
                if (isValid) {
                    chrome.storage.local.set({ token, repoName }, () => {
                        statusText.textContent = 'GitHub Connected';
                        loginButton.remove();
                    });
                } else {
                    alert('Invalid GitHub token or repository name. Please try again.');
                }
            }
        });
    }

    function uploadToGitHub(data) {
        chrome.runtime.sendMessage({ action: "upload", data }, (response) => {
            if (response.status === "success") {
                console.log("Upload successful:", response);
                alert('Data successfully uploaded to GitHub!');
            } else if (response.status === "no_credentials") {
                alert('GitHub credentials not found. Please log in.');
                promptForGitHubLogin();
            } else {
                console.error('Upload failed:', response.error);
                alert('Failed to upload data to GitHub. See console for details.');
            }
        });
    }

    document.getElementById('clearStorageButton').addEventListener('click', () => {
        chrome.storage.local.clear(() => {
            if (chrome.runtime.lastError) {
                console.error('Error in Signed out:', chrome.runtime.lastError);
            } else {
                alert('Signed out successfully.');
                statusText.textContent = 'GitHub Not Connected';
                promptForGitHubLogin(); // Immediately show the login button after signing out
            }
        });
    });
});
