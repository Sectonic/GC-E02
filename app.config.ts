import { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  originalFullName: "@sujald/dan",
  name: "DAN",
  slug: "DAN",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "DAN",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.sujald.DAN",
    config: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_KEY || ""
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    permissions: [
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO",
      "android.permission.CAMERA",
      "android.permission.RECORD_AUDIO"
    ],
    package: "com.sujald.DAN",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_KEY || ""
      }
    }
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    "expo-web-browser",
     "expo-av",
    [
      "expo-splash-screen",
      {
        "image": "./assets/logo.svg",
        "imageWidth": 200,
        "resizeMode": "contain",
        "backgroundColor": "#ffffff"
      }
    ],
    [
      "expo-camera",
      {
        "cameraPermission": "Allow $(PRODUCT_NAME) to access your camera"
      }
    ],
    "expo-font"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    router: {
      origin: false
    },
    googleMapsApiKey: process.env.GOOGLE_MAPS_KEY
  },
  owner: "sujald"
};

export default config;
