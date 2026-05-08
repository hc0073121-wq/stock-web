import React from "react";

export default function SearchBar({
  search,
  setSearch,
  totalCount = 0,
}) {
  return (
    <div className="card">
      <div
        className="
          flex
          items-center
          justify-between
          mb-5
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
            종목 검색
          </h2>

          <p
            className="
              mt-1
              text-gray-500
            "
          >
            원하는 종목 빠르게 찾기
          </p>
        </div>

        <div
          className="
            px-4
            py-2

            rounded-2xl

            bg-gray-100

            text-sm
            font-semibold
            text-gray-600
          "
        >
          총 {totalCount}개
        </div>
      </div>

      <input
        type="text"
        placeholder="종목명을 입력하세요"
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />
    </div>
  );
}