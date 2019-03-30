# Parents Soundboard

A soundboard developed for parents to be able to play often needed phrases like "No".

The texts can be edited and are spoken via TTS. You can change the TTS voice in the settings.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

# Run locally on your development machine

```
$ git clone https://github.com/Mokkapps/parents-soundboard
$ cd parents-soundboard
$ yarn install
$ yarn start

$ yarn android
or
$ yarn ios
```

# Run iOS or Android release builds locally

```
$ yarn android-release
or
$ yarn ios-release
```

# Build releases for App stores

## iOS

- In Xcode open \_parentssoundboard.xcworkspace\_\_ from ./ios folder
- Select `Product > Archive` from menu bar

## Android

- Place your keystore in ./android/app folder
- Enter your keystore password in ./android/gradle.properties
- Run `cd android && ./gradlew assembleRelease`
- If you still have issues, checkout the [official docs](https://facebook.github.io/react-native/docs/signed-apk-android)
