# PsiCare — Clinical & Administrative Management Platform (Frontend MVP)

An end-to-end Software Engineering specification and high-fidelity interactive web prototype designed to streamline and professionalize independent psychological practices. PsiCare addresses operational fragmentation by unifying patient management, scheduling, secure electronic health records (EHR), and financial workflows into a modern, responsive user experience.

---

# 🎯 Project Overview & Problem Statement

Independent psychologists often spend up to 80% of their administrative time dealing with fragmented tools, such as physical paper diaries, unlinked digital calendars, and local spreadsheets. This disconnected approach causes severe issues:
* *Scheduling Conflicts:* High risks of double-booking and messy manual rescheduling via messaging apps.
* *Financial Leakage:* Untracked sessions, manual bank statement checking, and poor debt monitoring.
* *Legal & Ethical Risks:* Storing sensitive mental health data in unsecured local text sheets or open notebooks directly violates the Brazilian General Data Protection Law (LGPD - Law 13.709/2018) and Federal Psychology Council (CFP) guidelines.

**PsiCare** solves these bottlenecks by delivering a highly intuitive, centralized web interface mapping all necessary security and administrative compliance frameworks.

---

# ✨ Core Features Implemented (Frontend Scope)

1. **Unified Patient Management UI (CRM):** Complete interface to register, update, and logically inactivate patients, simulating real medical history preservation without physical database record deletio.
2. **Dynamic Scheduling Panel:** Interactive calendar agenda featuring client-side validation states designed to strictly prevent therapist time conflicts.
3. **Secure EHR Text-Editor Layout:** A restricted digital clinical record interface showcasing unalterable session evolution saves to guarantee audit compliance.
4. **Integrated Cash Flow Control:** Layout for tracking session revenues (supporting PIX, debit, and credit options) with real-time billing status components.
5. **Analytics & Management Dashboard:** Interactive charts and aggregated metrics reporting monthly business performance and attendance rates.

---

# 🛠️ Technology Stack & Frontend Architecture

The interactive client interface is built using a modern, scalable frontend stack:
* **Core Framework:** **React** (with **TypeScript** for strict type safety and component reliability).
* **Build Tool:** **Vite** for optimized, lightning-fast development and asset bundling.
* **Styling Engine:** **Tailwind CSS** combined with customized configuration files for absolute visual consistency.
* **UI Components:** **Shadcn UI** primitives ensuring full accessibility and clean aesthetic design layouts.

---

# 📂 Repository File Structure

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

