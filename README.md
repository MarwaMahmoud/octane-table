# Octane Table

A reusable generic table component built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui — featuring full localization support (English & Arabic / LTR & RTL).

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```


### Production Build

```bash
npm run build
npm start
```

---

## Project Structure

```
src/
├── app/
│   ├── api/users/route.ts          # Mock API endpoint — GET /api/users
│   ├── [locale]/
│   │   ├── layout.tsx              # Locale-aware layout with i18n provider
│   │   ├── page.tsx                # Redirects → /[locale]/users
│   │   └── users/page.tsx          # Main users page
│   ├── layout.tsx                  # Root layout (sets html lang + dir)
│   └── page.tsx                    # Root page — redirects to /en
├── components/ui/                  # shadcn/ui primitives
├── features/users/                 # User management feature module
│   ├── components/
│   │   ├── SelectionTable.tsx      # Table variant: row selection
│   │   ├── ExpandableTable.tsx     # Table variant: expandable rows
│   │   └── UsersTableTabs.tsx      # Tabs wrapper + data fetching
│   ├── columns.tsx                 # Column definitions
│   ├── expanded-content.tsx        # Expandable row sub-content
│   ├── filter-controls.tsx         # Filter configuration
│   ├── mock-data.ts                # Static mock user records
│   ├── row-actions.tsx             # Per-row action dropdown
│   ├── status-badge.tsx            # Colored status badge
│   ├── types.ts                    # User domain types
│   └── utils.ts                    # Filter logic + formatters
├── i18n/
│   ├── en.json                     # English translations
│   ├── ar.json                     # Arabic translations
│   ├── config.ts                   # Locale list + RTL helper
│   ├── routing.ts                  # next-intl routing
│   └── request.ts                  # Server-side locale resolution
└── shared/
    ├── components/
    │   ├── layout/                 # AppNav, DashboardShell, LanguageSwitcher
    │   └── table/
    │       ├── GenericTable.tsx    # Core table engine (zero domain knowledge)
    │       ├── TableToolbar.tsx    # Search + filter bar
    │       └── TablePagination.tsx # Pagination controls
    ├── hooks/
    │   ├── useTableQuery.ts        # Data fetching hook
    │   └── useTableState.ts        # Table state (filters, pagination, selection, expansion)
    └── types/table.ts              # Shared table type definitions
```

---

## Architecture & Approach

### Generic Table Engine

The core of this project is `GenericTable<T>` — a fully generic, zero-domain-knowledge table component. It accepts typed column definitions, filter controls, and render callbacks as props. All domain-specific logic (columns, filters, actions, expandable content) lives exclusively in the feature module, keeping the shared table engine clean and reusable across any data type.

```
GenericTable<T>        ← owns: state, rendering, pagination, selection/expansion
    
SelectionTable         ← owns: column defs, filter config, row actions
ExpandableTable        ← owns: column defs, filter config, expanded content
    
UsersTableTabs         ← owns: data fetching, tab layout
```

### State Management

`useTableState<T>` encapsulates all table state in a single hook:

- Filter state (search, role, status, date range)
- Pagination (current page, page size, derived slice)
- Row selection 
- Row expansion

All state is co-located and passed down as stable handler references.

### Data Fetching

`useTableQuery<T>(url)` is a lightweight fetch hook that:

- Fires on mount and URL changes
- Cancels in-flight requests via `AbortController` on cleanup
- Returns `{ data, isLoading, error }` — consumed by `UsersTableTabs`


### Localization

Localization uses [next-intl](https://next-intl-docs.vercel.app/) with `localePrefix: 'always'` routing:

| URL | Language | Direction |
|-----|----------|-----------|
| `/en/users` | English | LTR |
| `/ar/users` | Arabic | RTL |

The `<html>` element's `lang` and `dir` attributes are updated dynamically via a lightweight client component (`HtmlAttributes.tsx`). The language switcher rewrites the current path to the alternate locale, preserving the active page.


---

---

## Mock Data

The API at `GET /api/users` serves data from `src/features/users/mock-data.ts`. The source JSON structure for each user record is shown below:

```json
{
  "id": "USR-7812",
  "name": "Alice Miller",
  "email": "alice.m@email.co",
  "role": "Admin",
  "joinedDate": "2024-01-15T00:00:00Z",
  "lastActive": "2024-04-22T22:00:00Z",
  "subscription": "Active",
  "transactions": 12500.00,
  "linkedEntities": [
    {
      "entity": "Google Cloud Project: Alpha",
      "linkedEmail": "alice.m@alpha.co",
      "usageQueries": 1250,
      "lastActiveInEntity": "2024-04-22T23:00:00Z"
    }
  ]
}
```


---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15 | Framework, App Router, API routes |
| React | 19 | UI rendering |
| TypeScript | 5 | Type safety throughout |
| Tailwind CSS | 4 | Utility-first styling |
| shadcn/ui | latest | Component primitives (Badge, Button, Checkbox, Dropdown, Input, Select, Skeleton, Table, Tabs) |
| Radix UI | 1.4 | Accessible headless primitives |
| next-intl | 4 | Internationalization + routing |
| Lucide React | latest | Icons |
