# FARDOSI CARS - Website Information

## Business Information

**Name**: FARDOSI CARS
**Arabic Name**: شركة فردوسي التجارية لبيع السيارات الحديثة
**Location**: حلب – الفيض

**Phone Numbers**:
- 0947777504
- 0991000108
- 0212233333
- 0212244444
- 0212288888

**Social Media**:
- Facebook: https://www.facebook.com/share/1BvYPGheYF/
- Instagram: https://www.instagram.com/fardosi_cars

**Location**: https://maps.app.goo.gl/3Qv6a4xCRXu4qaxj8

---

## Website Routes

### Public Routes

1. **Homepage** (`/`)
   - Hero section with logo and background
   - About section
   - Services section
   - Featured cars (if any)
   - Location with Google Maps
   - Contact section
   - Social media links
   - Footer

2. **All Cars Page** (`/cars`)
   - Browse all available cars
   - Filter by brand, status, price range
   - Search functionality
   - Click on any car to view details

3. **Car Detail Page** (`/car/:id`)
   - Full car specifications
   - Image gallery with lightbox
   - Price and status
   - Direct call button
   - WhatsApp contact button
   - Share functionality

### Admin Routes

4. **Admin Login** (`/admin`)
   - Secure login page
   - Email and password authentication

5. **Admin Dashboard** (`/admin/dashboard`)
   - Dashboard stats (total, available, sold)
   - Car management interface
   - Add/Edit/Delete cars
   - Toggle visibility and featured status
   - Image management

---

## Key Features

### For Visitors

✅ **Luxury Design**: Black, red, and white color scheme
✅ **RTL Support**: Full Arabic language support
✅ **Responsive**: Works on mobile, tablet, and desktop
✅ **Smooth Animations**: Fade-in, slide-up effects
✅ **Search & Filter**: Find cars by brand, price, status
✅ **WhatsApp Integration**: Quick contact with pre-filled message
✅ **Google Maps**: Interactive location map
✅ **Social Media**: Direct links to Facebook and Instagram

### For Admin

✅ **Secure Authentication**: Email/password login
✅ **Dashboard Stats**: Real-time inventory overview
✅ **Car Management**: Add, edit, delete cars
✅ **Image Management**: Add/remove car images via URL
✅ **Status Control**: Available, Reserved, Sold
✅ **Visibility Toggle**: Show/hide cars from public
✅ **Featured Cars**: Mark special cars for homepage
✅ **Full Specifications**: Complete car details management

---

## Database Schema

### Cars Table

- **Basic Info**: Brand, Model, Year, Price, Currency, Mileage
- **Condition**: New or Used
- **Engine**: Type, Size
- **Technical**: Transmission, Fuel Type, Drive Type
- **Colors**: Exterior, Interior
- **Content**: Description (Arabic), Images (array)
- **Status**: Available, Reserved, Sold
- **Visibility**: is_visible, is_featured
- **Timestamps**: created_at, updated_at

---

## Color Palette

- **Primary**: Black (#000000)
- **Accent**: Deep Red (#DC2626, #991B1B)
- **Text**: White (#FFFFFF)
- **Secondary**: Gray shades (#111827, #1F2937, #374151)
- **Success**: Green (#059669)
- **Warning**: Yellow (#D97706)

---

## Typography

- **Font Family**: Cairo (Arabic), System fonts fallback
- **Weights**: 400 (Regular), 600 (Semi-Bold), 700 (Bold), 900 (Black)

---

## Image Requirements

For best results, car images should be:
- **Format**: JPG, PNG, or WEBP
- **Orientation**: Landscape (16:9 or 4:3)
- **Resolution**: Minimum 1280x720px
- **Size**: Under 2MB per image
- **Hosting**: Use image hosting services (Cloudinary, ImgBB, etc.)

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Build Tool**: Vite

---

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## Admin Setup

See `ADMIN_SETUP.md` for detailed instructions on creating admin users and managing the dashboard.

---

## Support

For technical issues or feature requests, contact your development team.

---

**© 2024 FARDOSI CARS - All Rights Reserved**
