# Contributing to Website Vikreta

Thank you for your interest in contributing to Website Vikreta! This guide will walk you through the entire contribution process.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Standards](#code-standards)
- [Branch Strategy](#branch-strategy)

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**
- Access to the company repository

## 🚀 Getting Started

### 1. Fork the Repository

1. Navigate to the [main repository](https://github.com/website-vikreta/websitevikreta.com)
2. Click the **"Fork"** button in the top-right corner
3. This creates a copy of the repository under your GitHub account

### 2. Clone Your Fork

```bash
# Clone your forked repository
git clone https://github.com/YOUR-USERNAME/websitevikreta.com.git

# Navigate to the project directory
cd websitevikreta.com
```

### 3. Set Up Upstream Remote

Add the original repository as an upstream remote to keep your fork synchronized:

```bash
# Add upstream remote
git remote add upstream https://github.com/website-vikreta/websitevikreta.com.git

# Verify remotes
git remote -v
```

You should see:
- `origin` - your fork
- `upstream` - the original repository

### 4. Environment Setup

```bash
# Copy environment variables
cp .env.example .env.local

# Add your environment variables to .env.local
# (Get these from your team lead or project documentation)
```

### 5. Install Dependencies

```bash
npm install
```

### 6. Verify Setup

```bash
# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🔄 Development Workflow

### Sync with Upstream

Before starting any new work, always sync your fork with the upstream repository:

```bash
# Fetch all branches from upstream
git fetch upstream

# Make sure you're on main
git checkout main

# Update your local main with upstream
git pull upstream main

# Update your fork on GitHub
git push origin main
```

### Create a Feature Branch

Always create a new branch from the target release branch:

```bash
# Fetch the latest upstream branches
git fetch upstream

# Create and checkout a new branch based on the current release branch
git checkout -b feature/your-feature-name upstream/<release-branch>

# Example:
# git checkout -b feature/add-contact-form upstream/<release-branch>
```

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features (e.g., `feature/blog-pagination`)
- `fix/` - Bug fixes (e.g., `fix/navbar-mobile-menu`)
- `update/` - Updates to existing features (e.g., `update/contact-form-validation`)
- `refactor/` - Code refactoring (e.g., `refactor/api-structure`)

## 💻 Making Changes

### Development Process

1. **Make your changes** in your feature branch
2. **Test locally** - ensure everything works as expected
3. **Run build** before pushing (this is crucial!)

```bash
# Build the project to catch errors early
npm run build
```

> ⚠️ **Important:** Always run `npm run build` before pushing your changes. This prevents CI/CD pipeline failures and catches build errors early.

### Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add contact form validation"
```

### Commit Message Guidelines

Follow conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `update:` - Update existing functionality
- `refactor:` - Code refactoring
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add newsletter subscription component
fix: resolve mobile menu overlay issue
update: improve SEO metadata for blog posts
refactor: optimize image loading performance
```

## 📤 Submitting a Pull Request

### 1. Push Your Branch

```bash
# Push your feature branch to your fork
git push -u origin feature/your-feature-name
```

### 2. Run Final Build Check

Before opening a PR, ensure the build passes:

```bash
npm run build
```

If the build fails, fix the errors before proceeding.

### 3. Open a Pull Request

1. Go to your fork on GitHub
2. Click **"Compare & pull request"** button
3. Configure the PR:
   - **Base repository:** `website-vikreta/websitevikreta.com`
   - **Base branch:** `<release-branch>` (the current release branch)
   - **Head repository:** `your-username/websitevikreta.com`
   - **Compare branch:** `feature/your-feature-name`

### 4. PR Title and Description

**Title:** Use a clear, descriptive title
```
Add contact form validation
```

**Description:** Provide context about your changes

```markdown
## What does this PR do?
Adds client-side and server-side validation to the contact form

## Changes made
- Added Zod schema for form validation
- Implemented error messages for invalid inputs
- Added unit tests for validation logic

## Testing
- Tested on Chrome, Firefox, and Safari
- Verified mobile responsiveness
- All edge cases handled

## Screenshots (if applicable)
[Add screenshots here]

## Build Status
✅ `npm run build` passed locally
```

### 5. Review and Merge Process

1. Your PR will be reviewed by maintainers
2. Address any requested changes
3. Once approved, your PR will be merged into the release branch
4. The release branch will eventually be merged into `main`

## 🎯 Code Standards

### General Guidelines

- Follow the existing code style and conventions
- Write clean, readable, and maintainable code
- Add comments for complex logic
- Ensure responsive design for all screen sizes
- Test on multiple browsers and devices

### Project-Specific Standards

Check these files for detailed guidelines:

- `.claude/standards/code-standards.md` - Coding conventions
- `.claude/standards/design-system.md` - Design guidelines
- `.claude/standards/motion-system.md` - Animation standards
- `.claude/standards/seo-geo.md` - SEO best practices

### Key Points

- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Optimize images and assets
- Write accessible HTML
- Follow SEO best practices

## 🌳 Branch Strategy

```
main (production)
  ↑
  └── <release-branch> (staging/release branch)
        ↑
        └── feature/your-feature (your work)
```

**Flow:**
1. You create a feature branch from `<release-branch>`
2. You submit a PR to `<release-branch>`
3. After review and approval, your PR is merged into `<release-branch>`
4. When ready, `<release-branch>` is merged into `main` (by maintainers)

## 🔍 Troubleshooting

### Build Failures

If `npm run build` fails:

1. Check error messages carefully
2. Ensure all imports are correct
3. Verify TypeScript types
4. Check for unused variables/imports
5. Ensure all environment variables are set

### Sync Issues

If your fork is behind upstream:

```bash
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

### Merge Conflicts

If you encounter merge conflicts:

```bash
# Fetch latest changes
git fetch upstream

# Rebase your branch
git rebase upstream/<release-branch>

# Resolve conflicts in your editor
# After resolving, continue rebase
git add .
git rebase --continue

# Force push (only for your feature branch!)
 git push --force-with-lease origin feature/your-feature-name
```

## 📞 Getting Help

- Check existing documentation in `.claude/` directory
- Review `README.md` for project overview
- Ask your team lead or maintainers
- Check existing issues and PRs for similar problems

## 🎉 Thank You!

Thank you for contributing to Website Vikreta! Your efforts help make this project better for everyone.

---

**Happy Coding! 🚀**
