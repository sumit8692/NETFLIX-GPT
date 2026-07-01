# Netflix GPT 🎬

A Netflix-inspired movie browsing app with AI-powered search, built with React, Redux Toolkit, Firebase, and the TMDB API.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Bundler | Vite |
| UI Framework | React 18 |
| Styling | Tailwind CSS |
| State Management | Redux Toolkit |
| Authentication | Firebase Auth |
| Movie Data | TMDB API |
| Video Playback | YouTube iframe API |

---

## ✨ Features

### 🔐 Authentication
- Sign In / Sign Up form with client-side validation
- Firebase Authentication (email & password)
- Protected routes — redirects unauthenticated users to login
- Persistent user session via Firebase

### 🎥 Browse Page (Authenticated)
- **Header** — Netflix logo, user avatar, sign out
- **Hero Section (Main Container)**
  - Muted autoplay YouTube trailer in background
  - Fallback to TMDB backdrop image while trailer loads
  - Bottom fade-to-black gradient overlay
  - Movie title, overview, and action buttons (Play / More Info)
- **Movie Rows (Secondary Container)**
  - Horizontally scrollable genre rows (hidden scrollbar)
  - Only renders movies that have a full poster image
  - Rows include:
    - Now Playing
    - Top Rated
    - Action
    - Horror
    - Comedy
    - Thriller
    - Animation
    - Sci-Fi

### 🤖 Netflix GPT (Coming Soon)
- AI-powered movie search bar
- Gemini-powered movie suggestions

---

## 🧱 Project Structure

```
src/
├── components/
│   ├── Body.jsx              # Router setup & auth guard
│   ├── Browse.jsx            # Main browse page, calls all hooks
│   ├── Header.jsx            # Navigation bar
│   ├── Login.jsx             # Sign in / Sign up form
│   ├── MainContainer.jsx     # Hero section wrapper
│   ├── VideoBackground.jsx   # YouTube trailer iframe
│   ├── VideoTitle.jsx        # Title, overview & buttons overlay
│   ├── SecondaryContainer.jsx # All genre movie rows
│   ├── MovieList.jsx         # Single horizontally scrollable row
│   └── MovieCard.jsx         # Individual movie poster card
│
├── hooks/
│   ├── useMovieTrailer.js    # Fetches YouTube trailer for a movie
│   ├── useNowPlayingMovies.js
│   ├── useTopRatedMovies.js
│   ├── useActionMovies.js
│   ├── useHorrorMovies.js
│   ├── useComedyMovies.js
│   ├── useThrillerMovies.js
│   ├── useAnimationMovies.js
│   └── useSciFiMovies.js
│
└── utils/
    ├── appStore.js           # Redux store config
    ├── movieSlice.js         # Movie state (all genres + trailers)
    ├── userSlice.js          # Auth user state
    ├── firebase.js           # Firebase app init
    ├── constants.js          # API keys, CDN URLs
    └── validate.js           # Form validation logic
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Environment / Config

1. Create a project on [Firebase Console](https://console.firebase.google.com/) and enable **Email/Password** authentication.
2. Get a **TMDB API Read Access Token** from [themoviedb.org](https://www.themoviedb.org/settings/api).
3. Update `src/utils/constants.js` with your TMDB bearer token.
4. Update `src/utils/firebase.js` with your Firebase config object.