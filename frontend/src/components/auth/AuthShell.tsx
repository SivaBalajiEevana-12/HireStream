
import type { ReactNode } from "react";
import { Briefcase, FileText, TrendingUp } from "lucide-react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />

      <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 grid min-h-screen lg:grid-cols-2">
        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-center px-16">
          <div className="max-w-xl">
            <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
              {eyebrow}
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight text-white">
              {title}
            </h1>

            <p className="mt-6 text-lg text-slate-400">
              {subtitle}
            </p>

            <div className="mt-12 space-y-6">
              <div className="flex gap-4">
                <Briefcase className="text-blue-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Discover Opportunities
                  </h3>
                  <p className="text-slate-400">
                    Find internships and jobs from top companies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <FileText className="text-violet-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Resume Management
                  </h3>
                  <p className="text-slate-400">
                    Keep your profile and resume updated.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <TrendingUp className="text-green-400" />
                <div>
                  <h3 className="font-semibold text-white">
                    Career Growth
                  </h3>
                  <p className="text-slate-400">
                    Track progress and improve your chances.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

