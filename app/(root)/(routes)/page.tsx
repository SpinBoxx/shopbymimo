"use client";

import { useStoreModal } from "@/hooks/use-store-modals";
import { useEffect } from "react";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      Root page
    </main>
  );
}
