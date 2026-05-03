# MelodyPitch Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Configuration
Create `.env.production` with the following variables:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Email Configuration
SEND_EMAILS=true
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-api-key
SMTP_SECURE=false
SMTP_FROM=noreply@melodypitch.com

# Google OAuth (if not already set)
GOOGLE_CLIENT_SECRET=your-client-secret

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://melodypitch.vercel.app
```

### 2. Supabase Setup

#### Create Storage Bucket
Run in Supabase SQL Editor:

```sql
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('tracks', 'tracks', true, 83886080)
ON CONFLICT DO NOTHING;

CREATE POLICY "Public read" ON storage.objects
FOR SELECT USING (bucket_id = 'tracks');

CREATE POLICY "Authenticated upload" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'tracks' AND auth.role() = 'authenticated');

CREATE POLICY "Delete own files" ON storage.objects
FOR DELETE USING (bucket_id = 'tracks' AND auth.role() = 'authenticated');
```

#### Run Migrations
```bash
npx prisma migrate deploy
npx prisma db seed  # If you have seed data
```

#### Create Test Accounts (for final QA)
```sql
-- Add test accounts via SQL or use API
```

### 3. Google OAuth Setup

1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials (Web application)
3. Add authorized redirect URIs:
   - `https://melodypitch.vercel.app/auth/callback`
   - `https://your-domain.com/auth/callback`
4. Set environment variables in production

### 4. Email Service Setup

#### Option A: SendGrid (Recommended)
```bash
# Get API key from https://app.sendgrid.com/settings/api_keys
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG.xxxx...
```

#### Option B: Mailgun
```bash
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=postmaster@mg.yourdomain.com
SMTP_PASSWORD=your-mailgun-password
```

#### Option C: Gmail
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_SECURE=false
```

### 5. Custom Domain Setup

1. Register domain (Vercel, Namecheap, GoDaddy, etc.)
2. Update DNS to point to Vercel
3. In Vercel dashboard:
   - Go to Project → Settings → Domains
   - Add your custom domain
   - Verify DNS records

### 6. Security Hardening

#### CORS Configuration
Update in `src/middleware.ts` and Supabase CORS:
```typescript
allowedOrigins: [
  'https://melodypitch.vercel.app',
  'https://your-domain.com',
]
```

#### Security Headers
Add to `next.config.js`:
```javascript
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        }
      ],
    },
  ];
}
```

#### Rate Limiting
Install and configure rate limiting middleware:
```bash
npm install @upstash/ratelimit
```

### 7. Monitoring Setup

#### Error Tracking
Install Sentry:
```bash
npm install @sentry/nextjs
```

Configure in `sentry.client.config.js` and `sentry.server.config.js`:
```javascript
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
});
```

#### Analytics
Use Vercel Analytics or Google Analytics:
```bash
npm install @vercel/analytics
```

### 8. Build and Test

```bash
# Build locally
npm run build

# Test production build
npm start

# Check for errors
npm run lint
npm run type-check

# Run tests
npm run test
```

### 9. Database Backup Strategy

Set up automated backups in Supabase:
1. Go to Database → Backups
2. Enable Point-in-Time Recovery (PITR)
3. Set backup frequency

### 10. Performance Optimization

#### Image Optimization
- Use Next.js Image component for optimization
- Set `priority` for above-fold images
- Implement WebP format fallbacks

#### Database Queries
- Add indexes to frequently queried fields
- Use Prisma select for partial queries
- Implement pagination for large datasets

#### Caching
- Enable ISR (Incremental Static Regeneration)
- Use Vercel's edge caching
- Implement Redis caching for hot data

---

## Deployment Steps

### Step 1: Prepare Vercel

```bash
# Link to Vercel
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add DATABASE_URL
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASSWORD
vercel env add SEND_EMAILS
```

### Step 2: Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (if using GitHub integration)
git push origin main
```

### Step 3: Run Migrations

```bash
# Run database migrations on production
npx prisma migrate deploy --skip-generate
```

### Step 4: Verify Deployment

1. Check Vercel dashboard for successful build
2. Visit your production URL
3. Test login flow
4. Test submission creation
5. Test file uploads
6. Verify email sending
7. Check analytics

### Step 5: Post-Deployment

```bash
# Create production admin account
npx ts-node scripts/create-admin.ts

# Seed initial data if needed
npx prisma db seed

# Monitor logs
vercel logs --tail
```

---

## Production Monitoring

### Daily Checks
- Error rate < 0.1%
- Page load time < 2s
- Database response time < 100ms
- Email delivery success > 99%

### Weekly Checks
- Review analytics
- Check storage usage
- Monitor user growth
- Review support tickets

### Monthly Checks
- Performance audit
- Security audit
- Cost review
- Database optimization

---

## Rollback Procedure

If issues occur after deployment:

```bash
# Revert to previous deployment
vercel rollback

# Or revert to specific commit
git revert <commit-hash>
git push origin main
```

---

## Troubleshooting

### 401 Unauthorized on Database Queries
- Check SUPABASE_SERVICE_ROLE_KEY
- Verify RLS policies aren't blocking queries
- Check network policies

### Email Not Sending
- Verify SEND_EMAILS=true
- Check SMTP credentials
- Review SendGrid/Mailgun account
- Check spam folder

### File Uploads Failing
- Verify 'tracks' bucket exists
- Check storage bucket permissions
- Verify file size < 80 MB
- Check file format is supported

### High Database Costs
- Review query patterns in Sentry
- Add database indexes
- Implement query caching
- Monitor slow queries

---

## Scaling Recommendations

### As User Base Grows

#### Database
- Upgrade Supabase plan
- Implement database sharding
- Add read replicas
- Archive old data

#### Storage
- Move to CDN
- Implement compression
- Use different storage tiers
- Clean up unused files

#### API
- Implement caching layer
- Use API rate limiting
- Add load balancing
- Monitor endpoint latency

#### Infrastructure
- Use edge functions for static content
- Implement worker threads for heavy processing
- Use background jobs (Bull, RabbitMQ)
- Monitor memory/CPU usage

---

## Success Metrics

Track these KPIs to monitor application health:

| Metric | Target | Tool |
|--------|--------|------|
| Page Load Time | < 2s | Vercel Analytics |
| Error Rate | < 0.1% | Sentry |
| Uptime | > 99.9% | Vercel Status |
| Email Delivery | > 99% | SendGrid Analytics |
| Database Query Time | < 100ms | Supabase Logs |
| User Signup Conversion | > 5% | Analytics |
| Submission Success Rate | > 95% | Custom Metrics |

---

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.io/docs
- **Prisma Docs**: https://www.prisma.io/docs

---

## Go-Live Checklist

- [ ] All environment variables set
- [ ] Database migrations applied
- [ ] Storage bucket created
- [ ] Google OAuth configured
- [ ] Email service configured
- [ ] Security headers added
- [ ] Error tracking enabled
- [ ] Analytics enabled
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] Test accounts created
- [ ] Documentation updated
- [ ] Team trained on operations

---

**Deployment Date**: ___________  
**Deployed By**: ___________  
**Status**: ___________  

