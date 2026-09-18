"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const defaultData = {
  programs: [
    ['FT UNSOED Command Center', 'Dashboard data terintegrasi untuk monitoring akademik, SDM, mahasiswa, penelitian, keuangan, kerja sama, dan KPI.'],
    ['FT Digital Campus', 'Transformasi layanan akademik dan administrasi menuju smart faculty yang cepat dan mudah diakses.'],
    ['Academic Excellence 2030', 'Penguatan kurikulum OBE, pembelajaran digital, AI-assisted learning, dan kualitas program studi.'],
    ['Research & Innovation Hub', 'Ekosistem penelitian, laboratorium, inovasi, HKI, startup, dan hilirisasi.'],
    ['Professor & Doctor Acceleration', 'Akselerasi studi doktoral, profesor, publikasi, dan peningkatan kapasitas akademik.'],
    ['Global Engineering Network', 'Visiting professor, student exchange, joint research, dan global classroom.'],
    ['Industry Link & Match', 'Kolaborasi industri untuk kurikulum, magang, riset, sertifikasi, dan rekrutmen.'],
    ['Student Excellence Center', 'Pembinaan prestasi, organisasi, kewirausahaan, karier, dan wellbeing mahasiswa.'],
    ['Alumni Connect', 'Jejaring alumni, mentoring, career networking, scholarship, dan kontribusi alumni.'],
    ['Green & Sustainable Engineering Campus', 'Lingkungan akademik hijau, sehat, aman, inklusif, dan berkelanjutan.']
  ],
  kpis: [
    ['Akreditasi Program Studi', '75%'], ['Dosen Doktor', '68%'], ['Research Output', '62%'], ['Kerja Sama Internasional', '55%'], ['Prestasi Mahasiswa', '72%'], ['Graduate Employability', '80%'], ['Digitalisasi Layanan', '70%'], ['Kepuasan Layanan', '84%']
  ]
};

