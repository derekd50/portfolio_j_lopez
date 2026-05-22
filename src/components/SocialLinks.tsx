interface SocialLinksProps {
  twitter?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

export default function SocialLinks({
  twitter,
  linkedin,
  github,
  email,
}: SocialLinksProps) {
  const links = [
    { label: "Twitter", url: twitter, icon: "𝕏" },
    { label: "LinkedIn", url: linkedin, icon: "in" },
    { label: "GitHub", url: github, icon: "⚙" },
  ];

  return (
    <div className="flex gap-4 items-center">
      {links.map(
        (link) =>
          link.url && (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors text-slate-200 text-sm font-semibold"
              title={link.label}
            >
              {link.icon}
            </a>
          )
      )}
      {email && (
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 transition-colors text-slate-200 text-sm font-semibold"
          title="Email"
        >
          ✉
        </a>
      )}
    </div>
  );
}
