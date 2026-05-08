import React from "react";

export default function SortMenu({
  sortType,
  setSortType,
}) {
  return (
    <div className="card">
      <div className="mb-5">
        <h2
          className="
            text-2xl
            font-bold
            text-gray-900
          "
        >
          정렬 옵션
        </h2>

        <p
          className="
            mt-1
            text-gray-500
          "
        >
          종목 순서를 변경할 수 있습니다
        </p>
      </div>

      <select
        value={sortType}
        onChange={(e) =>
          setSortType(
            e.target.value
          )
        }
      >
        <option value="latest">
          최신 등록순
        </option>

        <option value="oldest">
          오래된 순
        </option>

        <option value="name">
          이름순
        </option>

        <option value="profitHigh">
          수익률 높은 순
        </option>

        <option value="profitLow">
          수익률 낮은 순
        </option>

        <option value="buyAmountHigh">
          매입금액 높은 순
        </option>

        <option value="buyAmountLow">
          매입금액 낮은 순
        </option>

        <option value="currentHigh">
          평가금액 높은 순
        </option>

        <option value="currentLow">
          평가금액 낮은 순
        </option>
      </select>
    </div>
  );
}