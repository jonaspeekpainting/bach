export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 text-center px-16">
        <h1 className="text-4xl font-semibold text-black dark:text-zinc-50">
          404 - Page Not Found
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          Go Home
        </a>
      </main>
    </div>
  );
}
