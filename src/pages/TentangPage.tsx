import React from "react";

export const TentangPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
        {/* Brand Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-slate-200 mb-6">
          <img
            src="https://www.aisu.or.id/aisu.png"
            alt="Logo AISU"
            className="w-16 h-16 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              Asosiasi Informatika Sumatera Utara
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Penerbit Resmi Buku Ilmiah, Buku Ajar, Referensi, dan Populer
            </p>
          </div>
        </div>

        {/* Profil & Visi */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              Profil Penerbit
            </h2>
            <p className="mb-3">
              <strong>Penerbit Asosiasi Informatika Sumatera Utara (AISU)</strong> didirikan
              sebagai lembaga penerbitan berbadan hukum resmi yang berfokus menerbitkan karya
              tulis ilmiah, monograf, buku ajar perkuliahan, buku referensi, dan buku populer
              untuk masyarakat umum di semua bidang ilmu pengetahuan.
            </p>
            <p>
              Dengan komitmen menjaga mutu literasi nasional, kami membantu dosen, peneliti, guru,
              praktisi, dan mahasiswa di seluruh Indonesia untuk mendiseminasikan hasil riset dan
              ide pemikiran melalui buku berstandar Perpustakaan Nasional Republik Indonesia.
            </p>
          </div>

          {/* Cakupan Bidang Ilmu */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
              Cakupan Bidang Ilmu Penerbitan:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <div>· Ilmu Komputer, Rekayasa Web & Informatika</div>
              <div>· Kecerdasan Buatan (AI) & Sains Data</div>
              <div>· Jaringan Komputer, Forensik & Keamanan Siber</div>
              <div>· Pendidikan & Metodologi Penelitian Ilmiah</div>
              <div>· Ekonomi Bisnis & Technopreneurship Digital</div>
              <div>· Regulasi Siber, UU PDP & Kekayaan Intelektual (HAKI)</div>
            </div>
          </div>

          {/* Informasi Legalitas & Kontak Resmi */}
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-3">
              Identitas & Kontak Resmi Penerbit
            </h2>
            <table className="w-full border-collapse border border-slate-200 text-xs">
              <tbody>
                <tr className="border-b border-slate-200">
                  <th className="w-44 p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Nama Penerbit
                  </th>
                  <td className="p-2.5 text-slate-900 font-medium">
                    Asosiasi Informatika Sumatera Utara
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Fokus Penerbitan
                  </th>
                  <td className="p-2.5 text-slate-800">
                    Menerbitkan buku untuk umum di semua bidang ilmu
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Alamat Kantor
                  </th>
                  <td className="p-2.5 text-slate-800">
                    Jl. Klambir V, Tanjung Gusta, Kec. Sunggal, Kab. Deli Serdang, Prov.
                    Sumatera Utara, Indonesia
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Email Redaksi
                  </th>
                  <td className="p-2.5">
                    <a
                      href="mailto:tomysatriaalasi@gmail.com"
                      className="text-blue-700 hover:underline font-medium"
                    >
                      tomysatriaalasi@gmail.com
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Telepon / WhatsApp
                  </th>
                  <td className="p-2.5">
                    <a
                      href="https://wa.me/6282168449797"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-medium"
                    >
                      +62 821-6844-9797
                    </a>
                  </td>
                </tr>
                <tr className="border-b border-slate-200">
                  <th className="p-2.5 text-left font-semibold text-slate-600 bg-slate-50">
                    Status ISBN & Legal
                  </th>
                  <td className="p-2.5 text-slate-800">
                    Terdaftar di Perpustakaan Nasional Republik Indonesia (Perpusnas RI)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
