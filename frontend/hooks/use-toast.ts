import { toast as sonnerToast, type ToastT } from "sonner";

type ToastProps = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
};

export function useToast() {
  const toast = ({
    title,
    description,
    variant = "default",
    duration = 5000,
    action,
  }: ToastProps) => {
    const options: Partial<ToastT> = {
      duration,
      style: {
        background:
          variant === "destructive"
            ? "#f44336"
            : variant === "success"
            ? "#4caf50"
            : "#333",
        color: "#fff",
        border: "none",
      },
    };

    if (action) {
      options.action = {
        label: action.label,
        onClick: action.onClick,
      };
    }

    return sonnerToast(title, {
      ...options,
      description,
    });
  };

  return { toast };
}
