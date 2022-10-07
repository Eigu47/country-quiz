import React from "react";

import Portal from "./Portal";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Modal({ children, className }: Props) {
  return (
    <Portal>
      <section
        className={`container mx-auto mt-[calc(20vh)] flex h-80 max-w-sm rounded-xl bg-slate-300 shadow-xl sm:max-w-xl ${className}`}
      >
        {children}
      </section>
    </Portal>
  );
}
