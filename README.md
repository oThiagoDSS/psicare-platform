# PsiCare — Clinical & Administrative Management Platform (Frontend MVP)

An end-to-end Software Engineering specification and high-fidelity interactive web prototype designed to streamline and professionalize independent psychological practices <!--[cite: 3] -->. PsiCare addresses operational fragmentation by unifying patient management, scheduling, secure electronic health records (EHR), and financial workflows into a modern, responsive user experience <!--[cite: 3] -->.

---

## 🎯 Project Overview & Problem Statement

Independent psychologists often spend up to 80% of their administrative time dealing with fragmented tools, such as physical paper diaries, unlinked digital calendars, and local spreadsheets <!--[cite: 3] -->. This disconnected approach causes severe issues:
* **Scheduling Conflicts:** High risks of double-booking and messy manual rescheduling via messaging apps <!--[cite: 3] -->.
* **Financial Leakage:** Untracked sessions, manual bank statement checking, and poor debt monitoring <!--[cite: 3] -->.
* **Legal & Ethical Risks:** Storing sensitive mental health data in unsecured local text sheets or open notebooks directly violates the Brazilian General Data Protection Law (LGPD - Law 13.709/2018) and Federal Psychology Council (CFP) guidelines <!--[cite: 3] -->.

**PsiCare** solves these bottlenecks by delivering a highly intuitive, centralized web interface mapping all necessary security and administrative compliance frameworks <!--[cite: 3] -->.

---

## ✨ Core Features Implemented (Frontend Scope)

1. **Unified Patient Management UI (CRM):** Complete interface to register, update, and logically inactivate patients, simulating real medical history preservation without physical database record deletion <!--[cite: 3] -->.
2. **Dynamic Scheduling Panel:** Interactive calendar agenda featuring client-side validation states designed to strictly prevent therapist time conflicts <!--[cite: 3] -->.
3. **Secure EHR Text-Editor Layout:** A restricted digital clinical record interface showcasing unalterable session evolution saves to guarantee audit compliance <!--[cite: 3] -->.
4. **Integrated Cash Flow Control:** Layout for tracking session revenues (supporting PIX, debit, and credit options) with real-time billing status components <!--[cite: 3] -->.
5. **Analytics & Management Dashboard:** Interactive charts and aggregated metrics reporting monthly business performance and attendance rates <!--[cite: 3] -->.

---

## 🛠️ Technology Stack & Frontend Architecture

The interactive client interface is built using a modern, scalable frontend stack:
* **Core Framework:** **React** (with **TypeScript** for strict type safety and component reliability) <!--[cite: 3] -->.
* **Build Tool:** **Vite** for optimized, lightning-fast development and asset bundling <!--[cite: 3] -->.
* **Styling Engine:** **Tailwind CSS** combined with customized configuration files for absolute visual consistency <!--[cite: 3] -->.
* **UI Components:** **Shadcn UI** primitives ensuring full accessibility and clean aesthetic design layouts <!--[cite: 3] -->.

---

## 📂 Repository File Structure

```text
psicare-platform/
├── assets/                          # Rendered system diagrams (PNG)
│   ├── activity-diagram.png
│   ├── architecture-diagram.png
│   ├── class-diagram.png
│   ├── component-diagram.png
│   ├── sequence-diagram.png
│   └── use-case-diagram.png
├── docs/                            # Software Engineering Documentation
│   └── diagrams/                    # PlantUML source code files (Backup)
│       ├── activity-diagram.puml
│       ├── architecture-diagram.puml
│       ├── class-diagram.puml
│       ├── component-diagram.puml
│       ├── sequence-diagram.puml
│       └── use-case-diagram.puml
└── frontend/                        # React Application Source Code
    ├── src/
    │   ├── app/                     # Core App engine and component routing
    │   │   ├── components/          # Reusable interface primitives
    │   │   │   ├── figma/           # High-fidelity imported layouts
    │   │   │   └── ui/              # Shadcn accessible UI components
    │   │   └── App.tsx              # Main Application Entry Component
    │   └── styles/                  # Global style configuration sheets
    │       ├── fonts.css
    │       ├── globals.css
    │       ├── index.css
    │       ├── tailwind.css
    │       └── theme.css
    ├── ATTRIBUTIONS.md              # Iconography and asset licensing details
    ├── default_shadcn_theme.css     # Shadcn design system defaults
    ├── package.json                 # Project dependencies and script declarations
    ├── pnpm-workspace.yaml          # Package manager workspace scaling rules
    ├── postcss.config.mjs           # CSS post-processing configuration
    └── vite.config.ts               # Vite engine structural rules
