const menuButton = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.main-nav')

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open')
  menuButton.setAttribute('aria-expanded', String(isOpen))
})

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open')
    menuButton.setAttribute('aria-expanded', 'false')
  })
})

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element))


const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return

    const element = entry.target
    const target = Number(element.dataset.target || 0)
    const prefix = element.dataset.prefix || ''
    const suffix = element.dataset.suffix || ''
    const duration = 1300
    const startTime = performance.now()

    const animate = now => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(target * eased)
      element.textContent = `${prefix}${current}${suffix}`

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
    observer.unobserve(element)
  })
}, { threshold: 0.45 })

document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter))


const heroScene = document.querySelector('.clean-growth-scene')

if (heroScene) {
  const heroSceneObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        window.setTimeout(() => {
          heroScene.classList.add('hero-ready')
        }, 200)
        heroSceneObserver.unobserve(entry.target)
      }
    })
  }, { threshold: 0.28 })

  heroSceneObserver.observe(heroScene)
}
