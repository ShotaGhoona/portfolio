export function GridOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none">
        <div className="max-w-6xl mx-auto h-full grid grid-cols-12 gap-0">
        {Array.from({ length: 12 }).map((_, index) => (
            <div 
            key={index} 
            className="h-full"
            style={{ 
                borderRight: index < 11 ? `1px solid var(--color-border-primary)` : 'none',
                opacity: 0.3
            }}
            ></div>
        ))}
        </div>
    </div>
  );
}