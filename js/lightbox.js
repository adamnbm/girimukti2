/**
 * Lightbox Modal Controller for KKN Girimukti 2
 */

class Lightbox {
  constructor() {
    this.items = [];
    this.currentIndex = 0;
    this.modal = null;
    this.imageEl = null;
    this.captionEl = null;
    this.categoryEl = null;
    this.counterEl = null;

    this.init();
  }

  init() {
    this.buildModalDOM();
    this.bindEvents();
  }

  buildModalDOM() {
    const modalHTML = `
      <div class="lightbox-modal" id="lightbox-modal" aria-hidden="true" role="dialog">
        <div class="lightbox-backdrop"></div>
        <button class="lightbox-btn lightbox-close" id="lightbox-close" aria-label="Tutup Galeri">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <button class="lightbox-btn lightbox-prev" id="lightbox-prev" aria-label="Foto Sebelumnya">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button class="lightbox-btn lightbox-next" id="lightbox-next" aria-label="Foto Selanjutnya">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
        <div class="lightbox-wrapper">
          <div class="lightbox-image-container">
            <img src="" alt="" class="lightbox-image" id="lightbox-image">
          </div>
          <div class="lightbox-footer">
            <div class="lightbox-counter" id="lightbox-counter">1 / 8</div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    this.modal = document.getElementById('lightbox-modal');
    this.imageEl = document.getElementById('lightbox-image');
    this.captionEl = null;
    this.categoryEl = null;
    this.counterEl = document.getElementById('lightbox-counter');
  }

  bindEvents() {
    this.refresh();

    // Close on backdrop click
    this.modal.querySelector('.lightbox-backdrop').addEventListener('click', () => this.close());
    document.getElementById('lightbox-close').addEventListener('click', () => this.close());

    // Navigation buttons
    document.getElementById('lightbox-prev').addEventListener('click', (e) => {
      e.stopPropagation();
      this.prev();
    });

    document.getElementById('lightbox-next').addEventListener('click', (e) => {
      e.stopPropagation();
      this.next();
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
      if (!this.modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    this.modal.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    this.modal.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) this.next();
      if (touchEndX - touchStartX > 50) this.prev();
    }, { passive: true });
  }

  refresh() {
    // Collect all gallery items
    const galleryItems = document.querySelectorAll('.gallery-item, [data-lightbox="gallery"]');
    this.items = Array.from(galleryItems).map((el, index) => {
      const img = el.querySelector('img');
      const caption = el.getAttribute('data-caption') || el.querySelector('.gallery-caption')?.textContent || img?.alt || 'Dokumentasi KKN Girimukti 2';
      const category = el.getAttribute('data-category') || el.querySelector('.gallery-category')?.textContent || 'Kilas Balik';
      const src = el.getAttribute('data-src') || img?.src || '';

      // Clean old click listener if any by replacing listener
      el.onclick = (e) => {
        e.preventDefault();
        this.open(index);
      };

      return { src, caption, category, element: el };
    });
  }

  open(index) {
    if (!this.items.length) return;
    this.currentIndex = (index + this.items.length) % this.items.length;
    this.render();
    this.modal.classList.add('active');
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.modal.classList.remove('active');
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  prev() {
    this.open(this.currentIndex - 1);
  }

  next() {
    this.open(this.currentIndex + 1);
  }

  render() {
    const item = this.items[this.currentIndex];
    this.imageEl.src = item.src;
    this.imageEl.alt = item.caption;
    this.counterEl.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
  }
}

// Instantiate when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.appLightbox = new Lightbox();
});
