# FARDOSI CARS - Admin Setup Guide

## Admin Access Setup

To create an admin user for the dashboard, you need to sign up a user in Supabase.

### Option 1: Sign Up via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** → **Create new user**
4. Enter an email and password
5. Click **Create user**

### Option 2: Use Supabase SQL Editor

Run this SQL command in your Supabase SQL Editor:

```sql
-- This is just for reference. The actual signup should be done through Supabase Dashboard
-- as it handles password hashing and email confirmation automatically.
```

## Accessing the Admin Dashboard

1. Navigate to: `https://your-domain.com/admin`
2. Enter the email and password you created
3. Click **تسجيل الدخول** (Login)
4. You'll be redirected to `/admin/dashboard`

## Admin Features

### Dashboard Overview
- Total cars count
- Available cars count
- Sold cars count
- Latest cars preview

### Car Management
- **Add New Car**: Complete form with all specifications and images
- **Edit Car**: Update existing car information
- **Delete Car**: Remove cars from inventory
- **Toggle Visibility**: Show/hide cars from public view
- **Toggle Featured**: Mark cars as featured on homepage
- **Change Status**: متوفرة (Available) / محجوزة (Reserved) / مباعة (Sold)

### Adding Images
- Images are added via URL
- Enter the image URL in the input field
- Click **إضافة** (Add) to add the image
- You can add multiple images per car
- Images can be removed by hovering and clicking the delete button

## Image Hosting Recommendations

For hosting car images, you can use:
- **Cloudinary** (Free tier available)
- **ImgBB** (Free image hosting)
- **Imgur** (Free image hosting)
- **Your own server** (Upload to /public/images/)

## Security Notes

- Only authenticated users can access the admin dashboard
- All car data is protected by Row Level Security (RLS)
- Public users can only view visible cars
- Admin users (authenticated) can manage all cars

## Support

For technical support or questions about the admin system, please contact your developer.
