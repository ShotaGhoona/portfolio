import Link from "next/link";

interface ReadMoreButtonProps {
  href: string;
  comment: string;
  buttonText?: string;
  className?: string;
}

export function ReadMoreButton({ href, comment, buttonText="git log --show-more", className }: ReadMoreButtonProps) {
  return (
    <div className={className}>
      <Link 
        href={href} 
        className="font-mono inline-block font-bold text-sm px-6 py-3 transition-all duration-200 flex items-center gap-2"
        style={{ 
            color: 'var(--color-text-primary)',
            border: `1px solid var(--color-text-primary)`,
            backgroundColor: 'transparent'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-text-primary)';
            e.currentTarget.style.color = 'var(--color-bg-primary)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--color-text-primary)';
        }}
        >
        <span>{buttonText}</span>
        </Link>
        <div 
        className="font-mono text-xs mt-2"
        style={{ color: 'var(--color-text-tertiary)' }}
        >
        {comment}
        </div>
    </div>
    );
}