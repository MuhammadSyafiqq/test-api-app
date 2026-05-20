// ============================================
// SPEAKUP — DARK MODE TOGGLE
// Web3 Glassmorphism Theme Switcher
// ============================================

(function () {
    'use strict';

    // ── Terapkan tema SEBELUM render (hindari flash) ──
    const saved = localStorage.getItem('speakup-theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);

    // ── Update label & thumb setelah DOM ready ──
    function applyUI(theme) {
        const label = document.getElementById('toggle-label');
        const thumb = document.getElementById('toggle-thumb');
        if (!label || !thumb) return;

        if (theme === 'dark') {
            label.textContent = 'Dark';
            label.style.color = '#818cf8';
            thumb.innerHTML   = '🌙';
        } else {
            label.textContent = 'Light';
            label.style.color = '';
            thumb.innerHTML   = '☀️';
        }
    }

    // ── Toggle fungsi utama ──
    window.toggleTheme = function () {
        const html    = document.documentElement;
        const current = html.getAttribute('data-theme') || 'light';
        const next    = current === 'light' ? 'dark' : 'light';

        // Tambah class transisi khusus sementara
        html.classList.add('theme-transitioning');

        // Terapkan tema baru
        html.setAttribute('data-theme', next);
        localStorage.setItem('speakup-theme', next);
        applyUI(next);

        // Particle burst effect
        createToggleBurst(next);

        // Hapus class transisi setelah selesai
        setTimeout(() => html.classList.remove('theme-transitioning'), 400);
    };

    // ── Efek partikel saat toggle ──
    function createToggleBurst(theme) {
        const btn = document.getElementById('theme-toggle');
        if (!btn) return;

        const rect   = btn.getBoundingClientRect();
        const cx     = rect.left + rect.width / 2;
        const cy     = rect.top  + rect.height / 2;
        const colors = theme === 'dark'
            ? ['#818cf8', '#6366f1', '#a5b4fc', '#c7d2fe', '#fbbf24']
            : ['#fbbf24', '#f59e0b', '#fcd34d', '#4F46E5', '#10b981'];

        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'theme-particle';
            const angle  = (i / 10) * Math.PI * 2;
            const dist   = 30 + Math.random() * 30;
            const size   = 4 + Math.random() * 6;
            const color  = colors[Math.floor(Math.random() * colors.length)];

            Object.assign(particle.style, {
                position     : 'fixed',
                left         : cx + 'px',
                top          : cy + 'px',
                width        : size + 'px',
                height       : size + 'px',
                borderRadius : '50%',
                background   : color,
                pointerEvents: 'none',
                zIndex       : '9999',
                transform    : 'translate(-50%, -50%)',
                transition   : 'all 0.5s cubic-bezier(.4,0,.2,1)',
                opacity      : '1',
            });

            document.body.appendChild(particle);

            requestAnimationFrame(() => {
                particle.style.left      = (cx + Math.cos(angle) * dist) + 'px';
                particle.style.top       = (cy + Math.sin(angle) * dist) + 'px';
                particle.style.opacity   = '0';
                particle.style.transform = 'translate(-50%,-50%) scale(0)';
            });

            setTimeout(() => particle.remove(), 600);
        }
    }

    // ── Init saat DOM ready ──
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const theme = localStorage.getItem('speakup-theme') || 'light';
            document.documentElement.setAttribute('data-theme', theme);
            applyUI(theme);
        });
    } else {
        const theme = localStorage.getItem('speakup-theme') || 'light';
        applyUI(theme);
    }

})();