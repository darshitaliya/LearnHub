---
name: Luminous Learning
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#684000'
  on-tertiary: '#ffffff'
  tertiary-container: '#885500'
  on-tertiary-container: '#ffd4a4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-xs: 4px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system is engineered for a premium, forward-thinking educational experience. It balances the precision of high-end SaaS (like Linear or Stripe) with the approachability required for student engagement. The aesthetic is "Futuristic Academic"—clean, structured, and deep.

The visual direction utilizes **Glassmorphism** and **Tonal Depth** to create a sense of focused immersion. Interfaces should feel like a clear lens through which information is viewed, using subtle blurs and translucent layers to maintain context. The emotional response is one of clarity, progress, and professional empowerment.

## Colors
This design system employs a vibrant, high-contrast palette optimized for readability and cognitive retention. 

- **Primary (Indigo):** Used for main actions, active states, and brand recognition.
- **Secondary (Cyan):** Used for progress indicators, secondary highlights, and success-adjacent metaphors.
- **Accent (Amber):** Reserved for achievements, certifications, and urgent attention-drawing elements (e.g., "Live Class").
- **Glass Effects:** Apply a `backdrop-filter: blur(12px)` to surfaces using the glass gradients to ensure content separation without losing spatial context.

## Typography
The typography is centered on **Inter** for its systematic clarity and high legibility across varied screen sizes. To introduce a technical, "SaaS" edge, **Geist** is used for labels and metadata to provide a precise, developer-tool aesthetic.

Maintain a vertical rhythm by adhering to the defined line heights. Large headlines should use tighter letter spacing to maintain a cohesive visual block, while small labels use expanded tracking for better readability at small scales.

## Layout & Spacing
This design system follows a **12-column fluid grid** for desktop and a **single-column fluid layout** for mobile. 

- **Layout Model:** Use a "Surface-and-Inset" approach. Large sections of content are housed in cards or "pods" with consistent padding.
- **Rhythm:** Spacing follows an 8px geometric progression. Use `stack-md` for the standard gap between related content blocks and `stack-lg` for section transitions.
- **Breakpoints:** 
  - Mobile: < 768px (16px margins)
  - Tablet: 768px - 1024px (24px margins)
  - Desktop: > 1024px (40px margins, 1280px max-width)

## Elevation & Depth
Depth is created through **Layered Glassmorphism** rather than traditional heavy shadows.

- **Level 1 (Base):** The background color (#F8FAFC) or a very subtle gradient.
- **Level 2 (Cards):** White background at 80% opacity with a 1px inner stroke of white (10% opacity). A "Soft Ambient" shadow: `0 4px 20px rgba(0,0,0,0.04)`.
- **Level 3 (Modals/Popovers):** Higher opacity glass with a more pronounced shadow: `0 12px 40px rgba(0,0,0,0.08)`.
- **Transitions:** All elevation changes (hover states) should use a `cubic-bezier(0.4, 0, 0.2, 1)` timing function over 200ms to mimic physical smoothness.

## Shapes
Shapes are "Soft-Modern." The standard radius is 8px (0.5rem), providing a professional yet approachable feel. 

- **Interactive Elements:** Buttons and input fields use the standard `rounded` (8px).
- **Containers:** Dashboard cards and content wrappers use `rounded-lg` (16px).
- **Specialty:** Progress bars and status chips use `rounded-full` (9999px) to differentiate them from actionable containers.

## Components
- **Buttons:** Primary buttons use the `oceanic` gradient with a subtle drop shadow of the primary color. Secondary buttons use a transparent background with a 1px border. Transitions involve a slight "lift" (y-axis shift) on hover.
- **Input Fields:** Use a subtle grey background (#F1F5F9) that transitions to white on focus with an Indigo ring. The label should be in the `label-caps` style.
- **Cards:** The central component for courses. Cards feature a 1px border (#E2E8F0) and transition to a more pronounced glass effect on hover.
- **Progress Indicators:** Use the Secondary (Cyan) color in a thick, rounded-full track. For completed modules, transition the track color to Success (Emerald).
- **Chips/Badges:** Small, low-saturation backgrounds (e.g., light indigo) with high-saturation text. Used for "Difficulty Level" or "Subject."
- **Navigation:** A sidebar with a blurred background and active states indicated by a vertical "glow" bar on the leading edge of the menu item.