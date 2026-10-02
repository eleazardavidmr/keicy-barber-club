import Reveal from './Reveal';

export default function SectionHeader({ eyebrow, title, children, align = 'left', className = '' }) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal as="p" className="eyebrow text-led">
        {eyebrow}
      </Reveal>
      <Reveal as="h2" delay={0.05} className="display-lg mt-5 text-balance text-white">
        {title}
      </Reveal>
      {children && (
        <Reveal
          as="p"
          delay={0.1}
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-zinc-400 md:text-xl ${centered ? 'mx-auto' : ''}`}
        >
          {children}
        </Reveal>
      )}
    </div>
  );
}
