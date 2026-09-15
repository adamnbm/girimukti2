const fs = require('fs');
const path = require('path');

const images = [
  // Hero
  {
    url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1920&q=85',
    dest: 'assets/images/hero/hero-bg.jpg'
  },
  // 10 Team Members
  {
    // 1. Ketua Tim - M. Fadhil Ar-Rayyan
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-1.jpg'
  },
  {
    // 2. Wakil Ketua - Amanda Putri Lestari
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-2.jpg'
  },
  {
    // 3. Sekretaris - Dimas Arya Pratama
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-3.jpg'
  },
  {
    // 4. Bendahara - Nabilla Khairunnisa
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-4.jpg'
  },
  {
    // 5. Div. Pendidikan - Rian Hidayatullah
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-5.jpg'
  },
  {
    // 6. Div. Kesehatan - dr. Siti Sarah Azzahra
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-6.jpg'
  },
  {
    // 7. Div. Lingkungan - Ilham Maulana
    url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-7.jpg'
  },
  {
    // 8. Div. UMKM - Clarissa Maharani
    url: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-8.jpg'
  },
  {
    // 9. Div. Pubdok - Bagas Dwi Pamungkas
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-9.jpg'
  },
  {
    // 10. Div. Logistik & Humas - Fathur Rahman
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=750&q=85',
    dest: 'assets/images/members/member-10.jpg'
  },

  // 6 Program Kerja
  {
    // Proker 1: Edukasi Bullying SD
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-1.jpg'
  },
  {
    // Proker 2: Pengajian TPA Al-Ikhlas
    url: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-2.jpg'
  },
  {
    // Proker 3: Seminar Stunting
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-3.jpg'
  },
  {
    // Proker 4: Pemilahan Sampah SD
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-4.jpg'
  },
  {
    // Proker 5: Seminar UMKM
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-5.jpg'
  },
  {
    // Proker 6: Inisiatif Sosial & Kreatif
    url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/proker/proker-6.jpg'
  },

  // Gallery (Kilas Balik)
  {
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-4.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-5.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-6.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-7.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=1000&q=85',
    dest: 'assets/images/gallery/gallery-8.jpg'
  }
];

async function downloadAll() {
  console.log(`Starting download of ${images.length} assets...`);
  for (const item of images) {
    const fullPath = path.resolve(__dirname, '..', item.dest);
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    try {
      const res = await fetch(item.url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();
      fs.writeFileSync(fullPath, Buffer.from(arrayBuffer));
      console.log(`✓ Saved: ${item.dest} (${(arrayBuffer.byteLength / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error downloading ${item.dest}:`, err.message);
    }
  }
  console.log('All downloads completed!');
}

downloadAll();
