import React from "react";

export const PengirimanPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white border border-slate-200 rounded-sm p-6 md:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Informasi & Kebijakan Pengiriman Buku
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Komitmen pengiriman cepat, kemasan terstandarisasi aman, dan berasuransi ke
          seluruh wilayah Indonesia.
        </p>

        <div className="space-y-6 text-xs sm:text-sm text-slate-700">
          {/* 1. Mitra Logistik */}
          <div className="pb-5 border-b border-slate-200">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              1. Mitra Jasa Ekspedisi
            </h2>
            <p className="leading-relaxed mb-2">
              Penerbit AISU bekerja sama secara resmi dengan ekspedisi tepercaya:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li><strong>JNE Express</strong> (Layanan Reguler & YES Yakin Esok Sampai)</li>
              <li><strong>J&T Express</strong> (Pengiriman Cepat Reguler & EZ)</li>
              <li><strong>SiCepat Ekspres</strong> (Layanan SiUntung & BEST)</li>
              <li><strong>Pos Indonesia</strong> (Layanan Kilat Khusus ke seluruh pelosok Nusantara)</li>
              <li><strong>Kargo Khusus</strong> (JNE Trucking / Indah Cargo untuk pesanan borongan kampus & perpustakaan)</li>
            </ul>
          </div>

          {/* 2. Estimasi Waktu */}
          <div className="pb-5 border-b border-slate-200">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              2. Estimasi Waktu Pengiriman
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                <div className="font-semibold text-slate-900 mb-0.5">Sumatera Utara & Aceh</div>
                <div className="text-xs text-slate-500">Estimasi 1 – 2 Hari Kerja</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                <div className="font-semibold text-slate-900 mb-0.5">Pulau Jawa & Sumatera Lainnya</div>
                <div className="text-xs text-slate-500">Estimasi 2 – 4 Hari Kerja</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                <div className="font-semibold text-slate-900 mb-0.5">Kalimantan, Sulawesi & Bali</div>
                <div className="text-xs text-slate-500">Estimasi 3 – 5 Hari Kerja</div>
              </div>
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200">
                <div className="font-semibold text-slate-900 mb-0.5">Nusa Tenggara, Maluku & Papua</div>
                <div className="text-xs text-slate-500">Estimasi 4 – 7 Hari Kerja</div>
              </div>
            </div>
          </div>

          {/* 3. Standar Pengemasan */}
          <div className="pb-5 border-b border-slate-200">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              3. Standar Kemasan Tahan Benturan (Zero Damage)
            </h2>
            <p className="leading-relaxed">
              Seluruh buku yang dikirim dipastikan berada dalam kondisi tersegel plastik pres
              (shrink wrap), dibungkus <strong>bubble wrap ganda 2 lapis</strong>, serta dilindungi
              kardus karton kaku dan lakban penanda <em>Fragile / Jangan Dibanting</em> tanpa biaya
              tambahan.
            </p>
          </div>

          {/* 4. Resi & WhatsApp */}
          <div className="pb-5 border-b border-slate-200">
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              4. Konfirmasi Resi Otomatis
            </h2>
            <p className="leading-relaxed">
              Pesanan yang diverifikasi sebelum pukul 15.00 WIB dikirim pada hari yang sama.
              Nomor resi pengiriman otomatis diteruskan melalui WhatsApp atau email resmi pembeli
              pada malam hari setelah input sistem logistik.
            </p>
          </div>

          {/* 5. Garansi Cacat Cetak */}
          <div>
            <h2 className="text-sm font-bold text-blue-700 uppercase tracking-wide mb-2">
              5. Garansi 100% Retur Cacat Cetak
            </h2>
            <p className="leading-relaxed">
              Bila ditemukan cacat fisik cetak seperti halaman kosong, susunan halaman terbalik,
              atau jilid buku lepas, Penerbit AISU memberikan penggantian buku baru secara gratis
              dan menanggung 100% seluruh ongkos kirim retur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
