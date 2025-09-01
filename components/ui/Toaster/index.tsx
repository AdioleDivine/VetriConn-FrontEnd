"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import styles from "./index.module.scss";

interface Toast {
  id: number;
  type?: "success" | "error" | "loading";
  title?: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

interface ToasterContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToasterContext = createContext<ToasterContextType | undefined>(undefined);

export const useToaster = () => {
  const ctx = useContext(ToasterContext);
  if (!ctx) throw new Error("useToaster must be used within ToasterProvider");
  return ctx;
};

export const ToasterProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const showToast = (toast: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
    setTimeout(() => setToasts((prev) => prev.slice(1)), 3500);
  };
  return (
    <ToasterContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toaster}>
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${styles.toast} ${styles[toast.type || "success"]}`}
          >
            {toast.title && <div className={styles.title}>{toast.title}</div>}
            {toast.description && (
              <div className={styles.description}>{toast.description}</div>
            )}
            {toast.action && (
              <button className={styles.action} onClick={toast.action.onClick}>
                {toast.action.label}
              </button>
            )}
          </div>
        ))}
      </div>
    </ToasterContext.Provider>
  );
};
