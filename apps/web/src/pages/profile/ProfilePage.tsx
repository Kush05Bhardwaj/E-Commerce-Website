import { useAppSelector } from "@/hooks/redux";

const sections = ["Personal info", "Addresses", "Wishlist", "Orders"];

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <section className="mx-auto max-w-5xl px-6 py-10">
      <header>
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Profile</p>
        <h1 className="text-3xl font-semibold text-slate-900">{user ? user.name : "Guest"}</h1>
        <p className="text-slate-500">Manage account, view wishlist, update addresses, and track orders here.</p>
      </header>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {sections.map((section) => (
          <div key={section} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
            <h3 className="text-lg font-semibold text-slate-900">{section}</h3>
            <p className="mt-2 text-sm text-slate-500">Coming soon.</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;

