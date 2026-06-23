const modalShow = () => {

    const callModal = document.querySelectorAll('.btn__call'),
        modalConst = document.querySelectorAll('.modal'),
        modalClose = document.querySelectorAll('.modal__close'),
        bodyDoc = document.querySelector('body');

    callModal.forEach(item => {
        item.addEventListener('click', (e)=> {
            e.preventDefault()
            modalConst.forEach(i=> {
                if (i.getAttribute('id') == item.getAttribute('data-modal')) {
                    i.classList.add('active')
                    bodyDoc.classList.add('hidden')
                }
            })
        
        })
    })
    modalConst.forEach(i=> {
        i.addEventListener('click', (event)=> {
            if (event.target === i) {
                i.classList.remove('active')
                bodyDoc.classList.remove('hidden')
            }
        })
    })
    
    modalClose.forEach(i=> {
        i.addEventListener('click', ()=> {
            i.closest('.modal').classList.remove('active')
            bodyDoc.classList.remove('hidden')
        })
    })

}

