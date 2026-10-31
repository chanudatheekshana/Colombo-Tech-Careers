**Role:** You are an elite Senior Frontend Engineer and UI/UX Architect. 

**Objective:** Refactor the provided monolithic HTML file into a perfectly structured, modular web application. The design must be transformed into a premium, modern SaaS aesthetic featuring a Teal, Cyan, and Black color scheme, inspired by sleek product landing pages. 

**Constraints & Design System:**
1. **Architecture:** Separate the code into 4 distinct files: `index.html`, `styles.css`, `app.js`, and `data.js`.
2. **Design Language:** Rounded corners (up to `rounded-[2rem]`), soft ambient shadows (`shadow-soft`, `shadow-floating`), floating UI elements, and glassmorphism.
3. **Color Palette:** Primary: Teal/Cyan. Secondary: Slate-900 (Black) for high contrast. Backgrounds: Slate-50 with subtle glowing background blobs.
4. **Typography:** Use the Google Font 'Plus Jakarta Sans'.
5. **CSS Elements:** Create the floating dashboard mockup in the Hero section using pure CSS/HTML (no external images).
6. **Functionality:** Preserve all existing JavaScript functionality (Chart.js rendering, filtering, dynamic rendering of jobs, directories, and gap matrices).

**Step-by-Step Instructions for the Agent:**

**Step 1: File Creation & Structure**
Create the following file structure. Do not combine them.
- `index.html` (Link to Tailwind CDN, Google Fonts, Chart.js CDN, `styles.css`, and `app.js` as an ES6 module or standard script).
- `styles.css` (Custom CSS for animations, decorative background blobs, custom scrollbars, and specific component overrides).
- `data.js` (Export the `activeJobsData`, `target20FitGaps`, and `employerDirectory` as constants).
- `app.js` (Import the data from `data.js` and contain the DOM initialization, Chart.js logic, and event listeners).

**Step 2: Tailwind Configuration**
In the `<head>` of `index.html`, configure Tailwind with the following theme extensions:
- Font Family: `"Plus Jakarta Sans", sans-serif`
- Colors: Teal/Cyan brand scale, Slate-900 for deep blacks.
- Box Shadow: `soft` (large, diffuse teal-tinted shadow), `floating` (deep slate shadow for mockups).

**Step 3: HTML & CSS Structure (The Design Transformation)**
- **Header:** Glassmorphism sticky navbar (`bg-white/70 backdrop-blur-lg border-b border-white/20`).
- **Hero/Overview Section:** Split layout. Left side: Bold typography (`text-5xl font-extrabold`), a gradient text span (`bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-cyan-500`), and Bento-box style stat cards. Right side: A Pure CSS floating mockup. Build a stylized dashboard card with floating badges (e.g., "Profile Matched", "Total Applied") using CSS `transform: rotate()`, `translate()`, and `shadow-floating`.
- **Decorative Blobs:** Add fixed background divs with `blur-3xl` and low opacity teal/cyan colors to create a soft, dreamy SaaS background.
- **Job Cards:** `rounded-[1.5rem]`, soft borders, hover effects (`hover:-translate-y-1 hover:shadow-floating`).
- **Skill Fit Matrix:** Use pill-shaped tier selector buttons (`rounded-full`). Design the gap cards to look like elegant dashboards with clear visual hierarchies.
- **Roadmap Section:** Use a 4-column grid with large translucent numbers (1, 2, 3, 4) in the top right corner of each card, similar to modern SaaS timelines.
- **Directory Table:** Wrap in a `rounded-2xl` container with custom hover states on rows.

**Step 4: JavaScript Logic (`app.js`)**
- Initialize Chart.js with the Teal/Cyan/Slate color palette. Ensure charts are responsive.
- Implement the job filtering logic (`searchInput`, `tierSelect`, `locationSelect`).
- Implement the Gap Matrix tier switching logic.
- Implement the Directory search logic.
- Ensure the DOM is fully loaded before executing scripts (`document.addEventListener("DOMContentLoaded", ...)`).

**Step 5: Custom CSS (`styles.css`)**
- Add custom `::-webkit-scrollbar` styling (slate/teal colors).
- Add keyframe animations for a subtle floating effect on the CSS mockup elements (e.g., `@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`).

**Input Code:** 
I will now provide you with the existing monolithic HTML file. Please read it, extract the data and logic, and refactor it according to the instructions above. 

[PASTE THE PREVIOUS HTML CODE HERE]