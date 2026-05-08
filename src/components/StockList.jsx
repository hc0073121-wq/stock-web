import React from "react";

import StockCard
from "./StockCard.jsx";

export default function StockList({
  stocks = [],
}) {
  return (
    <div className="space-y-6">
      {/* 헤더 */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>
          <h2
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            보유 종목
          </h2>

          <p
            className="
              mt-1
              text-gray-500
            "
          >
            총 {stocks.length}개 종목
          </p>
        </div>
      </div>

      {/* 비어있을 때 */}

      {stocks.length === 0 && (
        <div className="card">
          <div
            className="
              py-16
              text-center
            "
          >
            <p
              className="
                text-2xl
                font-bold
                text-gray-400
              "
            >
              등록된 종목이 없습니다
            </p>

            <p
              className="
                mt-3
                text-gray-500
              "
            >
              왼쪽 입력창에서
              종목을 추가해보세요
            </p>
          </div>
        </div>
      )}

      {/* 목록 */}

      <div className="space-y-5">
        {stocks.map((stock) => (
          <StockCard
            key={stock.id}
            stock={stock}
          />
        ))}
      </div>
    </div>
  );
}