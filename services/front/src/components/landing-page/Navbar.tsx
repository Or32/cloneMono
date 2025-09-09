import Link from "next/link";

function CubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-foreground">
      <path
        d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 6.7 3.7L12 12 5.3 8.0 12 4.3Zm-7 5.6L11 14v6.9l-6-3.3V9.9Zm14 0V17.6l-6 3.3V14l6-3.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function NavBar() {
  return (
    <header>
      <div className="mx-auto max-w-6xl px-4">
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <CubeIcon />
            <span className="text-base font-semibold">contxthub</span>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Docs</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Product</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">40k+</Link>
            <div className="size-8 rounded-full bg-muted" />
          </div>
        </nav>
      </div>
    </header>
  );
}
