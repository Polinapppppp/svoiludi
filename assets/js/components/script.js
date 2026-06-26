(function () {
  if (window.innerWidth > 768) return;

  const section = document.querySelector('.nap');
  if (!section || section.dataset.reordered) return;

  const left = section.querySelector('.nap__left');
  const right = section.querySelector('.nap__right');

  const firstParagraph = left.querySelector('p');

  if (firstParagraph && right) {
    right.insertBefore(firstParagraph, right.firstChild);
  }

  section.dataset.reordered = 'true';
})();

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const overlay = document.getElementById('menuOverlay');
    const panel = document.getElementById('menuPanel');
    const menuNav = document.getElementById('menuNav');
    const btnBack = document.getElementById('menuBack');
    const breadcrumbsEl = document.getElementById('menuBreadcrumbs');
    const btnClose = document.getElementById('menuTopClose');
    const burger = document.querySelector('.header__burger');

    if (!burger) { console.error('Burger not found!'); return; }
    if (!overlay) { console.error('Overlay not found!'); return; }
    if (!panel) { console.error('Panel not found!'); return; }

    let stack = [];
    let isOpen = false;

    function findLevel(id) { return document.getElementById(id); }

    function getLevelTitle(id) {
      const el = document.getElementById(id);
      return el ? (el.dataset.title || '') : '';
    }

    function getTriggerIcon(targetId) {
      const btn = document.querySelector(`[data-target="${targetId}"]`);
      if (!btn) return '';
      const iconWrap = btn.querySelector('.mi-icon');
      return iconWrap ? iconWrap.innerHTML : '';
    }

    const arrowSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>`;

    function updateNavState() {
      if (stack.length === 1) {
        menuNav.classList.add('has-single');
      } else {
        menuNav.classList.remove('has-single');
      }
    }

    function updateBreadcrumbs() {
      if (!breadcrumbsEl) return;
      breadcrumbsEl.innerHTML = '';

      if (stack.length === 0) return;

      stack.forEach((levelId, index) => {
        const title = getLevelTitle(levelId);
        const isLast = index === stack.length - 1;
        const iconHTML = getTriggerIcon(levelId);

        const item = document.createElement('button');
        item.type = 'button';

        let className = 'breadcrumb-item';
        if (isLast) className += ' active';
        if (index >= 1) className += ' menu-nav__level2';

        item.className = className;

        if (index >= 1 && iconHTML) {
          const icon = document.createElement('span');
          icon.className = 'breadcrumb-item__icon';
          icon.innerHTML = iconHTML;
          item.appendChild(icon);
        }

        const text = document.createElement('span');
        text.className = 'breadcrumb-item__text';
        text.textContent = title;
        item.appendChild(text);

        const arrow = document.createElement('span');
        arrow.className = 'breadcrumb-item__arrow';
        arrow.innerHTML = arrowSVG;
        item.appendChild(arrow);

        if (isLast) {
          arrow.addEventListener('click', (e) => {
            e.stopPropagation();
            goBack();
          });
        }

        breadcrumbsEl.appendChild(item);

        if (!isLast) {
          const divider = document.createElement('div');
          divider.className = 'breadcrumb-divider';
          breadcrumbsEl.appendChild(divider);
        }
      });

      updateNavState();
    }

    function goForward(targetId) {
      const target = findLevel(targetId);
      if (!target) return;
      stack.push(targetId);
      const current = document.querySelector('.menu-level.active');
      target.classList.add('active');
      setTimeout(() => {
        if (current) current.classList.remove('active');
      }, 10);
      menuNav.classList.add('visible');
      updateBreadcrumbs();
    }

    function goBack() {
      if (stack.length === 0) return;

      const currentId = stack.pop();
      const current = findLevel(currentId);
      if (current) current.classList.remove('active');

      let prevId = stack.length > 0 ? stack[stack.length - 1] : 'level-0';
      const prev = findLevel(prevId);
      if (prev) prev.classList.add('active');

      if (stack.length === 0) {
        menuNav.classList.remove('visible');
      }

      updateBreadcrumbs();
    }

    function openMenu() {
      isOpen = true;
      overlay.classList.add('active');
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (burger) burger.classList.add('active');
    }

    function closeMenu() {
      isOpen = false;
      overlay.classList.remove('active');
      panel.classList.remove('active');
      document.body.style.overflow = '';
      if (burger) burger.classList.remove('active');

      setTimeout(() => {
        document.querySelectorAll('.menu-level').forEach(el => el.classList.remove('active'));
        const l0 = document.getElementById('level-0');
        if (l0) l0.classList.add('active');
        stack = [];
        menuNav.classList.remove('visible');
        menuNav.classList.remove('has-single');
        updateBreadcrumbs();
      }, 350);
    }

    panel.addEventListener('click', function (e) {
      const btn = e.target.closest('[data-target]');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        goForward(btn.dataset.target);
      }
    });

    if (btnBack) {
      btnBack.addEventListener('click', (e) => {
        e.preventDefault();
        goBack();
      });
    }

    if (burger) burger.addEventListener('click', (e) => { e.preventDefault(); isOpen ? closeMenu() : openMenu(); });
    if (btnClose) btnClose.addEventListener('click', (e) => { e.preventDefault(); closeMenu(); });
    if (overlay) overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        stack.length > 0 ? goBack() : closeMenu();
      }
    });

    console.log('Menu initialized successfully!');
  })();
});

document.addEventListener('DOMContentLoaded', function () {
  (function () {
    const overlay = document.getElementById('filterOverlay');
    const panelWrapper = document.getElementById('filterPanelWrapper');
    const panel = document.getElementById('filterPanel');
    const btnClose = document.getElementById('filterClose');
    const trigger = document.getElementById('filterTrigger');
    const triggerMobile = document.getElementById('filterTriggerMobile');
    const btnSubmit = document.getElementById('filterSubmit');

    const nightsModalOverlay = document.getElementById('nightsModalOverlay');
    const nightsModal = document.getElementById('nightsModal');
    const nightsApply = document.getElementById('nightsApply');

    const calendarModalOverlay = document.getElementById('calendarModalOverlay');
    const calendarModal = document.getElementById('calendarModal');
    const calendarApply = document.getElementById('calendarApply');

    

    if (!panelWrapper) return;

    let isOpen = false;
    let currentModal = null;
    let datepickerInstance = null;

    const values = {
      direction: '',
      country: '',
      resort: '',
      type: '',
      nightsFrom: '1',
      nightsTo: '5',
      date: ''
    };

    function hasAnyValue() {
      return values.direction || values.country || values.resort ||
        values.type || values.date ||
        values.nightsFrom !== '1' || values.nightsTo !== '5';
    }

    function updateSubmitButton() {
      if (btnSubmit) {
        btnSubmit.classList.toggle('active', hasAnyValue());
      }
    }

    function openFilter() {
      isOpen = true;
      const scrollY = window.scrollY;
      document.body.classList.add('filter-open');
      document.body.style.top = `-${scrollY}px`;
      overlay.classList.add('active');
      panelWrapper.classList.add('active');
    }

    function closeFilter() {
      closeAllModals();
      isOpen = false;
      const scrollY = document.body.style.top;
      document.body.classList.remove('filter-open');
      document.body.style.top = '';
      overlay.classList.remove('active');
      panelWrapper.classList.remove('active');
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    function openModal(modal, modalOverlay) {
      currentModal = modal;
      modalOverlay.classList.add('active');
      modal.classList.add('active');
    }

    function closeModal(modal, modalOverlay) {
      modalOverlay.classList.remove('active');
      modal.classList.remove('active');
      currentModal = null;
    }

    function closeAllModals() {
      if (nightsModal) closeModal(nightsModal, nightsModalOverlay);
      if (calendarModal) closeModal(calendarModal, calendarModalOverlay);
    }

    function updateDisplay() {
      const dirEl = document.getElementById('val-direction');
      if (dirEl) {
        dirEl.textContent = values.direction || 'Выберите направление';
        dirEl.classList.toggle('selected', !!values.direction);
      }

      const countryEl = document.getElementById('val-country');
      if (countryEl) {
        countryEl.textContent = values.country || 'Страна';
        countryEl.classList.toggle('selected', !!values.country);
      }

      const resortEl = document.getElementById('val-resort');
      if (resortEl) {
        resortEl.textContent = values.resort || 'Город/Курорт';
        resortEl.classList.toggle('selected', !!values.resort);
      }

      const typeEl = document.getElementById('val-type');
      if (typeEl) {
        typeEl.textContent = values.type || 'Вид отдыха';
        typeEl.classList.toggle('selected', !!values.type);
      }

      const nightsEl = document.getElementById('val-nights');
      if (nightsEl) {
        nightsEl.textContent = `${values.nightsFrom} - ${values.nightsTo}`;
        nightsEl.classList.add('selected');
      }

      const dateEl = document.getElementById('val-date');
      if (dateEl) {
        dateEl.textContent = values.date || 'Дата поездки';
        dateEl.classList.toggle('selected', !!values.date);
      }

      updateSubmitButton();
    }

    panel.addEventListener('click', function (e) {
      const nightsHeader = e.target.closest('[data-target="nights-modal"]');
      if (nightsHeader) {
        e.preventDefault();
        document.querySelectorAll('.filter-section').forEach(s => s.classList.remove('open'));
        openModal(nightsModal, nightsModalOverlay);
        return;
      }

      const dateHeader = e.target.closest('[data-target="calendar-modal"]');
      if (dateHeader) {
        e.preventDefault();
        document.querySelectorAll('.filter-section').forEach(s => s.classList.remove('open'));
        openModal(calendarModal, calendarModalOverlay);

        if (!datepickerInstance && document.getElementById('air-datepicker-mobile')) {
          datepickerInstance = new AirDatepicker('#air-datepicker-mobile', {
            minDate: new Date(),
            range: true,
            multipleDatesSeparator: ' — ',
            selectedDates: values.date ? values.date.split(' — ').map(d => {
              const [day, month, year] = d.split('.');
              return new Date(`${year}-${month}-${day}`);
            }) : [],
            onSelect: ({ date, formattedDate, datepicker }) => {
              if (date.length === 2) {
                values.date = formattedDate;
              }
            }
          });
        }
        return;
      }

      const header = e.target.closest('.filter-section__header');
      if (header && !header.dataset.target?.includes('modal')) {
        e.preventDefault();
        const section = header.closest('.filter-section');
        const wasOpen = section.classList.contains('open');

        document.querySelectorAll('.filter-section').forEach(s => s.classList.remove('open'));

        if (!wasOpen) {
          section.classList.add('open');
        }
        return;
      }

      const option = e.target.closest('.filter-option:not(.filter-option--has-child):not(.filter-sublevel__back)');
      if (option) {
        e.preventDefault();
        const value = option.textContent.trim();
        const section = option.closest('.filter-section');
        const sublevel = option.closest('.filter-sublevel');

        if (section.id === 'sec-direction') values.direction = value;
        else if (section.id === 'sec-country') values.country = value;
        else if (section.id === 'sec-resort') values.resort = value;
        else if (section.id === 'sec-type' || sublevel) values.type = value;

        const list = option.closest('.filter-list');
        list.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        updateDisplay();

        if (sublevel) {
          sublevel.classList.remove('active');
        }
        section.classList.remove('open');
        return;
      }

      const hasChild = e.target.closest('.filter-option--has-child');
      if (hasChild) {
        e.preventDefault();
        const targetId = hasChild.dataset.target;
        const sublevel = document.getElementById(targetId);
        if (sublevel) {
          const isActive = sublevel.classList.toggle('active');
          hasChild.classList.toggle('open', isActive);
        }
        return;
      }

      const backBtn = e.target.closest('.filter-sublevel__back');
      if (backBtn) {
        e.preventDefault();
        const parentId = backBtn.dataset.parent;
        const parent = document.getElementById(parentId);
        if (parent) parent.classList.remove('active');
        return;
      }
    });

    if (nightsModal) {
      nightsModal.addEventListener('click', function (e) {
        const counterBtn = e.target.closest('.filter-counter__btn');
        if (counterBtn) {
          const target = counterBtn.dataset.target;
          const input = document.getElementById(`${target}-input`);
          let val = parseInt(input.value) || 0;

          if (counterBtn.classList.contains('plus')) {
            val++;
          } else {
            val = Math.max(1, val - 1);
          }

          input.value = val;
          return;
        }

        if (e.target.closest('#nightsApply')) {
          e.preventDefault();
          values.nightsFrom = document.getElementById('nights-from-input').value;
          values.nightsTo = document.getElementById('nights-to-input').value;
          updateDisplay();
          closeModal(nightsModal, nightsModalOverlay);
          return;
        }
      });

      nightsModal.querySelectorAll('.filter-counter__input').forEach(input => {
        input.addEventListener('change', function () {
          let val = parseInt(this.value) || 1;
          val = Math.max(1, val);
          this.value = val;
        });
      });
    }

    if (calendarApply) {
      calendarApply.addEventListener('click', function (e) {
        e.preventDefault();
        updateDisplay();
        closeModal(calendarModal, calendarModalOverlay);
      });
    }

    if (nightsModalOverlay) {
      nightsModalOverlay.addEventListener('click', () => closeModal(nightsModal, nightsModalOverlay));
    }
    if (calendarModalOverlay) {
      calendarModalOverlay.addEventListener('click', () => closeModal(calendarModal, calendarModalOverlay));
    }
    if (trigger) trigger.addEventListener('click', (e) => { e.preventDefault(); openFilter(); });
    if (btnClose) btnClose.addEventListener('click', (e) => { e.preventDefault(); closeFilter(); });
    if (overlay) overlay.addEventListener('click', closeFilter);


    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        if (!hasAnyValue()) return;
        console.log('Filter values:', values);
        closeFilter();
      });
    }

    const searchInputs = panel.querySelectorAll('.filter-search input');
    searchInputs.forEach(input => {
      input.addEventListener('input', function () {
        const query = this.value.toLowerCase().trim();
        const section = this.closest('.filter-section');
        const options = section.querySelectorAll('.filter-list > li:not(:has(.filter-sublevel)) .filter-option, .filter-list > li > .filter-option:not(.filter-option--has-child)');

        options.forEach(option => {
          const text = option.textContent.toLowerCase();
          const li = option.closest('li');
          if (text.includes(query)) {
            li.style.display = '';
          } else {
            li.style.display = 'none';
          }
        });
      });
    });


    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (currentModal) {
          closeAllModals();
        } else if (isOpen) {
          closeFilter();
        }
      }
    });

    console.log('Mobile filter initialized!');
  })();
});

(function () {
  'use strict';

  const MOBILE_BREAKPOINT = 768;

  let originalState = null;

  function initMobileReorder() {
    const mapSection = document.querySelector('.map');
    const napSection = document.querySelector('.nap');
    const dreamSection = document.querySelector('.dream');

    if (!mapSection || !napSection || !dreamSection) {
      console.warn('[MobileReorder] Не найдены необходимые секции (.map, .nap, .dream)');
      return;
    }

    if (!originalState) {
      originalState = {
        napParent: napSection.parentNode,
        napNext: napSection.nextElementSibling,
        dreamParent: dreamSection.parentNode,
        dreamNext: dreamSection.nextElementSibling
      };
    }

    function applyMobileOrder() {
      mapSection.insertAdjacentElement('afterend', napSection);
      napSection.insertAdjacentElement('afterend', dreamSection);
    }

    function restoreDesktopOrder() {
      if (originalState.napNext) {
        originalState.napParent.insertBefore(napSection, originalState.napNext);
      } else {
        originalState.napParent.appendChild(napSection);
      }

      if (originalState.dreamNext) {
        originalState.dreamParent.insertBefore(dreamSection, originalState.dreamNext);
      } else {
        originalState.dreamParent.appendChild(dreamSection);
      }
    }

    function checkAndApply() {
      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

      if (isMobile) {
        if (napSection.previousElementSibling !== mapSection) {
          applyMobileOrder();
        }
      } else {
        if (napSection.previousElementSibling === mapSection ||
          (dreamSection.previousElementSibling === napSection)) {
          restoreDesktopOrder();
        }
      }
    }

    checkAndApply();

    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkAndApply, 150);
    });

    window.addEventListener('orientationchange', function () {
      setTimeout(checkAndApply, 300);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileReorder);
  } else {
    initMobileReorder();
  }
})();

document.addEventListener('DOMContentLoaded', function() {
    var btn = document.getElementById('filterTriggerMobile');
    var filterPanelWrapper = document.getElementById('filterPanelWrapper');
    var filterOverlay = document.getElementById('filterOverlay');
    var filterClose = document.getElementById('filterClose');
    var fixedIconsMobile = document.querySelector('.fixed-icons__mobile');
    var scrollPosition = 0;

    if (!btn || !filterPanelWrapper || !filterOverlay) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        filterPanelWrapper.classList.add('active');
        filterOverlay.classList.add('active');
        document.body.classList.add('filter-open');

        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollPosition);
        document.documentElement.style.scrollBehavior = '';

        if (fixedIconsMobile) {
            fixedIconsMobile.classList.remove('visible');
        }
    });

    function closeFilter() {
        filterPanelWrapper.classList.remove('active');
        filterOverlay.classList.remove('active');
        document.body.classList.remove('filter-open');

        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, scrollPosition);
        document.documentElement.style.scrollBehavior = '';
    }

    if (filterClose) {
        filterClose.addEventListener('click', closeFilter);
    }

    if (filterOverlay) {
        filterOverlay.addEventListener('click', closeFilter);
    }
});