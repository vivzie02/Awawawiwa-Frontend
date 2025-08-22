import { motion } from "framer-motion";

export default function ImageCard({ src, alt, onClick, className }) {
  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden shadow-lg cursor-pointer w-80 h-80 ${className}`}
      whileHover={{ scale: 1.05}}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      onClick={onClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-300"
      />
    </motion.div>
  );
}
