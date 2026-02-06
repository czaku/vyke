# vyke.dj - Personal DJ Website

**Apple-style portfolio website for Luke Vyke (DJ)**

---

## ✨ Features

- **Buttery smooth scrolling** with Lenis
- **Apple-style scroll animations** with Framer Motion
- **Custom cursor** with hover states
- **Parallax effects** throughout
- **Horizontal scrolling** mix cards
- **Timeline animation** for tour dates
- **Dark theme** with gradient accents
- **Responsive design** for all devices
- **CMS-managed content** via TinaCMS

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run with TinaCMS
npm run cms:dev

# Build for production
npm run cms:build
```

---

## 🎨 Design System

### Colors
- **Background**: `#000000` (pure black)
- **Text**: `#ffffff` (white)
- **Text Secondary**: `rgba(255, 255, 255, 0.6)`
- **Accent**: `#ff3366` (pink/coral)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, tight tracking
- **Body**: Regular weight, relaxed line-height

### Animations
- **Scroll smoothing**: 1.2s duration, exponential easing
- **Page transitions**: 0.8s, cubic-bezier(0.23, 1, 0.32, 1)
- **Hover effects**: 0.3s ease

---

## 📁 Project Structure

```
app/
├── page.tsx              # Main page composition
├── layout.tsx            # Root layout with fonts
├── globals.css           # Global styles + animations
components/
├── hero-section.tsx      # Full-screen hero with parallax
├── featured-mixes.tsx    # Horizontal scrolling cards
├── about-section.tsx     # Story with parallax
├── tour-dates.tsx        # Animated timeline
├── newsletter-section.tsx # Email signup
├── footer.tsx            # Site footer
├── navigation.tsx        # Header nav
├── custom-cursor.tsx     # Custom cursor component
└── smooth-scroll-provider.tsx # Lenis wrapper
content/
├── mixes/                # Mix content (TinaCMS)
├── gigs/                 # Tour dates (TinaCMS)
└── site.json             # Site settings
public/
├── images/               # Static images
├── videos/               # Background videos
└── uploads/              # CMS uploads
tina/
└── config.ts             # TinaCMS configuration
```

---

## 📝 Content Management (TinaCMS)

### Managing Mixes
1. Go to `/admin` in the browser
2. Click "Mixes" in the sidebar
3. Add/edit mixes with:
   - Title & subtitle
   - Duration & genre
   - Color scheme
   - SoundCloud URL
   - Cover image

### Managing Tour Dates
1. Go to `/admin`
2. Click "Tour Dates"
3. Add gigs with:
   - Date & venue
   - City & event name
   - Ticket URL
   - Status (on-sale/sold-out)

### Site Settings
- Social media links
- Booking email
- Site metadata

---

## 🎭 Sections

### Hero
- Full viewport height
- Parallax background
- Animated text reveal
- Magnetic buttons
- Scroll indicator

### Featured Mixes
- Horizontal scroll
- Gradient cards
- Hover play button
- 3D tilt effect

### About
- Large typographic statement
- Parallax image
- Stats counter
- Sticky scroll behavior

### Tour Dates
- Animated timeline
- Progress indicator
- Status badges
- Ticket CTAs

### Newsletter
- Floating gradient orbs
- Email capture
- Success state

---

## 🔧 Customization

### Changing Colors
Edit `globals.css`:
```css
:root {
  --color-accent: #ff3366; /* Change this */
}
```

### Adding New Sections
1. Create component in `/components`
2. Import in `app/page.tsx`
3. Add scroll anchor if needed

### Changing Fonts
Edit `app/layout.tsx`:
```tsx
import { YourFont } from 'next/font/google'
```

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Environment Variables
```
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

---

**© 2026 Luke Vyke - All Rights Reserved**
