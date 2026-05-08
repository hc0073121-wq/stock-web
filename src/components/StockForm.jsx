import React, { useState } from "react";

export default function StockForm({ addStock }) {
  const [form, setForm] = useState({
    name: "",
    buyPrice: "",
    quantity: "",
    buyAmount: "",
    currentPrice: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.buyAmount) return;

    addStock(form);

    setForm({
      name: "",
      buyPrice: "",
      quantity: "",
      buyAmount: "",
      currentPrice: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card space-y-4">
      <input name="name" placeholder="종목명" value={form.name} onChange={handleChange} />

      <input name="buyPrice" placeholder="매입가" onChange={handleChange} value={form.buyPrice} />

      <input name="quantity" placeholder="수량" onChange={handleChange} value={form.quantity} />

      <input name="buyAmount" placeholder="매입금액 (필수)" onChange={handleChange} value={form.buyAmount} />

      <input name="currentPrice" placeholder="현재가" onChange={handleChange} value={form.currentPrice} />

      <button className="btn-save">
      저장
      </button>
    </form>
  );
}