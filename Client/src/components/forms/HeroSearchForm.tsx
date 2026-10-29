const HeroSearchForm = () => {
  return (
    <div className="h-full rounded-3xl border border-white/60 bg-white p-7 text-slate-900 shadow-2xl shadow-black/20 md:p-9">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Get involved
      </p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-slate-900 font-primary">
        Be part of the change
      </h2>
      <p className="mt-2 text-sm leading-6 text-slate-600 font-secondary">
        Share a few details and help us bring more people together for good.
      </p>
      <div className="mt-6 space-y-3">
        <input
          type="text"
          aria-label="Full name"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition placeholder:font-secondary placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="Full Name"
        />
        <input
          type="text"
          aria-label="Email address"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition placeholder:font-secondary placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="Email Address"
        />
        <input
          type="text"
          aria-label="Phone number"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition placeholder:font-secondary placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="Phone Number"
        />
        <textarea
          aria-label="Message"
          className="h-28 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 transition placeholder:font-secondary placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10"
          placeholder="Message"
        />
      </div>
      <div className="mt-5">
        <button
          type="button"
          className="w-full rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Join our community
        </button>
      </div>
    </div>
  );
};

export default HeroSearchForm;
