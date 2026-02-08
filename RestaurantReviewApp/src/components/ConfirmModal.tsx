import { createContext, useContext, useState} from 'react'
import type { ReactNode } from 'react'

// Types

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

type ConfirmOptionsType = {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

// Context + Hook

const ConfirmContext = createContext<ConfirmOptionsType | null>(null);

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error('useConfirm must be used within a ConfirmProvider');
    }
    return context;
}

// Provider

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
    const [options, setOptions] = useState<ConfirmOptions | null>(null);
    const [resolver, setResolver] = useState<((value: boolean) => void) | null>(null);

    const confirm = (options: ConfirmOptions) =>
        new Promise<boolean>((resolve) => {
            setOptions(options);
            setResolver(() => resolve);
        });

        const close = (result: boolean) => {
            resolver?.(result);
            setOptions(null);
            setResolver(null);
        };

    return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}

      <ConfirmModal
        open={!!options}
        options={options}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmContext.Provider>
  );
};

// Modal

function ConfirmModal({ open, options, onConfirm, onCancel }: { 
    open: boolean; options: ConfirmOptions | null; onConfirm: () => void; onCancel: () => void }) {
        if (!open || !options) return null;

        const { title = "Are you sure?", message, confirmText = 'Confirm', cancelText = 'Cancel', danger } = options;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onCancel}
            />

            {/* Modal */}
            <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="text-lg font-semibold text-gray-900">
                {title}
                </h2>

                <p className="mt-2 text-sm text-gray-600">
                {message}
                </p>

                <div className="mt-6 flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                    {cancelText}
                </button>

                <button
                    onClick={onConfirm}
                    className={`rounded-md px-4 py-2 text-sm font-medium text-white cursor-pointer
                    ${
                        danger
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    `}
                >
                    {confirmText}
                </button>
                </div>
            </div>
            </div>
        );
    }