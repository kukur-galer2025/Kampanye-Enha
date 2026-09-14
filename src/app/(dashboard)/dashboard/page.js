"use client";
import Script from "next/script";
import { signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="app-shell">
  <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
    <div className="brand">
      <div className="brand-mark">DC</div>
      <div><strong>DEKAN</strong><span>Command Center</span></div>
      <button className="mobile-menu-close" onClick={() => setMenuOpen(false)}>×</button>
    </div>
    <nav className="nav">
      <button className="nav-item active" data-view="overview" onClick={() => setMenuOpen(false)}><span>◫</span> Executive Overview</button>
      <button className="nav-item" data-view="renstra" onClick={() => setMenuOpen(false)}><span>◎</span> Renstra & Kebijakan</button>
      <button className="nav-item" data-view="quality" onClick={() => setMenuOpen(false)}><span>◆</span> Mutu & Akreditasi</button>
      <button className="nav-item" data-view="academic" onClick={() => setMenuOpen(false)}><span>◈</span> IKU & Akademik</button>
      <button className="nav-item" data-view="hr" onClick={() => setMenuOpen(false)}><span>♙</span> SDM & Dosen</button>
      <button className="nav-item" data-view="finance" onClick={() => setMenuOpen(false)}><span>▥</span> Keuangan & Operasional</button>
      <button className="nav-item" data-view="documents" onClick={() => setMenuOpen(false)}><span>▤</span> SOP & Dokumen</button>
      <button className="nav-item" data-view="alerts" onClick={() => setMenuOpen(false)}><span>⚠</span> Alert & Tindak Lanjut</button>
      <button className="nav-item" data-view="integration" onClick={() => setMenuOpen(false)}><span>⌘</span> Integrasi Data</button>
    </nav>
    <div className="sidebar-foot">
      <div className="status-dot-wrap"><span className="status-dot"></span> Data Center Online</div>
      <small>Prototype 2026 · Real-time monitoring</small>
      <button onClick={() => signOut({ callbackUrl: '/' })} style={{marginTop: "12px", background: "transparent", border: "1px solid #1e3a31", color: "#8fa79e", padding: "10px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", width: "100%", fontWeight: "bold"}}>Logout</button>
    </div>
  </aside>
  {menuOpen && <div className="sidebar-overlay" onClick={() => setMenuOpen(false)}></div>}

  <main className="main">
    <header className="topbar">
      <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
        <button className="hamburger-btn" onClick={() => setMenuOpen(true)}>☰</button>
        <div><div className="eyebrow">FACULTY DATA CENTER MONITORING</div><h1 id="page-title">Executive Overview</h1></div>
      </div>
      <div className="top-actions">
        <label className="select-wrap">Program Studi
          <select id="prodi-filter">
            <option value="all">Semua Prodi</option><option>Informatika</option><option>Teknik Elektro</option><option>Teknik Sipil</option><option>Teknik Geologi</option><option>Teknik Industri</option>
          </select>
        </label>
        <button className="live-btn" id="live-toggle"><span className="pulse"></span> LIVE</button>
        <div className="clock"><strong id="clock-time">--:--:--</strong><span id="clock-date">--</span></div>
      </div>
    </header>

    <section id="view-overview" className="view active">
      <div className="hero-grid">
        <article className="health-card">
          <div className="card-head"><div><div className="eyebrow">FACULTY HEALTH SCORE</div><h2>Kesehatan Tata Kelola Fakultas</h2></div><span className="badge good">STABIL</span></div>
          <div className="health-content">
            <div className="donut" style={{'--value': '86'}}><div><strong id="health-score">86</strong><span>/100</span></div></div>
            <div className="health-metrics">
              <div><span>Renstra</span><b>89%</b><i><em style={{width: '89%'}}></em></i></div>
              <div><span>Mutu & Akreditasi</span><b>82%</b><i><em style={{width: '82%'}}></em></i></div>
              <div><span>IKU & Akademik</span><b>87%</b><i><em style={{width: '87%'}}></em></i></div>
              <div><span>SDM</span><b>84%</b><i><em style={{width: '84%'}}></em></i></div>
              <div><span>Keuangan</span><b>88%</b><i><em style={{width: '88%'}}></em></i></div>
            </div>
          </div>
        </article>
        <article className="alert-summary">
          <div className="card-head"><div><div className="eyebrow">EARLY WARNING</div><h2>Alert Aktif</h2></div><a href="#" data-jump="alerts">Lihat semua →</a></div>
          <div className="alert-number"><strong id="critical-count">6</strong><span>perlu perhatian pimpinan</span></div>
          <div className="mini-alert critical"><b>KRITIS</b><span>Akreditasi Teknik Geologi: 3 dokumen wajib belum lengkap</span></div>
          <div className="mini-alert warning"><b>WASPADA</b><span>Serapan anggaran 2 kegiatan tertinggal dari rencana</span></div>
          <div className="mini-alert info"><b>INFO</b><span>AMI Prodi Informatika dijadwalkan 14 hari lagi</span></div>
        </article>
      </div>
      <div className="kpi-grid">
        <article className="kpi-card"><span className="kpi-icon">◎</span><div><small>Capaian Renstra</small><strong id="kpi-renstra">89%</strong><em>+4,2% vs bulan lalu</em></div></article>
        <article className="kpi-card"><span className="kpi-icon">◆</span><div><small>Kesiapan Akreditasi</small><strong id="kpi-accreditation">82%</strong><em>4 prodi on-track</em></div></article>
        <article className="kpi-card"><span className="kpi-icon">◈</span><div><small>Skor IKU Fakultas</small><strong id="kpi-iku">87,4</strong><em>Target tahunan 90</em></div></article>
        <article className="kpi-card"><span className="kpi-icon">♙</span><div><small>BKD Lengkap</small><strong id="kpi-bkd">94%</strong><em>11 dosen perlu follow-up</em></div></article>
        <article className="kpi-card"><span className="kpi-icon">▥</span><div><small>Serapan Anggaran</small><strong id="kpi-budget">71%</strong><em>Ideal periode: 75%</em></div></article>
        <article className="kpi-card"><span className="kpi-icon">▤</span><div><small>Kepatuhan SOP</small><strong>91%</strong><em>38/41 SOP aktif</em></div></article>
      </div>
      <div className="content-grid">
        <article className="panel wide">
          <div className="card-head"><div><div className="eyebrow">TREND 12 BULAN</div><h2>Kinerja Fakultas</h2></div><div className="legend"><span>● IKU</span><span>● Mutu</span><span>● Keuangan</span></div></div>
          <svg className="line-chart" viewBox="0 0 760 260" role="img" aria-label="Grafik tren kinerja">
            <g className="grid-lines"><line x1="55" y1="40" x2="735" y2="40"/><line x1="55" y1="90" x2="735" y2="90"/><line x1="55" y1="140" x2="735" y2="140"/><line x1="55" y1="190" x2="735" y2="190"/><line x1="55" y1="235" x2="735" y2="235"/></g>
            <polyline className="line l1" points="55,175 115,160 175,158 235,142 295,132 355,125 415,110 475,105 535,94 595,88 655,78 735,70"/>
            <polyline className="line l2" points="55,190 115,185 175,172 235,165 295,151 355,143 415,138 475,126 535,115 595,110 655,100 735,92"/>
            <polyline className="line l3" points="55,210 115,201 175,198 235,185 295,172 355,168 415,153 475,145 535,133 595,119 655,112 735,105"/>
            <g className="months"><text x="55" y="255">Sep</text><text x="175" y="255">Nov</text><text x="295" y="255">Jan</text><text x="415" y="255">Mar</text><text x="535" y="255">Mei</text><text x="655" y="255">Jul</text><text x="720" y="255">Agu</text></g>
          </svg>
        </article>
        <article className="panel"><div className="card-head"><div><div className="eyebrow">TODAY</div><h2>Agenda Pimpinan</h2></div></div>
          <div className="timeline"><div><time>08:00</time><span><b>Rapat Pimpinan Fakultas</b><small>Ruang Dekanat</small></span></div><div><time>10:30</time><span><b>Review Kesiapan Akreditasi</b><small>Teknik Geologi</small></span></div><div><time>13:00</time><span><b>Evaluasi Serapan Anggaran</b><small>Wadek II & KTU</small></span></div><div><time>15:00</time><span><b>Koordinasi Mitra Industri</b><small>Kerja Sama Fakultas</small></span></div></div>
        </article>
      </div>
    </section>

    <section id="view-renstra" className="view">
      <div className="section-intro"><div><span className="badge good">MODUL 01</span><h2>Perencanaan Strategis & Kebijakan</h2><p>Monitoring Visi–Misi, Renstra, Renop, program kerja, KPI dan tindak lanjut kebijakan.</p></div><button className="primary-btn" data-action="add-program">+ Tambah Program Strategis</button></div>
      <div className="kpi-grid four"><article className="metric-box"><small>Program Renstra</small><strong>46</strong><span>aktif tahun 2026</span></article><article className="metric-box"><small>On Track</small><strong>37</strong><span>80,4% program</span></article><article className="metric-box warning-box"><small>Delay</small><strong>6</strong><span>perlu eskalasi</span></article><article className="metric-box danger-box"><small>Critical</small><strong>3</strong><span>melewati SLA</span></article></div>
      <article className="panel"><div className="card-head"><div><div className="eyebrow">STRATEGIC PORTFOLIO</div><h2>Progress Renstra & Renop</h2></div><input className="search" placeholder="Cari program..." data-table-search="renstra-table"/></div><div className="table-wrap"><table id="renstra-table"><thead><tr><th>Program Strategis</th><th>PIC</th><th>Target</th><th>Progress</th><th>Deadline</th><th>Status</th></tr></thead><tbody>
        <tr><td>Transformasi Pembelajaran Digital</td><td>Wadek I</td><td>100%</td><td><div className="progress"><span style={{width: '92%'}}></span></div>92%</td><td>30 Nov 2026</td><td><span className="badge good">On Track</span></td></tr>
        <tr><td>Penguatan Kerja Sama Industri</td><td>Wadek III</td><td>20 mitra</td><td><div className="progress"><span style={{width: '75%'}}></span></div>15/20</td><td>15 Des 2026</td><td><span className="badge good">On Track</span></td></tr>
        <tr><td>Internasionalisasi Program Studi</td><td>Dekan</td><td>3 prodi</td><td><div className="progress warn"><span style={{width: '55%'}}></span></div>55%</td><td>30 Sep 2026</td><td><span className="badge warning">Delay</span></td></tr>
        <tr><td>Modernisasi Laboratorium</td><td>Wadek II</td><td>8 lab</td><td><div className="progress danger"><span style={{width: '38%'}}></span></div>38%</td><td>15 Sep 2026</td><td><span className="badge danger">Critical</span></td></tr>
        <tr><td>Peningkatan Publikasi Bereputasi</td><td>Kaprodi</td><td>120 artikel</td><td><div className="progress"><span style={{width: '81%'}}></span></div>97/120</td><td>20 Des 2026</td><td><span className="badge good">On Track</span></td></tr>
      </tbody></table></div></article>
    </section>

    <section id="view-quality" className="view">
      <div className="section-intro"><div><span className="badge good">MODUL 02</span><h2>Penjaminan Mutu & Akreditasi</h2><p>Kontrol AMI, RTM, LED, dokumen akreditasi dan kesiapan submit BAN-PT/LAM.</p></div></div>
      <div className="accreditation-grid" id="accreditation-cards"></div>
      <div className="content-grid"><article className="panel wide"><div className="card-head"><div><div className="eyebrow">DOCUMENT READINESS</div><h2>Kelengkapan Dokumen Akreditasi</h2></div></div><div id="quality-docs" className="doc-checks"></div></article><article className="panel"><div className="card-head"><div><div className="eyebrow">AMI / RTM</div><h2>Agenda Mutu</h2></div></div><div className="timeline"><div><time>07 Sep</time><span><b>Desk Evaluation AMI</b><small>Teknik Elektro</small></span></div><div><time>14 Sep</time><span><b>AMI Lapangan</b><small>Informatika</small></span></div><div><time>25 Sep</time><span><b>RTM Fakultas</b><small>Semua Prodi</small></span></div><div><time>02 Okt</time><span><b>Verifikasi Tindak Lanjut</b><small>GPM Fakultas</small></span></div></div></article></div>
    </section>

    <section id="view-academic" className="view">
      <div className="section-intro"><div><span className="badge good">MODUL 03</span><h2>Kinerja Akademik & IKU–IKT</h2><p>Monitoring indikator pendidikan, lulusan, MBKM, dosen berkegiatan di luar kampus, dan kinerja akademik prodi.</p></div></div>
      <div className="kpi-grid four"><article className="metric-box"><small>Skor IKU</small><strong>87,4</strong><span>target 90</span></article><article className="metric-box"><small>Kelulusan Tepat Waktu</small><strong>78%</strong><span>+5,1% YoY</span></article><article className="metric-box"><small>Rata-rata IPK</small><strong>3,46</strong><span>1.248 lulusan</span></article><article className="metric-box"><small>Masa Tunggu Kerja</small><strong>3,2</strong><span>bulan</span></article></div>
      <article className="panel"><div className="card-head"><div><div className="eyebrow">IKU SCORECARD</div><h2>Capaian Indikator</h2></div></div><div id="iku-scorecard" className="scorecards"></div></article>
    </section>

    <section id="view-hr" className="view">
      <div className="section-intro"><div><span className="badge good">MODUL 04</span><h2>Pengawasan SDM & Dosen</h2><p>Monitoring kehadiran, BKD, publikasi, penelitian, pengabdian, jabatan fungsional dan pengembangan kompetensi.</p></div></div>
      <div className="kpi-grid four"><article className="metric-box"><small>Dosen Aktif</small><strong>186</strong><span>5 program studi</span></article><article className="metric-box"><small>Kehadiran Mengajar</small><strong>96,2%</strong><span>semester berjalan</span></article><article className="metric-box"><small>BKD Lengkap</small><strong>94%</strong><span>175/186 dosen</span></article><article className="metric-box"><small>Publikasi 2026</small><strong>214</strong><span>+18% YoY</span></article></div>
      <div className="content-grid"><article className="panel wide"><div className="card-head"><div><div className="eyebrow">TRI DHARMA</div><h2>Roadmap Kinerja Dosen</h2></div></div><div className="bar-list"><div><span>Pendidikan</span><b>96%</b><i><em style={{width: '96%'}}></em></i></div><div><span>Penelitian</span><b>84%</b><i><em style={{width: '84%'}}></em></i></div><div><span>Publikasi</span><b>81%</b><i><em style={{width: '81%'}}></em></i></div><div><span>Pengabdian</span><b>88%</b><i><em style={{width: '88%'}}></em></i></div><div><span>Pengembangan Kompetensi</span><b>72%</b><i><em style={{width: '72%'}}></em></i></div></div></article><article className="panel"><div className="card-head"><div><div className="eyebrow">FOLLOW-UP</div><h2>Perlu Tindakan</h2></div></div><div className="action-list"><button><b>11</b><span>BKD belum final</span><em>→</em></button><button><b>7</b><span>Publikasi belum terverifikasi</span><em>→</em></button><button><b>4</b><span>Usulan JAD tertunda</span><em>→</em></button><button><b>3</b><span>Kehadiran &lt; 85%</span><em>→</em></button></div></article></div>
    </section>

    <section id="view-finance" className="view">
      <div className="section-intro"><div><span className="badge good">MODUL 05</span><h2>Keuangan & Operasional</h2><p>Pemantauan pagu, realisasi, komitmen, pencairan, program kerja, aset dan sarana-prasarana.</p></div></div>
      <div className="budget-hero"><div><small>PAGU 2026</small><strong>Rp 28,5 M</strong><span>Realisasi Rp 20,2 M · Sisa Rp 8,3 M</span></div><div className="budget-ring"><div><strong>71%</strong><span>serapan</span></div></div><div className="budget-status"><b>Target periode: 75%</b><span className="badge warning">-4% dari target</span><small>Perlu percepatan pada 2 unit kerja</small></div></div>
      <article className="panel"><div className="card-head"><div><div className="eyebrow">BUDGET CONTROL</div><h2>Realisasi per Unit</h2></div></div><div className="table-wrap"><table><thead><tr><th>Unit / Program</th><th>Pagu</th><th>Realisasi</th><th>Serapan</th><th>Status</th></tr></thead><tbody><tr><td>Akademik & Pembelajaran</td><td>Rp 8,2 M</td><td>Rp 6,3 M</td><td>77%</td><td><span className="badge good">Normal</span></td></tr><tr><td>Penelitian & Pengabdian</td><td>Rp 5,6 M</td><td>Rp 4,1 M</td><td>73%</td><td><span className="badge good">Normal</span></td></tr><tr><td>Kemahasiswaan</td><td>Rp 3,7 M</td><td>Rp 2,5 M</td><td>68%</td><td><span className="badge warning">Waspada</span></td></tr><tr><td>Sarana & Prasarana</td><td>Rp 7,4 M</td><td>Rp 4,5 M</td><td>61%</td><td><span className="badge danger">Percepatan</span></td></tr><tr><td>Kerja Sama & Internasionalisasi</td><td>Rp 3,6 M</td><td>Rp 2,8 M</td><td>78%</td><td><span className="badge good">Normal</span></td></tr></tbody></table></div></article>
    </section>

    <section id="view-documents" className="view">
      <div className="section-intro"><div><span className="badge good">DOCUMENT CONTROL</span><h2>SOP & Dokumen Tata Kelola</h2><p>Repository terkontrol untuk SOP, formulir, checklist, jobdesc dan template strategis fakultas.</p></div><button className="primary-btn" id="upload-mock">+ Unggah Dokumen</button></div>
      <div className="doc-toolbar"><input id="doc-search" className="search" placeholder="Cari SOP atau dokumen..."/><select id="doc-category"><option value="all">Semua kategori</option><option>Kepemimpinan & Tata Kelola</option><option>Mutu, Akreditasi & SPMI</option><option>SDM & Akademik</option><option>Keuangan & Sarana</option><option>Kerja Sama & Eksternal</option><option>Krisis & Etika</option></select><select id="doc-status"><option value="all">Semua status</option><option>Aktif</option><option>Perlu Review</option><option>Draft</option></select></div>
      <div className="doc-summary"><div><strong>41</strong><span>SOP</span></div><div><strong>12</strong><span>Form</span></div><div><strong>11</strong><span>Checklist</span></div><div><strong>8</strong><span>Jobdesc</span></div><div><strong>6</strong><span>Template Bonus</span></div></div>
      <article className="panel"><div id="document-list" className="document-list"></div></article>
    </section>

    <section id="view-alerts" className="view">
      <div className="section-intro"><div><span className="badge danger">COMMAND & CONTROL</span><h2>Alert & Tindak Lanjut</h2><p>Early warning, eskalasi otomatis, penugasan PIC dan pemantauan penyelesaian masalah.</p></div><button className="primary-btn" id="resolve-all-info">Selesaikan Info</button></div>
      <div className="alert-filters"><button className="filter active" data-severity="all">Semua</button><button className="filter" data-severity="critical">Kritis</button><button className="filter" data-severity="warning">Waspada</button><button className="filter" data-severity="info">Info</button></div><div id="alert-list" className="alert-list"></div>
    </section>

    <section id="view-integration" className="view">
      <div className="section-intro"><div><span className="badge good">INTEGRATION LAYER</span><h2>Arsitektur Integrasi Data</h2><p>Komponen data yang ditarik dari sistem sumber menuju Faculty Data Center dan dasbor Dekan.</p></div></div>
      <article className="architecture"><div className="arch-col source"><h3>Sumber Data</h3><div>SIAKAD<small>Mahasiswa, nilai, kelulusan, kelas</small></div><div>SIMPEG / BKD<small>Dosen, kehadiran, beban kerja</small></div><div>SPMI / AMI<small>Audit, RTM, tindak lanjut mutu</small></div><div>Keuangan<small>Pagu, realisasi, pencairan</small></div><div>Riset & PPM<small>Penelitian, publikasi, pengabdian</small></div><div>Kerja Sama<small>MoU, MoA, IA, mitra</small></div></div><div className="flow-arrow">→</div><div className="arch-col core"><h3>Faculty Data Center</h3><div>API Gateway<small>REST / Webhook / ETL</small></div><div>Operational Data Store<small>data terkini & tervalidasi</small></div><div>Data Warehouse<small>historis & analitik</small></div><div>Rule & Alert Engine<small>threshold, SLA, eskalasi</small></div><div>Audit Log<small>siapa, kapan, perubahan apa</small></div></div><div className="flow-arrow">→</div><div className="arch-col output"><h3>Command Center</h3><div>Executive Dashboard<small>health score & KPI</small></div><div>Early Warning<small>email / WA / push / in-app</small></div><div>Decision Support<small>tren, gap, prioritas</small></div><div>Compliance Report<small>AMI, akreditasi, kinerja</small></div><div>Mobile View<small>monitoring pimpinan</small></div></div></article>
      <div className="content-grid"><article className="panel wide"><div className="card-head"><div><div className="eyebrow">DATA CONTRACT</div><h2>Data Wajib dari Program Studi</h2></div></div><div className="table-wrap"><table><thead><tr><th>Domain</th><th>Data Minimum</th><th>Frekuensi</th><th>Owner</th><th>Validasi</th></tr></thead><tbody><tr><td>Akademik</td><td>Mahasiswa aktif, KRS, nilai, IPK, kelulusan, masa studi</td><td>Near real-time</td><td>Kaprodi / Akademik</td><td>Rule SIAKAD</td></tr><tr><td>Mutu</td><td>AMI, temuan, RTL, LED, bukti akreditasi</td><td>Harian</td><td>GPM</td><td>Approval berjenjang</td></tr><tr><td>SDM</td><td>Kehadiran, BKD, JAD, publikasi, kompetensi</td><td>Harian</td><td>Kepegawaian</td><td>SIMPEG/BKD</td></tr><tr><td>Keuangan</td><td>Pagu, realisasi, komitmen, SPJ, status pencairan</td><td>Harian</td><td>Keuangan</td><td>Rekonsiliasi</td></tr><tr><td>Kerja Sama</td><td>MoU/MoA/IA, masa berlaku, implementasi, outcome</td><td>Mingguan</td><td>Kerja Sama</td><td>Dokumen legal</td></tr></tbody></table></div></article><article className="panel"><div className="card-head"><div><div className="eyebrow">DATA QUALITY</div><h2>Kualitas Integrasi</h2></div></div><div className="bar-list"><div><span>Completeness</span><b>96%</b><i><em style={{width: '96%'}}></em></i></div><div><span>Freshness</span><b>92%</b><i><em style={{width: '92%'}}></em></i></div><div><span>Validity</span><b>98%</b><i><em style={{width: '98%'}}></em></i></div><div><span>Consistency</span><b>94%</b><i><em style={{width: '94%'}}></em></i></div></div></article></div>
    </section>
  </main>
</div><div className="toast" id="toast"></div><div className="modal-backdrop" id="modal-backdrop"><div className="modal"><button className="modal-close" id="modal-close">×</button><div id="modal-content"></div></div></div>
      <Script src="/dashboard-app.js" strategy="lazyOnload" />
    </>
  );
}