```markdown
## PsiCare — Clinical & Administrative Management Platform

An end-to-end frontend web application designed to streamline and professionalize independent psychological practices. PsiCare addresses operational fragmentation by unifying patient management, scheduling, secure electronic health records (EHR) concepts, and financial workflows into a polished, modern user interface.

---

## 🎯 Project Overview & Problem Statement

Independent psychologists often spend significant administrative time dealing with fragmented tools, such as physical paper diaries, unlinked digital calendars, and local spreadsheets. This disconnected approach causes severe operational bottlenecks:
* **Scheduling Conflicts:** High risks of double-booking and manual rescheduling complexity.
* **Financial Tracking:** Difficulty monitoring unpaid sessions, manual bank statement checks, and cash flow tracking.
* **Data Privacy Boundaries:** Managing sensitive mental health notes requires strict structural workflows and compliance-minded security boundaries to safely protect clinical histories.

**PsiCare** solves these bottlenecks by delivering a highly responsive, centralized, and visually intuitive administrative ecosystem.

---

## ✨ Core Features (Frontend MVP Scope)

1. **Unified Patient Management (CRM):** Interactive modules to register, view, and logically update patient profiles while preserving historical access.
2. **Dynamic Scheduling Panel:** A clean, responsive calendar layout designed to prevent therapist time slot allocation overlaps.
3. **Electronic Health Records (EHR) Concept:** A dedicated clinical workspace interface tailored for documenting immutable session notes and progressive timelines.
4. **Integrated Cash Flow Controls:** Comprehensive dashboards mapping incoming revenues, ledger balances, payment method filters, and invoice statuses.
5. **Management Analytics:** Visual aggregations of operational metrics, patient attendance rates, and financial reports.

---

## 🏗️ Architecture & Technology Stack

The client-side interface is fully modularized and built using production-grade frontend technologies:

* **Core Framework:** **React** paired with **TypeScript** for robust type-safety and component predictability.
* **Build Tool:** **Vite** ensuring ultra-fast Hot Module Replacement (HMR) and optimized production bundles.
* **Styling Engine:** **Tailwind CSS** allowing for rapid utility-first styling and strict design system scaling.
* **UI Components:** Built on top of **Shadcn UI** specifications to guarantee highly accessible, consistent, and beautiful interactive elements.

---

## 📂 Repository Structure

The project layout separates high-level system engineering documentation from the functional React application codebase:

```text
psicare-platform/
├── assets/                          # Rendered UML diagrams for README documentation
│   ├── activity-diagram.png
│   ├── architecture-diagram.png
│   ├── class-diagram.png
│   ├── component-diagram.png
│   ├── sequence-diagram.png
│   └── use-case-diagram.png
├── docs/                            # Structural documentation archive
│   └── diagrams/                    # Source code files for quick diagram updates
│       ├── activity-diagram.puml
│       ├── architecture-diagram.puml
│       ├── class-diagram.puml
│       ├── component-diagram.puml
│       ├── sequence-diagram.puml
│       └── use-case-diagram.puml
└── frontend/                        # Functional application codebase
    ├── src/
    │   ├── app/                     # Views, routing structure, and interface layout
    │   │   ├── components/          # Reusable UI elements
    │   │   │   ├── figma/           # High-fidelity design implementation components
    │   │   │   └── ui/              # Accessible underlying shadcn primitives
    │   │   └── App.tsx              # Application root entry point
    │   └── styles/                  # Design system token definitions
    │       ├── fonts.css
    │       ├── globals.css
    │       ├── index.css
    │       ├── tailwind.css
    │       └── theme.css
    ├── ATTRIBUTIONS.md              # Open-source graphic asset and typography credits
    ├── default_shadcn_theme.css     # Global component variable overrides
    ├── package.json                 # Project dependencies configuration matrix
    ├── pnpm-workspace.yaml          # Monorepo / workspace configuration rules
    ├── postcss.config.mjs           # CSS post-processing pipeline instructions
    └── vite.config.ts               # Bundler performance settings

```

---

## 📊 System Engineering & UML Diagrams

### 1. Use Case Diagram

Maps the logical functional permissions across system scopes, isolating administrative capabilities from base interfaces.


### 2. Architecture Diagram (3-Tier Structure)

Defines how data moves through presentation layers down into abstracted routing definitions and mock domain schemas.


### 3. Class Diagram

Outlines domain entities, data attributes, field multiplicities, and structural object dependencies.


### 4. Component Diagram

Illustrates individual internal layout pieces, component separation, and rendering isolation boundaries.


### 5. Activity Diagram (Scheduling Logic)

Visualizes operational step-by-step validations executing within the system booking algorithm to intercept calendar slot conflicts.


### 6. Sequence Diagram

Traces step-by-step lifecycles of API-bound event interactions from user interface triggers down to persistence layer callbacks.


---

## 🚀 Getting Started (Local Development)

To spin up the development server on your local machine, follow these steps:

### Prerequisites

Ensure you have **Node.js** (v18 or higher recommended) and **pnpm** installed.

### Installation

1. Clone this repository to your local computer.
2. Navigate into the frontend root directory:
```bash
cd frontend

```


3. Install the project workspace dependencies:
```bash
pnpm install

```



### Running the App

Launch the Vite local development instance:

```bash
pnpm run dev

```

Open your browser and navigate to the address shown in your terminal console (typically `http://localhost:5173`) to view the application.
