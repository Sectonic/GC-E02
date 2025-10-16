# GC E02

> “We want caregivers to feel safe going to get groceries or do their laundry without fear that something might happen to their loved one.”

This is a proactive dementia management system designed to reduce the burden on caregivers while improving the quality of life for dementia patients. Built using wearable health data from the WHOOP band, it detects agitation and responds in real-time by automatically playing soothing music and alerting the caregiver.


## 📲 Features

- 🔄 Passive agitation tracking using WHOOP wearable data
- 🎵 Music playback to calm patients automatically
- 🔔 Push notifications to alert caregivers in real-time
- 📊 Live charts and maps visualizing agitation levels
- 🔐 Google and WHOOP OAuth flows (custom integration)

## 📸 Screenshots

<div align="left">
   <img src="public/screenshots/landing.png" alt="Landing Screen" width="250px"/>
   <img src="public/screenshots/auth.png" alt="Authentication Screen" width="250px"/>
   <br/><br/>
   <img src="public/screenshots/alert.png" alt="Agitation Alert" width="250px"/>
   <img src="public/screenshots/music.png" alt="Music Playback Screen" width="250px"/>
   <br/><br/>
   <img src="public/screenshots/dashboard.png" alt="Caregiver Dashboard" width="250px"/>
   <img src="public/screenshots/qr.png" alt="QR Code Page" width="250px"/>
</div>

## 🛠️ Tech Stack

| Layer    | Technologies                                                |
| -------- | ----------------------------------------------------------- |
| Frontend | React Native (Expo), TypeScript, NativeWind, Victory Charts |
| Backend  | Python Flask, Firebase Firestore, Firebase Admin SDK        |
| Auth     | Google OAuth 2.0, WHOOP OAuth, Expo AuthSession             |
| Media    | Spotify API, Spotify Playback SDK (WIP), Expo AV            |
| Hosting  | Firebase Functions (WIP), Google Cloud Platform, Vercel         |
