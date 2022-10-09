import React, { useEffect, useState } from "react";

import autoAnimate from "@formkit/auto-animate";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Modal({ children, className }: Props) {
  const [portalRef, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("portal"));
    portalRef && autoAnimate(portalRef, { duration: 300 });
  }, [portalRef]);

  if (portalRef)
    return createPortal(
      <div
        className="fixed inset-0 flex h-screen w-screen bg-black/70"
        onClick={(e) => e.stopPropagation()}
      >
        <section
          className={`container mx-auto mt-[calc(20vh)] h-80 max-w-sm rounded-xl bg-slate-300 shadow-xl sm:max-w-xl ${className}`}
        >
          {children}
        </section>
      </div>,
      portalRef
    );

  return null;
}
