# 🚀 My Portfolio — Job Hunting Portfolio Website

A stunning, responsive personal portfolio website built with **pure HTML, CSS, and JavaScript** — no frameworks required. Inspired by modern open-source portfolio templates and designed to impress recruiters and hiring managers.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-6c63ff?style=for-the-badge&logo=github)](https://yourusername.github.io)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](.)
[![CSS](https://img.shields.io/badge/CSS3-264DE4?style=for-the-badge&logo=css3&logoColor=white)](.)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](.)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎨 **Dark Theme** | Sleek dark UI with purple/teal accent palette |
| 🌌 **Particle Background** | Interactive canvas particle system |
| 🖱️ **Custom Cursor** | Magnetic trailing cursor with hover effects |
| ⌨️ **Typing Animation** | Dynamic typewriter text in the hero section |
| 📊 **Animated Skill Bars** | Progress bars animated on scroll |
| 🔢 **Counter Animation** | Stat numbers count up when visible |
| 🃏 **3D Card Tilt** | Project cards tilt on mouse hover |
| 🔍 **Project Filters** | Filter projects by category |
| 📱 **Fully Responsive** | Mobile-first, works on all screen sizes |
| ✅ **Form Validation** | Contact form with live client-side validation |
| 🎬 **Scroll Reveal** | Elements animate in as you scroll |
| 💅 **Page Loader** | Animated loading screen on first visit |
| 🔝 **Back to Top** | Floating back-to-top button |
| ♿ **Accessible** | ARIA labels and semantic HTML |

---

## 📁 File Structure

```
Portfolio/
├── index.html              # Main HTML
├── README.md               # This file
├── assets/
│   └── resume.pdf          # Your resume (replace this!)
├── css/
│   ├── style.css           # Main styles + layout
│   └── animations.css      # Keyframes & animation classes
└── js/
    ├── particles.js        # Canvas particle system
    └── main.js             # All interactivity
```

---

## 🛠️ How to Customize

### 1. Personal Info
Open `index.html` and update:
- **Name** → Search for `Alex Johnson` and replace with yours
- **Job titles** → Edit the array in `js/main.js` under `TYPING ANIMATION`
- **Bio** → Update the `<p>` tags in the `#about` section
- **Location, email, phone** → Update in `#contact` and footer
- **Social links** → Update `href` attributes on social icons

### 2. Projects
Add/edit project cards in `index.html` inside `#projectsGrid`:
```html
<div class="project-card" data-category="web">
  <div class="project-img">
    <div class="project-img-placeholder gradient-1">
      <i class="fas fa-your-icon"></i>
    </div>
    ...
  </div>
  <div class="project-info">
    <h3>Your Project Title</h3>
    <p>Description...</p>
  </div>
</div>
```

### 3. Skills
Edit skill cards in the Skills section. Change `data-width` (0–100) for the progress bar level.

### 4. Resume
Replace `assets/resume.pdf` with your actual resume file.

### 5. Profile Photo
Replace the `<div class="avatar-placeholder">` with an `<img>` tag:
```html
<img src="assets/photo.jpg" alt="Your Name" style="width:100%;height:100%;object-fit:cover;" />
```

### 6. Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary: #6c63ff;    /* Main purple */
  --secondary: #06d6a0;  /* Teal accent */
  --accent: #ff6b6b;     /* Red accent */
}
```

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Create a new GitHub repository named `yourusername.github.io`
2. Push this Portfolio folder contents to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "🚀 Initial portfolio commit"
   git remote add origin https://github.com/yourusername/yourusername.github.io.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → main branch**
4. Your site will be live at `https://yourusername.github.io` 🎉

---

## 📸 Sections Overview

| # | Section | Description |
|---|---------|-------------|
| 1 | **Hero** | Name, role, CTA buttons, social links, avatar |
| 2 | **Stats** | Animated counters (projects, years, clients) |
| 3 | **About** | Bio, photo, quick-info card |
| 4 | **Skills** | Tabbed skill bars (Frontend / Backend / Tools) |
| 5 | **Projects** | Filterable project grid with GitHub links |
| 6 | **Experience** | Timeline of work history |
| 7 | **Contact** | Info cards + validated contact form |

---

## 💡 Tips for Job Hunting

- ✅ Keep projects **real and linked** to live demos or GitHub repos
- ✅ Add your **actual profile photo** (professional headshot)
- ✅ Write **specific achievements** with numbers in the Experience section
- ✅ Make sure your `resume.pdf` is up to date
- ✅ Add **Google Analytics** to track visitor engagement
- ✅ Set up a **custom domain** (e.g., yourname.dev) for extra impressiveness

---

> Built with ❤️ using HTML, CSS & JavaScript · No frameworks · Zero dependencies
