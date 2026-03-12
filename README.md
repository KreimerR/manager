# Manager

Manager is a simple project and task management web application inspired by Trello.
It allows users to organize boards, lists, and tasks in one place to manage projects and personal work efficiently.

## Features

### Authentication

- Google authentication using Auth.js
- Secure user sessions
- Account deletion

### Boards

- Create new boards
- Choose board background images
- Rename boards
- Delete boards
- View all boards belonging to the logged-in user

### Lists

- Create lists inside boards
- Rename lists
- Delete lists

### Tasks

- Add tasks to lists
- Edit task titles
- Move tasks between lists
- Mark tasks as completed or not completed
- Delete tasks

### User Profile

- Profile menu
- Log out
- Delete account

## Tech Stack

**Frontend**

- Next.js
- React
- TypeScript
- Tailwind CSS

**Backend**

- Next.js Server Actions
- MongoDB

**Authentication**

- Auth.js (NextAuth)
- Google OAuth

**Database**

- MongoDB with MongoDB Adapter

## Database Structure

### users

Managed automatically by Auth.js.

### boards

```
{
  _id: ObjectId,
  userId: ObjectId
  title: string,
  image: string,
}
```

### lists

```
{
  _id: ObjectId,
  boardId: ObjectId,
  userId: ObjectId
  title: string,
}
```

### tasks

```
{
  _id: ObjectId,
  listId: ObjectId,
  boardId: ObjectId,
  userId: ObjectId,
  title: string,
  completed: boolean
}
```

## Installation

### 1. Clone the repository

```
git clone https://github.com/KreimerR/manager.git
cd manager
```

### 2. Install dependencies

```
npm install
```

### 3. Environment variables

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret

AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
```

## Running the project

Development server:

```
npm run dev
```

The application will run at:

```
http://localhost:3000
```

## Screenshots

<img src="./public/screenshots/1.png" alt="1">
<img src="./public/screenshots/2.png" alt="2">
<img src="./public/screenshots/3.png" alt="3">
<img src="./public/screenshots/4.png" alt="4">
<img src="./public/screenshots/5.png" alt="5">
<img src="./public/screenshots/6.png" alt="6">
<img src="./public/screenshots/7.png" alt="7">
<img src="./public/screenshots/8.png" alt="8">
