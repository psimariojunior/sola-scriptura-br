import { motion } from 'framer-motion';

export function DailyChallengeDot() {
  return (
    <motion.span
      className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary"
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.2, 1] }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-primary/50"
        animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
      />
    </motion.span>
  );
}
