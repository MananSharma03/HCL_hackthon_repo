# Healthcare Wellness & Preventive Care Portal - Design Guidelines

## Design Approach

**Reference-Based Healthcare Design** drawing from modern healthcare portals (MyChart, Apple Health, Headspace Health) combined with Material Design principles for clarity and trust.

**Core Principles:**
- Clinical clarity with warmth
- Data-first but approachable
- Trust through transparency
- Accessibility as foundation

---

## Typography System

**Font Families:**
- Primary: Inter (via Google Fonts) - body text, forms, data
- Display: Poppins (via Google Fonts) - headings, dashboard cards

**Hierarchy:**
- Hero Headlines: Poppins Bold, text-5xl (48px)
- Page Titles: Poppins SemiBold, text-3xl (30px)
- Section Headers: Poppins Medium, text-2xl (24px)
- Card Titles: Inter SemiBold, text-lg (18px)
- Body Text: Inter Regular, text-base (16px)
- Metadata/Labels: Inter Medium, text-sm (14px)
- Captions: Inter Regular, text-xs (12px)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, and 16 consistently
- Component padding: p-4 to p-8
- Section spacing: py-12 to py-16
- Card gaps: gap-6
- Form field spacing: space-y-4

**Grid Structure:**
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Patient lists: Single column with dividers
- Public info: grid-cols-1 md:grid-cols-2 for topic cards

**Containers:**
- Auth pages: max-w-md (centered)
- Dashboards: max-w-7xl
- Content pages: max-w-6xl

---

## Component Library

### Navigation
**Main Header:**
- Fixed top navigation with logo left, nav links center, profile/notifications right
- Height: h-16
- Shadow: shadow-sm on scroll
- Mobile: Hamburger menu

**Dashboard Sidebar (Provider View):**
- Width: w-64
- Collapsible on mobile
- Nav items with icons (Heroicons)

### Authentication Pages
**Login/Register Cards:**
- Centered card with max-w-md
- Elevated with shadow-lg
- Rounded corners: rounded-xl
- Padding: p-8
- Form inputs with floating labels
- Primary CTA button: full width, h-12
- Secondary links: text-sm, underline on hover

### Dashboard Cards
**Wellness Goal Cards:**
- Rounded: rounded-lg
- Shadow: shadow-md
- Padding: p-6
- Progress bars with rounded-full
- Large metric numbers: text-4xl, font-bold
- Target vs actual clearly labeled
- Icon indicators (Heroicons: check-circle, exclamation-circle)

**Sleep Chart Card:**
- Graph visualization (use Chart.js placeholder)
- Height: h-64
- Gradient background under line chart

**Reminder Cards:**
- Border-left accent (4px wide) indicating urgency
- Compact layout with icon, title, date
- Hover: subtle scale transform

### Provider Dashboard
**Patient List Table:**
- Alternating row backgrounds for readability
- Sticky header row
- Status badges: rounded-full px-3 py-1
- Clickable rows with hover state
- Compliance indicators: green (met), red (missed), yellow (upcoming)

### Forms
**Profile Management:**
- Two-column layout on desktop: grid-cols-1 md:grid-cols-2
- Label above input, text-sm font-medium
- Input fields: h-12, rounded-lg, border-2
- Focus state: ring-2 ring-offset-2
- Required field asterisks in red
- Save/Cancel buttons: right-aligned

### Public Pages
**Health Information Grid:**
- Topic cards: 2-column on md, 3-column on lg
- Each card: aspect-square or aspect-video
- Title overlay on image with gradient backdrop
- "Read More" link: underline with arrow icon

---

## Data Visualization

**Progress Bars:**
- Height: h-3
- Rounded: rounded-full
- Background track: subtle gray
- Fill: gradient from primary to secondary
- Percentage label: right-aligned

**Metrics Display:**
- Large number with unit below
- Comparison to goal (e.g., "60% of goal")
- Trend indicator (up/down arrow with percentage)

---

## Icons

Use **Heroicons** (outline for navigation, solid for status)
- Steps: FootprintIcon or WalkIcon
- Sleep: MoonIcon
- Active Time: FireIcon or HeartIcon
- Reminders: BellIcon
- Profile: UserCircleIcon
- Provider: UserGroupIcon
- Health Info: InformationCircleIcon
- Success: CheckCircleIcon
- Warning: ExclamationTriangleIcon

---

## Images

**Login/Register Page:**
- Background: Soft abstract gradient (blues and greens suggesting health/wellness)
- OR medical professional imagery (diverse healthcare workers)
- Placement: Full viewport background with overlay, auth card floats on top with blurred backdrop (backdrop-blur-lg)

**Public Health Information Page:**
- Hero section: High-quality image of healthcare setting or diverse people
- Topic cards: Each has relevant image (COVID testing, flu shot, mental health support)
- Images: aspect-video with object-cover
- Buttons on hero: Blurred background (backdrop-blur-md bg-white/20)

**Dashboard:**
- Optional: Small avatar/profile photo in header (rounded-full, w-10 h-10)
- Health tip card: Small illustrative icon or image (h-16 w-16)
- No large hero images on dashboards - focus on data

---

## Accessibility

- All form inputs have visible labels
- Color contrast meets WCAG AA (4.5:1 for text)
- Focus indicators: 2px ring with offset
- Status communicated with icons AND text
- Table headers with scope attributes
- Skip navigation link
- Keyboard navigable throughout

---

## Responsive Behavior

**Mobile (base):**
- Single column layouts
- Stacked navigation (hamburger)
- Full-width cards
- Larger touch targets (min-h-12)

**Tablet (md: 768px):**
- Two-column grids appear
- Sidebar becomes expandable drawer
- Table switches to card view for patient lists

**Desktop (lg: 1024px):**
- Full multi-column layouts
- Persistent sidebar navigation
- Horizontal dashboard layout maximizes screen real estate

---

This design creates a professional, trustworthy healthcare experience that balances clinical precision with approachable warmth, ensuring patients and providers can efficiently manage wellness goals while maintaining strict security and privacy standards.