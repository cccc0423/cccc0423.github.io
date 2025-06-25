// 安全版相簿 JavaScript（括號版本）
console.log('載入相簿功能...');

// 等待頁面完全載入
window.addEventListener('load', function() {
    console.log('頁面載入完成，開始初始化相簿');
    
    // 尋找所有圖片
    const images = document.querySelectorAll('img');
    console.log('找到總共', images.length, '張圖片');
    
    // 找出在 .gallery 內的圖片
    const galleryImages = [];
    images.forEach((img, index) => {
        // 檢查圖片是否在包含 'gallery' 的元素內
        let parent = img.parentElement;
        while (parent) {
            if (parent.className && parent.className.includes('gallery')) {
                galleryImages.push(img);
                console.log('找到相簿圖片', index + 1, ':', img.src);
                break;
            }
            parent = parent.parentElement;
        }
    });
    
    if (galleryImages.length === 0) {
        console.log('沒有找到相簿圖片');
        return;
    }
    
    console.log('總共找到', galleryImages.length, '張相簿圖片');
    
    // 創建燈箱
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <span class="close">&times;</span>
        <button class="nav-btn prev-btn">‹</button>
        <button class="nav-btn next-btn">›</button>
        <img class="lightbox-content" alt="放大圖片">
        <div class="lightbox-info"></div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-content');
    const lightboxInfo = lightbox.querySelector('.lightbox-info');
    const closeBtn = lightbox.querySelector('.close');
    const prevBtn = lightbox.querySelector('.prev-btn');
    const nextBtn = lightbox.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    // 格式化燈箱資訊顯示（括號方式）
    function formatLightboxInfo(index) {
        const counter = `${index + 1} / ${galleryImages.length}`;
        const caption = galleryImages[index].alt || '';
        
        if (caption) {
            return `${caption} (${counter})`;
        } else {
            return counter;
        }
    }
    
    // 開啟燈箱
    function openLightbox(index) {
        console.log('開啟燈箱，圖片索引:', index);
        currentIndex = index;
        
        lightboxImg.src = galleryImages[index].src;
        lightboxImg.alt = galleryImages[index].alt || '圖片';
        lightboxInfo.textContent = formatLightboxInfo(index);
        
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            lightbox.classList.add('show');
        }, 10);
    }
    
    // 關閉燈箱
    function closeLightbox() {
        console.log('關閉燈箱');
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
        
        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 300);
    }
    
    // 上一張
    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxImg.alt = galleryImages[currentIndex].alt || '圖片';
        lightboxInfo.textContent = formatLightboxInfo(currentIndex);
    }
    
    // 下一張
    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex].src;
        lightboxImg.alt = galleryImages[currentIndex].alt || '圖片';
        lightboxInfo.textContent = formatLightboxInfo(currentIndex);
    }
    
    // 綁定圖片點擊事件並添加說明文字
    galleryImages.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('點擊了圖片', index + 1);
            openLightbox(index);
        });
        
        // 檢查圖片是否已經在容器中
        if (!img.parentElement.classList.contains('gallery-item')) {
            // 創建容器
            const container = document.createElement('div');
            container.className = 'gallery-item';
            
            // 將圖片包裝在容器中
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);
            
            // 如果有 alt 文字，添加 caption
            if (img.alt && img.alt.trim()) {
                const caption = document.createElement('div');
                caption.className = 'gallery-caption';
                caption.textContent = img.alt;
                container.appendChild(caption);
            }
        }
    });
    
    // 綁定燈箱事件
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', prevImage);
    nextBtn.addEventListener('click', nextImage);
    
    // 點擊背景關閉
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // 鍵盤事件
    document.addEventListener('keydown', function(e) {
        if (lightbox.style.display === 'block') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
            }
        }
    });
    
    console.log('相簿初始化完成！');
    
    // 測試功能
    window.testGallery = function() {
        console.log('測試開啟第一張圖片...');
        if (galleryImages.length > 0) {
            openLightbox(0);
        }
    };
});