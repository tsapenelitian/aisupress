import React from "react";
import { PengunjungStats } from "../data/initialData";

interface VisitorCounterProps {
  stats: PengunjungStats;
  totalBooks: number;
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({ stats, totalBooks }) => {
  return (
    <section className="bg-white border border-slate-200 rounded-sm p-4 my-6" aria-label="Statistik Pengunjung dan Koleksi">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
        <div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
            Statistik Kunjungan Real-Time & Publikasi
          </h2>
          <p className="text-xs text-slate-500">
            Pencatatan statistik otomatis tanpa memperlambat loading halaman
          </p>
        </div>
        <div className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-sm self-start sm:self-auto">
          Counter Aktif
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-sm text-center">
          <div className="text-2xl font-bold text-blue-700 tabular-nums">
            {stats.hariIni.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
            Pengunjung Hari Ini
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-sm text-center">
          <div className="text-2xl font-bold text-blue-700 tabular-nums">
            {stats.mingguIni.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
            Minggu Ini
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-sm text-center">
          <div className="text-2xl font-bold text-blue-700 tabular-nums">
            {stats.bulanIni.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
            Bulan Ini
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-3 rounded-sm text-center">
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {stats.total.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mt-0.5">
            Total Kunjungan
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>Katalog Terbitan: <strong>{totalBooks} Judul Buku</strong></span>
        <span>Wilayah: <strong>Deli Serdang, Sumatera Utara</strong></span>
      </div>
    </section>
  );
};
