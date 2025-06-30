interface SectionTitleProps {
  sectionNumber: string;
  sectionTitle: string;
  line1: string;
  line2: string;
}

export function SectionTitle({ sectionNumber, sectionTitle, line1, line2 }: SectionTitleProps) {
  return (
    <div 
    className="col-span-1 md:col-span-3 px-4 md:px-8 pb-8 md:pb-0 md:border-r"
    style={{ borderColor: 'var(--color-border-secondary)' }}
  >
    <div className="md:sticky md:top-40">
      <div 
        className="font-mono font-black text-xl md:text-2xl mb-2"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {sectionNumber}
      </div>
      <h2 
        className="font-mono font-black text-lg md:text-xl mb-4"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {sectionTitle}
      </h2>
      <div 
        className="font-mono text-xs mb-6 md:mb-0"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <div>{`// ${line1}`}</div>
        <div>{`// ${line2}`}</div>
      </div>
    </div>
  </div>
  );
}