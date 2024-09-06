TAIsync Chrome Extension
TAIsync is a Chrome extension designed to streamline your coding process by automatically pushing your code to GitHub when you complete TAI problems. This guide will walk you through the setup and usage of TAIsync, including how to obtain a GitHub token and configure your repository.

🚀 Getting Started

1. Installation

Download the Extension Files:

Clone the repository or download the ZIP from GitHub.
To clone the repository, users can run:

git clone https://github.com/Dhanush111/TAIsyncChromeExtension.git

Alternatively, they can click the "Code" button on GitHub and select "Download ZIP."
Unzip the Files (if downloaded as a ZIP):

If they downloaded a ZIP file, unzip it to a directory.

Install the Extension in Chrome:

Open Chrome and go to chrome://extensions/.
Enable Developer Mode in the top-right corner.
Click Load unpacked.
Select the folder where they unzipped or cloned the extension.


2. Setting Up Your GitHub Repository
Create a GitHub Repository:

Log in to GitHub and create a new repository.
Make sure to create a folder within this repository where your code will be pushed.
Note the full path, including your GitHub username and the repository name (e.g., username/repository-name).

Login via GitHub Token:
To authorize TAIsync with your GitHub account, you will need to use a GitHub personal access token. Here's how to generate one:

Go to your GitHub account settings.
Navigate to settings > Developer Settings > Personal Access Tokens > Tokens (classic) > Generate new token.

Ensure the token has appropriate permissions (repo access) for pushing code to your repositories.
Copy and save the token, as you will use it to log in via TAIsync.

Use the Extension:

The extension will now be visible in Chrome’s extensions area. They can pin it by clicking the puzzle icon in the browser toolbar.



3. Configuring TAIsync
Open TAIsync:

Click the TAIsync icon in your Chrome toolbar to open the extension popup.
Log In with GitHub:

If you haven't logged in yet, you will see a prompt to Log in with GitHub token.
Enter the GitHub token you obtained earlier and your GitHub repository path in the format: username/repository-name.

Important: Enter the full GitHub repository path in the format username/repo-name (e.g., johnDoe/myCodingSolutions).

Sync Your Data:

Click the Sync button to start the extraction and upload process.
If GitHub credentials are not found, you will be prompted to log in.
Sign Out:

Click Sign out to remove your GitHub credentials from the extension.
After signing out, the login button will reappear instantly for you to log in again if needed.

After logging in with your GitHub token, you will need to provide the repository path where your solutions will be stored.



4. Using TAIsync
Extract Data:

Click the Sync button to extract the problem data and code from the current Leetcode problem.
Check Upload Status:

The status of your GitHub connection will be displayed in the popup.
If the upload is successful, you will receive a confirmation message.

💡 Tips for a Smooth Experience

Ensure that your GitHub token has the necessary permissions to push code to your repository.
Verify that the repository path you provide matches the format username/repository-name.
If you encounter issues with login or syncing, check the console for error messages and refer to the troubleshooting section.

🛠️ Troubleshooting
GitHub Token Issues: Ensure that the token has the appropriate scopes and is correctly entered.
Repository Path Errors: Double-check the repository path format and ensure it matches your GitHub setup.

📣 Feedback and Feature Requests
If you have suggestions or encounter any issues, please open an issue on our GitHub repository. Your feedback helps us improve TAIsync!

