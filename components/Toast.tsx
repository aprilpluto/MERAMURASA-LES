"use client";

type Props = { message: string | null };

export default function Toast({ message }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-20 left-1/2 z-[300] -translate-x-1/2 border border-gold/30 bg-ink/95 px-6 py-3 font-serif text-sm italic text-gold-light transition-all duration-500 ${
        message ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
