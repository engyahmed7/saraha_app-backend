# Saraha App Backend API

This is the backend API for the Saraha project. It provides various endpoints to handle user authentication, messaging, and user-related operations.

## Installation

1. Clone the repository: `git clone https://github.com/engyahmed7/saraha_app-backend.git`
2. Navigate to the project directory: `cd saraha_app-backend`
3. Install the dependencies: `npm install`

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Set the following environment variables in the `.env` file:

```
PORT=3000
MONGODB_URI=<your MongoDB connection string>
JWT_SECRET=<your JWT secret key>
```

## Usage

1. Start the server: `npm start`
2. The API will be accessible at `http://localhost:3000`.

## Endpoints

### Authentication

- `POST /signup`: Register a new user.
- `POST /signin`: Sign in with an existing user.

### Messaging

- `POST /message/:id`: Add a new message to a user's inbox.

### User Operations

- `PATCH /updateUser`: Update user information.
- `GET /allMessages`: Get all messages for a user.
- `PATCH /user/profilePic`: Update user profile picture.
- `PATCH /user/profileCoverPics`: Update user profile cover pictures.
- `PATCH /user/uploadFile`: Upload a file for the user.
- `POST /user/post`: Add a new post.
- `POST /user/post/:id/comment`: Add a new comment to a post.
- `GET /user/allPosts`: Get all posts.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request.
