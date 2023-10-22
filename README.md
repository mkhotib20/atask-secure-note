![logo secret note](src/assets/logoipsum.png)

### This project is used to manage and store your note secretly. Secret notes is protected with plain text password and biometrics authentication

# Usage

- Open the app and create a new note or edit existing notes.
- Biometric authentication will be required when accessing the app. Use your fingerprint or face recognition to unlock.
- If biometric authentication fails, you can enter the text password as a fallback option.
- All notes are securely encrypted, ensuring they are never stored unencrypted.

# Unit Test Coverage

I was focused in login usecase test cases, it contains crucial business logic for authentication, and the business logic has been locked with unit test. This unit test is supposed to prevent unexpected logic changes when engineer modify the code

Here's the unit test coverage :
![UT Coverage](screenshoots/ut-coverage.png)

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
