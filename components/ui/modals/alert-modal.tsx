"use client";

import { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "../button";
import Spinner from "../spinner";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal = ({ loading, open, onClose, onConfirm }: Props) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure ?"
      description="This action cannot be undone"
      isOpen={open}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant="destructive" onClick={onConfirm}>
          {loading ? <Spinner /> : "Continue"}
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
