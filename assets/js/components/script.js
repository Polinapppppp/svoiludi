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
    const menuLevels = document.getElementById('menuLevels');
    let currentLevel = 0;
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
    currentLevel++;

    stack.push(targetId);

    menuLevels.style.transform =
        `translateX(-${currentLevel * 100}%)`;

    menuNav.classList.add('visible');
    updateBreadcrumbs();
}


    function goBack() {
    if (!stack.length) return;

    stack.pop();

    currentLevel--;

    menuLevels.style.transform =
        `translateX(-${currentLevel * 100}%)`;

    if (!stack.length) {
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
        e.stopPropagation();

        if (menuNav.classList.contains('has-single')) {
          goBack();
        }
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
  // ===== МОБИЛЬНЫЙ ФИЛЬТР =====
  (function () {
    const overlay = document.getElementById('filterOverlay');
    const panel = document.getElementById('filterPanel');
    const btnBack = document.getElementById('filterBack');
    const btnClose = document.getElementById('filterClose');
    const titleEl = document.getElementById('filterTitle');
    const trigger = document.getElementById('filterTrigger');
    const btnSubmit = document.getElementById('filterSubmit');

    if (!panel) return;

    let stack = [];
    let isOpen = false;

    // Значения фильтра
    const values = {
      direction: '',
      country: '',
      resort: '',
      type: '',
      nightsFrom: '1',
      nightsTo: '5',
      date: ''
    };

    function findLevel(id) { return document.getElementById(id); }

    function getLevelTitle(id) {
      const el = document.getElementById(id);
      return el ? (el.dataset.title || '') : '';
    }

    function updateNav() {
      if (stack.length > 0) {
        titleEl.textContent = getLevelTitle(stack[stack.length - 1]);
        btnBack.classList.add('visible');
      } else {
        titleEl.textContent = 'Подобрать путешествие';
        btnBack.classList.remove('visible');
      }
    }

    function goForward(targetId) {
      const target = findLevel(targetId);
      if (!target) return;
      stack.push(targetId);
      const current = document.querySelector('.filter-level.active');
      if (current) current.classList.remove('active');
      target.classList.add('active');
      updateNav();
    }

    function goBack() {
      if (stack.length === 0) return;
      const currentId = stack.pop();
      const current = findLevel(currentId);
      if (current) current.classList.remove('active');
      const prevId = stack.length > 0 ? stack[stack.length - 1] : 'filter-level-0';
      const prev = findLevel(prevId);
      if (prev) prev.classList.add('active');
      updateNav();
    }

    function openFilter() {
      isOpen = true;
      overlay.classList.add('active');
      panel.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeFilter() {
      isOpen = false;
      overlay.classList.remove('active');
      panel.classList.remove('active');
      document.body.style.overflow = '';

      setTimeout(() => {
        document.querySelectorAll('.filter-level').forEach(el => el.classList.remove('active'));
        const l0 = document.getElementById('filter-level-0');
        if (l0) l0.classList.add('active');
        stack = [];
        updateNav();
      }, 350);
    }

    function updateDisplay() {
      // Направление
      const dirItem = document.querySelector('[data-target="filter-direction"] .fi-text');
      if (dirItem) dirItem.textContent = values.direction || 'Выберите направление';

      // Страна
      const countryItem = document.querySelector('[data-target="filter-country"] .fi-text');
      if (countryItem) countryItem.textContent = values.country || 'Страна';

      // Город
      const resortItem = document.querySelector('[data-target="filter-resort"] .fi-text');
      if (resortItem) resortItem.textContent = values.resort || 'Город/Курорт';

      // Вид отдыха
      const typeItem = document.querySelector('[data-target="filter-type"] .fi-text');
      if (typeItem) typeItem.textContent = values.type || 'Вид отдыха';

      // Ночи
      const nightsItem = document.querySelector('[data-target="filter-nights"] .fi-text');
      if (nightsItem) nightsItem.textContent = `${values.nightsFrom} - ${values.nightsTo}`;

      // Дата
      const dateItem = document.querySelector('[data-target="filter-date"] .fi-text');
      if (dateItem) dateItem.textContent = values.date || 'Дата поездки';
    }

    // Клики по панели
    panel.addEventListener('click', function (e) {
      // Вперёд (айтемы с data-target)
      const item = e.target.closest('[data-target]');
      if (item && item.classList.contains('filter-item')) {
        e.preventDefault();
        e.stopPropagation();
        goForward(item.dataset.target);
        return;
      }

      // Вперёд (опции с подуровнями)
      const subItem = e.target.closest('.filter-option[data-target]');
      if (subItem) {
        e.preventDefault();
        e.stopPropagation();
        goForward(subItem.dataset.target);
        return;
      }

      // Выбор опции (без подуровня)
      const option = e.target.closest('.filter-option:not([data-target])');
      if (option) {
        e.preventDefault();
        const value = option.dataset.value || option.textContent.trim();
        const parentLevel = option.closest('.filter-level');

        // Определяем поле
        if (parentLevel.id === 'filter-direction') values.direction = value;
        else if (parentLevel.id === 'filter-country') values.country = value;
        else if (parentLevel.id === 'filter-resort') values.resort = value;
        else if (parentLevel.id === 'filter-type' || parentLevel.id === 'filter-excursion') values.type = value;

        // Подсветка
        parentLevel.querySelectorAll('.filter-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        updateDisplay();
        goBack();
        return;
      }

      // Счётчик
      const counterBtn = e.target.closest('.filter-counter__btn');
      if (counterBtn) {
        const input = counterBtn.parentElement.querySelector('.filter-counter__input');
        let val = parseInt(input.value) || 0;
        if (counterBtn.classList.contains('plus')) val++;
        else val = Math.max(1, val - 1);
        input.value = val;

        const row = counterBtn.closest('.filter-counter__row');
        if (row.querySelector('span').textContent === 'от') values.nightsFrom = val;
        else values.nightsTo = val;
        return;
      }

      // Применить (ночи)
      const applyNights = e.target.closest('.filter-apply');
      if (applyNights && applyNights.closest('#filter-nights')) {
        updateDisplay();
        goBack();
        return;
      }

      // Применить (дата)
      const applyDate = e.target.closest('.filter-apply');
      if (applyDate && applyDate.closest('#filter-date')) {
        const dateInput = document.querySelector('.form-datapicker-mobile');
        if (dateInput) values.date = dateInput.value;
        updateDisplay();
        goBack();
        return;
      }
    });

    // Кнопки
    if (trigger) trigger.addEventListener('click', (e) => { e.preventDefault(); openFilter(); });
    if (btnBack) btnBack.addEventListener('click', (e) => { e.preventDefault(); goBack(); });
    if (btnClose) btnClose.addEventListener('click', (e) => { e.preventDefault(); closeFilter(); });
    if (overlay) overlay.addEventListener('click', closeFilter);

    // Submit
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        console.log('Filter values:', values);
        // Здесь отправка формы
        closeFilter();
      });
    }

    // Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        stack.length > 0 ? goBack() : closeFilter();
      }
    });

    // Календарь
    if (document.querySelector('.form-datapicker-mobile')) {
      new AirDatepicker('.form-datapicker-mobile', {
        minDate: new Date(),
        range: true,
        isMobile: true,
        multipleDatesSeparator: ' — '
      });
    }

    console.log('Mobile filter initialized!');
  })();
});