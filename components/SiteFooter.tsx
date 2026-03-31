type SiteFooterProps = {
  depopUrl: string;
  email: string;
  uiforgeUrl: string;
};

export function SiteFooter({ depopUrl, email, uiforgeUrl }: SiteFooterProps) {
  return (
    <footer className="mt-14 border-t border-black/10 pt-8 text-sm text-[#333]/85">
      <div
        className={[
          "relative rounded-2xl border border-black/10 bg-white/35 px-4 py-4 shadow-[0_14px_40px_-28px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-5",
          "after:pointer-events-none after:absolute after:inset-[-8px] after:rounded-[22px] after:opacity-[0.45] after:content-['']",
          "after:bg-[radial-gradient(22px_16px_at_18%_20%,rgba(0,0,0,0.08),transparent_60%),radial-gradient(22px_16px_at_82%_24%,rgba(0,0,0,0.07),transparent_60%),radial-gradient(26px_18px_at_50%_88%,rgba(0,0,0,0.06),transparent_62%)]",
        ].join(" ")}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={depopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-2 py-1 font-bold tracking-wide text-[#141414]/85 transition hover:bg-white/40 hover:text-[#141414]"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Depop
            </a>
            <a
              href={`mailto:${email}`}
              className="rounded-lg px-2 py-1 font-bold tracking-wide text-[#141414]/85 transition hover:bg-white/40 hover:text-[#141414]"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Email
            </a>
            <a
              href={uiforgeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg px-2 py-1 font-bold tracking-wide text-[#141414]/85 transition hover:bg-white/40 hover:text-[#141414]"
              style={{ fontFamily: "var(--font-handmade), var(--font-fraunces), serif" }}
            >
              Powered by UiForge
            </a>
          </div>

          <p className="text-[#333]/75">
            © {new Date().getFullYear()} Sisterle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

