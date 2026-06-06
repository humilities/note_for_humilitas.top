// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import './custom.css'

function installOutlineAutoScroll(router) {
  if (typeof window === 'undefined' || !router) return

  let observer
  let ticking = false
  let lastActiveLink
  const previousAfterRouteChanged = router.onAfterRouteChanged

  const getScrollOffset = () => {
    const navHeight = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--vp-nav-height'),
      10
    )
    return (Number.isNaN(navHeight) ? 64 : navHeight) + 72
  }

  const getHash = (link) => {
    try {
      return decodeURIComponent(new URL(link.href).hash)
    } catch {
      return decodeURIComponent(link.getAttribute('href') || '')
    }
  }

  const activateCurrentOutlineLink = () => {
    const links = [...document.querySelectorAll('.VPDocAsideOutline .outline-link')]
    const headings = [...document.querySelectorAll('.VPDoc .vp-doc h2[id], .VPDoc .vp-doc h3[id]')]
    const marker = document.querySelector('.VPDocAsideOutline .outline-marker')

    if (!links.length || !headings.length) return

    const offset = getScrollOffset()
    const isBottom = Math.ceil(window.scrollY + window.innerHeight) >= document.documentElement.scrollHeight
    let activeHash = ''

    if (isBottom) {
      activeHash = `#${headings[headings.length - 1].id}`
    } else {
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > offset) break
        activeHash = `#${heading.id}`
      }
    }

    const active = links.find((link) => getHash(link) === activeHash)
    const current = links.find((link) => link.classList.contains('active'))

    if (current !== active) {
      current?.classList.remove('active')
      active?.classList.add('active')
    }

    if (active) {
      if (marker) {
        marker.style.top = `${active.offsetTop + 39}px`
        marker.style.opacity = '1'
      }
    } else if (marker) {
      marker.style.top = '33px'
      marker.style.opacity = '0'
    }
  }

  const scrollActiveIntoOutline = () => {
    const scroller = document.querySelector('.VPDoc .aside-container')
    const active = document.querySelector('.VPDocAsideOutline .outline-link.active')
    if (!scroller) return

    if (!active) {
      lastActiveLink = undefined
      scroller.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (active === lastActiveLink) return
    lastActiveLink = active

    active.scrollIntoView({
      block: 'center',
      inline: 'nearest',
      behavior: 'smooth'
    })
  }

  const requestScroll = () => {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(() => {
      ticking = false
      activateCurrentOutlineLink()
      scrollActiveIntoOutline()
    })
  }

  const observeOutline = () => {
    observer?.disconnect()
    const outline = document.querySelector('.VPDoc .aside-container')
    if (!outline) return

    lastActiveLink = undefined
    observer = new MutationObserver(requestScroll)
    observer.observe(outline, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['class']
    })
    requestScroll()
  }

  window.addEventListener('scroll', requestScroll, { passive: true })
  window.addEventListener('resize', requestScroll)
  window.addEventListener('hashchange', requestScroll)
  router.onAfterRouteChanged = (...args) => {
    previousAfterRouteChanged?.(...args)
    window.setTimeout(observeOutline, 80)
    window.setTimeout(requestScroll, 180)
  }
  window.setTimeout(observeOutline, 80)
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    installOutlineAutoScroll(router)
  }
}
