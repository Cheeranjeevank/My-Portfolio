document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const cursorGlow = document.getElementById('cursorGlow');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successState = document.getElementById('successState');
    const backBtn = document.getElementById('backBtn');
    const toast = document.getElementById('toast');
    
    // Inbox DOM Elements
    const openInboxBtn = document.getElementById('openInboxBtn');
    const closeInboxBtn = document.getElementById('closeInboxBtn');
    const clearInboxBtn = document.getElementById('clearInboxBtn');
    const inboxModal = document.getElementById('inboxModal');
    const messageList = document.getElementById('messageList');
    const inboxCount = document.getElementById('inboxCount');
    const inboxCountTag = document.getElementById('inboxCountTag');

    // ==========================================================================
    // 1. Toast Notification Helper
    // ==========================================================================
    let toastTimeout;
    const showToast = (message) => {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 2600);
    };

    // ==========================================================================
    // 2. Mouse Tracking Glow Effect
    // ==========================================================================
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursorGlow.style.left = `${x}px`;
            cursorGlow.style.top = `${y}px`;
        });
    }

    // ==========================================================================
    // 3. Navbar Scroll Blur & Mobile Menu
    // ==========================================================================
    const handleScroll = () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Hamburger Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('open');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });

        const openMobileMenu = () => {
            navMenu.classList.add('open');
            navToggle.classList.add('open');
            navToggle.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };

        const closeMobileMenu = () => {
            navMenu.classList.remove('open');
            navToggle.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        // Close on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('open') && 
                !navMenu.contains(e.target) && 
                !navToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }

    // ==========================================================================
    // 4. Scroll Reveal Animations
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 5. ScrollSpy for Navigation Links
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '-20% 0px -50% 0px'
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // ==========================================================================
    // 6. Project Category Filtering
    // ==========================================================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.classList.add('active');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ==========================================================================
    // 7. Contact Form Validation & Submission
    // ==========================================================================
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            const group = input.parentElement;
            
            input.addEventListener('input', () => {
                if (group.classList.contains('invalid')) {
                    group.classList.remove('invalid');
                }
            });

            input.addEventListener('blur', () => {
                validateField(input);
            });
        });

        const validateEmail = (email) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
        };

        const validatePhone = (phone) => {
            const re = /^[+]?[0-9\s\-()]{7,20}$/;
            return re.test(String(phone).trim());
        };

        const validateField = (input) => {
            const group = input.parentElement;
            const val = input.value.trim();
            let isValid = true;

            if (input.type === 'email') {
                isValid = validateEmail(val);
            } else if (input.type === 'tel') {
                isValid = validatePhone(val);
            } else {
                isValid = val !== '';
            }

            if (!isValid) {
                group.classList.add('invalid');
            } else {
                group.classList.remove('invalid');
            }

            return isValid;
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isFormValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });

            if (isFormValid) {
                submitForm();
            }
        });

        const submitForm = () => {
            const nameVal = document.getElementById('name').value.trim();
            const emailVal = document.getElementById('email').value.trim();
            const phoneVal = document.getElementById('phone').value.trim();
            const occupationVal = document.getElementById('occupation').value.trim();
            const messageVal = document.getElementById('message').value.trim();
            
            const newMessage = {
                id: Date.now().toString(),
                name: nameVal,
                email: emailVal,
                phone: phoneVal,
                occupation: occupationVal,
                message: messageVal,
                timestamp: new Date().toLocaleString()
            };

            const existingMessages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
            existingMessages.unshift(newMessage);
            localStorage.setItem('portfolio_messages', JSON.stringify(existingMessages));

            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                successState.classList.add('active');
                updateInboxBadge();
                renderMessages();
                showToast('Message stored in your local inbox!');
            }, 1800);
        };
    }

    if (backBtn && successState && contactForm) {
        backBtn.addEventListener('click', () => {
            successState.classList.remove('active');
            contactForm.reset();
        });
    }

    // ==========================================================================
    // 7. Message Inbox Component
    // ==========================================================================
    const updateInboxBadge = () => {
        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        const count = messages.length;
        if (inboxCount) inboxCount.textContent = count;
        if (inboxCountTag) inboxCountTag.textContent = `${count} ${count === 1 ? 'Message' : 'Messages'}`;
    };

    const renderMessages = () => {
        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        updateInboxBadge();
        messageList.innerHTML = '';

        if (messages.length === 0) {
            messageList.innerHTML = `
                <div class="no-messages">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <p>No messages received yet.</p>
                </div>
            `;
            return;
        }

        messages.forEach(msg => {
            const card = document.createElement('div');
            card.className = 'message-card';
            card.innerHTML = `
                <div class="msg-header">
                    <span class="msg-sender">${escapeHtml(msg.name)}</span>
                    <span class="msg-date">${msg.timestamp}</span>
                </div>
                <div class="msg-meta">
                    <div class="meta-item">📧 <a href="mailto:${escapeHtml(msg.email)}">${escapeHtml(msg.email)}</a></div>
                    <div class="meta-item">📞 <a href="tel:${escapeHtml(msg.phone)}">${escapeHtml(msg.phone)}</a></div>
                    <div class="meta-item">💼 ${escapeHtml(msg.occupation)}</div>
                </div>
                <div class="msg-content">${escapeHtml(msg.message)}</div>
                <button type="button" class="delete-msg-btn" data-id="${msg.id}" title="Delete message" aria-label="Delete message">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                </button>
            `;
            messageList.appendChild(card);
        });

        // Delete button listener
        messageList.querySelectorAll('.delete-msg-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const msgId = btn.getAttribute('data-id');
                deleteMessage(msgId);
            });
        });
    };

    const deleteMessage = (id) => {
        let messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        messages = messages.filter(msg => msg.id !== id);
        localStorage.setItem('portfolio_messages', JSON.stringify(messages));
        renderMessages();
        showToast('Message deleted');
    };

    const clearAllMessages = () => {
        const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');
        if (messages.length === 0) return;
        if (confirm('Are you sure you want to clear all messages?')) {
            localStorage.removeItem('portfolio_messages');
            renderMessages();
            showToast('All messages cleared');
        }
    };

    const escapeHtml = (str) => {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    if (openInboxBtn && inboxModal) {
        openInboxBtn.addEventListener('click', () => {
            renderMessages();
            inboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeInboxBtn.addEventListener('click', () => {
            inboxModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        if (clearInboxBtn) clearInboxBtn.addEventListener('click', clearAllMessages);

        inboxModal.addEventListener('click', (e) => {
            if (e.target === inboxModal) {
                inboxModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Initial badge update
    updateInboxBadge();

    // ==========================================================================
    // 8. One-click Copy for Email and Phone
    // ==========================================================================
    const copyableValues = document.querySelectorAll('.contact-item .value');
    copyableValues.forEach(val => {
        val.addEventListener('contextmenu', (e) => {
            // Allows normal right-click
        });
        val.setAttribute('title', 'Click to open or copy');
    });
});
