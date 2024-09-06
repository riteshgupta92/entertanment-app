# Entertainment App

## Overview

The Entertainment App is a full-stack application that allows users to explore movies, TV shows, and bookmark their favorites. The app provides an interactive and user-friendly interface with features such as movie filtering, detailed information on selected titles, and bookmarking functionality.

## Features

- **Browse Movies and TV Shows**: Users can explore a wide range of entertainment options with an easy-to-navigate interface.
- **Search Functionality**: Quickly find movies or TV shows using the search bar.
- **Bookmark Favorites**: Save movies and TV shows to a personalized bookmark list for quick access later.
- **Detailed Information**: View detailed information about movies and TV shows, including release date, genre, and ratings.
- **Responsive Design**: Optimized for all devices, providing a seamless experience on both mobile and desktop platforms.

## Technologies Used

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Other Libraries**: React Router, react-toastify, react-icons, TMDB API for fetching movie and TV series data, bcrypt for password hashing, and JWT for authentication.

## Live Demo

> **Note**: Please connect to the VPN while using the application as TMDB services are blocked in India.

You can view the live version of the app here: [Entertainment-App](https://entertainment-fac29.web.app/)

## Database Schema

+------------------------+
|   Users Collection     |
|------------------------|
| _id: ObjectId          |
| email: String          |
| password: String       |
| bookmarks: [ ]         |
|                        |
|   +-----------------+  |
|   | Bookmarks       |  |
|   |-----------------|  |
|   | adult: Boolean  |  |
|   | backdrop_path   |  |
|   | genre_ids       |  |
|   | id: Number      |  |
|   | original_lang   |  |
|   | original_title  |  |
|   | overview        |  |
|   | popularity      |  |
|   | poster_path     |  |
|   | release_date    |  |
|   | title: String   |  |
|   | video: Boolean  |  |
|   | vote_average    |  |
|   | vote_count      |  |
|   +-----------------+  |
+------------------------+


## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/entertainment-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd entertainment-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

- Open the app in your browser at `http://localhost:3000`.
- Browse, search, and bookmark your favorite movies and TV shows.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
