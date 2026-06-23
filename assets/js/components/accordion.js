const accordion = document.querySelectorAll('.accordion');

const accordionShow = () => {
    if (accordion) {
        accordion.forEach(accordion => {
            accordion.querySelectorAll('.accordion__item').forEach(item => {
                item.style.maxHeight = item.querySelector('.accordion__title').scrollHeight + 'px';
                item.addEventListener('click', (event) => {
                    if (event.target.classList.contains('accordion__title')) {
                        accordion.querySelectorAll('.accordion__item').forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                                otherItem.style.maxHeight = otherItem.querySelector('.accordion__title').scrollHeight + 'px';
                            }
                        });
                        item.classList.toggle('active');
                        if (item.classList.contains('active')) {
                            item.style.maxHeight = item.scrollHeight + 50 + 'px';
                        } else {
                                item.style.maxHeight = item.querySelector('.accordion__title').scrollHeight + 'px';
                        }
                    }
                });
            });
        });
    }
};

