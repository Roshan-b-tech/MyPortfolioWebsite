/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById('contact-form'),
    contactMessage = document.getElementById('contact-message')

// Initialize EmailJS with config
emailjs.init(window.config.EMAILJS_PUBLIC_KEY)

const sendEmail = (e) => {
    e.preventDefault()

    // Show sending message
    contactMessage.textContent = 'Sending message...'

    // serviceID - templateID - #form - public key
    emailjs.sendForm(
        window.config.EMAILJS_SERVICE_ID,
        window.config.EMAILJS_TEMPLATE_ID,
        '#contact-form'
    )
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
sr.reveal(`.info`, { origin: 'left', delay: 800 })
sr.reveal(`.skills`, { origin: 'left', delay: 1000 })
sr.reveal(`.about`, { origin: 'right', delay: 1200 })
sr.reveal(`.projects__card, .services__card, .experience__card`, { interval: 100 })

//=============== CHATBOT ===============
const chatbot = document.getElementById('chatbot')
const chatbotNavToggle = document.getElementById('chatbot-nav-toggle')
const chatbotMessages = document.getElementById('chatbot-messages')
const chatbotInput = document.getElementById('chatbot-input')
const chatbotSend = document.getElementById('chatbot-send')



// Chatbot responses
const chatbotResponses = {
    greetings: [
        "Hello! How can I help you today? 😊",
        "Hi there! What would you like to know about me? 👋",
        "Hey! I'm here to help. What's on your mind? ✨"
    ],
    skills: [
        "I'm skilled in React, Node.js, MongoDB, Python, TypeScript, Next.js, and many more technologies! 💻",
        "My expertise includes frontend development (React, Next.js), backend development (Node.js, Express), and data science with Python. 🚀",
        "I work with modern web technologies like React, TypeScript, MongoDB, and also specialize in AI-powered automation. 🤖"
    ],
    projects: [
        "I've built several projects including Uber Clone, Fashy (e-commerce), AI Course Builder, myPrep (interview platform), and more! Check out my projects section for details. 🎯",
        "Some of my recent work includes Gaming Hub, Code Master (online code editor), Personal Finance Visualizer, and Dribble UI clone. All links are in my projects section! 🔗",
        "I've created various web applications from e-commerce platforms to AI-powered tools. You can see all my projects with live links in the projects section above! 📱"
    ],
    services: [
        "I offer Frontend Development, Backend Development, and Full Stack Development with AI-Powered Automation. Let's discuss your project! 💼",
        "My services include custom web development, database design, API development, and AI integration. What type of project do you have in mind? 🤝",
        "I provide end-to-end web solutions including UI/UX design, development, and deployment. Ready to bring your ideas to life! ✨"
    ],
    contact: [
        "You can reach me via email through the contact form above, or connect with me on LinkedIn, GitHub, or Twitter! 📧",
        "Feel free to use the contact form on this page, or find me on social media. I'm always open to new opportunities! 🌟",
        "The best way to reach me is through the contact form above, or you can connect with me on LinkedIn for professional inquiries! 📞"
    ],
    experience: [
        "I have 2+ years of experience in web development. I worked at TechnoHack as a Full Stack & Java Developer (2022-2023) and at WhiteCream as a Full Stack Developer Intern (2024-2025). 🏢",
        "My experience includes full-stack development using React, Node.js, MongoDB, and Java. I've worked on various projects from e-commerce to AI applications. 💼",
        "I've been developing web applications for over 2 years, with experience in both frontend and backend technologies. Check out my experience section for more details! 📈"
    ],
    default: [
        "I'm not sure I understood that. Could you ask about my skills, projects, services, experience, or how to contact me? 🤔",
        "I'd be happy to help! You can ask me about my work, skills, projects, or how to get in touch. What would you like to know? 💭",
        "Let me know if you'd like to hear about my skills, projects, services, experience, or contact information! 🎯"
    ]
}

// Toggle chatbot
if (chatbotNavToggle) {
    chatbotNavToggle.addEventListener('click', (e) => {
        e.preventDefault()
        chatbot.classList.toggle('active')
        chatbotNavToggle.classList.toggle('active')

        if (chatbot.classList.contains('active')) {
            if (chatbotInput) chatbotInput.focus()
        }
    })
}

// Send message function
const sendMessage = () => {
    if (!chatbotInput) return

    const message = chatbotInput.value.trim()
    if (!message) return

    // Add user message
    addMessage(message, 'user')
    chatbotInput.value = ''

    // Simulate typing delay
    setTimeout(() => {
        const response = getBotResponse(message)
        addMessage(response, 'bot')
    }, 1000)
}

// Add message to chat
const addMessage = (text, sender) => {
    if (!chatbotMessages) return

    const messageDiv = document.createElement('div')
    messageDiv.className = `chatbot__message chatbot__message--${sender}`

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    messageDiv.innerHTML = `
    <div class="chatbot__message-content">
      <p>${text}</p>
    </div>
    <div class="chatbot__message-time">${time}</div>
  `

    chatbotMessages.appendChild(messageDiv)
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight
}

// Get bot response
const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return getRandomResponse(chatbotResponses.greetings)
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return getRandomResponse(chatbotResponses.skills)
    } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
        return getRandomResponse(chatbotResponses.projects)
    } else if (lowerMessage.includes('service') || lowerMessage.includes('offer') || lowerMessage.includes('help')) {
        return getRandomResponse(chatbotResponses.services)
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
        return getRandomResponse(chatbotResponses.contact)
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
        return getRandomResponse(chatbotResponses.experience)
    } else {
        return getRandomResponse(chatbotResponses.default)
    }
}

// Get random response from array
const getRandomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)]
}

// Event listeners
if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage)
}
if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage()
        }
    })
}





