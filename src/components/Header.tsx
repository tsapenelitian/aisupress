import React from "react";

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  isAdminLoggedIn: boolean;
  onLogout: () => void;
  totalBooks: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  isAdminLoggedIn,
  onLogout,
}) => {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Brand Zone */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActivePage("home")}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded cursor-pointer"
          >
            <img
              src="https://www.aisu.or.id/aisu.png"
              alt="Logo Asosiasi Informatika Sumatera Utara"
              className="w-10 h-10 object-contain shrink-0"
              onError={(e) => {
                // Resilient fallback if external image server is unreachable
                const target = e.currentTarget;
                target.style.display = "none";
              }}
            />
            <div>
              <div className="text-base font-bold text-slate-900 leading-tight">
                Asosiasi Informatika Sumatera Utara
              </div>
              <div className="text-xs text-slate-500">
                Penerbit Buku Resmi · Semua Bidang Ilmu
              </div>
            </div>
          </button>
        </div>

        {/* Semantic Navigation */}
        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium"
          aria-label="Navigasi Utama"
        >
          <button
            onClick={() => setActivePage("home")}
            className={`cursor-pointer pb-0.5 border-b-2 ${
              activePage === "home"
                ? "border-blue-700 text-slate-900 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Beranda
          </button>

          <button
            onClick={() => setActivePage("katalog")}
            className={`cursor-pointer pb-0.5 border-b-2 ${
              activePage === "katalog" || activePage === "detail"
                ? "border-blue-700 text-slate-900 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Katalog Buku
          </button>

          <button
            onClick={() => setActivePage("pengiriman")}
            className={`cursor-pointer pb-0.5 border-b-2 ${
              activePage === "pengiriman"
                ? "border-blue-700 text-slate-900 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Pengiriman
          </button>

          <button
            onClick={() => setActivePage("tentang")}
            className={`cursor-pointer pb-0.5 border-b-2 ${
              activePage === "tentang"
                ? "border-blue-700 text-slate-900 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Tentang
          </button>

          <button
            onClick={() => setActivePage("seo")}
            className={`cursor-pointer pb-0.5 border-b-2 ${
              activePage === "seo"
                ? "border-blue-700 text-slate-900 font-semibold"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            Google SEO & GSC
          </button>

          <button
            onClick={() => setActivePage("yii-code")}
            className={`cursor-pointer px-2.5 py-1 rounded text-xs font-semibold inline-flex items-center gap-1.5 ${
              activePage === "yii-code"
                ? "bg-emerald-700 text-white"
                : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
            }`}
          >
            <span>Yii2 cPanel ZIP</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>

          {/* Admin Navigation */}
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <button
                onClick={() => setActivePage("admin")}
                className={`cursor-pointer px-2.5 py-1 rounded text-xs font-semibold ${
                  activePage === "admin"
                    ? "bg-blue-700 text-white"
                    : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
              >
                Panel Admin
              </button>
              <button
                onClick={onLogout}
                className="cursor-pointer text-xs text-red-600 hover:text-red-700 font-medium"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActivePage("login")}
              className={`cursor-pointer px-2.5 py-1 rounded text-xs font-semibold ${
                activePage === "login"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Login Admin
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
