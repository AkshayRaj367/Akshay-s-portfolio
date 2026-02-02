# P. Maria Bala Akshay Raj - Portfolio Website

A cutting-edge, futuristic portfolio website built with Next.js 14, featuring 3D animations, glassmorphism design, and smooth 60fps performance.

## 🚀 Features

### **Tech Stack**
- **Framework**: Next.js 14+ with App Router (React 18+)
- **Styling**: Tailwind CSS + Framer Motion for animations
- **3D Graphics**: Three.js / React Three Fiber for immersive 3D elements
- **Performance**: Lazy loading, code splitting, and optimized animations
- **Additional Libraries**: GSAP, Lottie, Particles.js, React Spring

### **Design Philosophy**
- **Futuristic Theme**: Cyberpunk/Tech-noir aesthetic with glassmorphism
- **Color Scheme**: Dark mode with neon accents (cyan, purple, electric blue)
- **Typography**: Space Grotesk, Orbitron, and Inter fonts
- **Smooth 60fps**: GPU-accelerated animations with no jank

## 📁 Project Structure

```
/src
  /app
    - layout.tsx          # Root layout with navigation
    - page.tsx            # Home page with all sections
    - globals.css         # Global styles and animations
    - sitemap.xml         # SEO sitemap
  /components
    - Hero.tsx            # 3D hero section with particles
    - About.tsx           # About section with animated stats
    - Skills.tsx          # 3D skill sphere and interactive cards
    - Projects.tsx        # Bento grid with 3D project cards
    - Certifications.tsx  # 3D carousel for credentials
    - Achievements.tsx    # Trophy podium and achievement cards
    - Experience.tsx      # Timeline with expandable cards
    - Contact.tsx         # 3D form and social links
    - Navigation.tsx      # Glassmorphism navigation
  /lib
    - performance.ts      # Performance optimization utilities
  /public
    - sw.js               # Service worker for offline support
    - robots.txt          # SEO robots file
    - images/             # Optimized images
    - certificates/       # Certificate images
```

## 🎨 Sections

### 1. **Hero Section**
- 3D rotating holographic name with particles
- Matrix-style falling code background
- Typewriter effect for tagline
- Interactive 3D mesh responding to mouse movement
- Floating geometric shapes with parallax

### 2. **About Me**
- Animated counters for stats (CGPA, projects, etc.)
- Interactive skill bars with wave animations
- 3D card flip effects
- Floating tech stack icons

### 3. **Skills Section**
- 3D skill sphere with floating nodes
- Interactive card grid with 3D flip animations
- Category filtering with smooth transitions
- Progress circles with neon glow effects

### 4. **Projects Showcase**
- Bento grid layout with expandable cards
- 3D project cards with flip animations
- Filter buttons with smooth transitions
- Modal popups for project details

### 5. **Certifications**
- 3D carousel for certificate display
- Interactive cards with hover effects
- Timeline animation for credentials
- Badge collection with pop-in animations

### 6. **Achievements**
- 3D trophy podium with confetti animation
- Expandable achievement cards
- Progress indicators
- Competition statistics

### 7. **Experience Timeline**
- Vertical timeline with scroll animations
- Cards sliding from alternate sides
- Icon animations on hover
- Progress bar showing journey

### 8. **Contact Section**
- 3D contact form with tilt effects
- Animated envelope icon
- Social media links with elastic hover
- Particle background reacting to cursor

## 🛠️ Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/AkshayRaj367/akshay-portfolio.git
cd akshay-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Run the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Start production server**
```bash
npm start
```

## 🚀 Deployment

### **Vercel (Recommended)**
1. Push to GitHub
2. Connect repository to Vercel
3. Auto-deploy on push to main branch

### **Manual Deployment**
```bash
npm run build
npm run start
```

## 🎯 Performance Features

### **Optimizations**
- ✅ Lazy loading with Intersection Observer
- ✅ Code splitting by route
- ✅ Image optimization (WebP format)
- ✅ GPU-accelerated animations
- ✅ Service Worker for offline support
- ✅ Adaptive quality based on device capabilities
- ✅ Reduced motion support for accessibility

### **Lighthouse Score Target**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

## 🎨 Customization

### **Colors**
Edit `tailwind.config.js` to customize the neon color scheme:
```javascript
colors: {
  neon: {
    cyan: '#00ffff',
    purple: '#ff00ff',
    blue: '#0080ff',
    green: '#00ff00',
    pink: '#ff0080',
  }
}
```

### **Fonts**
Update font imports in `layout.tsx` and configure in `tailwind.config.js`.

### **3D Models**
Replace 3D assets in `/public/models/` and update imports in components.

## 🔧 Configuration

### **Environment Variables**
Create `.env.local` for sensitive data:
```env
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

### **Next.js Config**
`next.config.js` includes:
- Image optimization settings
- Webpack configuration for 3D assets
- Performance optimizations

## 📱 Responsive Design

- **Mobile**: Optimized touch interactions and reduced animations
- **Tablet**: Balanced experience with adapted layouts
- **Desktop**: Full 3D experience with all animations

## ♿ Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Reduced motion support
- High contrast mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- **Next.js Team** - Amazing framework
- **Framer Motion** - Smooth animations
- **Three.js** - 3D graphics
- **Tailwind CSS** - Utility-first styling
- **Vercel** - Hosting platform

## 📞 Contact

- **Email**: mariabala367@gmail.com
- **Phone**: +91 7780275789
- **GitHub**: [AkshayRaj367](https://github.com/AkshayRaj367)
- **LinkedIn**: [Akshay Raj](https://linkedin.com/in/akshay-raj-367)

---

**Built with ❤️ and lots of ☕ by P. Maria Bala Akshay Raj**
