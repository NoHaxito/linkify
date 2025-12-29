import { useState } from "react";
import { toast } from "sonner";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string, message = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(message);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return { copied, copy };
}
