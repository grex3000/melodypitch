# Commenting Feature Implementation

## Overview
Comments system for labels to provide feedback on submissions and songwriters to discuss their work.

## Architecture

### Database Schema
```prisma
model Comment {
  id           String   @id @default(cuid())
  submissionId String
  submission   Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  authorId     String
  author       User     @relation("CommentAuthor", fields: [authorId], references: [id], onDelete: Cascade)
  body         String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

### Components

#### CommentSection.tsx
- **Location**: `src/components/dashboard/CommentSection.tsx`
- **Props**:
  - `submissionId`: ID of submission to comment on
  - `comments`: Array of existing comments
  - `currentUser`: Current authenticated user
  - `onCommentAdded`: Callback when comment posted
- **Features**:
  - Display all comments with author and timestamp
  - Expandable comment form
  - Real-time comment submission
  - Error handling

### API Endpoints

#### GET /api/submissions/:submissionId/comments
**Purpose**: Fetch all comments for a submission

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
- 500: Server error

#### POST /api/submissions/:submissionId/comments
**Purpose**: Create new comment on submission

**Request Body**:
```json
{
  "body": "string (required)"
}
```

**Response**:
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
- 500: Server error

## Usage

### Basic Integration
```tsx
import CommentSection from '@/components/dashboard/CommentSection';

export default function SubmissionDetail({ submission, currentUser }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments
    fetch(`/api/submissions/${submission.id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments));
  }, [submission.id]);

  const handleCommentAdded = () => {
    // Refresh comments
    fetch(`/api/submissions/${submission.id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.comments));
  };

  return (
    <CommentSection
      submissionId={submission.id}
      comments={comments}
      currentUser={currentUser}
      onCommentAdded={handleCommentAdded}
    />
  );
}
```

## Features

### Implemented
- ✅ Database schema with relational integrity
- ✅ CommentSection React component
- ✅ GET comments endpoint
- ✅ POST comments endpoint (structure)
- ✅ Comment display with timestamps
- ✅ Comment form with validation

### In Progress
- 🔄 User authentication in API (needs context injection)
- 🔄 Permission validation (who can comment)
- 🔄 Rate limiting

### Planned
- [ ] Edit comments
- [ ] Delete comments
- [ ] Comment notifications
- [ ] Mention/tagging support
- [ ] Comment threads/replies
- [ ] Rich text formatting
- [ ] File attachments
- [ ] Reaction/emoji support

## Security Considerations

### Current Implementation
- Comments require authenticated session (httpOnly cookie)
- Comments tied to authenticated user
- Cascade delete on user/submission deletion

### Future Enhancements
- [ ] Rate limiting on comment creation
- [ ] Spam/abuse filtering
- [ ] Comment content validation
- [ ] Permission checks (only portal members can comment)
- [ ] Activity logging/audit trail

## Testing

### Manual Tests
```bash
# 1. Create submission with tracks
# 2. Login as label user
# 3. Open submission detail
# 4. Verify comments section displays
# 5. Add comment
# 6. Verify comment appears
# 7. Refresh and verify persistence
```

### Automated Tests (TODO)
- [ ] GET comments endpoint
- [ ] POST comments endpoint
- [ ] Comment creation with invalid data
- [ ] Unauthorized comment creation
- [ ] Comment deletion

## Database Migration
```bash
# Apply schema changes
npx prisma migrate dev --name add_comments

# Generate client
npx prisma generate
```

## Next Steps
1. Implement user authentication context in API
2. Add permission validation
3. Test end-to-end comment flow
4. Add comment notifications
5. Implement comment editing/deletion
6. Add rich text editor integration
