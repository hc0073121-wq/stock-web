import React, { useEffect, useState, useMemo } from "react";

import { observeAuthState } from "../lib/auth";
import {
  getStocksFromDB,
  addStockToDB,
  deleteStockFromDB,
  updateStockInDB,
} from "../lib/firestore";

import Header from "./Header.jsx";
import StockForm from "./StockForm.jsx";
import StockList from "./StockList.jsx";
import SummaryPanel from "./SummaryPanel.jsx";

export default function StockApp() {
  const [user, setUser] = useState(null);
  const [stocks, setStocks] = useState([]);

  // =========================
  // AUTH + LOAD
  // =========================
  useEffect(() => {
    const unsub = observeAuthState(async (u) => {
      setUser(u || null);

      if (u) {
        const res = await getStocksFromDB(u.uid);
        setStocks(res?.data || []);
      } else {
        setStocks([]);
      }
    });

    return () => unsub();
  }, []);

  // =========================
  // CREATE
  // =========================
  const addStock = async (data) => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }

    await addStockToDB(data, user.uid);

    const res = await getStocksFromDB(user.uid);
    setStocks(res?.data || []);
  };

  // =========================
  // DELETE
  // =========================
  const deleteStock = async (id) => {
    if (!user) return;

    await deleteStockFromDB(id, user.uid);

    const res = await getStocksFromDB(user.uid);
    setStocks(res?.data || []);
  };

  // =========================
  // UPDATE
  // =========================
  const updateStock = async (id, data) => {
    if (!user) return;

    await updateStockInDB(id, data, user.uid);

    const res = await getStocksFromDB(user.uid);
    setStocks(res?.data || []);
  };

  // =========================
  // SEARCH + SORT STATE
  // =========================
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("name");

  // =========================
  // FILTER + SORT
  // =========================
  const processedStocks = useMemo(() => {
    let data = [...stocks];

    // 🔍 검색
    if (search.trim()) {
      data = data.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 📊 정렬 확장
    switch (sortType) {
      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "profit":
        data.sort((a, b) => {
          const aRate = ((a.currentPrice - a.buyPrice) / a.buyPrice) * 100;
          const bRate = ((b.currentPrice - b.buyPrice) / b.buyPrice) * 100;
          return bRate - aRate;
        });
        break;

      case "price":
        data.sort((a, b) => b.currentPrice - a.currentPrice);
        break;

      // 🆕 추가 1: 매입금액순
      case "buyAmount":
        data.sort((a, b) =>
          (b.buyPrice * b.quantity) - (a.buyPrice * a.quantity)
        );
        break;

      // 🆕 추가 2: 보유수량순
      case "quantity":
        data.sort((a, b) => b.quantity - a.quantity);
        break;

      // 🆕 추가 3: 최신 등록순
      case "latest":
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;

      default:
        break;
    }

    return data;
  }, [stocks, search, sortType]);

  // =========================
  // SUMMARY
  // =========================
  const summary = useMemo(() => {
    let totalBuy = 0;
    let totalCurrent = 0;

    stocks.forEach((s) => {
      totalBuy += s.buyPrice * s.quantity;
      totalCurrent += s.currentPrice * s.quantity;
    });

    return {
      profit: totalCurrent - totalBuy,
      rate:
        totalBuy === 0
          ? 0
          : ((totalCurrent - totalBuy) / totalBuy) * 100,
    };
  }, [stocks]);

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />

      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 xl:grid-cols-4 gap-8">

        {/* LEFT */}
        <div className="xl:col-span-1 space-y-6">
          <StockForm addStock={addStock} />

          <SummaryPanel
            stocks={stocks}
            summary={summary}
          />
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-3 space-y-4">

          {/* SEARCH + SORT */}
          <div className="flex gap-3">

            <input
              className="p-2 border rounded w-full"
              placeholder="종목 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-2 border rounded"
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
            >
              <option value="name">이름순</option>
              <option value="profit">수익률순</option>
              <option value="price">현재가순</option>

              {/* 🆕 추가된 정렬 옵션 */}
              <option value="buyAmount">매입금액순</option>
              <option value="quantity">보유수량순</option>
              <option value="latest">최신순</option>
            </select>

          </div>

          {/* LIST */}
          <StockList
            stocks={processedStocks}
            onDelete={deleteStock}
            onUpdate={updateStock}
          />

        </div>
      </main>
    </div>
  );
}