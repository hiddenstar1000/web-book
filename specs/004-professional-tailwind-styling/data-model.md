# Data Model: UI Design Tokens & Theme Mapping

## Theme Tokens & Component Mapping

| Component | Element | Tailwind Tokens | Visual Purpose |
|-----------|---------|-----------------|----------------|
| `UsersPage` | Main Background | `min-h-screen bg-slate-950 text-slate-100` | Full-screen deep slate backdrop |
| `UsersPage` | Title Gradient | `bg-gradient-to-r from-slate-100 via-slate-300 to-indigo-400 bg-clip-text text-transparent` | Eye-catching metallic header text |
| `UserTable` | Table Container | `border border-slate-800 bg-slate-900/40 backdrop-blur-md rounded-xl shadow-2xl` | Elevated glassmorphism container |
| `UserTable` | Header Row | `bg-slate-950/60 text-slate-400 uppercase tracking-wider text-xs` | Clean structured column headers |
| `UserTable` | Row Hover | `hover:bg-slate-800/40 transition-colors` | Interactive row highlight |
| `UserFormModal` | Modal Card | `bg-slate-900 border border-slate-800 shadow-2xl rounded-2xl` | High-priority overlay dialog |
| `UserFormModal` | Inputs | `bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500` | Accessible input controls |
| `UserSearchFilter` | Search Bar | `bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md` | Integrated toolbar container |
