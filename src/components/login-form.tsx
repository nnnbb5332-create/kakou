"use client";

import { useState } from "react";

export function LoginForm({ role, redirectPath }: { role: string; redirectPath: string }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, role })
    });

    if (!response.ok) {
      setError("Invalid credentials or role mismatch.");
      return;
    }

    window.location.href = redirectPath;
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <h2>{role.replaceAll("_", " ")} login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" required />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" required />
      <button type="submit">Sign in</button>
      {error && <p>{error}</p>}
    </form>
  );
}
