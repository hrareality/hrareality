import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export default function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  // Respektuje systémové nastavení "omezit pohyb" — vypne posun a zpoždění, ponechá jen jemný fade.
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : direction === "up" ? 30 : 0,
      x: shouldReduceMotion ? 0 : direction === "left" ? -30 : direction === "right" ? 30 : 0,
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
      transition={{ duration: shouldReduceMotion ? 0.15 : 0.5, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
