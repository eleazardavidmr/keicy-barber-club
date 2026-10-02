// "Keicy" set in a modern gothic, with "Barber Club" tracked wide underneath — echoing the sign on the wall.
export default function Wordmark({ size = 'sm', className = '' }) {
  if (size === 'sm') {
    return (
      <span className={`inline-flex items-baseline gap-2 leading-none ${className}`}>
        <span className="font-display text-[1.65rem] font-semibold tracking-[-0.01em] text-white">Keicy</span>
        <span className="hidden text-[0.6rem] font-semibold tracking-[0.32em] text-zinc-400 uppercase sm:inline">
          Barber Club
        </span>
      </span>
    );
  }
  return (
    <span className={`flex flex-col items-center leading-none ${className}`}>
      <span className="display-xl text-white">Keicy</span>
      <span className="mt-[0.9em] pl-[0.5em] text-[clamp(0.7rem,1.6vw,0.95rem)] font-semibold tracking-[0.5em] text-zinc-300 uppercase">
        Barber Club
      </span>
    </span>
  );
}
