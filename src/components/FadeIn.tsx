import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
