import React, { useState, useEffect } from "react";

import autoAnimate from "@formkit/auto-animate";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Portal({ children, className }: Props) {
  const [portalRef, setPortal] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortal(document.getElementById("portal"));
    portalRef && autoAnimate(portalRef);
  }, [portalRef]);

  if (portalRef)
    return createPortal(
      <div
        className={`fixed inset-0 flex h-screen w-screen bg-black/70 ${className}`}
      >
        {children}
      </div>,
      portalRef
    );

  return null;
}
