# Task Server

A simple RESTful API for managing user notes with authentication.

**[Live Postman documentation](https://documenter.getpostman.com/view/20290900/2sB3BAKXSr)**

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/devlopersabbir/task-server.git
   cd task-server
   ```

2. **Install dependencies**
   **NOTE:** make sure you are using `pnpm package manager`

   ```bash
   npm i -g pnpm@latest && pnpm i
   ```

3. **Environment Configuration**
   Copy `.env.example` to `.env` file in the root directory and put bellow variable:

   ```env
   PORT=5000
   DATABASE_URL="your-mongodb-connection-string"
   ACCESS_TOKEN_SECRET="your-secret-key"
   ACCESS_TOKEN_EXPIRES_IN="1d"
   ```

4. **Run the application**
   ```bash
   pnpm start
   # or for development
   pnpm dev
   ```

## Dockerize

since our application fully dockerize so, we can just `up our docker compose`
**Just follow below step to run our application into docker**

1. Clone repository
2. Run bellow command

```bash
docker-compose up
```

**OR**

```bash
docker compose up
```

The API will be available at `http://localhost:5000` **(Locally)**
And this is the live link [https://task-server-bc62.onrender.com](https://task-server-bc62.onrender.com)

## API Endpoints

### Authentication

- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Notes (Requires Authentication)

- `GET /api/notes` - Get all user notes
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note (**Only note owner will get access of this route**)
- `PUT /api/notes/:id` - Update a note (**Only note owner will get access of this route**)
- `DELETE /api/notes/:id` - Delete a note (**Only note owner will get access of this route**)

## Example Requests/Responses

### Register User

**Request:**

```bash
POST /api/users/register
Content-Type: application/json

{
  "email": "user@gmail.com",
  "password": "$@BB!r2",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "Account created successfully"
}
```

### Login User

**Request:**

```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "user@gmail.com",
  "password": "$@BB!r2"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "message": "Hello ${user.name}! Login successful",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Create Note

Title should be unique for each note (**All routes is protected**)
**Request:**

```bash
POST /api/notes
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note"
}
```

**Response:**

```json
{
  "Notes created successfully"
  "note": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "My First Note",
    "content": "This is the content of my note",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
}
```

### Get All Notes

**Request:**

```bash
GET /api/notes
Authorization: Bearer <jwt-token>
```

**Response:**

```json
[
  {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "My First Note",
    "content": "This is the content of my note",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:30:00.000Z"
  }
]
```

### Update Note

**Request:**

```bash
PUT /api/notes/64f8a1b2c3d4e5f6a7b8c9d1
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "title": "Updated Note Title",
  "content": "Updated note content"
}
```

**Response:**

```json
{
  "message": "Note updated successfully",
  "note": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d1",
    "title": "Updated Note Title",
    "content": "Updated note content",
    "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
    "createdAt": "2023-09-06T10:30:00.000Z",
    "updatedAt": "2023-09-06T10:35:00.000Z"
  }
}
```

### Delete Note

**Request:**

```bash
DELETE /api/notes/64f8a1b2c3d4e5f6a7b8c9d1
Authorization: Bearer <jwt-token>
```

**Response:**

```json
{
  "message": "Note deleted successfully"
}
```

## Authentication

All note endpoints require a Bearer token in the Authorization header. After logging in, include the token in your requests:

```
Authorization: Bearer <jwt-token>
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:
