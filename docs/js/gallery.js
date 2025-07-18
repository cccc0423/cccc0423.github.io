/**
 * Modern Gallery Lightbox Module
 * Improved version with better performance, accessibility, and mobile support
 */
(() => {
    'use strict';

    // Constants
    const SELECTORS = {
        gallery: '.gallery',
        galleryItem: '.gallery-item',
        galleryCaption: '.gallery-caption',
        lightbox: '.lightbox',
        lightboxContent: '.lightbox-content',
        lightboxInfo: '.lightbox-info',
        closeBtn: '.close',
        prevBtn: '.prev-btn',
        nextBtn: '.next-btn'
    };

    const CLASSES = {
        lightbox: 'lightbox',
        lightboxShow: 'show',
        galleryItem: 'gallery-item',
        galleryCaption: 'gallery-caption',
        loading: 'loading'
    };

    const TIMING = {
        fadeIn: 10,
        fadeOut: 300
    };

    const KEYS = {
        ESCAPE: 'Escape',
        ARROW_LEFT: 'ArrowLeft',
        ARROW_RIGHT: 'ArrowRight',
        SPACE: ' ',
        ENTER: 'Enter'
    };

    class Gallery {
        constructor() {
            this.galleryImages = [];
            this.currentIndex = 0;
            this.lightbox = null;
            this.elements = {};
            this.isOpen = false;
            this.touchStart = null;
            this.lastFocusedElement = null;
            
            this.boundHandlers = {
                keydown: this.handleKeydown.bind(this),
                touchStart: this.handleTouchStart.bind(this),
                touchEnd: this.handleTouchEnd.bind(this)
            };
        }

        init() {
            try {
                this.findGalleryImages();
                if (this.galleryImages.length === 0) {
                    console.log('沒有找到相簿圖片');
                    return;
                }

                this.createLightbox();
                this.setupImageContainers();
                this.bindEvents();
                console.log(`相簿初始化完成！找到 ${this.galleryImages.length} 張圖片`);
            } catch (error) {
                console.error('Gallery initialization failed:', error);
            }
        }

        findGalleryImages() {
            const images = document.querySelectorAll('img');
            this.galleryImages = Array.from(images).filter(img => {
                return img.closest(SELECTORS.gallery);
            });
        }

        createLightbox() {
            if (document.querySelector(SELECTORS.lightbox)) return;

            this.lightbox = document.createElement('div');
            this.lightbox.className = CLASSES.lightbox;
            this.lightbox.setAttribute('role', 'dialog');
            this.lightbox.setAttribute('aria-modal', 'true');
            this.lightbox.setAttribute('aria-label', '圖片燈箱');
            
            this.lightbox.innerHTML = `
                <button class="close" aria-label="關閉燈箱">&times;</button>
                <button class="nav-btn prev-btn" aria-label="上一張圖片">‹</button>
                <button class="nav-btn next-btn" aria-label="下一張圖片">›</button>
                <div class="lightbox-loading" aria-hidden="true">載入中...</div>
                <img class="lightbox-content" alt="" role="img">
                <div class="lightbox-info" aria-live="polite"></div>
            `;
            
            document.body.appendChild(this.lightbox);
            this.cacheElements();
        }

        cacheElements() {
            this.elements = {
                lightboxImg: this.lightbox.querySelector(SELECTORS.lightboxContent),
                lightboxInfo: this.lightbox.querySelector(SELECTORS.lightboxInfo),
                closeBtn: this.lightbox.querySelector(SELECTORS.closeBtn),
                prevBtn: this.lightbox.querySelector(SELECTORS.prevBtn),
                nextBtn: this.lightbox.querySelector(SELECTORS.nextBtn),
                loading: this.lightbox.querySelector('.lightbox-loading')
            };
        }

        setupImageContainers() {
            this.galleryImages.forEach((img, index) => {
                this.setupImageContainer(img, index);
            });
        }

        setupImageContainer(img, index) {
            img.style.cursor = 'pointer';
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            img.setAttribute('aria-label', `查看圖片 ${index + 1}`);

            if (!img.parentElement.classList.contains(CLASSES.galleryItem)) {
                const container = document.createElement('div');
                container.className = CLASSES.galleryItem;
                
                img.parentNode.insertBefore(container, img);
                container.appendChild(img);
                
                if (img.alt?.trim()) {
                    const caption = document.createElement('div');
                    caption.className = CLASSES.galleryCaption;
                    caption.textContent = img.alt;
                    container.appendChild(caption);
                }
            }
        }

        bindEvents() {
            // Image click/keyboard events using delegation
            document.addEventListener('click', this.handleImageClick.bind(this));
            document.addEventListener('keydown', this.handleImageKeydown.bind(this));

            // Lightbox events
            this.elements.closeBtn.addEventListener('click', this.closeLightbox.bind(this));
            this.elements.prevBtn.addEventListener('click', this.prevImage.bind(this));
            this.elements.nextBtn.addEventListener('click', this.nextImage.bind(this));
            
            // Background click
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });

            // Touch events for mobile
            this.lightbox.addEventListener('touchstart', this.boundHandlers.touchStart, { passive: true });
            this.lightbox.addEventListener('touchend', this.boundHandlers.touchEnd, { passive: true });
        }

        handleImageClick(e) {
            const img = e.target.closest('img');
            if (!img || !this.galleryImages.includes(img)) return;
            
            e.preventDefault();
            const index = this.galleryImages.indexOf(img);
            this.openLightbox(index);
        }

        handleImageKeydown(e) {
            if (e.key !== KEYS.ENTER && e.key !== KEYS.SPACE) return;
            
            const img = e.target.closest('img');
            if (!img || !this.galleryImages.includes(img)) return;
            
            e.preventDefault();
            const index = this.galleryImages.indexOf(img);
            this.openLightbox(index);
        }

        handleKeydown(e) {
            if (!this.isOpen) return;

            switch (e.key) {
                case KEYS.ESCAPE:
                    e.preventDefault();
                    this.closeLightbox();
                    break;
                case KEYS.ARROW_LEFT:
                    e.preventDefault();
                    this.prevImage();
                    break;
                case KEYS.ARROW_RIGHT:
                    e.preventDefault();
                    this.nextImage();
                    break;
            }
        }

        handleTouchStart(e) {
            this.touchStart = e.touches[0].clientX;
        }

        handleTouchEnd(e) {
            if (!this.touchStart) return;

            const touchEnd = e.changedTouches[0].clientX;
            const diff = this.touchStart - touchEnd;
            const threshold = 50;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    this.nextImage();
                } else {
                    this.prevImage();
                }
            }

            this.touchStart = null;
        }

        async openLightbox(index) {
            if (index < 0 || index >= this.galleryImages.length) return;

            this.lastFocusedElement = document.activeElement;
            this.currentIndex = index;
            this.isOpen = true;

            // Show lightbox
            this.lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add keyboard listener
            document.addEventListener('keydown', this.boundHandlers.keydown);

            // Show loading state
            this.elements.loading.style.display = 'block';
            this.elements.lightboxImg.style.display = 'none';

            try {
                await this.loadImage(index);
                
                // Hide loading, show image
                this.elements.loading.style.display = 'none';
                this.elements.lightboxImg.style.display = 'block';
                
                // Fade in effect
                setTimeout(() => {
                    this.lightbox.classList.add(CLASSES.lightboxShow);
                }, TIMING.fadeIn);

                // Focus management
                this.elements.closeBtn.focus();
                
                // Preload adjacent images
                this.preloadAdjacentImages();
                
            } catch (error) {
                console.error('Failed to load image:', error);
                this.elements.loading.textContent = '圖片載入失敗';
            }
        }

        async loadImage(index) {
            const img = this.galleryImages[index];
            
            return new Promise((resolve, reject) => {
                const newImg = new Image();
                newImg.onload = () => {
                    this.elements.lightboxImg.src = img.src;
                    this.elements.lightboxImg.alt = img.alt || '圖片';
                    this.updateInfo(index);
                    resolve();
                };
                newImg.onerror = reject;
                newImg.src = img.src;
            });
        }

        preloadAdjacentImages() {
            const preloadIndices = [
                (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length,
                (this.currentIndex + 1) % this.galleryImages.length
            ];

            preloadIndices.forEach(index => {
                if (index !== this.currentIndex) {
                    const img = new Image();
                    img.src = this.galleryImages[index].src;
                }
            });
        }

        updateInfo(index) {
            const counter = `${index + 1} / ${this.galleryImages.length}`;
            const caption = this.galleryImages[index].alt || '';
            
            this.elements.lightboxInfo.textContent = caption 
                ? `${caption} (${counter})` 
                : counter;
        }

        closeLightbox() {
            if (!this.isOpen) return;

            this.isOpen = false;
            this.lightbox.classList.remove(CLASSES.lightboxShow);
            document.body.style.overflow = '';
            
            // Remove keyboard listener
            document.removeEventListener('keydown', this.boundHandlers.keydown);

            setTimeout(() => {
                this.lightbox.style.display = 'none';
                // Restore focus
                if (this.lastFocusedElement) {
                    this.lastFocusedElement.focus();
                }
            }, TIMING.fadeOut);
        }

        async prevImage() {
            if (!this.isOpen) return;
            
            this.currentIndex = (this.currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
            await this.loadImage(this.currentIndex);
            this.preloadAdjacentImages();
        }

        async nextImage() {
            if (!this.isOpen) return;
            
            this.currentIndex = (this.currentIndex + 1) % this.galleryImages.length;
            await this.loadImage(this.currentIndex);
            this.preloadAdjacentImages();
        }

        // Public API
        destroy() {
            document.removeEventListener('keydown', this.boundHandlers.keydown);
            if (this.lightbox) {
                this.lightbox.remove();
            }
        }

        testGallery() {
            if (this.galleryImages.length > 0) {
                this.openLightbox(0);
            }
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const gallery = new Gallery();
            gallery.init();
            window.testGallery = () => gallery.testGallery();
        });
    } else {
        const gallery = new Gallery();
        gallery.init();
        window.testGallery = () => gallery.testGallery();
    }
})();