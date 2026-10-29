import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Sparkles } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const UpdateNotificationToast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#241A16] text-[#F7F4EE] px-5 py-3.5 rounded-xl shadow-2xl border border-[#3E2D26]/60 max-w-md"
        >
          <div className="w-8 h-8 rounded-lg bg-[#4A5D32] text-[#F7F4EE] flex items-center justify-center shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div className="flex-1 text-sm">
            <div className="font-medium text-[#F7F4EE] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A1B881]" />
              Portfolio Updated
            </div>
            <p className="text-xs text-[#D8CFBF] mt-0.5">{message}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Dismiss notification"
            className="text-[#B5A895] hover:text-[#F7F4EE] p-1 transition-colors text-xs"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
