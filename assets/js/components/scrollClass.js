const scrollClass = () => {

    let scrollpos = window.scrollY

    const header = document.querySelector("header")
    const menu = document.querySelector(".menu")
    const scrollChange = 1

    const add_class_on_scroll = () => {
        menu.classList.add("fixed")
        header.classList.add("fixed")
    }
    const remove_class_on_scroll = () => {
        menu.classList.remove("fixed")
        header.classList.remove("fixed")
    }

    if (scrollpos > 10) {
        add_class_on_scroll()
    }

    window.addEventListener('scroll', function() { 
        scrollpos = window.scrollY;

        if (scrollpos >= scrollChange) { add_class_on_scroll() }
        else { remove_class_on_scroll() }
    
    })


}

