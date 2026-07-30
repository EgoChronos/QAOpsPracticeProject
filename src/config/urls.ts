/**
 * Centralised URL configuration.
 *
 * All URLs in the framework should be derived from this module.
 * Never hardcode URLs in tests or page objects — always import from here.
 *
 * Design: URLs are built from the env config, making environment switching
 * a single-variable change in .env rather than a codebase-wide find/replace.
 */



// ---------------------------------------------------------------------------
// UI Routes
// ---------------------------------------------------------------------------
export const UIRoutes = {
  home: '/',
  admin: '/admin',
  adminRooms: '/admin/rooms',
  adminReport: '/admin/report',
  adminBranding: '/admin/branding',
  adminMessages: '/admin/messages',
} as const;

// ---------------------------------------------------------------------------
// API Endpoints
// ---------------------------------------------------------------------------
export const ApiEndpoints = {
  // Auth
  auth: '/auth',

  // Bookings
  booking: '/booking',
  bookingById: (id: number | string): string => `/booking/${id}`,

  // Rooms
  room: '/room',
  roomById: (id: number | string): string => `/room/${id}`,

  // Branding
  branding: '/branding',

  // Health
  ping: '/ping',

  // Messages
  message: '/message',
  messageById: (id: number | string): string => `/message/${id}`,
} as const;

export type UIRoute = (typeof UIRoutes)[keyof typeof UIRoutes];
