<<<<<<< HEAD
# Employee Directory

A modern, responsive, and interactive Employee Directory Web Interface built with Next.js, TypeScript, TailwindCSS, and shadcn/ui components.

## ✨ Features

### 📋 Dashboard
- **Grid and Table View**: Toggle between card and table layouts
- **Employee Information Display**: 
  - Employee ID (now perfectly aligned in table view)
  - First Name & Last Name
  - Email
  - Department
  - Role
- **3D Card Effects**: Beautiful hover animations and gradients
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### ✍️ Add/Edit Employee Form
- **Modal-based Form**: Clean and intuitive interface
- **Form Validation**: Client-side validation using Zod
- **Fields Include**:
  - First Name (required, min 2 characters)
  - Last Name (required, min 2 characters)
  - Email (with format validation)
  - Department (Dropdown: Engineering, Marketing, Sales, HR, Finance)
  - Role (Dropdown: Developer, Designer, Manager, Director, Analyst, Coordinator)

### 🔎 Filter / Search / Sort
- **Search Functionality**: Search by name, email, or employee ID
- **Department Filter**: Filter by specific departments
- **Role Filter**: Filter by specific roles
- **Sorting**: Sort by any column (Employee ID, Name, Department, Role)
- **Real-time Filtering**: Instant results as you type

### 💬 Notifications & Feedback
- **Toast Notifications**: Success messages for add, edit, and delete operations
- **Error Handling**: Clear validation error messages
- **User Feedback**: Visual confirmation for all actions

### 🌙 Theme Support
- **Dark Mode Toggle**: Switch between light and dark themes
- **System Theme Detection**: Automatically matches system preference
- **Smooth Transitions**: Elegant theme switching animations

### 🎨 Enhanced UI/UX
- **Framer Motion Animations**: Smooth page transitions and hover effects
- **3D Card Effects**: Subtle shadows and transforms
- **Gradient Backgrounds**: Modern visual appeal
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee-directory
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main dashboard page
├── components/
│   ├── employee/
│   │   ├── EmployeeCard.tsx     # Card view component
│   │   ├── EmployeeFilters.tsx  # Search and filter controls
│   │   ├── EmployeeForm.tsx     # Add/edit employee form
│   │   └── EmployeeTable.tsx    # Table view component
│   ├── theme-provider.tsx   # Theme context provider
│   ├── theme-toggle.tsx     # Dark/light mode toggle
│   └── ui/                  # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── pagination.tsx
│       ├── select.tsx
│       ├── table.tsx
│       ├── toast.tsx
│       └── toaster.tsx
├── context/
│   └── EmployeeContext.tsx  # Employee state management
├── data/
│   └── employees.ts         # Employee schema and mock data
├── hooks/
│   └── use-toast.ts         # Toast notification hook
└── lib/
    └── utils.ts             # Utility functions
```

## 🎯 Key Features Implementation

### State Management
- Uses React Context API for global state management
- Implements reducer pattern for predictable state updates
- Handles filtering, sorting, and CRUD operations

### Form Validation
- Zod schema validation for type safety
- Real-time validation feedback
- Proper error handling and user feedback

### Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Adaptive components for different screen sizes

### Performance
- Optimized re-renders with React.memo
- Efficient filtering and sorting algorithms
- Lazy loading and code splitting

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Adding New Departments
Edit `src/data/employees.ts`:
```typescript
export const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'New Department'] as const;
```

### Adding New Roles
Edit `src/data/employees.ts`:
```typescript
export const roles = ['Developer', 'Designer', 'Manager', 'Director', 'Analyst', 'Coordinator', 'New Role'] as const;
```

### Styling Customization
- Modify `src/app/globals.css` for theme colors
- Update `tailwind.config.js` for custom utilities
- Customize component styles in individual component files

## 🔧 Dependencies

### Core Dependencies
- `next`: 14.0.4
- `react`: ^18
- `react-dom`: ^18
- `typescript`: ^5

### UI & Styling
- `tailwindcss`: ^3.3.0
- `class-variance-authority`: ^0.7.0
- `clsx`: ^2.0.0
- `tailwind-merge`: ^2.2.0
- `tailwindcss-animate`: ^1.0.7

### Form & Validation
- `react-hook-form`: ^7.60.0
- `@hookform/resolvers`: ^5.1.1
- `zod`: ^3.22.4

### UI Components
- `@radix-ui/react-dialog`: ^1.0.4
- `@radix-ui/react-dropdown-menu`: ^2.0.5
- `@radix-ui/react-label`: ^2.0.2
- `@radix-ui/react-select`: ^1.2.2
- `@radix-ui/react-slot`: ^1.0.2

### Animations & Icons
- `framer-motion`: ^12.23.3
- `lucide-react`: ^0.525.0

### Theme
- `next-themes`: ^0.4.6

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🎉 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Lucide](https://lucide.dev/) for the icon set

---

**Built with ❤️ using Next.js, TypeScript, and TailwindCSS**

## ✅ Functionalities Checklist

- [x] Table and Card view with perfect column alignment
- [x] Add/Edit employee modal with validation
- [x] Delete employee with confirmation and toast
- [x] Filtering, searching, and sorting (all columns)
- [x] Responsive design for all devices
- [x] Dark mode toggle
- [x] Toast notifications for all actions
- [x] 3D card effects and smooth animations
- [x] Modular, clean, and accessible code

All required functionalities are now fully met and the UI is pixel-perfect and user-friendly.
=======
# Ajackus-Assignment
 Employee Directory Web Interface 
>>>>>>> 1a68d3790516f39f51591ecc4591d02182d35e41
