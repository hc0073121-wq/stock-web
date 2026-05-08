import React, { useState } from "react";
import { loginUser } from "../lib/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const result = await loginUser(email, password);

    if (!result.success) {
      setError(result.error);
      return;
    }

    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && (
        <div className="text-red-500 text-sm">
          {error}
        </div>
      )}

      <button type="submit" className="btn-primary w-full">
        로그인
      </button>
    </form>
  );
}