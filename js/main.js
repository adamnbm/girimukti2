/**
 * Main Interactive Script for KKN Girimukti 2
 * Dark Cinematic & Yearbook Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initScrollSpy();
  initBackToTop();
  initInteractiveCards();
  initMusicPlayer();
  initProkerModal();
  initScrollReveal();
  initHeroSlideshow();
  initProkerMobileCarousel();
  initGalleryManager();
});

/**
 * Hero Background Slideshow
 * Auto-cycles through hero slides every 5s with a smooth crossfade
 */
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-bg-slide');
  if (!slides || slides.length < 2) return;

  let current = 0;
  const INTERVAL = 5000; // ms between slides

  function nextSlide() {
    const prev = current;
    current = (current + 1) % slides.length;

    // Mark previous as leaving
    slides[prev].classList.remove('hero-bg-slide--active');
    slides[prev].classList.add('hero-bg-slide--prev');

    // Activate next
    slides[current].classList.add('hero-bg-slide--active');

    // Clean up prev class after transition finishes
    setTimeout(() => {
      slides[prev].classList.remove('hero-bg-slide--prev');
    }, 1500);
  }

  // Kick off the interval
  setInterval(nextSlide, INTERVAL);
}

/**
 * Navbar scroll behavior & mobile menu
 */
function initNavbar() {
  const navbar = document.querySelector('.header-navbar');
  const toggleBtn = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Add scroll style to navbar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggleBtn.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu on nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggleBtn.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/**
 * ScrollSpy to highlight active navigation link based on current section
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Back to top floating button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Card dynamic subtle mouse tilt and glow
 */
function initInteractiveCards() {
  const cards = document.querySelectorAll('.team-card, .proker-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * Background Music Controller
 */
function initMusicPlayer() {
  const audio = document.getElementById('bgMusic');
  const toggleBtn = document.getElementById('musicToggleBtn');
  const playIcon = document.getElementById('musicPlayIcon');
  const pauseIcon = document.getElementById('musicPauseIcon');
  const label = document.getElementById('musicLabel');

  if (!audio || !toggleBtn) return;

  // Set comfortable initial volume
  audio.volume = 0.55;

  function updateUI(isPlaying) {
    if (isPlaying) {
      toggleBtn.classList.add('playing');
      if (playIcon) playIcon.style.display = 'none';
      if (pauseIcon) pauseIcon.style.display = 'inline-block';
      if (label) label.textContent = 'Jeda Musik';
    } else {
      toggleBtn.classList.remove('playing');
      if (playIcon) playIcon.style.display = 'inline-block';
      if (pauseIcon) pauseIcon.style.display = 'none';
      if (label) label.textContent = 'Putar Musik';
    }
  }

  function toggleAudio() {
    if (audio.paused) {
      audio.play().then(() => {
        updateUI(true);
      }).catch(err => {
        console.log('Playback error:', err);
      });
    } else {
      audio.pause();
      updateUI(false);
    }
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAudio();
  });

  audio.addEventListener('play', () => updateUI(true));
  audio.addEventListener('pause', () => updateUI(false));
  audio.addEventListener('ended', () => updateUI(false));

  // Autoplay softly on first user interaction anywhere on the page
  let autoPlayed = false;
  function triggerAutoplay() {
    if (!autoPlayed && audio.paused) {
      autoPlayed = true;
      audio.play().then(() => {
        updateUI(true);
      }).catch(() => {
        // Browser blocked audio until explicit button click
      });
    }
  }


  document.addEventListener('click', triggerAutoplay, { once: true });
}

/**
 * Proker Detail Modal
 * Opens a cinematic overlay with detail info + photo gallery when a proker card is clicked
 */
function initProkerModal() {
  // ── Data for each proker ──────────────────────────────────────────────
  const prokerData = {
    '1': {
      badge: 'PROKER 01',
      title: '01. Edukasi Bullying — Anak SD',
      heroImg: 'assets/images/proker/proker-1.jpg',
      sasaran: 'Siswa Kelas 4–6 SDN Girimukti',
      output: 'Deklarasi Anti-Perundungan & Duta Sahabat',
      desc: 'Menanamkan keberanian, membangun empati, dan meningkatkan kesadaran sejak dini tentang pencegahan tindakan perundungan di lingkungan sekolah.',
      detail: 'Kegiatan ini dilaksanakan dalam bentuk sesi edukasi interaktif dengan metode role-play, diskusi kelompok, dan pembuatan poster anti-bullying. Anak-anak diajak untuk memahami bentuk-bentuk perundungan, dampaknya, dan cara melapor dengan aman. Puncak kegiatan ditandai dengan Deklarasi Anti-Perundungan bersama dan pelantikan Duta Sahabat yang bertugas menjaga iklim sekolah yang aman dan ramah.',
      photos: [
        { src: 'assets/images/proker/proker-1.jpg', cap: 'Sesi Edukasi Interaktif' },
        { src: 'assets/images/gallery/IMG_6701.JPG', cap: 'Diskusi Kelompok Siswa' },
        { src: 'assets/images/gallery/IMG_6835.jpg', cap: 'Pembuatan Poster Anti-Bullying' },
        { src: 'assets/images/gallery/IMG_7039.jpg', cap: 'Deklarasi Anti-Perundungan' },
        { src: 'assets/images/gallery/IMG_7044.jpg', cap: 'Pelantikan Duta Sahabat' },
        { src: 'assets/images/gallery/IMG_6599.jpg', cap: 'Foto Bersama Siswa & Mahasiswa' },
        { src: 'assets/images/gallery/IMG_7056.jpg', cap: 'Interaksi & Pendampingan Kelas' },
        { src: 'assets/images/gallery/IMG_6617.JPG', cap: 'Apresiasi & Hadiah Motivasi' }
      ],
    },
    '2': {
      badge: 'PROKER 02',
      title: '02. Pengajian & Bimbingan TPA Al-Ikhlas',
      heroImg: 'assets/images/proker/proker-2.jpg',
      sasaran: 'Santri TPA Al-Ikhlas Girimukti',
      output: 'Lomba Adzan, Tahfidz & Doa Harian',
      desc: 'Pendampingan rutin kegiatan mengaji, peningkatan hafalan surat pendek, serta penanaman nilai-nilai keagamaan bagi anak-anak di TPA Al-Ikhlas.',
      detail: 'Program ini dilaksanakan secara rutin setiap minggu dengan agenda: pendampingan iqra/Al-Qur\'an, hafalan surat pendek Juz 30, dan pembelajaran adab islami. Sebagai penutup program, diadakan Lomba Adzan antar santri, Lomba Tahfidz 5 surat pendek, dan Lomba Bacaan Doa Harian yang diikuti oleh puluhan santri dengan antusias tinggi dari orang tua dan pengurus masjid.',
      photos: [
        { src: 'assets/images/proker/proker-2.jpg', cap: 'Bimbingan Mengaji Rutin' },
        { src: 'assets/images/gallery/IMG_6746.JPG', cap: 'Pembelajaran Iqra & Tilawati' },
        { src: 'assets/images/gallery/IMG_6751.JPG', cap: 'Hafalan Surat Pendek Juz 30' },
        { src: 'assets/images/gallery/IMG_7111.jpg', cap: 'Pelaksanaan Lomba Adzan' },
        { src: 'assets/images/gallery/IMG_7147 (1).jpg', cap: 'Lomba Tahfidz & Doa Harian' },
        { src: 'assets/images/gallery/IMG_7160.jpg', cap: 'Foto Bersama Santri & Pengurus' },
        { src: 'assets/images/gallery/IMG_7164.jpg', cap: 'Penyerahan Sertifikat & Hadiah' }
      ],
    },
    '3': {
      badge: 'PROKER 03',
      title: '03. Seminar Edukasi Stunting',
      heroImg: 'assets/images/proker/proker-3.jpg',
      sasaran: 'Ibu Balita & Kader Posyandu',
      output: 'Buku Menu PMT & Buku Pantau Pertumbuhan',
      desc: 'Penyuluhan kesehatan mengenai pentingnya gizi seimbang, pola asuh, dan pencegahan stunting demi tumbuh kembang anak yang optimal.',
      detail: 'Seminar ini mencakup: definisi dan dampak stunting, panduan gizi 1000 hari pertama kehidupan, cara membuat menu Pemberian Makanan Tambahan (PMT) bergizi dari bahan lokal, serta cara pengisian Buku Pantau Pertumbuhan anak secara mandiri oleh ibu-ibu. Seluruh peserta mendapat buku panduan praktis sebagai bekal.',
      photos: [
        { src: 'assets/images/proker/proker-3.jpg', cap: 'Seminar Pemaparan Stunting' },
        { src: 'assets/images/gallery/IMG_6837.jpg', cap: 'Materi Pangan & Gizi Seimbang' },
        { src: 'assets/images/gallery/IMG_7092.jpg', cap: 'Sesi Diskusi Bersama Ibu Balita' },
        { src: 'assets/images/gallery/IMG_7166 (1).jpg', cap: 'Demo Olahan Makanan Tambahan (PMT)' },
        { src: 'assets/images/gallery/IMG_7196.jpg', cap: 'Pendampingan Kader Posyandu' },
        { src: 'assets/images/gallery/IMG_7490 (1).jpg', cap: 'Pembagian Buku Pantau Pertumbuhan' },
        { src: 'assets/images/gallery/IMG_7522 (2).jpg', cap: 'Dokumentasi Peserta Seminar' }
      ],
    },
    '4': {
      badge: 'PROKER 04',
      title: '04. Edukasi & Pemilahan Sampah — Anak SD',
      heroImg: 'assets/images/proker/proker-4.jpg',
      sasaran: 'Siswa-Siswi SDN Girimukti',
      output: 'Instalasi Tempat Sampah 3 Warna & Bank Sampah Sekolah',
      desc: 'Praktik langsung mengenalkan jenis-jenis sampah, cara pemilahan organik dan anorganik, serta menumbuhkan kepedulian lingkungan sejak dini.',
      detail: 'Kegiatan dikemas dalam format yang menyenangkan: game tebak sampah, video animasi daur ulang, dan praktik langsung memilah sampah ke tempat yang benar. Sebagai hasil nyata, dipasang 3 set tempat sampah berwarna (hijau: organik, kuning: anorganik, merah: B3) di area strategis sekolah, dan dibentuk Bank Sampah Sekolah yang dikelola oleh siswa dengan pendampingan guru.',
      photos: [
        { src: 'assets/images/proker/proker-4.jpg', cap: 'Edukasi Pemilahan Sampah' },
        { src: 'assets/images/gallery/IMG_7523 (1).jpg', cap: 'Simulasi Pemilahan Sampah' },
        { src: 'assets/images/gallery/IMG_7525 (1).jpg', cap: 'Praktik Pemilahan Organik & Anorganik' },
        { src: 'assets/images/gallery/IMG_7528 (1).jpg', cap: 'Penyerahan Tempat Sampah 3 Warna' },
        { src: 'assets/images/gallery/IMG_7530 (1).jpg', cap: 'Pembentukan Bank Sampah Sekolah' },
        { src: 'assets/images/gallery/IMG_7533 (1).jpg', cap: 'Aksi Bersih Lingkungan Sekolah' },
        { src: 'assets/images/gallery/IMG_7994.JPG', cap: 'Foto Bersama Guru & Siswa' }
      ],
    },
    '5': {
      badge: 'PROKER 05',
      title: '05. Seminar UMKM',
      heroImg: 'assets/images/proker/proker-5.jpg',
      sasaran: 'Pelaku Usaha & Pengrajin Desa',
      output: 'Katalog Digital & Optimasi Kemasan Produk',
      desc: 'Sesi edukasi strategis untuk membantu pengembangan usaha lokal, pengenalan digitalisasi bisnis, serta teknik promosi produk UMKM.',
      detail: 'Seminar UMKM dihadiri oleh puluhan pelaku usaha desa dengan agenda: pengenalan platform digital (Tokopedia, Shopee, Instagram Bisnis), tips foto produk menggunakan smartphone, strategi penetapan harga dan branding produk lokal, serta workshop desain kemasan menggunakan Canva. Setiap peserta mendapat template katalog digital dan panduan praktis pemasaran online yang bisa langsung diterapkan.',
      photos: [
        { src: 'assets/images/proker/proker-5.jpg', cap: 'Seminar Strategi UMKM' },
        { src: 'assets/images/gallery/IMG_7996.JPG', cap: 'Materi Digitalisasi & Marketplace' },
        { src: 'assets/images/gallery/IMG_8013.JPG', cap: 'Workshop Desain Kemasan Produk' },
        { src: 'assets/images/gallery/IMG_8166.JPG', cap: 'Pelatihan Foto Produk Smartphone' },
        { src: 'assets/images/gallery/IMG_20260815_080741_628.jpg', cap: 'Pembuatan Katalog Digital' },
        { src: 'assets/images/gallery/IMG_20260821_073353_848 (1).jpg', cap: 'Diskusi Bersama Pelaku Usaha Desa' },
        { src: 'assets/images/gallery/IMG_20260821_073422_128.jpg', cap: 'Dokumentasi Kelompok UMKM' }
      ],
    },
    '6': {
      badge: 'PROKER 06',
      title: '06. Inisiatif Sosial & Kreatif',
      heroImg: 'assets/images/proker/proker-6.jpg',
      sasaran: 'Segenap Warga Desa Girimukti',
      output: 'Revitalisasi Gapura, Plang Petunjuk & Ruang Kreatif',
      desc: 'Dokumentasi kegiatan harian, gotong royong, partisipasi warga, dan branding karya kelompok sebagai warisan nyata KKN.',
      detail: 'Program inisiatif sosial mencakup serangkaian aksi nyata bersama warga: gotong royong membersihkan saluran air dan fasilitas umum, pengecatan dan revitalisasi gapura desa, pemasangan plang petunjuk arah di titik strategis, serta pembuatan mural di sudut desa sebagai ruang ekspresi pemuda. Seluruh kegiatan didokumentasikan secara visual untuk arsip desa dan media sosial kelompok.',
      photos: [
        { src: 'assets/images/proker/proker-6.jpg', cap: 'Inisiatif Sosial & Gotong Royong' },
        { src: 'assets/images/gallery/IMG-20260809-WA0039.jpg', cap: 'Kerja Bakti Fasilitas Umum' },
        { src: 'assets/images/gallery/IMG-20260815-WA0098.jpg', cap: 'Pengecatan & Revitalisasi Gapura' },
        { src: 'assets/images/gallery/IMG-20260815-WA0128.jpg', cap: 'Pemasangan Plang Petunjuk Arah' },
        { src: 'assets/images/gallery/20260824_203442 (1).jpg', cap: 'Malam Keakraban Bersama Warga' },
        { src: 'assets/images/gallery/WhatsApp Image 2026-08-12 at 19.36.33 (2).jpeg', cap: 'Pembuatan Mural Ruang Kreatif' },
        { src: 'assets/images/gallery/WhatsApp Image 2026-08-14 at 21.32.22.jpeg', cap: 'Dokumentasi Kebersamaan Desa' },
        { src: 'assets/images/gallery/WhatsApp Image 2026-08-25 at 13.00.23 (1).jpeg', cap: 'Penutupan Pengabdian KKN' }
      ],
    },
  };

  // ── DOM references ────────────────────────────────────────────────────
  const overlay  = document.getElementById('prokerModalOverlay');
  const panel    = document.getElementById('prokerModalPanel');
  const closeBtn = document.getElementById('prokerModalClose');
  const heroImg  = document.getElementById('prokerModalHeroImg');
  const badge    = document.getElementById('prokerModalBadge');
  const title    = document.getElementById('prokerModalTitle');
  const infoRow  = document.getElementById('prokerModalInfoRow');
  const desc     = document.getElementById('prokerModalDesc');
  const detail   = document.getElementById('prokerModalDetail');

  if (!overlay) return;

  // ── Open modal ────────────────────────────────────────────────────────
  function openModal(id) {
    const data = prokerData[id];
    if (!data) return;

    heroImg.src = data.heroImg;
    heroImg.alt = data.title;
    badge.textContent = data.badge;
    title.textContent = data.title;

    infoRow.innerHTML = `
      <div class="proker-modal-info-item">
        <span class="proker-modal-info-label">Sasaran</span>
        <span class="proker-modal-info-value">${data.sasaran}</span>
      </div>
      <div class="proker-modal-info-item">
        <span class="proker-modal-info-label">Output</span>
        <span class="proker-modal-info-value">${data.output}</span>
      </div>
    `;

    desc.textContent = data.desc;
    detail.innerHTML = `<p>${data.detail}</p>`;

    panel.scrollTop = 0;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  // ── Close modal ───────────────────────────────────────────────────────
  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ── Attach click to proker cards ──────────────────────────────────────
  document.querySelectorAll('.proker-card[data-proker-id]').forEach(card => {
    card.addEventListener('click', () => {
      openModal(card.dataset.prokerId);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.prokerId);
      }
    });
  });

  // ── Close listeners ───────────────────────────────────────────────────
  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}


/**
 * Scroll Reveal Animation
 * Uses IntersectionObserver to trigger fade-up animation when elements enter viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('[data-reveal]');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve after reveal so animation only plays once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/**
 * Proker Mobile Carousel Dots & Scroll Synchronization
 */
function initProkerMobileCarousel() {
  const grid = document.querySelector('.proker-grid');
  const dots = document.querySelectorAll('.proker-dot');
  const cards = document.querySelectorAll('.proker-card');
  if (!grid || !dots.length || !cards.length) return;

  let scrollTimeout;
  function updateActiveDot() {
    const gridCenter = grid.scrollLeft + grid.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const diff = Math.abs(cardCenter - gridCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = index;
      }
    });

    dots.forEach((dot, idx) => {
      if (idx === closestIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  grid.addEventListener('scroll', () => {
    if (!scrollTimeout) {
      scrollTimeout = setTimeout(() => {
        updateActiveDot();
        scrollTimeout = null;
      }, 50);
    }
  }, { passive: true });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      if (cards[idx]) {
        cards[idx].scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    });
  });
}

