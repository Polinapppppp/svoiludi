document.querySelector('body').classList.add('hidden');

function hidePreloader() {
    const preloader = document.querySelector('.preload');
    if (preloader) {
        document.querySelector('body').classList.remove('hidden');
        preloader.classList.add('hide');
        setTimeout(() => {
            if (preloader) {
                preloader.remove();
            }
        }, 500);
    }
}


let animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/assets/files/preloader.json'
});

window.addEventListener('load', function () {
    setTimeout(hidePreloader, 500);
});
document.addEventListener('DOMContentLoaded', () => {

    const slides = gsap.utils.toArray('.main__title .slide');

    gsap.set(slides, {
        opacity: 0,
        y: 60
    });

    gsap.set(slides[0], {
        opacity: 1,
        y: 0
    });

    const tl = gsap.timeline({
        repeat: -1
    });

    slides.forEach((slide, i) => {

        const next = slides[(i + 1) % slides.length];

        tl.to({}, {
            duration: 2.5
        })

            .to(slide, {
                y: -60,
                opacity: 0,
                duration: .7,
                ease: "power2.inOut"
            })

            .set(next, {
                y: 60,
                opacity: 0
            })

            .to(next, {
                y: 0,
                opacity: 1,
                duration: .7,
                ease: "power2.inOut"
            }, "+=0.15")

            .set(slide, {
                y: 60
            });

    });
    setTimeout(() => {



        if (document.querySelector('.features__img')) {
            gsap.registerPlugin(ScrollTrigger);
            const tl = gsap.timeline({});
            tl.to('.features__img-mask', {
                scrollTrigger: {
                    trigger: '.features',
                    scrub: 2,
                },
                rotate: 180
            });
        }


        gsap.registerPlugin(MotionPathPlugin);

        function initPlaneAnimation() {
            gsap.killTweensOf("#plaine");

            const isMobile = window.innerWidth <= 680;
            const put = document.querySelector('#put');

            if (isMobile && put) {
                const bbox = put.getBBox();
                const centerX = bbox.x + bbox.width / 2;
            }

            gsap.set("#plaine", { clearProps: "all" });

            gsap.to("#plaine", {
                duration: 5,
                scrollTrigger: {
                    trigger: '.gran',
                    start: isMobile ? 'top 100%' : "top 50%",
                    scrub: 2,
                },
                motionPath: {
                    path: "#put",
                    align: "#put",
                    autoRotate: true,
                    alignOrigin: [0.5, 0.5]
                }
            });
        }

        initPlaneAnimation();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh();
                initPlaneAnimation();
            }, 250);
        });
    }, 300)

    if (document.querySelector('.main__btn-call')) {
        const btn = document.querySelector('.main__btn-call');
        btn.addEventListener('click', (event) => {
            if (window.innerWidth <= 680) {

            }
        })
    }



    if (document.querySelector('section')) {
        var observer = new IntersectionObserver(function (entries) {
            if (!entries[0].isIntersecting) {
                document.querySelector('.mess').classList.add('active')
                document.querySelector('.up').classList.add('active')
            }
            else {
                document.querySelector('.mess').classList.remove('active')
                document.querySelector('.up').classList.remove('active')
            }
        });

        observer.observe(document.querySelector("section"))
    }
    if (!localStorage.getItem('notificationShown')) {
        const notification = document.querySelector('.notification');

        const closeBtn = document.querySelector('.notification__close');

        notification.style.transform = 'translate(-50%, 100%)';
        notification.style.opacity = '0';

        setTimeout(() => {
            notification.style.transform = 'translate(-50%, 0)';
            notification.style.opacity = '1';
        }, 3000);

        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translate(-50%, 100%)';
            notification.style.opacity = '0';
            localStorage.setItem('notificationShown', true);
        });
    } else {
        document.querySelector('.notification').remove()
    }



    const appHeight = () => {
        const doc = document.documentElement
        doc.style.setProperty('--app-height', `${window.innerHeight}px`)
    }
    window.addEventListener('resize', appHeight)
    appHeight()


    accordionShow()

    try {
        scrollClass()
    } catch (e) {
        console.error('scrollClass error:', e)
    }


    const pxTovw = (mr) => {
        return window.innerWidth <= 340 ? `${100 / (340 / mr)}vw` : window.innerWidth <= 680 ? `${100 / (680 / mr)}vw` : window.innerWidth <= 1000 ? `${100 / (1000 / mr)}vw` : window.innerWidth <= 1600 ? `${100 / (1440 / mr)}vw` : `${100 / (1440 / mr)}vw`;
    }

    const marginRightVW = (mr) => {
        let result = 0;
        if (window.outerWidth <= 680) {
            result = 100 / (680 / mr)
        } else {
            result = 100 / (1440 / mr)
        }
        return (window.outerWidth / 100) * result
    }

    $('.opened-search').on('click', function () {
        $('.header-search').addClass('opened');
        return false;
    })

    $('.header-search__close').on('click', function () {
        $('.header-search').removeClass('opened');
        return false;
    })


    $('.form-select').each(function () {
        $(this).select2({
            theme: "dark",
            dropdownParent: $(this).parents('.main__napr-wrapper'),
            dropdownPosition: 'below',
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            templateSelection: function (data, container) {
                if (data.element && data.element.dataset.icon) {
                    var icon = $('<img class="icon" src="' + data.element.dataset.icon + '">');
                    container.append(icon);
                }
                return data.text;
            },
            templateResult: function (data) {
                if (!$(data.element).data('icon')) {
                    return data.text;
                }

                var icon = $('<img class="icon" src="' + $(data.element).data('icon') + '">');
                var option = $('<div></div>');
                option.append(icon);
                option.append(' ' + data.text);
                return option;
            },

        });
    })

    $('.form-select').each(function () {
        var placeholder = $(this).data('placeholder') || 'Поиск...';
        $(this).select2({
            theme: "dark",
            dropdownParent: $(this).parents('.main__napr-wrapper'),
            dropdownPosition: 'below',
            placeholder: placeholder,
            width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
            language: {
                inputTooShort: function () { return ''; },
                noResults: function () { return 'Ничего не найдено'; },
                searching: function () { return 'Поиск...'; }
            },
            templateSelection: function (data, container) {
                if (data.element && data.element.dataset.icon) {
                    var icon = $('<img class="icon" src="' + data.element.dataset.icon + '">');
                    container.append(icon);
                }
                return data.text;
            },
            templateResult: function (data) {
                if (!$(data.element).data('icon')) {
                    return data.text;
                }

                var icon = $('<img class="icon" src="' + $(data.element).data('icon') + '">');
                var option = $('<div></div>');
                option.append(icon);
                option.append(' ' + data.text);
                return option;
            },

        });
    })




    $('.form-select-modal').select2({
        theme: "dark",
        dropdownParent: $('.form__item-wrapper'),
        dropdownPosition: 'below',
        width: $(this).data('width') ? $(this).data('width') : $(this).hasClass('w-100') ? '100%' : 'style',
        templateSelection: function (data, container) {
            if (data.element && data.element.getAttribute('data-icon')) {
                var icon = $('<img class="form-select-modal-icon" src="' + data.element.getAttribute('data-icon') + '">');
                container.append(icon);
                var option = $('<div></div>');
                option.append(icon);
                option.append(' ' + data.text);
                return option;
            }
            else {
                return data.text;
            }
        },
        templateResult: function (data) {
            if (!$(data.element).data('icon')) {
                return data.text;
            }

            var icon = $('<img class="form-select-modal-icon" src="' + $(data.element).data('icon') + '">');
            var option = $('<div></div>');
            option.append(icon);
            option.append(' ' + data.text);
            return option;
        },
    });

    $('.form-select').on('select2:open', function () {
        var placeholders = {
            'Выберите направление': 'Выберите направление',
            'Страна': 'Выберите страну',
            'Город/Курорт': 'Выберите город',
            'Вид отдыха': 'Выберите вид отдыха'
        };
        var original = $(this).data('placeholder') || '';
        var text = placeholders[original] || original || 'Поиск...';
        var $search = $(this).parents('.main__napr-wrapper').find('.select2-search__field');
        $search.attr('placeholder', text);
    });

    $('.strana').on('select2:open', function (e) {
        if ($(".strana_box .select2-results .visa_list").length == 0) {
            $(".strana_box .select2-results").append("<span class='visa_list'>Безвизовые страны и страны упрощенного въезда</span>")
        }
    });

    $('.search__form-select').each(function () {
        var placeholder = $(this).data('placeholder') || 'Поиск...';
        $(this).select2({
            theme: "dark",
            dropdownParent: $('.search__form'),
            dropdownPosition: 'below',
            allowClear: true,
            placeholder: placeholder,
            width: '100%',
            language: {
                noResults: function () { return 'Ничего не найдено'; },
                searching: function () { return 'Поиск...'; }
            },
            templateSelection: function (data, container) {
                if (data.element && data.element.dataset.icon) {
                    var icon = $('<img class="icon" src="' + data.element.dataset.icon + '">');
                    container.append(icon);
                }
                return data.text;
            },
            templateResult: function (data) {
                if (!$(data.element).data('icon')) {
                    return data.text;
                }

                var icon = $('<img class="icon" src="' + $(data.element).data('icon') + '">');
                var option = $('<div></div>');
                option.append(icon);
                option.append(' ' + data.text);
                return option;
            },
        });
    });

    $('.search__form-select').on('select2:open', function () {
        var placeholders = {
            'Выберите направление': 'Выберите направление',
            'Страна': 'Выберите страну',
            'Город/Курорт': 'Выберите город',
            'Вид отдыха': 'Выберите вид отдыха'
        };
        var original = $(this).data('placeholder') || '';
        var text = placeholders[original] || original || 'Поиск...';
        var $search = $('.search__form .select2-search__field');
        $search.attr('placeholder', text);
    });


    if (document.querySelector('.form-datapicker')) {
        const datepickerElement = document.querySelectorAll('.form-datapicker');
        const minDate = new Date();
        datepickerElement.forEach(datepickerItem => {
            new AirDatepicker(datepickerItem, {
                minDate,
                range: true,
                isMobile: window.innerWidth <= 680 ? true : false,
                multipleDatesSeparator: " — ",
                onSelect: function ({ date, datepicker }) {
                    if (date.length === 2) {
                        const [start, end] = date;
                        const optionsWithYear = { day: '2-digit', month: '2-digit', year: 'numeric' };
                        const optionsWithoutYear = { day: '2-digit', month: '2-digit' };

                        let formattedStart;
                        let formattedEnd = end.toLocaleDateString('ru-RU', optionsWithYear);

                        if (start.getFullYear() === end.getFullYear()) {
                            formattedStart = start.toLocaleDateString('ru-RU', optionsWithoutYear);
                        } else {
                            formattedStart = start.toLocaleDateString('ru-RU', optionsWithYear);
                        }

                        datepickerItem.value = `${formattedStart} - ${formattedEnd}`;
                    }
                }
            });
            document.querySelector('.main__calendar').addEventListener('click', (event) => {
                if (event.target.classList.contains('main__calendar')) {
                    console.log(event.target)
                    event.target.querySelector('.form-datapicker').focus()
                }
            })
        })
    }

    if (document.querySelector('.form-cal')) {
        const datepickerElement = document.querySelectorAll('.form-cal');
        const minDate = new Date();
        datepickerElement.forEach(datepickerItem => {
            new AirDatepicker(datepickerItem, {
                minDate,
                range: true,
                isMobile: true,
                multipleDatesSeparator: " — ",
            });
        })
    }

    if (document.querySelector('.main__days')) {
        const mainDays = document.querySelectorAll('.main__days');
        mainDays.forEach(mainDaysItem => {
            const minus = mainDaysItem.querySelectorAll('.main__counter-minus');
            const plus = mainDaysItem.querySelectorAll('.main__counter-plus');

            const fromInput = mainDaysItem.querySelector('.main__counter-item.from input');
            const toInput = mainDaysItem.querySelector('.main__counter-item.to input');

            let minusCount = fromInput ? Number(fromInput.value) : 0;
            let plusCount = toInput ? Number(toInput.value) : 0;

            const updateCounter = () => {
                const counter = `${minusCount} - ${plusCount}`;
                const daysCountElement = mainDaysItem.querySelector('.main__days-count');
                if (daysCountElement) {
                    daysCountElement.textContent = counter;
                }
            }

            mainDaysItem.addEventListener('click', (e) => {
                if (e.target === mainDaysItem && mainDaysItem.querySelector('.main__counter')) {
                    mainDaysItem.querySelector('.main__counter').classList.toggle('active');
                }
            });

            document.addEventListener('click', (e) => {
                if (!mainDaysItem.contains(e.target) && mainDaysItem.querySelector('.main__counter')) {
                    mainDaysItem.querySelector('.main__counter').classList.remove('active');
                }
            })

            minus.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const input = item.closest('.main__counter-item').querySelector('input');
                    if (!input) return;
                    let newValue = Number(input.value) - 1;
                    if (newValue < 1) newValue = 1;
                    input.value = newValue;
                    if (item.closest('.main__counter-item').classList.contains('from')) {
                        minusCount = newValue;
                        if (minusCount > plusCount) {
                            plusCount = minusCount;
                            if (toInput) toInput.value = minusCount;
                        }
                    }
                    if (item.closest('.main__counter-item').classList.contains('to')) {
                        plusCount = newValue;
                        if (minusCount > plusCount) {
                            plusCount = minusCount;
                            if (toInput) toInput.value = minusCount;
                        }
                    }
                    updateCounter();
                });
            });

            plus.forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const input = item.closest('.main__counter-item').querySelector('input');
                    if (!input) return;
                    let newValue = Number(input.value) + 1;
                    input.value = newValue;
                    if (item.closest('.main__counter-item').classList.contains('from')) {
                        minusCount = newValue;
                        if (minusCount > plusCount) {
                            plusCount = minusCount;
                            if (toInput) toInput.value = minusCount;
                        }
                    }
                    if (item.closest('.main__counter-item').classList.contains('to')) {
                        plusCount = newValue;
                        if (minusCount > plusCount) {
                            plusCount = minusCount;
                            if (toInput) toInput.value = minusCount;
                        }
                    }
                    updateCounter();
                });
            });

            updateCounter();
        });


    }


    if (document.querySelector('.put__slider')) {
        const put_sliders = document.querySelectorAll('.put__slider');

        if (put_sliders.length > 0) {
            put_sliders.forEach(slider => {
                const parent = slider.closest('.put');

                const prev_arrow = parent.querySelector('.put__slider-prev');
                const next_arrow = parent.querySelector('.put__slider-next');

                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: marginRightVW(12),
                    loop: true,
                    navigation: {
                        nextEl: next_arrow,
                        prevEl: prev_arrow,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1.6,
                            spaceBetween: marginRightVW(20),
                        },
                        1200: {
                            slidesPerView: 2,
                            spaceBetween: marginRightVW(20),
                        },
                        1300: {
                            slidesPerView: 2,
                            spaceBetween: marginRightVW(20),
                        },
                        1400: {
                            slidesPerView: 3,
                            spaceBetween: marginRightVW(20),
                        }
                    }
                });
            });
        }
    }

    if (document.querySelector('.logos-slider')) {
        const sliders = document.querySelectorAll('.logos-slider');

        sliders.forEach(slider => {
            const parent = slider.closest('.logos');
            const prev_arrow = parent.querySelector('.logos-slider__prev');
            const next_arrow = parent.querySelector('.logos-slider__next');

            new Swiper(slider, {
                slidesPerView: 3,
                loop: true,
                spaceBetween: marginRightVW(20),
                navigation: {
                    nextEl: next_arrow,
                    prevEl: prev_arrow,
                },
                breakpoints: {
                    680: {
                        slidesPerView: 4.32,
                        spaceBetween: marginRightVW(20),
                    },
                }
            });
        });
    }


    if (document.querySelector('.events__slider')) {
        const slider = document.querySelector('.events__slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.events__slider-next'),
                prevEl: document.querySelector('.events__slider-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 2.3,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.special-slider-rest')) {
        const slider = document.querySelector('.special-slider-rest');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.special-slider-rest__next'),
                prevEl: document.querySelector('.special-slider-rest__prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 4,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.groups__slider')) {
        const slider = document.querySelector('.groups__slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.put__slider-next'),
                prevEl: document.querySelector('.put__slider-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 3,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.special__slider')) {
        const slider = document.querySelector('.special__slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.special__slider-next'),
                prevEl: document.querySelector('.special__slider-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 1,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.other__slider')) {
        const slider = document.querySelector('.other__slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.other__slider-next'),
                prevEl: document.querySelector('.other__slider-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 4,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.tour-program')) {
        const slider = document.querySelector('.tour-program');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.tour-program__next'),
                prevEl: document.querySelector('.tour-program__prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 1,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }

    if (document.querySelector('.trips-slider')) {
        const slider = document.querySelector('.trips-slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            spaceBetween: marginRightVW(20),
            loop: true,
            navigation: {
                nextEl: document.querySelector('.trips-next'),
                prevEl: document.querySelector('.trips-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 2,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    }


    if (document.querySelector('.org__slider')) {
        const org_sliders = document.querySelectorAll('.org__slider');

        if (org_sliders.length > 0) {
            org_sliders.forEach(slider => {
                const parent = slider.closest('.org');

                const prev_arrow = parent.querySelector('.org__prev');
                const next_arrow = parent.querySelector('.org__next');

                new Swiper(slider, {
                    slidesPerView: 1.36,
                    loop: true,
                    loopAdditionalSlides: 2,
                    watchSlidesProgress: true,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next_arrow,
                        prevEl: prev_arrow,
                        centeredSlides: false,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1.3,
                            spaceBetween: 20,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 1,
                            spaceBetween: marginRightVW(20),
                            centeredSlides: true,
                        },
                        1200: {
                            slidesPerView: 1,
                            spaceBetween: marginRightVW(20),
                            centeredSlides: true,
                        },
                        1300: {
                            slidesPerView: 1,
                            spaceBetween: marginRightVW(20),
                            centeredSlides: true,
                        },
                        1400: {
                            slidesPerView: 1,
                            spaceBetween: marginRightVW(20),
                            centeredSlides: true,
                        }
                    }
                });
            });
        }
    }

    document.querySelectorAll('.nap').forEach((napSection) => {
        const autoplayDelay = 3000;
        let autoplayInterval;

        const thumbPutSlider = new Swiper(napSection.querySelector('.nap__info-slider'), {
            slidesPerView: 1,
            effect: 'fade',
            watchSlidesProgress: true,
            allowTouchMove: false,
            spaceBetween: 0,
        });

        const putSlider = new Swiper(napSection.querySelector('.nap__slider'), {
            slidesPerView: 1,
            effect: 'fade',
            watchSlidesProgress: true,
            spaceBetween: 0,
            autoplay: {
                delay: autoplayDelay,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: napSection.closest('.nap').querySelector('.nap__next'),
                prevEl: napSection.closest('.nap').querySelector('.nap__prev'),
            },
            pagination: {
                el: napSection.querySelector('.nap__pagination'),
                clickable: true,
                dynamicBullets: true,
                dynamicMainBullets: 5,
                renderBullet: function (index, className) {
                    return '<div class="' + className + '"><div class="swiper-pagination-bullet-fill"></div></div>';
                }
            },
            thumbs: {
                swiper: thumbPutSlider
            },
            pauseOnMouseEnter: true,
        });

        function updatePagination() {
            const sliderElement = napSection.querySelector('.nap__slider');
            const rightElement = napSection.querySelector(window.innerWidth <= 680 ? '.nap__row' : '.nap__right');
            const paginationElement = napSection.querySelector('.nap__pagination');

            if (sliderElement && rightElement && paginationElement) {
                const sliderRect = sliderElement.getBoundingClientRect();
                const rightRect = rightElement.getBoundingClientRect();
                const offset = rightRect.top - sliderRect.top + 14;
                paginationElement.style.top = `${window.innerWidth <= 680 ? offset - 35 : offset}px`;
            }

            clearInterval(autoplayInterval);
            const bullets = napSection.querySelectorAll('.swiper-pagination-bullet');
            bullets.forEach((bullet, index) => {
                const fill = bullet.querySelector('.swiper-pagination-bullet-fill');
                if (!fill) return;
                if (index < putSlider.realIndex) {
                    fill.style.width = '100%';
                } else if (index === putSlider.realIndex) {
                    fill.style.width = '0';
                    let width = 0;
                    autoplayInterval = setInterval(() => {
                        width += 1;
                        fill.style.width = `${width}%`;
                        if (width >= 100) clearInterval(autoplayInterval);
                    }, autoplayDelay / 100);
                } else {
                    fill.style.width = '0';
                }
            });
        }

        putSlider.on('slideChangeTransitionStart', updatePagination);
        putSlider.on('slideChange', updatePagination);
        putSlider.on('init', updatePagination);
        putSlider.on('autoplay', updatePagination);

        putSlider.init();

        const sliderElement = napSection.querySelector('.nap__slider');
        const paginationElement = napSection.querySelector('.nap__pagination');

        function pauseAutoplay() {
            putSlider.autoplay.pause();
            clearInterval(autoplayInterval);
        }

        function resumeAutoplay() {
            putSlider.autoplay.start();
            updatePagination();
        }

        sliderElement.addEventListener('mouseenter', pauseAutoplay);
        sliderElement.addEventListener('mouseleave', resumeAutoplay);
        paginationElement.addEventListener('mouseenter', pauseAutoplay);
        paginationElement.addEventListener('mouseleave', resumeAutoplay);

        window.addEventListener('resize', () => {
            putSlider.update();
            thumbPutSlider.update();
            updatePagination();
        });
    });

    if (document.querySelector('.dream__slider')) {
        const slider = document.querySelector('.dream__slider');
        const dreamSlider = new Swiper(slider, {
            slidesPerView: 1,
            loop: true,
            loopAdditionalSlides: 3,
            watchSlidesProgress: true,
            spaceBetween: marginRightVW(12),
            centeredSlides: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: document.querySelector('.dream__next'),
                prevEl: document.querySelector('.dream__prev'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 3,
                    spaceBetween: marginRightVW(20),
                    centeredSlides: true,
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: marginRightVW(40),
                    centeredSlides: true,
                }
            }
        });
    }

    if (document.querySelector('.dream__visa')) {
        const slider = document.querySelector('.dream__visa');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1,
            loop: true,
            spaceBetween: marginRightVW(20),
            centeredSlides: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },

            navigation: {
                nextEl: document.querySelector('.dream__visa .dream__next'),
                prevEl: document.querySelector('.dream__visa .dream__prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 3,
                    spaceBetween: marginRightVW(0),
                    loop: true,
                    centeredSlides: true,
                },
            }
        })
    }

    if (document.querySelector('.office-slider')) {
        const slider = document.querySelector('.office-slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 2,
            loop: true,
            spaceBetween: marginRightVW(20),
            navigation: {
                nextEl: document.querySelector('.office-next'),
                prevEl: document.querySelector('.office-prev'),
            },
            breakpoints: {
                680: {
                    slidesPerView: 3,
                    spaceBetween: marginRightVW(20),
                    loop: true,
                },
            }
        })
    }

    if (document.querySelector('.news__slider')) {
        const news_sliders = document.querySelectorAll('.news__slider');

        if (news_sliders.length > 0) {
            news_sliders.forEach(slider => {
                const parent = slider.closest('.news');

                const prev_arrow = parent.querySelector('.news__slider-prev');
                const next_arrow = parent.querySelector('.news__slider-next');

                new Swiper(slider, {
                    slidesPerView: 1.36,
                    loop: true,
                    loopAdditionalSlides: 2,
                    watchSlidesProgress: true,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: next_arrow,
                        prevEl: prev_arrow,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1.6,
                            spaceBetween: marginRightVW(20),
                        },
                        1000: {
                            slidesPerView: 3,
                            spaceBetween: marginRightVW(20),
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: marginRightVW(20),
                        },
                        1300: {
                            slidesPerView: 3,
                            spaceBetween: marginRightVW(20),
                        },
                        1400: {
                            slidesPerView: 3,
                            spaceBetween: marginRightVW(20),
                        }
                    }
                });
            });
        }
    }
    if (document.querySelector('.thematic__slider')) {
        const thematic_slider = document.querySelectorAll('.thematic__slider');
        thematic_slider.forEach((slider, idx) => {
            thematic_slider[idx].closest('.news').querySelector('.thematic__prev').classList.add(`thematic__prev-${idx}`);
            thematic_slider[idx].closest('.news').querySelector('.thematic__next').classList.add(`thematic__next-${idx}`);
            const putSlider = new Swiper(slider, {
                slidesPerView: 1,
                loop: true,
                spaceBetween: marginRightVW(20),

                navigation: {
                    nextEl: document.querySelector(`.thematic__next-${idx}`),
                    prevEl: document.querySelector(`.thematic__prev-${idx}`),
                },
                breakpoints: {
                    680: {
                        slidesPerView: 2,
                        spaceBetween: marginRightVW(20),
                    },
                }
            })
        })
    }


    /* if (document.querySelector('.review__slider')) {
        const slider = document.querySelector('.review__slider');
        const putSlider = new Swiper(slider, {
            slidesPerView: 1.235,
            loop: true,
            spaceBetween: marginRightVW(12),

            navigation: {
                nextEl: document.querySelector('.review__next'),
                prevEl: document.querySelector('.review__prev'),
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: marginRightVW(20),
                },
            }
        })
    } */

    if (document.querySelector('.review__slider')) {
        const put_sliders = document.querySelectorAll('.review__slider');

        if (put_sliders.length > 0) {
            put_sliders.forEach(slider => {
                const parent = slider.closest('.review');

                const prev_arrow = parent.querySelector('.review__prev');
                const next_arrow = parent.querySelector('.review__next');

                new Swiper(slider, {
                    slidesPerView: 1.305,
                    spaceBetween: (20),
                    loop: true,
                    navigation: {
                        nextEl: next_arrow,
                        prevEl: prev_arrow,
                    },
                    breakpoints: {
                        768: {
                            slidesPerView: 1.3,
                            spaceBetween: marginRightVW(20),
                        },
                        1200: {
                            slidesPerView: 2,
                            spaceBetween: marginRightVW(20),
                        },
                        1300: {
                            slidesPerView: 2.8,
                            spaceBetween: marginRightVW(20),
                        },
                        1400: {
                            slidesPerView: 2,
                            spaceBetween: marginRightVW(20),
                        }
                    }
                });
            });
        }
    }

    document.querySelectorAll('.form__polityc input').forEach(item => {
        if (!item.checked) {
            item.closest('form').querySelector('button[type="submit"]').setAttribute('disabled', 'disabled')
        }
        item.addEventListener('change', () => {
            if (!item.checked) {
                item.closest('form').querySelector('button[type="submit"]').setAttribute('disabled', 'disabled')
            } else {
                item.closest('form').querySelector('button[type="submit"]').removeAttribute('disabled')
            }
        })
    })

    $('[type="tel"]').mask('+7 (999) 999 99 99', {
        completed: function () {
            $(this).closest('.form__label').addClass('active')
        }
    })
    $('[type="tel"]').on("blur", function () {
        if (!$(this).val()) {
            $(this).closest('.form__label').removeClass('active')
        } else {
            $(this).closest('.form__label').addClass('active')
        }
    });

    if (document.querySelector('.form__label')) {
        document.querySelectorAll('.form__label').forEach(item => {
            if (item.querySelector('input')) {
                item.querySelector('input').addEventListener('input', () => {
                    if (item.querySelector('input').value) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active')
                    }
                })
            } else {
                item.querySelector('textarea').addEventListener('input', () => {
                    if (!item.querySelector('textarea')) return
                    if (item.querySelector('textarea').value) {
                        item.classList.add('active')
                    } else {
                        item.classList.remove('active')
                    }
                })
            }
        })
    }
    const lazyLoad = new LazyLoad({
        elements_selector: '.lazy',
    })

    if (document.querySelector('#contacts__map')) initYMap()

    let $footer = $('.footer');
    let $fixed_icons = $('.fixed-icons');

    function checkFooter() {
        let footerTop = $footer.offset().top;
        let scrollBottom = $(window).scrollTop() + $(window).height();

        if (scrollBottom >= footerTop) {
            $fixed_icons.addClass('hidden');
        } else {
            $fixed_icons.removeClass('hidden');
        }
    }

    $(window).on('scroll resize', checkFooter);
    checkFooter();

    $('.top-scroll').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 0, 'swing');
        return false;
    })

    $('.js-readmore').each(function () {
        const $container = $(this);
        const $content = $container.find('.readmore__content');
        const $paragraphs = $content.find('p');
        const $toggle = $container.find('.readmore__toggle');

        $container.addClass('collapsed');
        $paragraphs.not(':first').hide();

        $toggle.on('click', function (e) {
            e.preventDefault();

            const isCollapsed = $container.hasClass('collapsed');

            if (isCollapsed) {
                $paragraphs.not(':first').slideDown(300);
                $toggle.text('Скрыть');
            } else {
                $paragraphs.not(':first').slideUp(300);
                $toggle.text('Читать далее');
            }

            $container.toggleClass('collapsed');
        });
    });

    new WOW({
        animateClass: 'animate__animated',
    }).init();



    $('.open-menu .btn-menu-arrow').on('click', function () {
        $('.menu-main').toggleClass('active');
        let btn_wrapper = $(this).closest('.btn__menu');
        $(btn_wrapper).toggleClass('active');
        return false;
    })

    $('.open-countries .btn-menu-arrow').on('click', function () {
        $('.menu--country').toggleClass('active');
        let btn_wrapper = $(this).closest('.btn__menu');
        $(btn_wrapper).toggleClass('active');
        return false;
    })

    $(document).mouseup(function (e) {
        if ($(e.target).closest('.btn__menu').length) return;
        let lists_menu = $('.menu ul');
        if (!lists_menu.is(e.target) && lists_menu.has(e.target).length === 0) {
            $('.menu').removeClass('active');
            $('.btn__menu').removeClass('active');
        }

        if ($(e.target).closest('.offers-sorting').length === 0) {
            $('.offers-sorting').removeClass('open');
        }
    });

    $('.offers-sorting').on('click', function () {
        $(this).toggleClass('open');
    })

    $('.offers-sorting__item').on('click', function (e) {
        e.preventDefault();

        let selectedText = $(this).text();
        let selectedSort = $(this).data('sort');
        let sortingBlock = $(this).closest('.offers-sorting');

        sortingBlock.find('.offers-sorting__top span').text(selectedText);
        sortingBlock.attr('data-sort', selectedSort);

        sortingBlock.find('.offers-sorting__item').removeClass('active');
        $(this).addClass('active');

        console.log('Выбрана сортировка:', selectedSort);
    });

    $('.menu__list li').on('mouseenter', function () {
        const $currentLi = $(this);
        const $parentUl = $currentLi.parent();
        $parentUl.children('li').children('ul').removeClass('open');
        $currentLi.children('ul').addClass('open');
    });



    $('.tabs-block__open').on('click', function () {
        var $block = $(this).closest('.tabs-block');
        var $hidden = $block.find('.tabs-hidden');
        var $btn = $(this).find('.tabs-block__btn');

        if ($block.hasClass('opened')) {
            $hidden.stop().slideUp(300);
            $block.removeClass('opened');
            $btn.text('Развернуть');
        } else {
            $hidden.stop().slideDown(300);
            $block.addClass('opened');
            $btn.text('Свернуть');
        }
    });

    $('.questions-block').on('click', function () {
        var $block = $(this);
        var $hidden = $block.find('.questions-hidden');

        if ($block.hasClass('opened')) {
            $hidden.stop().slideUp(300);
            $block.removeClass('opened');
        } else {
            $('.questions-block.opened').not($block).each(function () {
                $(this).removeClass('opened').find('.questions-hidden').stop().slideUp(300);
            });

            $hidden.stop().slideDown(300);
            $block.addClass('opened');
        }
    });

    $('.details-included__collapse').on('click', function (e) {
        e.preventDefault();

        var $block = $(this).closest('.details-included');
        var $hidden = $block.find('.details-included-hidden');
        var $btn = $(this);

        if ($block.hasClass('opened')) {
            $hidden.stop().slideUp(300);
            $block.removeClass('opened');
            $btn.text('Развернуть');
        } else {
            $hidden.stop().slideDown(300);
            $block.addClass('opened');
            $btn.text('Свернуть');
        }
    });

    if ($("#customMap").length > 0) {
        ymaps.ready(init);
        var customMap;
        function init() {
            customMap = new ymaps.Map("customMap", {
                center: [55.759193, 37.652328],
                behaviors: ['default', 'scrollZoom'],
                zoom: 16,
                controls: ["zoomControl", "fullscreenControl"]
            });

            var customPlacemark0 = new ymaps.Placemark(
                [55.759193, 37.652328],
                {
                    balloonContent: `
              <h4>Заголовок метки</h4>
              <p>Описание метки.</p>
              <a class="customMapClose" onclick="customMap.balloon.close()">X</a>
            `
                },
                {
                    iconLayout: 'default#image',
                    iconImageHref: '/assets/img/icons/map-icon.svg',
                    iconImageSize: [44, 49],
                    iconImageOffset: [-20, -60],
                    balloonContentSize: [270, 99],
                    balloonLayout: "default#imageWithContent",
                    balloonImageHref: 'img/baloon.jpg',
                    balloonImageOffset: [-65, -89],
                    balloonImageSize: [260, 89],
                    balloonShadow: true
                }
            );

            customMap.geoObjects.add(customPlacemark0);
        }
    }

    $('.details-nav__item').on('click', function () {
        var index = $(this).index();

        $('.details-nav__item').removeClass('active');
        $('.details-tab').removeClass('active').hide();

        $(this).addClass('active');
        $('.details-tab').eq(index).addClass('active').show();
    });

    $('.details-tab').hide().first().show().addClass('active');

    $('.details-type').on('click', function () {
        $('.details-type').removeClass('active');
        $(this).addClass('active');
    })


    const $items = $('.dates-item');
    const $allBtn = $('.dates-item__all');
    const $controls = $('.dates-controls');
    const $showMoreBtn = $('.dates-controls--show');
    const $hideBtn = $('.dates-controls--hide');

    if ($items.length === 0 || $allBtn.length === 0 || $controls.length === 0) {
        return;
    }

    let currentIndex = 1;

    $items.each(function (index) {
        if (index > 0) {
            $(this).hide().addClass('dates-item--hidden');
        }
    });

    $controls.hide();

    $allBtn.on('click', function (e) {
        e.preventDefault();
        $allBtn.hide();
        $controls.show();
        showNextItems(5);
    });

    $showMoreBtn.on('click', function (e) {
        e.preventDefault();
        showNextItems(5);
    });

    $hideBtn.on('click', function (e) {
        e.preventDefault();
        $items.each(function (index) {
            if (index > 0) {
                $(this).hide().addClass('dates-item--hidden');
            }
        });
        currentIndex = 1;
        $allBtn.show();
        $controls.hide();
        $showMoreBtn.show();
    });

    function showNextItems(count) {
        let shown = 0;
        $items.each(function (index) {
            if (index >= currentIndex && shown < count) {
                $(this).fadeIn(200).removeClass('dates-item--hidden');
                shown++;
            }
        });
        currentIndex += shown;

        if (currentIndex >= $items.length) {
            $showMoreBtn.hide();
        }
    }

    new Masonry('.masonry', {
        itemSelector: '.region',
        columnWidth: '.region',
        percentPosition: true,
        gutter: 20
    });


    if (document.querySelector('[data-fancybox]')) {
        Fancybox.bind("[data-fancybox]", {
        });
    }
});