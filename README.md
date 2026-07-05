# Premium Red & Black Glassmorphism Portfolio

A state-of-the-art scrollytelling web portfolio designed and developed for **Cheeranjeevan K** (Data Analyst and AI & Data Science student). This website combines a premium obsidian black and glowing crimson red aesthetic with a narrative, performance-optimized scrolling experience.

👉 **Live Demo:** [https://ilyraa.netlify.app/user/index.html](https://ilyraa.netlify.app/user/index.html)

---

## 🌟 Key Features

1. **Modern Liquid Glassmorphism**: High-fidelity UI featuring frosted glass panels (`backdrop-filter`), glowing accent borders, and floating background blobs that slowly morph and drift.
2. **Compositor-Optimized Scrollytelling**: Custom vertical scroll-linked transitions. All animations are throttled using `requestAnimationFrame` and run exclusively on GPU compositor layers (`transform: translate3d` and `opacity`) to guarantee a smooth, jank-free 60fps experience.
3. **Alternating Storyline Timeline**: The "About Me" section is broken down into four alternating zig-zag cards mapping out a clear narrative flow (Who I Am, My Domain, Projects, and Credentials/Tech Stack).
4. **Dashboard Overlay Panel**: Interactive sidebar containing quick-access frosted modal overlays for:
   * **Certifications** (Google Data Analytics, Generative AI Foundations, Responsible AI, and more).
   * **Projects Catalog** (Fully details 8 active and completed projects).
   * **Account Links** (LinkedIn, GitHub, Email).
5. **Mobile Responsive**: Custom media query sheets that seamlessly stack fixed layout elements into a clean normal flow for phones and tablets.

---

## 🛠️ Technology Stack

* **Structure**: Semantic HTML5
* **Styling**: Vanilla CSS3 (Custom Variables, CSS Grid, Flexbox, hardware-accelerated transforms)
* **Logic**: Vanilla ES6 JavaScript (requestAnimationFrame scroll listeners, modal animation triggers)
* **Server Support**: Local development zero-cache configuration

---

## 📁 Project Catalog Overview

Here is a summary of the 8 projects featured in this portfolio:

* **SpotOn — Virtual Ticket Booking**: Developing a complete online ticket booking platform (HTML, CSS, JS, Node.js, Express, PostgreSQL).
* **NLP Review Topic Classification**: preprocessed restaurant reviews and built a TF-IDF + Logistic Regression classification model.
* **AI Deepfake Detection Tool**: Computer vision and Generative AI tool built in Python to verify synthetic media authenticity.
* **The 'Sub-Threshold' Sentinel**: Passive behavioral mental health crisis prediction model utilizing time-series signal processing.
* **Traffic Flow Analysis**: Analyzed vehicle congestion patterns for smart city planning.
* **E-commerce Stock Management**: Database management system (DBMS) for inventory and real-time alerts.
* **ILYRA E-Commerce Website**: Deployed fullstack e-commerce store integrated with Razorpay payments and Chart.js analytics.
* **Tableau Business Intelligence**: Interactive dashboards built after data preparation in BigQuery, Excel, and SQL.

---

## 🚀 Running Locally

To run the portfolio on your local machine:

1. Clone this repository:
   ```bash
   git clone https://github.com/Cheeranjeevank/My-Portfolio.git
   cd My-Portfolio
   ```

2. Start a zero-cache HTTP server:
   ```bash
   npx http-server -p 8080 -c-1
   ```

3. Open your browser and navigate to `http://localhost:8080`.