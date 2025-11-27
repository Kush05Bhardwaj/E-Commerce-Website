# 🤝 Contributing to MERN E-Commerce Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Keep discussions professional

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/ecommerce.git
cd ecommerce
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment

```bash
cp apps/api/env.example apps/api/.env
# Configure your .env file
```

### 4. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

## 💻 Development Workflow

### Running the Application

```bash
# Run both frontend and backend
npm run dev

# Run only backend
npm run dev:api

# Run only frontend
npm run dev:web
```

### Making Changes

1. **Write your code**
   - Follow the existing patterns
   - Add TypeScript types
   - Keep it modular

2. **Test your changes**
   - Manually test all affected features
   - Check both frontend and backend
   - Test in different browsers

3. **Lint your code**
   ```bash
   npm run lint
   ```

4. **Format your code** (backend)
   ```bash
   cd apps/api
   npm run format
   ```

## 📁 Project Structure

### Adding a Backend Module

```typescript
// 1. Create module directory
apps/api/src/modules/your-module/

// 2. Create files
your-module.model.ts      // Mongoose model
your-module.service.ts    // Business logic
your-module.controller.ts // HTTP handlers
your-module.route.ts      // Express routes

// 3. Register routes in app.ts
import { yourModuleRouter } from "@modules/your-module/your-module.route";
app.use("/api/your-module", yourModuleRouter);
```

### Adding a Frontend Component

```typescript
// 1. Choose location
apps/web/src/components/
  ├── ui/          # Reusable UI components
  ├── layout/      # Layout components
  ├── cards/       # Card components
  └── animations/  # Animation wrappers

// 2. Create component
export const YourComponent = () => {
  return <div>...</div>;
};

// 3. Use TypeScript
interface YourComponentProps {
  title: string;
  onClick: () => void;
}
```

### Adding a Page

```typescript
// 1. Create page in apps/web/src/pages/
YourPage.tsx

// 2. Add route in apps/web/src/routes/AppRoutes.tsx
{ path: "your-page", element: <YourPage /> }
```

## ✨ Coding Standards

### TypeScript

```typescript
// ✅ Good - Use proper types
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // ...
}

// ❌ Bad - Avoid 'any'
function getUser(id: any): any {
  // ...
}
```

### React Components

```typescript
// ✅ Good - Functional components with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const Button = ({ label, onClick, variant = "primary" }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

// ❌ Bad - Missing types
export const Button = ({ label, onClick, variant }) => {
  // ...
};
```

### Backend Controllers

```typescript
// ✅ Good - Async/await with error handling
async createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await productService.create(req.body);
    res.status(201).json({ product });
  } catch (error) {
    next(error);
  }
}

// ❌ Bad - No error handling
async createProduct(req: Request, res: Response) {
  const product = await productService.create(req.body);
  res.json({ product });
}
```

### Naming Conventions

```typescript
// Files
ComponentName.tsx        // React components (PascalCase)
user.model.ts           // Backend files (camelCase)
auth.service.ts
product.controller.ts

// Variables & Functions
const userName = "John";              // camelCase
const isAuthenticated = true;
function getUserById(id: string) {}

// Components
const ProductCard = () => {};         // PascalCase

// Constants
const API_BASE_URL = "...";           // UPPER_SNAKE_CASE
const MAX_ITEMS = 100;

// Types & Interfaces
interface User {}                     // PascalCase
type UserRole = "admin" | "user";
```

### Tailwind CSS

```tsx
// ✅ Good - Organized classes
<div className="
  flex items-center justify-between
  rounded-xl border border-slate-200
  bg-white p-6
  shadow-soft
  hover:shadow-xl
  transition-all duration-300
">

// ✅ Good - Use custom utilities
<button className="rounded-full bg-brand px-6 py-3 hover:scale-105">

// ❌ Bad - Inline styles
<div style={{ display: "flex", padding: "24px" }}>
```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process or auxiliary tool changes

### Examples

```bash
# Good commits
git commit -m "feat(auth): add Google OAuth integration"
git commit -m "fix(cart): resolve quantity update issue"
git commit -m "docs(readme): update setup instructions"
git commit -m "style(button): improve hover animations"
git commit -m "refactor(api): restructure auth module"

# Bad commits
git commit -m "fixed stuff"
git commit -m "update"
git commit -m "changes"
```

### Commit Best Practices

- Write clear, concise commit messages
- Use present tense ("add" not "added")
- Keep commits focused and atomic
- Reference issue numbers when applicable

```bash
# Reference issues
git commit -m "feat(products): add product filtering (#123)"
git commit -m "fix(cart): resolve checkout bug (closes #456)"
```

## 🔄 Pull Request Process

### 1. Update Your Branch

```bash
# Get latest changes from main
git checkout main
git pull upstream main

# Rebase your branch
git checkout feature/your-feature
git rebase main
```

### 2. Push Your Changes

```bash
git push origin feature/your-feature
```

### 3. Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] All tests passing
- [ ] No console errors

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex logic
- [ ] Updated documentation
- [ ] No breaking changes
```

### 4. Code Review

- Respond to feedback promptly
- Make requested changes
- Keep discussions professional
- Update PR based on review

### 5. Merge

Once approved:
- PR will be merged by maintainers
- Delete your feature branch
- Pull latest main for next feature

## 🎯 Areas to Contribute

### High Priority

- [ ] Product catalog implementation
- [ ] Payment gateway integration
- [ ] Order management system
- [ ] Email notifications
- [ ] Search functionality
- [ ] Admin dashboard features

### Good First Issues

- [ ] Add loading states
- [ ] Improve error messages
- [ ] Add more animations
- [ ] Write documentation
- [ ] Add input validations
- [ ] Create reusable components

### Documentation

- [ ] API endpoint documentation
- [ ] Component usage examples
- [ ] Deployment guides
- [ ] Video tutorials
- [ ] Code comments

## 🐛 Reporting Bugs

### Before Reporting

1. Check existing issues
2. Verify it's reproducible
3. Test in different environments

### Bug Report Template

```markdown
## Bug Description
Clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.0.0]

## Screenshots
Add screenshots if applicable
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description
Clear description of the feature

## Use Case
Why is this feature needed?

## Proposed Solution
How should it work?

## Alternatives
Other solutions considered

## Additional Context
Any other relevant information
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/)

## ❓ Questions?

- Check existing [issues](https://github.com/your-repo/issues)
- Read the [documentation](./README.md)
- Ask in discussions

## 🎉 Thank You!

Your contributions make this project better for everyone. We appreciate your time and effort!

---

**Happy Contributing! 🚀**
