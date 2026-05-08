import React from "react";

export default function HistoryPanel({
  history = [],
  loadHistory,
  deleteHistory,
}) {
  return (
    <div className="card">
      {/* 헤더 */}

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
            저장된 기록
          </h2>

          <p
            className="
              mt-1
              text-gray-500
            "
          >
            이전 저장 내역 관리
          </p>
        </div>

        <div
          className="
            px-4
            py-2
            rounded-2xl
            bg-gray-100
            text-gray-600
            text-sm
            font-semibold
          "
        >
          총 {history.length}개
        </div>
      </div>

      {/* 비어있을 때 */}

      {history.length === 0 && (
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
            저장된 기록이 없습니다
          </p>

          <p
            className="
              mt-3
              text-gray-500
            "
          >
            종목을 저장하면
            기록이 여기에 표시됩니다
          </p>
        </div>
      )}

      {/* 기록 목록 */}

      <div className="space-y-5">
        {history.map((item) => (
          <div
            key={item.id}
            className="
              rounded-3xl
              border
              border-gray-200
              bg-gray-50
              p-6
            "
          >
            <div
              className="
                flex
                flex-col
                xl:flex-row
                xl:items-center
                xl:justify-between
                gap-5
              "
            >
              {/* 왼쪽 */}

              <div>
                <h3
                  className="
                    text-2xl
                    font-bold
                    text-gray-900
                    mb-3
                  "
                >
                  {item.name}
                </h3>

                <div
                  className="
                    space-y-2
                    text-gray-600
                  "
                >
                  <p>
                    매입금액:
                    {" "}
                    {Number(
                      item.buyAmount || 0
                    ).toLocaleString()}
                    원
                  </p>

                  <p>
                    현재가:
                    {" "}
                    {Number(
                      item.currentPrice || 0
                    ).toLocaleString()}
                    원
                  </p>
                </div>
              </div>

              {/* 오른쪽 버튼 */}

              <div
                className="
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                "
              >
                <button
                  onClick={() =>
                    loadHistory?.(
                      item
                    )
                  }
                  className="
                    h-14
                    px-6

                    rounded-2xl

                    bg-blue-600
                    hover:bg-blue-700

                    text-white
                    text-base
                    font-bold
                  "
                >
                  불러오기
                </button>

                <button
                  onClick={() =>
                    deleteHistory?.(
                      item.id
                    )
                  }
                  className="
                    h-14
                    px-6

                    rounded-2xl

                    bg-red-500
                    hover:bg-red-600

                    text-white
                    text-base
                    font-bold
                  "
                >
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}