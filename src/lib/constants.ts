/**
 * Application Constants
 * Centralized constants for maintainable code
 */

// Color palette
export const COLORS = {
  background: {
    primary: '#1c1c1c',
    secondary: '#1f1f1f',
    tertiary: '#222222',
    card: '#343333',
    input: '#413e3e',
  },
  button: {
    primary: '#504e4e',
    primaryHover: '#595858',
    gradient: {
      from: '#504e4e',
      to: '#595858',
    },
  },
  text: {
    primary: '#ffffff',
    secondary: '#858484',
    muted: '#9acff0',
  },
} as const;

// Spacing and sizing
export const SPACING = {
  sidebar: {
    collapsed: {
      width: 72,
      mobileWidth: 80,
    },
    expanded: {
      width: 300,
    },
  },
  sources: {
    width: 400,
  },
  input: {
    height: 53,
    maxWidth: 705,
  },
  margins: {
    container: 8, // 2 * 4px
    desktop: 16,  // 4 * 4px
  },
} as const;

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

// Animation durations
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Z-index layers
export const Z_INDEX = {
  backdrop: 30,
  sidebar: 50,
  sources: 40,
} as const;

// Asset paths
export const ASSETS = {
  icons: {
    home: '/assets/10075025782609e53c183d59e6d3013cb3ac8ac2.svg',
    library: '/assets/377d174631c34357cd26596c83370cfb1b7f85b0.svg',
    analytics: '/assets/d3deb3f73d5be574dc8ff02a4708d86ec3cf8a76.svg',
    archive: '/assets/26cb702bc3f45cbe3d2520a6757db423b98fe1a2.svg',
    search: '/assets/56079bbf4c7b65d985bb245bb2cdfd86398e6614.svg',
    newChat: '/assets/d93e2a2582f0e707f42737ad7aaaf61621474c27.svg',
    collapse: '/assets/a574039df521d686ab6965aae607a65faa7fca23.svg',
    close: '/assets/1d598a39bbd2a527534525f0c600ebeefb3638a5.svg',
    upgrade: '/assets/08c401b681a7f06ff91478a7a2727f1e2d8a5bb6.svg',
  },
  images: {
    logo: '/assets/640b20a128648296e24f7ce09fa56b28396d42ce.png',
    profile: '/assets/53bf75599706ef0e5e4456934f1b294151d93f59.png',
  },
} as const;

// Mock data
export const MOCK_CHAT_HISTORY = [
  'Daily Planner – Aug 20',
  'Resume Feedback Session', 
  'Travel Itinerary Ideas',
  'Brainstorming Startup Names',
  'Job Interview Practice',
  'Recipe Finder: Pasta Variations',
  'Drafting Email Reply',
  'Workout Routine Setup',
  'Wellness Check-in',
  'Quick Q&A – Python Errors',
  'Math Help: Algebra Basics',
] as const;