export default function KampanyePage() {
  const { data: session } = useSession();
  const [data, setData] = useState(defaultData);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState("");

  useEffect(() => {
    const local = localStorage.getItem('dekanData');
    if (local) {
      try {
        setData({ ...defaultData, ...JSON.parse(local) });
      } catch (e) { }
    }

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);

    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    }), { threshold: 0.12 });

    // Slight delay to allow React to render DOM before observing
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      io.disconnect();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('Mengirim...');

    const isAnonymous = e.target.anonymous.checked;
    const name = e.target.name.value;
    const category = e.target.category.value;
    const message = e.target.message.value;

    try {
      const res = await fetch('/api/aspirasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, message, isAnonymous }),
      });

      if (res.ok) {
        e.target.reset();
        setFormStatus('Terima kasih. Aspirasi Anda telah berhasil dikirim dan dicatat!');
      } else {
        setFormStatus('Maaf, terjadi kesalahan saat mengirim aspirasi.');
      }
    } catch (error) {
      setFormStatus('Gagal terhubung ke server.');
    }
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`} id="top">
        <nav className="nav container" aria-label="Navigasi utama">
          <a className="brand" href="#top" aria-label="Beranda">
            <img src="/assets/logo-unsoed.png" alt="Logo Universitas Jenderal Soedirman" />
            <span><strong>FT UNSOED</strong><small>Transformasi 2026–2030</small></span>
          </a>
          <button className="nav-toggle" aria-label="Buka menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#profil" onClick={() => setMenuOpen(false)}>Profil</a>
            <a href="#visi" onClick={() => setMenuOpen(false)}>Visi & Misi</a>
            <a href="#program" onClick={() => setMenuOpen(false)}>Program</a>
            <a href="#roadmap" onClick={() => setMenuOpen(false)}>Roadmap</a>
            <a href="#kpi" onClick={() => setMenuOpen(false)}>KPI</a>
            <a href="#aspirasi" onClick={() => setMenuOpen(false)}>Aspirasi</a>
            {session ? (
              <Link className="btn btn-sm btn-primary" href="/dashboard">Command Center →</Link>
            ) : (
              <>
                <Link className="btn btn-sm btn-outline" href="/api/auth/signin" style={{ padding: "8px 14px", marginLeft: "10px", borderColor: "rgba(255,255,255,0.4)" }}>Login</Link>
                <a className="btn btn-sm btn-gold" href="#aspirasi">Bersama Membangun FT</a>
              </>
            )}
          </div>
        </nav>
      </header>

      <main>
        <section className="hero section-dark">
          <div className="hero-bg" aria-hidden="true"></div>
          <div className="container hero-grid">
            <div className="hero-copy reveal">
              <span className="eyebrow">BAKAL CALON DEKAN FAKULTAS TEKNIK UNSOED • 2026–2030</span>
              <h1>Dr. Ir. Nurul Hidayat, M.Kom</h1>
              <p className="hero-title">Dosen Jurusan Informatika • Fakultas Teknik Universitas Jenderal Soedirman</p>
              <h2>Transformasi Fakultas Teknik UNSOED: <span>Unggul, Adaptif, Kolaboratif, dan Berdampak.</span></h2>
              <p className="hero-lead">Membangun Fakultas Teknik melalui kepemimpinan kolaboratif, tata kelola berbasis data, penguatan SDM, inovasi akademik, jejaring strategis, serta ekosistem mahasiswa dan alumni yang semakin kuat.</p>
              <div className="hero-actions">
                <a className="btn btn-primary" href="#visi">Lihat Visi 2026–2030</a>
                <a className="btn btn-outline" href="#program">Jelajahi Program Strategis</a>
              </div>
              <div className="hero-pills">
                <span>Data-Driven Leadership</span><span>Digital Faculty</span><span>Global Collaboration</span>
              </div>
            </div>
            <div className="hero-portrait reveal">
              <div className="portrait-card">
                <img src="/assets/nurul-hidayat.jpg" alt="Dr. Ir. Nurul Hidayat, M.Kom" />
                <div className="portrait-caption">
                  <strong>Dr. Ir. Nurul Hidayat, M.Kom</strong>
                  <span>Fakultas Teknik UNSOED</span>
                </div>
              </div>
            </div>
          </div>
          <a className="scroll-indicator" href="#momentum" aria-label="Scroll ke bawah">↓</a>
        </section>

        <section className="building-band" aria-label="Fakultas Teknik UNSOED">
          <img src="/assets/gedung-ft.png" alt="Gedung Fakultas Teknik Universitas Jenderal Soedirman" />
          <div className="building-overlay">
            <div className="container">
              <span>FUTURE FACULTY OF ENGINEERING</span>
              <h2>FT UNSOED 2030</h2>
            </div>
          </div>
        </section>

        <section id="momentum" className="section">
          <div className="container">
            <div className="section-head reveal">
              <span className="eyebrow dark">MOMENTUM TRANSFORMASI</span>
              <h2>Mengapa FT UNSOED harus melangkah lebih jauh?</h2>
              <p>Perubahan teknologi, kebutuhan industri, internasionalisasi pendidikan, perkembangan AI, dan tuntutan tata kelola perguruan tinggi menuntut fakultas bergerak lebih cepat, terukur, adaptif, dan kolaboratif.</p>
            </div>
            <div className="grid-3 feature-grid">
              <article className="card reveal"><div className="icon">◎</div><h3>Academic Excellence</h3><p>Penguatan mutu pendidikan berbasis OBE, teknologi, dan kebutuhan masa depan.</p></article>
              <article className="card reveal"><div className="icon">⌘</div><h3>Digital Transformation</h3><p>Digitalisasi tata kelola, layanan, monitoring, dan pengambilan keputusan.</p></article>
              <article className="card reveal"><div className="icon">✦</div><h3>Research & Innovation</h3><p>Penguatan riset, inovasi, hilirisasi, publikasi, dan kolaborasi strategis.</p></article>
              <article className="card reveal"><div className="icon">◫</div><h3>Human Capital</h3><p>Pengembangan kapasitas dosen, tenaga kependidikan, mahasiswa, dan alumni.</p></article>
              <article className="card reveal"><div className="icon">∞</div><h3>Global Collaboration</h3><p>Perluasan jejaring akademik, industri, alumni, dan mitra internasional.</p></article>
              <article className="card reveal"><div className="icon">↗</div><h3>Impact</h3><p>Meningkatkan kontribusi Fakultas Teknik bagi masyarakat, industri, dan pembangunan.</p></article>
            </div>
          </div>
        </section>

        <section id="profil" className="section section-soft">
          <div className="container profile-grid">
            <div className="profile-image reveal"><img src="/assets/nurul-hidayat.jpg" alt="Foto profil Dr. Ir. Nurul Hidayat, M.Kom" /></div>
            <div className="profile-copy reveal">
              <span className="eyebrow dark">PROFIL KANDIDAT</span>
              <h2>Mengenal Dr. Ir. Nurul Hidayat, M.Kom</h2>
              <p className="accent-line">Akademisi • Technopreneur • Innovator • Collaborative Leader</p>
              <p>Website ini dirancang sebagai ruang untuk menyampaikan gagasan, visi, program kerja, indikator keberhasilan, dan membuka kanal aspirasi sivitas akademika dalam proses pencalonan Dekan Fakultas Teknik UNSOED periode 2026–2030.</p>
              <div className="profile-facts">
                <div><span>Homebase</span><strong>Jurusan Informatika</strong></div>
                <div><span>Fakultas</span><strong>Fakultas Teknik UNSOED</strong></div>
                <div><span>Periode</span><strong>2026–2030</strong></div>
                <div><span>Fokus</span><strong>Transformasi & Kolaborasi</strong></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <a className="text-link" href="#aspirasi">Sampaikan ide untuk FT UNSOED →</a>
                <a className="btn btn-luxury" href="https://technopreneurplus.blogspot.com/" target="_blank" rel="noopener noreferrer">Visit Profil Dr. ENHA ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-dark" style={{ background: 'linear-gradient(145deg, #061a33, #020914)' }}>
          <div className="container profile-grid">
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="eyebrow" style={{ color: '#f3b61f' }}>ENHAPODCAST</span>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: '1.1', marginBottom: '16px' }}>Kenali Lebih Dekat</h2>
              <p style={{ color: '#bac8da', fontSize: '18px', lineHeight: '1.6', marginBottom: '24px' }}>Dengarkan berbagai perbincangan inspiratif dan mendalam seputar ilmu-ilmu kehidupan, pengembangan diri, serta ragam sudut pandang bijak dalam menyikapi dinamika keseharian.</p>
              <div>
                <a className="btn btn-luxury" href="https://youtube.com/@enhapodcast?si=Q9eP-2Ma38egbbGT" target="_blank" rel="noopener noreferrer">
                  Lihat Semua Konten ↗
                </a>
              </div>
            </div>
            <div className="video-wrapper reveal" style={{ borderRadius: '24px', border: '1px solid rgba(243, 182, 31, 0.25)', boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 40px rgba(243, 182, 31, 0.1)' }}>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/Ei3tbig0gxM?si=9Hn08UVd4xFEHKHn" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
          </div>
        </section>

        <section id="visi" className="section section-dark vision-section">
          <div className="container">
            <div className="section-head light reveal"><span className="eyebrow">ARAH KEPEMIMPINAN</span><h2>Visi FT UNSOED 2030</h2></div>
            <blockquote className="vision-quote reveal">“Mewujudkan Fakultas Teknik UNSOED sebagai fakultas teknik yang unggul, adaptif, inovatif, kolaboratif, berdaya saing global, serta memberikan dampak nyata bagi pembangunan masyarakat dan bangsa.”</blockquote>
            <div className="grid-3 mission-grid">
              <article className="mission reveal"><b>01</b><h3>Pendidikan Unggul</h3><p>Pendidikan teknik yang relevan, adaptif, berbasis OBE, teknologi, dan kebutuhan masa depan.</p></article>
              <article className="mission reveal"><b>02</b><h3>SDM Berkualitas</h3><p>Meningkatkan kapasitas, kompetensi, produktivitas, dan kesejahteraan SDM.</p></article>
              <article className="mission reveal"><b>03</b><h3>Riset & Inovasi</h3><p>Mendorong penelitian unggulan, inovasi, publikasi, HKI, dan hilirisasi.</p></article>
              <article className="mission reveal"><b>04</b><h3>Tata Kelola Modern</h3><p>Tata kelola transparan, akuntabel, efektif, efisien, dan berbasis data.</p></article>
              <article className="mission reveal"><b>05</b><h3>Kolaborasi & Internasionalisasi</h3><p>Memperkuat jejaring universitas, pemerintah, industri, alumni, dan mitra global.</p></article>
              <article className="mission reveal"><b>06</b><h3>Mahasiswa & Alumni</h3><p>Membangun ekosistem mahasiswa berprestasi serta jaringan alumni yang kuat.</p></article>
            </div>
          </div>
        </section>

        <section id="program" className="section">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow dark">10 FLAGSHIP PROGRAMS</span><h2>Dari gagasan menjadi program yang dapat dieksekusi</h2><p>Setiap program dirancang agar memiliki target, indikator, penanggung jawab, dan mekanisme monitoring.</p></div>
            <div className="program-grid">
              {data.programs.map((p, i) => (
                <article key={i} className="program-card reveal">
                  <div className="program-number">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3>{p[0]}</h3>
                    <p>{p[1]}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="command-center" className="section section-dark command-section">
          <div className="container command-grid">
            <div className="reveal">
              <span className="eyebrow">FT UNSOED COMMAND CENTER</span>
              <h2>From Data to Decision.</h2>
              <p>Dashboard pimpinan untuk mengintegrasikan data akademik, mahasiswa, SDM, penelitian, keuangan, kerja sama, akreditasi, sarana prasarana, risiko, dan KPI fakultas.</p>
              <div className="command-tags">
                <span>Akademik</span><span>Mahasiswa</span><span>SDM</span><span>Riset</span><span>Keuangan</span><span>Kerja Sama</span><span>Akreditasi</span><span>KPI</span>
              </div>
            </div>
            <div className="dashboard reveal" aria-label="Demo Dashboard — Data Ilustrasi">
              <div className="dash-top"><span>FT UNSOED / COMMAND CENTER</span><span className="live-dot">● LIVE DEMO</span></div>
              <div className="dash-kpis">
                <div><small>Student Achievement</small><strong>↑ 18%</strong></div>
                <div><small>Research Output</small><strong>↑ 24%</strong></div>
                <div><small>Global Partnership</small><strong>↑ 12%</strong></div>
                <div><small>Service SLA</small><strong>92%</strong></div>
              </div>
              <div className="chart-bars" aria-hidden="true">
                <i style={{ height: '36%' }}></i><i style={{ height: '58%' }}></i><i style={{ height: '48%' }}></i><i style={{ height: '72%' }}></i><i style={{ height: '66%' }}></i><i style={{ height: '88%' }}></i><i style={{ height: '78%' }}></i><i style={{ height: '96%' }}></i>
              </div>
              <p className="demo-note">Demo Dashboard — data bersifat ilustratif.</p>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="100hari">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow dark">ACTION PLAN</span><h2>100 Hari Pertama</h2><p>Dimulai dari mendengar, menyelaraskan, lalu mengeksekusi quick wins secara terukur.</p></div>
            <div className="timeline reveal">
              <div className="timeline-item"><span>01</span><div><small>HARI 1–30</small><h3>Listen & Mapping</h3><p>Aspirasi sivitas, audit kondisi organisasi, pemetaan KPI, dan identifikasi quick wins.</p></div></div>
              <div className="timeline-item"><span>02</span><div><small>HARI 31–60</small><h3>Design & Alignment</h3><p>Penyelarasan Renstra–Renop, agenda transformasi, task force, dan rancangan dashboard.</p></div></div>
              <div className="timeline-item"><span>03</span><div><small>HARI 61–100</small><h3>Execution</h3><p>Peluncuran quick wins, Command Center versi awal, dan penguatan layanan prioritas.</p></div></div>
            </div>
          </div>
        </section>

        <section id="roadmap" className="section">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow dark">ROADMAP 2026–2030</span><h2>Lima fase transformasi FT UNSOED</h2></div>
            <div className="roadmap reveal">
              <article><strong>2026</strong><span>FOUNDATION</span><p>Fondasi tata kelola, digitalisasi, integrasi data, dan quick wins.</p></article>
              <article><strong>2027</strong><span>ACCELERATION</span><p>Akselerasi akademik, SDM, penelitian, layanan, dan kerja sama.</p></article>
              <article><strong>2028</strong><span>EXPANSION</span><p>Ekspansi inovasi, industri, alumni, dan internasionalisasi.</p></article>
              <article><strong>2029</strong><span>RECOGNITION</span><p>Peningkatan rekognisi nasional dan internasional.</p></article>
              <article><strong>2030</strong><span>IMPACT</span><p>Fakultas Teknik unggul, berkelanjutan, dan berdampak.</p></article>
            </div>
          </div>
        </section>

        <section id="kpi" className="section section-soft">
          <div className="container">
            <div className="section-head reveal"><span className="eyebrow dark">KPI DASHBOARD</span><h2>Kepemimpinan harus dapat diukur.</h2><p>Dari janji menjadi indikator kinerja. Nilai berikut adalah contoh tampilan dan dapat diganti melalui halaman admin.</p></div>
            <div className="kpi-grid">
              {data.kpis.map((k, i) => (
                <article key={i} className="kpi-card reveal">
                  <span>{k[0]}</span>
                  <strong>{k[1]}</strong>
                  <div className="progress"><i style={{ width: parseInt(k[1]) || 50 + '%' }}></i></div>
                  <small>Demo target/progress</small>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-dark student-section">
          <div className="container split">
            <div className="reveal"><span className="eyebrow">STUDENT FIRST</span><h2>Mahasiswa sebagai pusat transformasi</h2><p>Academic support, prestasi, kepemimpinan, kewirausahaan, karier, wellbeing, magang, international exposure, beasiswa, dan alumni mentoring.</p></div>
            <div className="student-cards reveal"><span>Prestasi</span><span>Leadership</span><span>Entrepreneurship</span><span>Career</span><span>Wellbeing</span><span>Global Exposure</span></div>
          </div>
        </section>

        <section id="aspirasi" className="section">
          <div className="container aspiration-grid">
            <div className="reveal"><span className="eyebrow dark">ASPIRASI FT UNSOED</span><h2>Suara Anda, masa depan FT UNSOED.</h2><p>Transformasi Fakultas Teknik dimulai dengan mendengarkan. Sampaikan ide, masalah, peluang, atau usulan program.</p><div className="quote-card">“Fakultas yang hebat tidak dibangun oleh satu orang, tetapi oleh seluruh sivitas akademika yang bergerak dalam visi yang sama.”</div></div>
            <form className="aspiration-form card reveal" id="aspirationForm" onSubmit={handleSubmit}>
              <label>Nama <span>(opsional)</span><input name="name" type="text" placeholder="Nama Anda" /></label>
              <label>Kategori
                <select name="category" required>
                  <option value="">Pilih kategori</option>
                  <option>Akademik</option><option>SDM</option><option>Mahasiswa</option><option>Alumni</option><option>Infrastruktur</option><option>Digitalisasi</option><option>Penelitian</option><option>Kerja Sama</option><option>Lainnya</option>
                </select>
              </label>
              <label>Aspirasi / Gagasan<textarea name="message" rows="6" required placeholder="Tuliskan aspirasi Anda..."></textarea></label>
              <label className="check"><input name="anonymous" type="checkbox" /> Kirim secara anonim</label>
              <button className="btn btn-primary" type="submit">Kirim Aspirasi</button>
              <p className="form-status" role="status">{formStatus}</p>
            </form>
          </div>
        </section>

        <section className="cta section-dark">
          <div className="container cta-inner reveal">
            <div>
              <span className="eyebrow">FT UNSOED 2030</span>
              <h2>Bersama Membangun Fakultas Teknik UNSOED</h2>
              <p>Unggul dalam Akademik • Kuat dalam Kolaborasi • Cepat dalam Transformasi • Nyata dalam Kontribusi</p>
            </div>
            <a className="btn btn-gold" href="#aspirasi">Sampaikan Aspirasi</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src="/assets/enha.png" alt="Logo ENHA" />
            <div>
              <strong>Dr. Ir. Nurul Hidayat, M.Kom</strong>
              <span>Calon Dekan FT UNSOED 2026–2030</span>
            </div>
          </div>
          <div><a href="#profil">Profil</a><a href="#visi">Visi</a><a href="#program">Program</a><a href="#roadmap">Roadmap</a></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a href="#aspirasi">Aspirasi</a>
              <a href="#top">Kembali ke Atas</a>
            </div>
            <div style={{ marginTop: 'auto' }}>
              <a href="https://youtube.com/@enhapodcast?si=Q9eP-2Ma38egbbGT" target="_blank" rel="noopener noreferrer" className="btn btn-luxury" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', width: 'max-content', padding: '12px 18px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#ff0000"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                <span style={{ color: '#fff', fontWeight: '800', letterSpacing: '0.05em' }}>ENHAPODCAST</span>
              </a>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">Website ini merupakan media penyampaian gagasan, visi, program, dan aspirasi dalam proses pencalonan Dekan Fakultas Teknik UNSOED periode 2026–2030. Identitas institusi digunakan untuk konteks akademik dan perlu mengikuti ketentuan resmi universitas.</div>
      </footer>
    </>
  );
}
