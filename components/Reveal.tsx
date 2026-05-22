import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: string;
};

export default function Reveal({ children, className = "", delay }: Props) {
  return (
    <div
      data-reveal
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
}
