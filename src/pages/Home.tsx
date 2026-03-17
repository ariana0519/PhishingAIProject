export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent sm:text-5xl">
            Welcome to PhishShieldAI
          </h1>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <div className="rounded-xl border border-slate-600/60 bg-gradient-to-br from-slate-800/90 to-indigo-900/50 p-6 shadow-lg shadow-black/30 min-w-[200px] text-left backdrop-blur-sm">
              <h2 className="font-semibold text-slate-100 mb-2">Dashboard</h2>
              <p className="text-sm text-slate-400">View and manage your content.</p>
            </div>
            <div className="rounded-xl border border-slate-600/60 bg-gradient-to-br from-slate-800/90 to-violet-900/50 p-6 shadow-lg shadow-black/30 min-w-[200px] text-left backdrop-blur-sm">
              <h2 className="font-semibold text-slate-100 mb-2">Settings</h2>
              <p className="text-sm text-slate-400">Configure your preferences.</p>
            </div>
          </div>

          <section className="pt-16 text-left">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Existing apps being monitored
            </h2>
            <div className="rounded-xl border border-slate-600/60 bg-gradient-to-br from-slate-800/90 to-slate-900/90 shadow-lg shadow-black/30 overflow-hidden backdrop-blur-sm">
              <ul className="divide-y divide-slate-700">
                {[
                  { name: "Banking Portal", status: "Active", lastCheck: "2 min ago" },
                  { name: "Email Service", status: "Active", lastCheck: "5 min ago" },
                  { name: "Cloud Storage", status: "Active", lastCheck: "8 min ago" },
                  { name: "HR Portal", status: "Active", lastCheck: "12 min ago" },
                ].map((app) => (
                  <li key={app.name} className="flex items-center justify-between px-6 py-4 hover:bg-slate-700/40 transition-colors">
                    <div>
                      <p className="font-medium text-slate-100">{app.name}</p>
                      <p className="text-sm text-slate-500">Last checked {app.lastCheck}</p>
                    </div>
                    <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400">
                      {app.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="pt-12 text-left">
            <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              Alerts
            </h2>
            <div className="rounded-xl border border-slate-600/60 bg-gradient-to-br from-slate-800/90 to-slate-900/90 shadow-lg shadow-black/30 overflow-hidden backdrop-blur-sm">
              <ul className="divide-y divide-slate-700">
                {[
                  { title: "Phishing attempt detected", source: "Banking Portal", severity: "High", time: "15 min ago" },
                  { title: "Suspicious login activity", source: "Email Service", severity: "Medium", time: "1 hr ago" },
                  { title: "Unusual API traffic", source: "Cloud Storage", severity: "Medium", time: "2 hrs ago" },
                  { title: "New domain registration", source: "HR Portal", severity: "Low", time: "5 hrs ago" },
                ].map((alert) => (
                  <li key={alert.title + alert.time} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-700/40 transition-colors">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-slate-100">{alert.title}</p>
                      <p className="text-sm text-slate-500">{alert.source} · {alert.time}</p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-sm font-medium ${
                        alert.severity === "High"
                          ? "bg-red-500/20 text-red-400"
                          : alert.severity === "Medium"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-slate-600/50 text-slate-400"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
