import React from "react";

export default function StockCard({
  stock,
}) {
  const currentTotal =
    Number(
      stock.currentPrice
    ) *
    Number(stock.quantity);

  const profit =
    currentTotal -
    Number(stock.buyAmount);

  const profitRate =
    Number(stock.buyAmount) > 0
      ? (
          (profit /
            Number(
              stock.buyAmount
            )) *
          100
        ).toFixed(2)
      : 0;

  const isProfit =
    profit >= 0;

  return (
    <div
      className="
        card
        fade-in
      "
    >
      <div
        className="
          flex
          justify-between
          items-start
          gap-4
        "
      >
        <div>
          <h3
            className="
              text-2xl
              font-bold
              mb-3
            "
          >
            {stock.name}
          </h3>

          <div
            className="
              space-y-2
              text-base
              text-gray-600
            "
          >
            <p>
              매입가:
              {" "}
              {Number(
                stock.buyPrice
              ).toLocaleString()}
              원
            </p>

            <p>
              보유수량:
              {" "}
              {stock.quantity}
              주
            </p>

            <p>
              매입금액:
              {" "}
              {Number(
                stock.buyAmount
              ).toLocaleString()}
              원
            </p>

            <p>
              현재가:
              {" "}
              {Number(
                stock.currentPrice
              ).toLocaleString()}
              원
            </p>
          </div>
        </div>

        <div
          className={`
            px-5
            py-4
            rounded-2xl
            text-right
            min-w-40

            ${
              isProfit
                ? "bg-red-50"
                : "bg-blue-50"
            }
          `}
        >
          <p
            className="
              text-sm
              text-gray-500
              mb-1
            "
          >
            수익률
          </p>

          <p
            className={`
              text-2xl
              font-bold

              ${
                isProfit
                  ? "text-profit"
                  : "text-loss"
              }
            `}
          >
            {profitRate}%
          </p>

          <p
            className={`
              mt-2
              text-sm
              font-semibold

              ${
                isProfit
                  ? "text-profit"
                  : "text-loss"
              }
            `}
          >
            {profit >= 0
              ? "+"
              : ""}
            {profit.toLocaleString()}
            원
          </p>
        </div>
      </div>
    </div>
  );
}