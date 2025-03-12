# Meme Gallery 📸🎭

This **Next.js** project is an interactive **Meme Gallery**, allowing users to explore, upload, and engage with memes. The app features the below;

## ✨ Features & Functionalities

### 🏠 Homepage (Landing Page)
- 🔥 Displays trending memes dynamically (Fetched from an API).
- 🎭 Interactive animations & smooth transitions.
- 🌙 Dark mode toggle for better user experience.

### 🔍 Meme Explorer Page
- 🔄 **Infinite Scrolling** or **Pagination** for seamless browsing.
- 📂 Filter memes by **Trending, New, Classic, and Random** categories.
- 🔎 **Search Functionality** with **debounced API calls** for fast performance.
- 📊 Sort memes by **Likes, Date, or Comments**.

### 📤 Meme Upload Page
- 🖼 Upload memes in **image/gif format**.
- 👀 **Preview before uploading** to ensure the best look.

### 📄 Meme Details Page
- 🔗 **Dynamic routing** (`/meme/:id`) for easy sharing.
- ❤️ **Like memes** with animation and local storage persistence.
- 💬 **Comment system** (Stored in local storage for now).
- 📤 **Sharing options** to spread the memes.

### 👤 User Profile Page
- 🖼 View and manage **user-uploaded memes**.
- ✏️ **Edit profile info** (Name, Bio, Profile Picture).
- 📌 See **liked memes**, stored locally or via API.

### 🏆 Leaderboard Page
- 🏅 Displays **Top 10 most liked memes**.

### 🐣 404 Page (Easter Egg)
- 🤣 A **fun, meme-based 404 error page** when users visit a non-existent route.

## 📦 Technologies Used

- **Next.js** – React-based framework for server-side rendering.
- **TypeScript** – Strongly typed JavaScript for better maintainability.
- **Framer Motion** – Smooth animations for UI interactions.
- **Tailwind CSS** – Utility-first styling framework.
- **AOS (Animate on Scroll)** – Adds cool scroll animations.
- **LocalStorage API** – Saves likes, comments, and user preferences.
- **Meme API** – Fetches trending and AI-generated meme captions.
