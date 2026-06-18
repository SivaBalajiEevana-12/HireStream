import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { AuthShell } from "../components/auth/AuthShell";
import { registerRequest } from "../lib/auth-api";

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  mobile: string;
  resume: string;
}

const initialState: FormState = {
  username: "",
  password: "",
  confirmPassword: "",
  email: "",
  mobile: "",
  resume: "",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setIsSubmitting(true);
    try {
      const { result, token } = await registerRequest({
        username: form.username,
        password: form.password,
        email: form.email,
        mobile: form.mobile,
        resume: form.resume,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthShell
      eyebrow="Get started"
      title="Your next opportunity starts with one profile."
      subtitle="Create an account to apply faster, save your resume, and let the right teams find you."
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Takes less than a minute.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={form.username}
            onChange={updateField("username")}
            placeholder="jane.doe"
            autoComplete="username"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={updateField("email")}
            placeholder="jane@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile number</Label>
          <Input
            id="mobile"
            type="tel"
            value={form.mobile}
            onChange={updateField("mobile")}
            placeholder="+1 555 123 4567"
            autoComplete="tel"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="resume">Resume link</Label>
          <Input
            id="resume"
            value={form.resume}
            onChange={updateField("resume")}
            placeholder="https://drive.google.com/..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={form.password}
              onChange={updateField("password")}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={updateField("confirmPassword")}
              placeholder="••••••••"
              autoComplete="new-password"
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
