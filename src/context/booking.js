import { createContext, useContext } from 'react';

// Kept apart from the provider so editing the sheet never recreates the context.
export const BookingContext = createContext(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>');
  return ctx;
}
