import React from "react";

export default function Header({ user }) {
  return (
    <header className="header">
      
      {/* 🔵 타이틀 (크게 + 두껍게 강조) */}
      <div className="header-left">
        <h1 className="header-title">
          주식 관리 시스템
        </h1>
      </div>

      {/* 🟡 중앙 영역 (기존 유지용) */}
      <div className="header-center">
        {/* 필요 시 메뉴 들어가는 자리 */}
      </div>

      {/* 🔴 로그인 / 회원가입 버튼 영역 */}
      <div className="header-right">

        {user ? (
          <>
            <span className="user-email">
              {user.email}
            </span>

            <a href="/logout" className="auth-btn logout">
              로그아웃
            </a>
          </>
        ) : (
          <>
            <a href="/login" className="auth-btn login">
              로그인
            </a>

            <a href="/register" className="auth-btn register">
              회원가입
            </a>
          </>
        )}

      </div>

    </header>
  );
}