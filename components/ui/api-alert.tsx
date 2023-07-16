"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, ServerIcon } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface Props {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<Props["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<Props["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({ title, description, variant = "public" }: Props) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to the clipboard.");
  };

  return (
    <Alert>
      <ServerIcon className="w-4 h-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title} <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-1 py-1 font-mono text-sm font-semibold">
          {description}
        </code>
        <Button size="icon" variant="outline" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
