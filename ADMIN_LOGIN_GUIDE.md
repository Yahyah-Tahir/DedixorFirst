# Admin Login Guide - COMPLETE SOLUTION

## Current Status ✅
- **Application:** Running successfully (no errors)
- **Database:** Connected and configured
- **Authentication:** Bcrypt-based password hashing
- **Admin Accounts:** 3 accounts configured

---

## Admin Credentials (All Working)

### Account 1
- **Email:** `admin@dedixor.com`
- **Password:** `admin123`
- **Name:** Admin

### Account 2
- **Email:** `majeedbintory@gmail.com`
- **Password:** `admin123`
- **Name:** Admin2

### Account 3
- **Email:** `admin3@dedixor.com`
- **Password:** `admin123`
- **Name:** Admin Three

---

## How to Login - Step by Step

### Local Development (localhost:3000)
1. Open your browser
2. Go to: `http://localhost:3000/admin/login`
3. Enter your email (choose one from above)
4. Enter password: `admin123`
5. Click "Sign In"
6. You'll be redirected to: `http://localhost:3000/admin`

### Production (Your Deployed Site)
1. Open your browser
2. Go to: `https://yourdomain.com/admin/login`
3. Enter your email
4. Enter password: `admin123`
5. Click "Sign In"

---

## What You Can Access After Login

After successful login, you'll have access to:

### 1. Projects Management (`/admin`)
- View all projects
- Create new projects
- Edit existing projects
- Delete projects
- Manage project details (title, description, tech stack, images, links)

### 2. Services Management (`/admin/services`)
- View all services
- Create new services
- Edit existing services
- Delete services
- Manage service information

### 3. Blogs Management (`/admin/blogs`)
- View all blog posts
- Create new blog posts
- Edit existing blog posts
- Delete blog posts
- Publish/unpublish posts
- Manage cover images and author information

### 4. Logout
- Click "Logout" in the top right to safely end your session

---

## How Authentication Works

1. **Password Storage:** All passwords are hashed using bcryptjs (industry standard)
2. **Session Management:** Uses HTTP-only cookies for secure session management
3. **Route Protection:** Middleware protects all `/admin/*` routes
4. **Auto-Redirect:** If not logged in, you're redirected to `/admin/login`

---

## If You Can't Login

### Check These Things:

1. **Email Spelling:** Make sure you typed the email exactly:
   - `admin@dedixor.com` (not dedixor.com)
   - `majeedbintory@gmail.com` 
   - `admin3@dedixor.com`

2. **Password:** Must be exactly: `admin123` (lowercase)

3. **Cookies Enabled:** Make sure your browser allows cookies

4. **Clear Cache:** Try clearing browser cache:
   - Chrome: Ctrl+Shift+Delete (or Cmd+Shift+Delete on Mac)
   - Firefox: Ctrl+Shift+Delete

5. **Incognito Mode:** Try logging in with incognito/private mode

6. **Try Another Account:** If one email doesn't work, try another:
   - Try `admin@dedixor.com` first
   - If that doesn't work, try `majeedbintory@gmail.com`
   - If that doesn't work, try `admin3@dedixor.com`

---

## Database Information

All three admin accounts are stored in the `admins` table in your Neon PostgreSQL database:

```
Database: neondb
Table: admins
Columns:
  - id (PRIMARY KEY)
  - email (UNIQUE)
  - password_hash (bcrypt hash)
  - name
  - created_at (timestamp)
```

---

## Changing Your Password

If you want to change your password later:

1. Generate a new bcrypt hash (ask your developer to do this)
2. Update the database with the new hash
3. Login with your new password

To generate a bcrypt hash for a new password, use:
```bash
npm run hash-password "your-new-password"
```

---

## Need Help?

If login still doesn't work after checking all the above:

1. Check browser console (F12) for error messages
2. Check browser network tab to see if requests are reaching the server
3. Check server logs for any database connection issues
4. Make sure DATABASE_URL environment variable is set correctly

---

## Summary

✅ All three admin accounts are configured and ready
✅ Password for all accounts: `admin123`
✅ Authentication system is secure (bcrypt)
✅ Session management is working
✅ Route protection is in place

**You should be able to login now!** Try with any of the three email addresses and password `admin123`.
