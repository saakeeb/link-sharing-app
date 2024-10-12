# Link Sharing App

Welcome to the Link Sharing App! This application allows you to easily save and share your favorite social media platform names and URLs. You can perform CRUD operations, utilize drag-and-drop features, and update user details like name, email, and image. The app uses third-party bulletproof authentication for secure login and registration.

## Features

- **CRUD Operations**: Create, read, update, and delete your social media links.
- **Drag and Drop**: Easily reorder your links with a simple drag-and-drop interface.
- **User Management**: Update user details such as name, email, and profile image.
- **Authentication**: Secure login and registration using bulletproof authentication.
- **Storybook**: Test and visualize dynamic components before using them in the app.
- **State Management**: Utilize Zustand, a lightweight alternative to Redux, for global state management.
- **Styling**: Tailwind CSS for modern and responsive design.
- **Type Safety**: TypeScript for robust and error-free code.
- **Responsive**: This is production ready mobile first responsive design.

## Prerequisites

- Node.js 20+
- Yarn 1.22+

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/saakeeb/link-sharing-app.git
   cd link-sharing-app
   ```

2. **Environment Setup**:
   Create a .env.local file to the root directory then copy the example environment file and paste it :
   ```bash
   copy .env.example paste in .env.local
   ```

3. **Install Dependencies**:
   ```bash
   yarn install
   ```

4. **Run the Development Server**:
   ```bash
   yarn run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

5. **Run the Production Server**:

   Open [links-sharing-app](https://links-sharing-app.netlify.app) to view the app in your browser.

## Important Packages

- **@tanstack/react-query**: For data fetching and caching.
- **react-hook-form**: Simplifies form handling.
- **zustand**: Lightweight state management.
- **tailwindcss**: Utility-first CSS framework.
- **typescript**: Adds static typing to JavaScript.
- **vite**: Fast and modern build tool.
- **storybook**: UI component explorer for React.

## Deployment

The app is continuously deployed on Netlify. Check the deployment status [here](https://app.netlify.com/sites/links-sharing-app/deploys).

## Conclusion

This Link Sharing App is a robust and user-friendly tool for managing and sharing your social media links. With its modern tech stack and intuitive features, it provides a seamless experience for users. Enjoy exploring and customizing your links!