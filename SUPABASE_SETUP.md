# Supabase Setup Guide for Dedixor

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign in with GitHub
4. Click "New Project"
5. Fill in:
   - **Name**: dedixor
   - **Database Password**: (generate a strong password and save it)
   - **Region**: Choose closest to your users
6. Click "Create new project" (takes 2-3 minutes)

## Step 2: Get Your Connection Details

1. In your Supabase dashboard, go to **Settings** → **Database**
2. Copy these values:

```bash
# For Next.js (add to .env.local)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-KEY]"

# For Rust backend (add to backend/.env)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
RUST_LOG="info"
SERVER_PORT="8080"
```

## Step 3: Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste ALL content from `scripts/supabase-setup.sql`
4. Click "Run" (bottom right)
5. You should see "Success. No rows returned"

**Verify tables were created:**
- Go to **Table Editor** in sidebar
- You should see: `projects`, `newsletter`, `contacts`, `services`

## Step 4: Set Up Storage (Optional - for image uploads)

1. Go to **Storage** in sidebar
2. Click "Create a new bucket"
3. Name it: `project-images`
4. Make it **Public**
5. Click "Create bucket"

**Set up storage policies:**
```sql
-- Run in SQL Editor
CREATE POLICY "Anyone can view project images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'project-images');

CREATE POLICY "Authenticated users can upload images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');
```

## Step 5: Set Up Authentication (for Admin Dashboard)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Scroll down to **Email Templates**
4. Customize if needed

**Create admin user:**
1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter email: `admin@dedixor.com`
4. Enter password: (strong password)
5. Click "Create user"

## Step 6: Test Your Connection

### Test from Next.js:
```bash
# In your project root
npm run dev

# Open browser to http://localhost:3000/projects
# Should fetch projects from Supabase
```

### Test from Rust backend:
```bash
cd backend
cargo run

# In another terminal:
curl http://localhost:8080/api/projects
# Should return JSON array of projects
```

## Step 7: Deploy to Production

### Option A: Vercel (Next.js Only)
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Option B: Full Stack (Next.js + Rust)

**Deploy Rust backend to DigitalOcean:**
```bash
# Follow instructions in backend/README.md
# Your Rust API will be at: https://api.dedixor.com
```

**Deploy Next.js to Vercel:**
```bash
# Update API calls to point to production Rust backend
# In lib/api-client.ts, change:
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.dedixor.com'
```

## Common Issues

### Connection refused
- Check DATABASE_URL has correct password
- Verify project isn't paused (free tier pauses after inactivity)

### RLS policy errors
- Make sure you ran the entire `supabase-setup.sql` script
- Check policies in **Authentication** → **Policies**

### Image upload fails
- Verify storage bucket is public
- Check storage policies are set correctly

## Next Steps

1. ✅ Database is set up with all tables
2. ✅ RLS policies protect your data
3. ✅ Sample data is loaded
4. 🔲 Customize the sample projects
5. 🔲 Test admin dashboard at `/admin`
6. 🔲 Deploy to production

## Support

- Supabase Docs: https://supabase.com/docs
- Rust Backend Docs: See `backend/README.md`
- Next.js Docs: See root `README.md`
