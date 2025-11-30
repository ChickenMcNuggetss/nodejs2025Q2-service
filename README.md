# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Endpoints

## Users (/user)

### GET /user — Get all users

- 200 OK — Returns all user records.

### GET /user/:id — Get user by ID

- 200 OK — Returns the user with id === userId.
- 400 Bad Request — userId is not a valid UUID.
- 404 Not Found — User does not exist.

### POST /user — Create user

- 201 Created — Returns newly created user.
- 400 Bad Request — Missing required fields.

### PUT /user/:id — Update user password
- 200 OK — Returns updated user.
- 400 Bad Request — userId is invalid.
- 404 Not Found — User does not exist.
- 403 Forbidden — oldPassword is incorrect.

### DELETE /user/:id — Delete user
- 204 No Content — User deleted.
- 400 Bad Request — userId is invalid.
- 404 Not Found — User does not exist.

## Tracks (/track)
### GET /track — Get all tracks
- 200 OK — Returns all tracks.

### GET /track/:id — Get track by ID
- 200 OK — Returns the track.
- 400 Bad Request — trackId is invalid.
- 404 Not Found — Track does not exist.

### POST /track — Create new track
- 201 Created — Returns newly created track.
- 400 Bad Request — Missing required fields.

### PUT /track/:id — Update track
- 200 OK — Returns updated track.
- 400 Bad Request — trackId is invalid.
- 404 Not Found — Track does not exist.

### DELETE /track/:id — Delete track
- 204 No Content — Track deleted.
- 400 Bad Request — trackId is invalid.
- 404 Not Found — Track does not exist.

## Artists (/artist)
### GET /artist — Get all artists
- 200 OK — Returns all artists.

### GET /artist/:id — Get artist by ID
- 200 OK — Returns the artist.
- 400 Bad Request — artistId is invalid.
- 404 Not Found — Artist does not exist.

### POST /artist — Create new artist
- 201 Created — Returns newly created artist.
- 400 Bad Request — Missing required fields.

### PUT /artist/:id — Update artist
- 200 OK — Returns updated artist.
- 400 Bad Request — artistId is invalid.
- 404 Not Found — Artist does not exist.

### DELETE /artist/:id — Delete artist
- 204 No Content — Artist deleted.
- 400 Bad Request — artistId is invalid.
- 404 Not Found — Artist does not exist.

## Albums (/album)
### GET /album — Get all albums
- 200 OK — Returns all albums.

### GET /album/:id — Get album by ID
- 200 OK — Returns the album.
- 400 Bad Request — albumId is invalid.
- 404 Not Found — Album does not exist.

### POST /album — Create new album
- 201 Created — Returns newly created album.
- 400 Bad Request — Missing required fields.

### PUT /album/:id — Update album
- 200 OK — Returns updated album.
- 400 Bad Request — albumId is invalid.
- 404 Not Found — Album does not exist.

### DELETE /album/:id — Delete album
- 204 No Content — Album deleted.
- 400 Bad Request — albumId is invalid.
- 404 Not Found — Album does not exist.

### Favorites (/favs)
### GET /favs — Get all favorites
- 200 OK — Returns all favorite records (full objects, not IDs).

### POST /favs/track/:id — Add track to favorites
- 201 Created — Track added.
- 400 Bad Request — trackId is invalid.
- 422 Unprocessable Entity — Track does not exist.

### DELETE /favs/track/:id — Remove track from favorites
- 204 No Content — Track removed from favorites.
- 400 Bad Request — trackId is invalid.
- 404 Not Found — Track is not in favorites.

### POST /favs/album/:id — Add album to favorites
- 201 Created — Album added.
- 400 Bad Request — albumId is invalid.
- 422 Unprocessable Entity — Album does not exist.

### DELETE /favs/album/:id — Remove album from favorites
- 204 No Content — Album removed from favorites.
- 400 Bad Request — albumId is invalid.
- 404 Not Found — Album is not in favorites.

### POST /favs/artist/:id — Add artist to favorites
- 201 Created — Artist added.
- 400 Bad Request — artistId is invalid.
- 422 Unprocessable Entity — Artist does not exist.

### DELETE /favs/artist/:id — Remove artist from favorites
- 204 No Content — Artist removed from favorites.
- 400 Bad Request — artistId is invalid.
- 404 Not Found — Artist is not in favorites.
