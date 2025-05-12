document.addEventListener('DOMContentLoaded', function() {
    // ヘッダースクロール効果
    const header = document.querySelector('.site-header');
    const pageTop = document.querySelector('.page-top');
    
    function scrollHandler() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            pageTop.classList.add('visible');
        } else {
            header.classList.remove('scrolled');
            pageTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', scrollHandler);
    
    // モバイルメニュートグル
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        
        // メニューが開いている場合はボタンをXマークに変更
        const spans = menuToggle.querySelectorAll('span');
        if (navList.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // ナビゲーションリンククリック時のスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // モバイルメニューが開いている場合は閉じる
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const headerHeight = header.offsetHeight;
                
                window.scrollTo({
                    top: offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ページトップボタン
    pageTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // フォーム送信処理
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // ここに実際のフォーム送信処理を追加
            
            // 送信成功メッセージ（実際の実装では適宜変更）
            alert('お問い合わせを受け付けました。担当者より折り返しご連絡いたします。');
            inquiryForm.reset();
        });
    }
    
    // 画像の遅延読み込み（Intersection Observer API）
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Intersection Observer APIがサポートされていない場合のフォールバック
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                img.setAttribute('src', src);
                img.removeAttribute('data-src');
            }
        });
    }
    
    // スクロールアニメーション
    if ('IntersectionObserver' in window) {
        const fadeInElements = document.querySelectorAll('.fade-in');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeInObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeInElements.forEach(element => {
            fadeInObserver.observe(element);
        });
    } else {
        // Intersection Observer APIがサポートされていない場合のフォールバック
        document.querySelectorAll('.fade-in').forEach(element => {
            element.classList.add('visible');
        });
    }
});