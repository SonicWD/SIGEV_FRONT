// src/hooks/useToast.ts
interface ToastOptions {
  title: string;
  description?: string;
  variant?: string;
}

export function useToast() {
  return {
    toast: ({ title, description }: ToastOptions) => {
      // Aquí puedes usar tu sistema de notificaciones real
      alert(`${title}\n${description ?? ""}`);
    },
  };
}
