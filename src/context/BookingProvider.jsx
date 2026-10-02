import { useCallback, useMemo, useState } from 'react';
import { BookingContext } from './booking';
import BookingSheet from '../components/BookingSheet';

export default function BookingProvider({ children }) {
  const [state, setState] = useState({ open: false, serviceId: null });

  const openBooking = useCallback((serviceId = null) => setState({ open: true, serviceId }), []);
  const closeBooking = useCallback(() => setState((s) => ({ ...s, open: false })), []);

  const value = useMemo(() => ({ openBooking, closeBooking }), [openBooking, closeBooking]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingSheet open={state.open} serviceId={state.serviceId} onClose={closeBooking} />
    </BookingContext.Provider>
  );
}