/**
 * Gallery Manager: Initial Collage (8 foto) + Popup Modal (semua foto)
 */
function initGalleryManager() {
  const toggleBtn  = document.getElementById('galleryToggleBtn');
  const modalOverlay = document.getElementById('galleryModalOverlay');
  const modalClose   = document.getElementById('galleryModalClose');
  const modalGrid    = document.getElementById('galleryModalGrid');
  const modalCount   = document.getElementById('galleryModalCount');
  const totalCountEl = document.getElementById('galleryTotalCount');

  // All photos in assets/images/gallery
  const ALL_PHOTOS = [
    { src: 'assets/images/gallery/IMG_6599.jpg',   alt: 'Kebersamaan Tim KKN', caption: 'Momen kebersamaan tim KKN Girimukti 2' },
    { src: 'assets/images/gallery/IMG_6617.JPG',   alt: 'Kekompakan Posko', caption: 'Kekompakan tim di posko KKN' },
    { src: 'assets/images/gallery/IMG_6626.JPG',   alt: 'Potret Girimukti', caption: 'Potret indah kehidupan Girimukti' },
    { src: 'assets/images/gallery/IMG_6639.JPG',   alt: 'Dedikasi Tim KKN', caption: 'Dedikasi penuh dalam pengabdian' },
    { src: 'assets/images/gallery/IMG_6701.JPG',   alt: 'Kegiatan KKN', caption: 'Aktivitas program kerja bersama warga' },
    { src: 'assets/images/gallery/IMG_6746.JPG',   alt: 'Suasana Desa', caption: 'Suasana hangat Desa Girimukti' },
    { src: 'assets/images/gallery/IMG_6751.JPG',   alt: 'Momen Bersama', caption: 'Momen tak terlupakan bersama tim' },
    { src: 'assets/images/gallery/IMG_6835.jpg',   alt: 'Aktivitas KKN', caption: 'Semangat dalam setiap kegiatan KKN' },
    { src: 'assets/images/gallery/IMG_6837.jpg',   alt: 'Program Pengabdian', caption: 'Program pengabdian nyata di desa' },
    { src: 'assets/images/gallery/IMG_7039.jpg',   alt: 'Kegiatan Warga', caption: 'Kegiatan bersama masyarakat Girimukti' },
    { src: 'assets/images/gallery/IMG_7044.jpg',   alt: 'Semangat Pengabdian', caption: 'Semangat pengabdian yang tak padam' },
    { src: 'assets/images/gallery/IMG_7056.jpg',   alt: 'Interaksi Warga', caption: 'Interaksi hangat dengan warga desa' },
    { src: 'assets/images/gallery/IMG_7069.jpg',   alt: 'Malam Keakraban', caption: 'Malam keakraban yang berkesan' },
    { src: 'assets/images/gallery/IMG_7092.jpg',   alt: 'Kunjungan Lapangan', caption: 'Kunjungan lapangan bersama tim' },
    { src: 'assets/images/gallery/IMG_7111.jpg',   alt: 'Kegiatan Sosial', caption: 'Kegiatan sosial dan kemasyarakatan' },
    { src: 'assets/images/gallery/IMG_7147 (1).jpg', alt: 'Momen Istimewa', caption: 'Momen istimewa pengabdian KKN' },
    { src: 'assets/images/gallery/IMG_7160.jpg',   alt: 'Tim KKN', caption: 'Tim KKN Girimukti 2 bersatu padu' },
    { src: 'assets/images/gallery/IMG_7164.jpg',   alt: 'Pengabdian Desa', caption: 'Pengabdian tulus untuk Girimukti' },
    { src: 'assets/images/gallery/IMG_7166 (1).jpg', alt: 'Kenangan KKN', caption: 'Kenangan indah bersama warga' },
    { src: 'assets/images/gallery/IMG_7196.jpg',   alt: 'Dokumentasi KKN', caption: 'Dokumentasi perjalanan KKN' },
    { src: 'assets/images/gallery/IMG_7490 (1).jpg', alt: 'Kebersamaan', caption: 'Kebersamaan yang penuh makna' },
    { src: 'assets/images/gallery/IMG_7522 (2).jpg', alt: 'Aktivitas Desa', caption: 'Aktivitas sehari-hari di desa' },
    { src: 'assets/images/gallery/IMG_7523 (1).jpg', alt: 'Kolaborasi', caption: 'Kolaborasi produktif bersama warga' },
    { src: 'assets/images/gallery/IMG_7525 (1).jpg', alt: 'Karya KKN', caption: 'Karya nyata tim KKN Girimukti 2' },
    { src: 'assets/images/gallery/IMG_7528 (1).jpg', alt: 'Gotong Royong', caption: 'Semangat gotong royong bersama' },
    { src: 'assets/images/gallery/IMG_7530 (1).jpg', alt: 'Kegiatan Produktif', caption: 'Kegiatan produktif berdampak nyata' },
    { src: 'assets/images/gallery/IMG_7533 (1).jpg', alt: 'Moment KKN', caption: 'Momen berharga selama KKN' },
    { src: 'assets/images/gallery/IMG_7994.JPG',   alt: 'Program KKN', caption: 'Program KKN yang berkesan' },
    { src: 'assets/images/gallery/IMG_7996.JPG',   alt: 'Kenangan Desa', caption: 'Kenangan tak terlupakan di Girimukti' },
    { src: 'assets/images/gallery/IMG_8013.JPG',   alt: 'Pengabdian KKN', caption: 'Pengabdian sepenuh hati untuk desa' },
    { src: 'assets/images/gallery/IMG_8166.JPG',   alt: 'Akhir KKN', caption: 'Penutupan dan perpisahan yang haru' },
    { src: 'assets/images/gallery/IMG_20260815_080741_628.jpg', alt: 'Kebersamaan Tim', caption: 'Kebersamaan tim yang solid dan kompak' },
    { src: 'assets/images/gallery/IMG_20260821_073353_848 (1).jpg', alt: 'Pagi di Desa', caption: 'Pagi bersemangat di Desa Girimukti' },
    { src: 'assets/images/gallery/IMG_20260821_073422_128.jpg', alt: 'Suasana Pagi', caption: 'Suasana pagi yang menyejukkan di desa' },
    { src: 'assets/images/gallery/IMG-20260809-WA0039.jpg', alt: 'Pengabdian', caption: 'Momen pengabdian bersama masyarakat' },
    { src: 'assets/images/gallery/IMG-20260815-WA0098.jpg', alt: 'Kegiatan Bersama', caption: 'Kegiatan bersama yang penuh kenangan' },
    { src: 'assets/images/gallery/IMG-20260815-WA0128.jpg', alt: 'Tim Solid', caption: 'Tim yang solid dan berdedikasi' },
    { src: 'assets/images/gallery/20260824_203442 (1).jpg', alt: 'Malam Keakraban', caption: 'Malam penuh keakraban dan kehangatan' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-12 at 19.36.33 (2).jpeg', alt: 'Kegiatan Desa', caption: 'Berbagai kegiatan di desa Girimukti' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-14 at 21.32.22.jpeg', alt: 'Kolaborasi Warga', caption: 'Kolaborasi hangat bersama warga desa' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-14 at 21.32.25 (2).jpeg', alt: 'Kehangatan KKN', caption: 'Kehangatan yang terjalin selama KKN' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-14 at 21.32.25.jpeg', alt: 'Momen Bersama', caption: 'Momen bersama yang tak terlupakan' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-14 at 21.32.31.jpeg', alt: 'Kenangan KKN', caption: 'Kenangan indah selama pengabdian KKN' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-25 at 10.15.00.jpeg', alt: 'Perpisahan', caption: 'Momen haru perpisahan dengan desa' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-25 at 13.00.23 (1).jpeg', alt: 'Akhir Pengabdian', caption: 'Akhir perjalanan pengabdian KKN' },
    { src: 'assets/images/gallery/WhatsApp Image 2026-08-25 at 13.00.23 (2).jpeg', alt: 'Dokumentasi Akhir', caption: 'Dokumentasi akhir KKN Girimukti 2' },
    { src: 'assets/images/gallery/gallery-9.jpg',  alt: 'Koordinasi Tim', caption: 'Koordinasi dan diskusi tim KKN' },
  ];

  const totalPhotos = ALL_PHOTOS.length;

  // Update count badges
  if (totalCountEl) totalCountEl.textContent = totalPhotos;
  if (modalCount) modalCount.textContent = totalPhotos + ' Foto';

  // Build Modal Grid (lazy, only when first opened)
  function buildModalGrid() {
    if (!modalGrid || modalGrid.children.length > 0) return;
    modalGrid.innerHTML = ALL_PHOTOS.map((photo, idx) => {
      return '<div class="gm-item" data-idx="' + idx + '" >' +
        '<img src="' + photo.src + '" alt="' + photo.alt + '" loading="lazy">' +
        '' +
        '</div>';
    }).join('');

    // Clicking a photo in modal opens full-screen lightbox
    modalGrid.querySelectorAll('.gm-item').forEach(function(item) {
      item.addEventListener('click', function() {
        var idx = parseInt(item.dataset.idx, 10);
        if (window.appModalLightbox) {
          window.appModalLightbox.open(idx);
        }
      });
    });
  }

  // Open / Close Modal
  function openModal() {
    buildModalGrid();
    if (modalOverlay) {
      modalOverlay.classList.add('is-open');
      modalOverlay.setAttribute('aria-hidden', 'false');
      modalOverlay.scrollTop = 0;
    }
    document.body.style.overflow = 'hidden';

    // Init modal lightbox for the modal photos
    if (!window.appModalLightbox) {
      window.appModalLightbox = new ModalGalleryLightbox(ALL_PHOTOS);
    } else {
      window.appModalLightbox.setPhotos(ALL_PHOTOS);
    }
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('is-open');
      modalOverlay.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  // Button click -> open modal
  if (toggleBtn) {
    toggleBtn.addEventListener('click', openModal);
  }

  // Close button
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  // Click backdrop -> close
  if (modalOverlay) {
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/**
 * Lightweight lightbox for modal gallery photos
 */
class ModalGalleryLightbox {
  constructor(photos) {
    this.photos = photos || [];
    this.currentIdx = 0;
    this.modal = null;
    this.img = null;
    
    this.counter = null;
    this._buildDOM();
    this._bindEvents();
  }

  setPhotos(photos) {
    this.photos = photos;
  }

  _buildDOM() {
    const existing = document.getElementById('modalGalleryLightbox');
    if (existing) { this.modal = existing; return; }

    const html = '<div id="modalGalleryLightbox" class="mgl-overlay" aria-hidden="true">' +
      '<div class="mgl-backdrop"></div>' +
      '<button class="mgl-btn mgl-close" id="mglClose" aria-label="Tutup">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<button class="mgl-btn mgl-prev" id="mglPrev" aria-label="Sebelumnya">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>' +
      '</button>' +
      '<button class="mgl-btn mgl-next" id="mglNext" aria-label="Selanjutnya">' +
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>' +
      '</button>' +
      '<div class="mgl-wrapper">' +
      '<div class="mgl-img-wrap"><img src="" alt="" class="mgl-img" id="mglImg"></div>' +
      '<div class="mgl-footer"><span class="mgl-counter" id="mglCounter"></span></div>' +
      '</div></div>';
    document.body.insertAdjacentHTML('beforeend', html);

    this.modal = document.getElementById('modalGalleryLightbox');
    this.img = document.getElementById('mglImg');
    
    this.counter = document.getElementById('mglCounter');
  }

  _bindEvents() {
    const self = this;
    document.getElementById('mglClose').addEventListener('click', () => self.close());
    document.getElementById('mglPrev').addEventListener('click', (e) => { e.stopPropagation(); self.prev(); });
    document.getElementById('mglNext').addEventListener('click', (e) => { e.stopPropagation(); self.next(); });
    this.modal.querySelector('.mgl-backdrop').addEventListener('click', () => self.close());
    window.addEventListener('keydown', (e) => {
      if (!self.modal.classList.contains('mgl-active')) return;
      if (e.key === 'Escape') self.close();
      if (e.key === 'ArrowLeft') self.prev();
      if (e.key === 'ArrowRight') self.next();
    });
    // Touch swipe
    let tx = 0;
    this.modal.addEventListener('touchstart', (e) => { tx = e.changedTouches[0].screenX; }, { passive: true });
    this.modal.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].screenX - tx;
      if (dx < -50) self.next();
      if (dx > 50) self.prev();
    }, { passive: true });
  }

  open(idx) {
    this.currentIdx = (idx + this.photos.length) % this.photos.length;
    this._render();
    this.modal.classList.add('mgl-active');
    this.modal.setAttribute('aria-hidden', 'false');
  }

  close() {
    this.modal.classList.remove('mgl-active');
    this.modal.setAttribute('aria-hidden', 'true');
  }

  prev() { this.open(this.currentIdx - 1); }
  next() { this.open(this.currentIdx + 1); }

  _render() {
    const p = this.photos[this.currentIdx];
    this.img.src = p.src;
    this.img.alt = p.alt;
    
    if (this.counter) this.counter.textContent = (this.currentIdx + 1) + ' / ' + this.photos.length;
  }
}

