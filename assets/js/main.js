/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

// Initialize EmailJS
emailjs.init('8Y3CHItag2qgiEafy')

const sendEmail = (e) => {
    e.preventDefault()

    // Show sending message
    contactMessage.textContent = 'Sending message...'

    // serviceID - templateID - #form - public key
    emailjs.sendForm('service_9zpyj85', 'template_i8cq0gf', '#contact-form', '8Y3CHItag2qgiEafy')
        .then(() => {
            // Show sent message
            contactMessage.textContent = 'Message sent successfully ✅'

            // Remove message after five seconds
            setTimeout(() => {
                contactMessage.textContent = ''
            }, 5000)

            // Clear input fields
            contactForm.reset()
        })
        .catch((error) => {
            // Show error message
            contactMessage.textContent = 'Message not sent (service error) ❌'
            console.error('EMAILJS ERROR:', error)
        })
}

contactForm.addEventListener('submit', sendEmail)

// SHOW SCROLL UP

const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

// SCROLL SECTIONS ACTIVE LINK

const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__list a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

// SCROLL REVEAL ANIMATION

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,

})

sr.reveal(`.perfil, .contact__form`)
sr.reveal(`.info`,{origin: 'left',delay: 800})
sr.reveal(`.skills`,{origin:'left',delay: 1000})
sr.reveal(`.about`,{origin:'right',delay: 1200})
sr.reveal(`.projects__card, .services__card, .experience__card`,{interval: 100})



