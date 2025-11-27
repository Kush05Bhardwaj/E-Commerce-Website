export const Footer = () => (
  <footer className="mt-12 border-t bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
      <p>&copy; {new Date().getFullYear()} MERN Commerce. All rights reserved.</p>
      <div className="flex gap-4">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
        <a href="/support">Support</a>
      </div>
    </div>
  </footer>
);

