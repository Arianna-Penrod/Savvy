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
  - Check: `git --version`
  - Check that your GitHub is connected:
  `git config --global user.name
   git config --global user.email`
- **Node.js (LTS recommended)**
  https://nodejs.org/en/download
  - Check: `node -v`
- **npm** (comes with Node)
  - Check: `npm --version`
- **Expo Go** on your phone (App Store / Google Play), OR an emulator (optional)
  https://expo.dev/go
  - Install: `npx expo install`
  - Check: `npx expo --version`

> We should **never** commit `node_modules/`. Everyone installs dependencies locally.

---

## First-time Setup

### 1) Clone the repo
```bash
git clone https://github.com/Arianna-Penrod/Savvy.git
```

### 2) Check that dependencies are installed

Use one package manager npm.
```bash
npm install
```

---

## Run the App (Expo)

Start the dev server
```bash
npx expo start
```

Then choose one:

Press w to open the web app

---

## Team Git Workflow
Golden rule: ***Always*** pull before you start coding please!

```bash
git pull origin main
```

### Create A Branch & Pull

1) Update your local main:
```bash
git checkout main
git pull origin main
```

2) Create a new branch:
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
git commit -m "Short summary of change" -m "Longer summary if needed"
```

5) Push your branch:
```bash
git push
```

### Push and Pull

```bash
git pull
```

```bash
git add -A
```

```bash
git commit -m "Short summary of change" -m "Longer summary if needed"
```

```bash
git push
```

### Helpful commands

To pull
```bash
git push
```
```bash
git branch
```

To switch to a different branch
```bash
git checkount branch-name
```

To compare local repo to remote repo
```bash
git status
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

Don’t commit .env files or keys plz

Try not to edit files not necessary to development mean to touch (especially lockfiles) unless required and communicated within the team

---

## Branching & Pull Requests

Branch names: feature/..., fix/..., chore/...

Pull requests should:
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
- Resolve conflicts, commit, push again. (We will learn this together as a team 😄)

---

## Project Structure

- app/ — main app code
- components/ — reusable UI components
- assets/ — images, icons
- types/ — TypeScript types (we will add this soon)
- utils/ — helpers (we will add this soon too)

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
