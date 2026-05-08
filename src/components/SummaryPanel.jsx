import React, {
  useMemo,
} from "react";

export default function SummaryPanel({
  stocks = [],
}) {
  /*
  ====================================
  계산
  ====================================
  */

  const summary =
    useMemo(() => {
      let totalBuy =
        0;

      let totalCurrent =
        0;

      stocks.forEach(
        (stock) => {
          const buyAmount =
            Number(
              stock.buyAmount
            ) || 0;

          const current =
            (Number(
              stock.currentPrice
            ) || 0) *
            (Number(
              stock.quantity
            ) || 0);

          totalBuy +=
            buyAmount;

          totalCurrent +=
            current;
        }
      );

      const totalProfit =
        totalCurrent -
        totalBuy;

      const totalRate =
        totalBuy > 0
          ? (
              (totalProfit /
                totalBuy) *
              100
            ).toFixed(2)
          : 0;

      return {
        totalBuy,
        totalCurrent,
        totalProfit,
        totalRate,
      };
    }, [stocks]);

  const isProfit =
    summary.totalProfit >= 0;

  return (
    <div className="card">
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
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
            전체 현황
          </h2>

          <p
            className="
              mt-1
              text-gray-500
            "
          >
            전체 투자 요약
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* 총 매입금액 */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-5
          "
        >
          <p
            className="
              text-sm
              text-gray-500
              mb-2
            "
          >
            총 매입금액
          </p>

          <h3
            className="
              text-2xl
              font-bold
            "
          >
            {summary.totalBuy.toLocaleString()}
            원
          </h3>
        </div>

        {/* 총 평가금액 */}

        <div
          className="
            rounded-2xl
            border
            border-gray-200
            bg-gray-50
            p-5
          "
        >
          <p
            className="
              text-sm
              text-gray-500
              mb-2
            "
          >
            총 평가금액
          </p>

          <h3
            className="
              text-2xl
              font-bold
            "
          >
            {summary.totalCurrent.toLocaleString()}
            원
          </h3>
        </div>

        {/* 총 손익 */}

        <div
          className={`
            rounded-2xl
            p-6

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
              mb-2
            "
          >
            총 손익
          </p>

          <h3
            className={`
              text-3xl
              font-extrabold

              ${
                isProfit
                  ? "text-profit"
                  : "text-loss"
              }
            `}
          >
            {isProfit
              ? "+"
              : ""}
            {summary.totalProfit.toLocaleString()}
            원
          </h3>

          <p
            className={`
              mt-2
              text-lg
              font-bold

              ${
                isProfit
                  ? "text-profit"
                  : "text-loss"
              }
            `}
          >
            {summary.totalRate}%
          </p>
        </div>
      </div>
    </div>
  );
}