# Entertainment App

## Overview

The Entertainment App is a comprehensive full-stack application designed to help users explore movies and TV shows, bookmark their favorites, and access detailed information about each title. The app offers an intuitive and interactive interface, featuring movie and TV show filtering, detailed views, and personalized bookmarking.

## Features

- **Browse Movies and TV Shows**: Navigate through a wide range of entertainment options with a user-friendly interface.
- **Search Functionality**: Easily find specific movies or TV shows using a robust search bar.
- **Bookmark Favorites**: Save movies and TV shows to a personalized bookmark list for quick access.
- **Detailed Information**: Access detailed information about each movie and TV show, including release date, genre, ratings, and more.
- **Responsive Design**: Optimized for various devices, ensuring a seamless experience on both mobile and desktop platforms.

## Technologies Used

- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Libraries**: React Router, react-toastify, react-icons
- **APIs**: TMDB API for fetching movie and TV series data
- **Security**: bcrypt for password hashing, JWT for authentication

## Live Demo

> **Note**: Please connect to a VPN if you are accessing the application from India, as TMDB services are blocked in the region.

You can view the live version of the app here: [Entertainment-App](https://entertainment-fac29.web.app/)

## Database Schema

### Users Collection

| Field         | Type       | Description                          |
|---------------|------------|--------------------------------------|
| `_id`         | ObjectId   | Unique identifier for the user       |
| `email`       | String     | User's email address                  |
| `password`    | String     | Hashed password                       |
| `bookmarks`   | Array      | List of bookmarked movies and shows   |

### Bookmarks

| Field          | Type       | Description                          |
|----------------|------------|--------------------------------------|
| `adult`        | Boolean    | Indicates if the content is for adults|
| `backdrop_path`| String     | Path to the backdrop image            |
| `genre_ids`    | Array      | List of genre IDs                     |
| `id`           | Number     | Unique identifier for the content     |
| `original_language` | String | Original language of the content      |
| `original_title` | String    | Original title of the content         |
| `overview`     | String     | Brief description of the content      |
| `popularity`   | Number     | Popularity rating                     |
| `poster_path`  | String     | Path to the poster image              |
| `release_date` | String     | Release date of the content           |
| `title`        | String     | Title of the content                  |
| `video`        | Boolean    | Indicates if the content has a video  |
| `vote_average` | Number     | Average vote score                    |
| `vote_count`   | Number     | Total number of votes                 |

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
- Use the interface to browse, search, and bookmark your favorite movies and TV shows.

## Contributing

Contributions are welcome! To contribute, please fork the repository and submit a pull request with your improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
