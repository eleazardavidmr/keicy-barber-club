import { motion } from 'motion/react';
import { spring } from '../../lib/physics';

// Content settles into place as it scrolls into view. With reduced motion,
// MotionConfig drops the transform and this becomes a plain cross-fade.
export default function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...props }) {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ ...spring.reveal, delay }}
      className={className}
      {...props}
    >
      {children}
    </Comp>
  );
}
