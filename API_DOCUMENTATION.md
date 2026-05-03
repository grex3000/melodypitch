# MelodyPitch API Documentation

## Authentication
All authenticated endpoints require a valid session cookie (`sb-access-token`).

### Session
- **Created**: On successful login
- **Expires**: 60 minutes (access token), 30 days (refresh token)
- **Transport**: HttpOnly cookies
- **Security**: SameSite=Lax, path=/

---

## Submissions API

### GET /api/submissions
Fetch all submissions for current user based on role.

**Authentication**: Required  
**Role**: SONGWRITER or LABEL

**Response**:
```json
{
  "submissions": [
    {
      "id": "string",
      "portalId": "string",
      "status": "NEW|REVIEWED|SHORTLISTED|PITCHED|ARCHIVED",
      "noteToLabel": "string|null",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601",
      "tracks": [
        {
          "id": "string",
          "title": "string",
          "fileUrl": "string",
          "genres": ["string"],
          "moods": ["string"]
        }
      ],
      "comments": [{ "id": "string" }]
    }
  ]
}
```

**Status Codes**:
- 200: Success
- 401: Unauthorized
- 403: Forbidden (user role cannot access)
- 500: Server error

---

### POST /api/submissions
Create new submission (songwriters only).

**Authentication**: Required  
**Role**: SONGWRITER only

**Request Body**:
```json
{
  "portalId": "string (required)",
  "noteToLabel": "string (optional)",
  "tracks": [
    {
      "title": "string (required)",
      "fileUrl": "string (required)",
      "fileSizeBytes": "number",
      "durationSecs": "number",
      "genres": ["string"],
      "moods": ["string"]
    }
  ]
}
```

**Response** (201 Created):
```json
{
  "submission": {
    "id": "string",
    "portalId": "string",
    "songwriterId": "string",
    "status": "NEW",
    "noteToLabel": "string|null",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601",
    "tracks": [...]
  }
}
```

**Status Codes**:
- 201: Created
- 400: Invalid input
- 401: Unauthorized
- 403: Forbidden (must be songwriter)
- 500: Server error

---

### GET /api/submissions/:submissionId
Fetch single submission with comments.

**Authentication**: Optional (public if portal is public)  
**Params**:
- `submissionId`: Submission UUID

**Response**:
```json
{
  "submission": {
    "id": "string",
    "status": "string",
    "noteToLabel": "string|null",
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601",
    "tracks": [...],
    "portal": {
      "id": "string",
      "name": "string",
      "label": { ... }
    },
    "comments": [...]
  }
}
```

**Status Codes**:
- 200: Success
- 404: Not found
- 500: Server error

---

### PATCH /api/submissions/:submissionId
Update submission status (labels only).

**Authentication**: Required  
**Role**: LABEL (only if label owns the portal)

**Request Body**:
```json
{
  "status": "NEW|REVIEWED|SHORTLISTED|PITCHED|ARCHIVED"
}
```

**Response**:
```json
{
  "submission": {
    "id": "string",
    "status": "string",
    "updatedAt": "ISO-8601",
    ...
  }
}
```

**Status Codes**:
- 200: Success
- 400: Invalid status
- 401: Unauthorized
- 403: Forbidden (not submission owner)
- 404: Not found
- 500: Server error

---

## Comments API

### GET /api/submissions/:submissionId/comments
Fetch all comments for a submission.

**Authentication**: Optional

**Response**:
```json
{
  "comments": [
    {
      "id": "string",
      "body": "string",
      "author": {
        "id": "string",
        "name": "string",
        "email": "string"
      },
      "createdAt": "ISO-8601"
    }
  ]
}
```

**Status Codes**:
- 200: Success
- 404: Submission not found
- 500: Server error

---

### POST /api/submissions/:submissionId/comments
Create new comment.

**Authentication**: Required

**Request Body**:
```json
{
  "body": "string (required, min 1 char)"
}
```

**Response** (201 Created):
```json
{
  "comment": {
    "id": "string",
    "body": "string",
    "author": {
      "id": "string",
      "name": "string"
    },
    "createdAt": "ISO-8601"
  }
}
```

**Status Codes**:
- 201: Created
- 400: Invalid input
- 401: Unauthorized
- 404: Submission not found
- 500: Server error

---

## Upload API

### POST /api/upload
Upload audio file.

**Authentication**: Required (middleware check)

**Request Body**: FormData
```
file: File (required)
  - Type: audio/mpeg, audio/wav, audio/flac, audio/aiff
  - Max size: 80 MB
```

**Response** (200 OK):
```json
{
  "path": "uploads/uuid.mp3",
  "url": "https://supabase-url/storage/v1/object/..."
}
```

**Error Responses**:
```json
{
  "error": "Unsupported format. Accepted: MP3, WAV, AIFF, FLAC."
}
```

**Status Codes**:
- 200: Success
- 400: No file provided
- 422: Invalid file type or size
- 500: Upload failed

---

## Error Handling

### Standard Error Response
```json
{
  "error": "Error message describing what went wrong"
}
```

### Common Status Codes
- **400**: Bad request (invalid input)
- **401**: Unauthorized (missing/invalid session)
- **403**: Forbidden (insufficient permissions)
- **404**: Not found (resource doesn't exist)
- **422**: Unprocessable entity (validation failed)
- **500**: Server error

---

## Authentication Context

The API uses session-based authentication via secure httpOnly cookies.

### Getting Current User
The `getCurrentUser()` helper extracts the user from the session:

```typescript
import { getCurrentUser } from '@/lib/auth-context';

const user = await getCurrentUser();
// Returns: { id, email, name, role, supabaseUserId } or null
```

### Requiring Authentication
```typescript
import { requireAuth } from '@/lib/auth-context';

const user = await requireAuth();
// Throws if not authenticated
// Returns authenticated user
```

---

## Rate Limiting

Currently not implemented. Recommended for production:
- 100 requests per minute per IP
- 50 file uploads per hour per user
- 10 submissions per day per songwriter

---

## CORS

**Allowed Origins**:
- http://localhost:3000 (development)
- https://melodypitch.vercel.app (production)
- https://*.vercel.app (preview deployments)

**Allowed Methods**: GET, POST, PUT, DELETE, HEAD, OPTIONS

**Allowed Headers**: content-type, authorization, x-amz-*

---

## Examples

### Create Submission with Upload
```typescript
// 1. Upload file
const uploadForm = new FormData();
uploadForm.append('file', audioFile);
const uploadRes = await fetch('/api/upload', {
  method: 'POST',
  body: uploadForm,
});
const { path, url } = await uploadRes.json();

// 2. Create submission
const subRes = await fetch('/api/submissions', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    portalId: 'portal-123',
    noteToLabel: 'Check this track!',
    tracks: [
      {
        title: 'My Song',
        fileUrl: url,
        fileSizeBytes: audioFile.size,
        genres: ['Indie', 'Alternative'],
        moods: ['Upbeat'],
      },
    ],
  }),
});
const { submission } = await subRes.json();
```

### Add Comment
```typescript
const res = await fetch(
  `/api/submissions/${submissionId}/comments`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      body: 'Great track! Love the energy.',
    }),
  }
);
const { comment } = await res.json();
```

### Update Submission Status
```typescript
const res = await fetch(
  `/api/submissions/${submissionId}`,
  {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'SHORTLISTED',
    }),
  }
);
const { submission } = await res.json();
```

---

## Webhooks (Planned)

Future implementation:
- Submission created
- Comment added
- Submission status changed
- Upload completed

---

## Changelog

### v1.0 (Current)
- Basic CRUD for submissions
- Comments system
- File uploads
- Status management
