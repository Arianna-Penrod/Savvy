# Savvy

An iOS + Android app that helps users save money by tracking spending habits and finding cheaper alternatives near their location using AI-driven personalization.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [First-time Setup](#first-time-setup)
- [Run the App (Expo)](#run-the-app-expo)
- [Team Git Workflow](#team-git-workflow)
- [Committing Guidelines](#committing-guidelines)
- [Branching & Pull Requests](#branching--pull-requests)
- [Project Structure](#project-structure)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites
Install these **before** cloning the repo:

- **Git**
  https://github.com/git-guides/install-git
- **Node.js (LTS recommended)**
  https://nodejs.org/en/download
  Check: `node -v`
- **npm** (comes with Node)
- **Expo Go** on your phone (App Store / Google Play), OR an emulator (optional)
  https://expo.dev/go

> We should **never** commit `node_modules/`. Everyone installs dependencies locally.

---

## First-time Setup

### 1) Clone the repo
```bash
git clone https://github.com/Arianna-Penrod/Savvy.git
cd Savvy
```

### 2) Install dependencies

Use one package manager npm.
```bash
npm install
```

### 3) Create your local environment file 

If we use environment variables, copy the example:

---

## Run the App (Expo)

Start the dev server
```bash
npx expo start
```

Then choose one:

(I recommend using the Expo Go app on your phone!)
Scan the QR code with Expo Go app

Press i to run iOS simulator (Mac only)

Press a to run Android emulator

---

## Team Git Workflow
Golden rule: ***Always*** pull before you start coding please!

```bash
git pull origin main
```

Our workflow:

1) Update main locally:
```bash
git checkout main
git pull origin main
```

2) Create a new branch for your task:
```bash
git checkout -b feature/short-description
```

3) Do your work, then compare to main repo to see if it changed:
```bash
git status
git diff
```

4) Stage & commit your local changes to the repo:
```bash
git add -A
git commit -m "Short summary of change"
```

5) Push your branch:
```bash
git push -u origin feature/short-description
```

---

## Committing Guidelines

To reduce OS-related issues + merge conflicts:

✅ Do:

Pull often: git pull origin main

Make small commits with clear messages

Keep changes focused (one feature/fix per branch)

Run lint before pushing (or before committing if hooks are installed, we will implement this soon)

🚫 Don’t:

Do not commit node_modules/

Don’t commit .env files or keys

Don’t edit files you didn’t mean to touch (especially lockfiles) unless required

About lockfiles

We commit exactly one lockfile:

If using npm: commit package-lock.json

If using yarn: commit yarn.lock

Everyone should use the same tool to avoid dependency/version conflicts.

---

## Branching & Pull Requests

Branch names: feature/..., fix/..., chore/...

PRs should:
- Describe what changed
- Include screenshots/video if UI changed
- Reference the issue/task if applicable

If your pull request has merge conflicts:
- Pull latest main into your branch:
```bash
git checkout feature/your-branch
git fetch origin
git merge origin/main
```
- Resolve conflicts, commit, push again.

---

## Project Structure

app/ — main app code
components/ — reusable UI components
assets/ — images, icons
types/ — TypeScript types (we will add this soon)
utils/ — helpers (we will add this soon too)

---
## Troubleshooting

Make sure you pulled latest changes:
```bash
git pull origin main
```

Reinstall dependencies:
```bash
rm -rf node_modules
npm install
```

Expo cache issues
```bash
npx expo start -c
```

If you accidentally committed node_modules
```bash
git rm -r --cached node_modules
git push origin main
```

--- 
## Contributing

### Team:

- Arianna Penrod

- Sadita Sadat

- Carlyssa Cook

- Sarah Haffener

- Hima Mandla

- Madi Wallace

--- 
## License

MIT
