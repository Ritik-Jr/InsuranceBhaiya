# Insurance Bhaiya | Independent Consumer Insurance Education Platform

A fast, lightweight, mobile-first vanilla website modeled directly after modern zero-build web standards (pure HTML5, CSS3, ES6+ JavaScript).

---

## 🏢 Platform Dossier & Architecture

- **Domain:** https://insurancebhaiya.com/
- **Tech Stack:** Pure Vanilla HTML5, CSS3 (`styles.css`), Vanilla JavaScript (`app.js`), Node.js HTTP Server (`server.js`).
- **Zero Build Step:** Double-click `index.html` or run `node server.js` to run immediately. No React, Vite, or bundle compilation required.
- **Design System:** Poppins (Headings) + Inter (Numerals, Calculations, Body Copy), Financial Trust Blue, Slate Neutrals, Emerald Accents.
- **Primary Markets:** United States, United Kingdom, Canada, Europe.

---

## 🚀 Key Platform Features

1. **Interactive Actuarial Calculator Suite:**
   - Life Insurance Needs Calculator (10-year income replacement + debt payoff - liquid assets).
   - Term Rates Estimator (age, coverage, term duration, tobacco classification).
   - Health HDHP vs PPO Analyzer (routine visits + procedure risk vs HSA tax benefits).
   - Auto Insurance Calculator (liability limits vs full collision/comprehensive deductibles).
   - Homeowners Replacement Cost Engine (square footage x local rebuild cost/sqft).
   - Deductible Breakeven Calculator & Inflation Erosion Forecaster.

2. **The Insurance Learning Center:**
   - All 38 deep-dive educational articles with 30-second key takeaways, actuarial explanations, and internal cross-linking.
   - Dynamic category filter pills (*All*, *Basics*, *Life*, *Health*, *Auto*, *Home*).

3. **Side-by-Side Policy Comparisons:**
   - Term Life vs Whole Life Insurance.
   - High Deductible vs Low Deductible.
   - Collision vs Comprehensive Coverage.
   - Independent Broker vs Captive Insurance Agent.

4. **Insurance Dictionary (Jargon Buster):**
   - Authoritative plain-English definitions for deductibles, premiums, exclusions, endorsements, riders, underwriting, and claim pipelines.

5. **10-Point Policy Audit Interactive Checklist:**
   - Real-time Coverage Health Score gauge (0% to 100%).
   - Risk-weighted safeguard items detecting underinsurance traps.

6. **Global Search Modal (`Ctrl+K`):**
   - Instant client-side regex and keyword matching across all articles, tools, and glossary terms.

7. **Technical SEO & Crawlability:**
   - 100% crawlable semantic HTML with Schema.org JSON-LD structured data (`FinancialService`, `Article`).
   - Clean URLs with direct HTTP 200 OK responses.
   - Complete canonical `sitemap.xml` and `robots.txt`.

---

## 💻 Local Testing & Preview

You can preview the website locally using any standard static file server:

### Option A: Using Included Node.js Server (Recommended)
```bash
cd "z:\Event Tools\Insurance Bhaiya"
node server.js
```
Visit [http://localhost:3000/](http://localhost:3000/)

### Option B: Direct Browser Preview
Double-click `index.html` to open the site directly in Chrome, Edge, Safari, or Firefox without running any server.
