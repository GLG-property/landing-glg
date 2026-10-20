import Link from "next/link";

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;
const LINK = /^\[([^\]]+)\]\(([^)\s]+)\)$/;

/**
 * Randează textul inline al articolelor: **bold** și [text](href).
 * Linkurile interne folosesc next/link, cele externe se deschid în tab nou.
 */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const m = LINK.exec(part);
        if (m) {
          const [, label, href] = m;
          const internal = href.startsWith("/") || href.startsWith("#");
          const cls =
            "font-medium text-brand underline decoration-brand/30 underline-offset-2 transition-colors duration-200 hover:text-brand-600";
          return internal ? (
            <Link key={i} href={href} className={cls}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
