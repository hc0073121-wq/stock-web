import React, { useState } from "react";
import { registerUser } from "../lib/auth";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력하세요");
      return;
    }

    setLoading(true);

    const result = await registerUser(email, password);

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    alert("회원가입 성공!");
    window.location.href = "/login";
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
        {loading ? "가입 중..." : "회원가입"}
      </button>
    </form>
  );
}