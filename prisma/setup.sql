-- MelodyPitch Database Setup SQL
-- Run this in Supabase SQL Editor: https://app.supabase.com/project/lzanwxebqypekmeedwrw/sql

-- Create User table
CREATE TABLE IF NOT EXISTS "User" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "supabaseUserId" VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    "passwordHash" VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create Label table
CREATE TABLE IF NOT EXISTS "Label" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "userId" VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    "logoUrl" VARCHAR(255),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Songwriter table
CREATE TABLE IF NOT EXISTS "Songwriter" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "userId" VARCHAR(255) UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
);

-- Create Artist table
CREATE TABLE IF NOT EXISTS "Artist" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    name VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create ArtistMember table
CREATE TABLE IF NOT EXISTS "ArtistMember" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "userId" VARCHAR(255) UNIQUE NOT NULL,
    "artistId" VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
    FOREIGN KEY ("artistId") REFERENCES "Artist"(id) ON DELETE CASCADE
);

-- Create Portal table
CREATE TABLE IF NOT EXISTS "Portal" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "labelId" VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    brief TEXT,
    deadline TIMESTAMP,
    "isPublic" BOOLEAN NOT NULL DEFAULT TRUE,
    "bgImageUrl" VARCHAR(255),
    "bgBlurPx" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("labelId") REFERENCES "Label"(id) ON DELETE CASCADE
);

-- Create PortalInvite table
CREATE TABLE IF NOT EXISTS "PortalInvite" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "portalId" VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    "songwriterId" VARCHAR(255),
    "token" VARCHAR(255) UNIQUE NOT NULL DEFAULT gen_random_uid(),
    "acceptedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("portalId") REFERENCES "Portal"(id) ON DELETE CASCADE,
    FOREIGN KEY ("songwriterId") REFERENCES "Songwriter"(id) ON DELETE CASCADE
);

-- Create Submission table
CREATE TABLE IF NOT EXISTS "Submission" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "portalId" VARCHAR(255) NOT NULL,
    "songwriterId" VARCHAR(255),
    "noteToLabel" TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("portalId") REFERENCES "Portal"(id) ON DELETE CASCADE,
    FOREIGN KEY ("songwriterId") REFERENCES "Songwriter"(id) ON DELETE CASCADE
);

-- Create Track table
CREATE TABLE IF NOT EXISTS "Track" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "submissionId" VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    "fileUrl" VARCHAR(255) NOT NULL,
    "fileSizeBytes" INTEGER NOT NULL,
    "durationSecs" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("submissionId") REFERENCES "Submission"(id) ON DELETE CASCADE
);

-- Create LabelNote table
CREATE TABLE IF NOT EXISTS "LabelNote" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "trackId" VARCHAR(255) NOT NULL,
    "authorId" VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    rating INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("trackId") REFERENCES "Track"(id) ON DELETE CASCADE
);

-- Create PitchPackage table
CREATE TABLE IF NOT EXISTS "PitchPackage" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "labelId" VARCHAR(255) NOT NULL,
    "artistId" VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    note TEXT,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("labelId") REFERENCES "Label"(id) ON DELETE CASCADE,
    FOREIGN KEY ("artistId") REFERENCES "Artist"(id) ON DELETE CASCADE
);

-- Create PitchItem table
CREATE TABLE IF NOT EXISTS "PitchItem" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "packageId" VARCHAR(255) NOT NULL,
    "trackId" VARCHAR(255) NOT NULL,
    verdict VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    "artistRating" INTEGER,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("packageId") REFERENCES "PitchPackage"(id) ON DELETE CASCADE,
    FOREIGN KEY ("trackId") REFERENCES "Track"(id) ON DELETE CASCADE
);

-- Create ArtistComment table
CREATE TABLE IF NOT EXISTS "ArtistComment" (
    id VARCHAR(255) PRIMARY KEY DEFAULT gen_random_uid(),
    "pitchItemId" VARCHAR(255) NOT NULL,
    "authorId" VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    "timestampSec" INTEGER,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY ("pitchItemId") REFERENCES "PitchItem"(id) ON DELETE CASCADE
);

-- Add array support for genres and moods in Track
ALTER TABLE "Track" ADD COLUMN IF NOT EXISTS genres TEXT[];
ALTER TABLE "Track" ADD COLUMN IF NOT EXISTS moods TEXT[];

-- Enable Row Level Security (optional for now)
-- ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
