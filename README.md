![logo secret note](src/assets/logoipsum.png)

### This project is used to manage and store your note secretly. Secret notes is protected with plain text password and biometrics authentication

# Usage

- Open the app and create a new note or edit existing notes.
- Biometric authentication will be required when accessing the app. Use your fingerprint or face recognition to unlock.
- If biometric authentication fails, you can enter the text password as a fallback option.
- All notes are securely encrypted, ensuring they are never stored unencrypted.

# Overall Project decision explanation

1. Why using yarn?, We use Yarn as the package manager for this project because yarn is faster than npm

2. Clean Code Architecture, This project follows Clean Code Architecture, which is a software design philosophy that promotes the separation of concerns and maintainability. Key principles include:

   - Separation of Concerns: Clean Code Architecture separates different components of the app, making it easier to maintain and extend.
   - Modularity: The codebase is divided into modules, each with its own responsibility, ensuring code is organized and maintainable.
   - Testability: Clean Code Architecture encourages writing testable code, which improves the overall quality of the app.

3. React Native Paper is chosen as the UI library for this project for several compelling reasons:
   - High-Quality Components: React Native Paper provides a wide range of high-quality and customizable components, such as buttons, cards, dialogs, and more. This allows for the quick development of a polished and professional-looking user interface.
   - Theming Support: It supports theming, enabling the customization of the app's appearance to match your specific branding and design preferences.
   - Community and Maintenance: React Native Paper is actively maintained and has a vibrant community. This means that it's less likely to become outdated or encounter compatibility issues with future React Native updates.
4. React Native Navigation is chosen as the navigation library for this project due to the following advantages:
   - Native Performance: React Native Navigation is built with a focus on native performance, offering seamless transitions and an overall smoother user experience. It takes full advantage of native navigation components on both iOS and Android.
   - Flexibility: The library provides great flexibility in terms of navigation patterns and transitions, allowing you to create a navigation structure tailored to your app's specific needs.
   - Large User Base: Due to its popularity and extensive use in the community, you can find a wealth of resources, documentation, and community support, making it easier to troubleshoot issues and implement advanced navigation features.

# Pre-Requisites

- Please tak a note to use yarn for package manager, because the lock file is in yarn. If you're using different package manager, perhaps the dependency version will broken

```
yarn@^1.22.19
node@^18
```

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash

yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.
