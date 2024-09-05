TAIsync Chrome Extension
TAIsync is a Chrome extension designed to streamline your coding process by automatically pushing your code to GitHub when you complete TAI problems. This guide will walk you through the setup and usage of TAIsync, including how to obtain a GitHub token and configure your repository.

🚀 Getting Started

1. Installation
Clone the Repository:
Fork and clone this repository to your local machine.
Navigate to chrome://extensions in your Chrome browser.
Enable Developer mode by toggling the switch in the top-right corner.
Click Load unpacked and select the entire TAIsync folder from your local machine.

3. Setting Up Your GitHub Repository
Create a GitHub Repository:

Log in to GitHub and create a new repository.
Make sure to create a folder within this repository where your code will be pushed.
Note the full path, including your GitHub username and the repository name (e.g., username/repository-name).

Obtain a GitHub Token:

Visit GitHub Personal Access Tokens.
Click Generate new token.
Provide a description and select the necessary scopes (e.g., repo for full control of private repositories).
Generate the token and copy it. You will need this token for authentication.

3. Configuring TAIsync
Open TAIsync:

Click the TAIsync icon in your Chrome toolbar to open the extension popup.
Log In with GitHub:

If you haven't logged in yet, you will see a prompt to Log in with GitHub token.
Enter the GitHub token you obtained earlier and your GitHub repository path in the format: username/repository-name.
Sync Your Data:

Click the Sync button to start the extraction and upload process.
If GitHub credentials are not found, you will be prompted to log in.
Sign Out:

Click Sign out to remove your GitHub credentials from the extension.
After signing out, the login button will reappear instantly for you to log in again if needed.

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

