# AEGIS 2026 - Summer School Website

**AI for Evolving, Generalizable, Intelligent Systems**
ETH Zürich | August 31 – September 3, 2026

A polished, static website for the AEGIS 2026 summer school, ready to deploy on GitHub Pages.

## Quick Start

### Deploy to GitHub Pages

1. Create a new GitHub repository (e.g., `aegis2026` or `aegis2026.github.io`)

2. Push this code to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AEGIS 2026 website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aegis2026.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to repository **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Select **main** branch and **/ (root)** folder
   - Click **Save**

4. Your site will be live at `https://YOUR_USERNAME.github.io/aegis2026/`

### Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if you have npx)
npx serve
```

## Customization Guide

### Adding Speaker Photos

1. Add photos to `assets/speakers/` with the naming convention:
   - `daniel-kuhn.jpg`
   - `andreas-krause.jpg`
   - etc.

2. Photos should be square (1:1 aspect ratio), minimum 400×400px
3. The placeholder initials will automatically be hidden when an image loads

### Adding Organizer Photos

Same process, add to `assets/organizers/`:
- `organizer-1.jpg`, `organizer-2.jpg`, etc.

### Adding Sponsor Logos

Add logos to `assets/sponsors/`:
- Use SVG format when possible
- For PNG/JPG, recommended height: 80–120px

### Updating Content

All content is in `index.html`. Key sections to update:

| Section | What to Update |
|---------|----------------|
| Hero | Dates, location if changed |
| Speakers | Add/remove speaker cards |
| Program | Update schedule items |
| Organizers | Add organizer details |
| Register | Link to actual Google Form when ready |

### Connecting the Registration Form

The form currently shows a success message without actually submitting. To connect to Google Forms:

1. Create a Google Form with fields: Name, Email, Affiliation, Role
2. Get the form action URL and field names
3. Update the `<form>` tag in `index.html`:
   ```html
   <form action="YOUR_GOOGLE_FORM_URL" method="POST" target="_blank">
   ```
4. Update input `name` attributes to match Google Form field names

### Color Customization

Edit CSS custom properties in `css/styles.css`:

```css
:root {
    --color-primary-dark: #0A1628;
    --color-accent-blue: #3B82F6;
    --color-accent-gold: #F59E0B;
    --color-accent-teal: #06B6D4;
}
```

## File Structure

```
aegis2026/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   └── main.js         # Interactive features
├── assets/
│   ├── favicon.svg     # Browser tab icon
│   ├── speakers/       # Speaker photos
│   ├── organizers/     # Organizer photos
│   └── sponsors/       # Sponsor logos
└── README.md           # This file
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Particle Network Animation**: Interactive hero background
- **Smooth Scroll Navigation**: Sticky nav with scroll-to-section
- **Schedule Tabs**: Day-by-day program view
- **Scroll Animations**: Elements fade in as you scroll
- **Accessibility**: Semantic HTML, keyboard navigation, WCAG AA colors
- **No Build Required**: Pure HTML/CSS/JS, no npm or build tools

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## License

© 2026 AEGIS Summer School, ETH Zürich
