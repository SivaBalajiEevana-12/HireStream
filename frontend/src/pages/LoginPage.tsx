
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { loginRequest } from "../lib/auth-api";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { result, token } = await loginRequest({
        username,
        password,
      });

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(result));

      navigate("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

      {/* Gradient Blobs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl font-bold text-white">
                JB
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Sign in to continue managing your career journey.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm text-slate-200"
                >
                  Username
                </Label>

                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="john_doe"
                  autoComplete="username"
                  required
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm text-slate-200"
                >
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  className="h-11 border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400">
                  <input
                    type="checkbox"
                    className="rounded border-slate-600"
                  />
                  Remember me
                </label>

                <button
                  type="button"
                  className="text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                {isSubmitting ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="h-px flex-1 bg-white/10" />
              <span className="px-3 text-xs uppercase tracking-wider text-slate-500">
                OR
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Continue with Google
              </Button>

              <Button
                variant="outline"
                className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                Continue with GitHub
              </Button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-slate-400">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-400 hover:text-blue-300"
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

