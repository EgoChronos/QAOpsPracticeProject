/**
 * UI and API message constants.
 *
 * Centralise expected error messages, success messages, and labels.
 * If the application changes a message string, update here — tests update automatically.
 */

export const Messages = {
  // -------------------------------------------------------------------------
  // Auth messages
  // -------------------------------------------------------------------------
  auth: {
    loginSuccess: 'Welcome',
    loginError: 'Bad credentials',
    logoutSuccess: 'Sign in',
  },

  // -------------------------------------------------------------------------
  // Contact form messages
  // -------------------------------------------------------------------------
  contact: {
    successTitle: 'Thanks for getting in touch',
    successBody: 'We\'ll get back to you about',
    errorNameRequired: 'Name may not be blank',
    errorEmailRequired: 'Email may not be blank',
    errorPhoneRequired: 'Phone may not be blank',
    errorPhoneSize: 'Phone must be between 11 and 21 characters',
    errorSubjectRequired: 'Subject may not be blank',
    errorSubjectSize: 'Subject must be between 5 and 100 characters',
    errorMessageRequired: 'Message may not be blank',
    errorMessageSize: 'Message must be between 20 and 2000 characters',
  },

  // -------------------------------------------------------------------------
  // Booking messages
  // -------------------------------------------------------------------------
  booking: {
    createdSuccess: 'Booking Successful!',
    deletedSuccess: 'Booking deleted',
    conflictError: 'Sorry, this room is already booked',
  },

  // -------------------------------------------------------------------------
  // API messages
  // -------------------------------------------------------------------------
  api: {
    notFound: 'Not Found',
    forbidden: 'Forbidden',
    badRequest: 'Bad Request',
    unauthorized: 'Unauthorized',
  },
} as const;
