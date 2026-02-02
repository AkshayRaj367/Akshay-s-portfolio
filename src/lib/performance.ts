// Performance optimization utilities

// Intersection Observer for lazy loading
export const useLazyLoad = (callback: () => void, options?: IntersectionObserverInit) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(entry.target)
      }
    })
  }, options)

  return observer
}

// Throttle function for performance
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  let lastExecTime = 0

  return (...args: Parameters<T>) => {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

// Debounce function for search inputs
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

// Preload critical resources
export const preloadResources = (resources: string[]) => {
  resources.forEach((resource) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = resource
    link.as = resource.endsWith('.js') ? 'script' : 'image'
    document.head.appendChild(link)
  })
}

// Optimize images with WebP format
export const getOptimizedImageUrl = (url: string, width?: number, format?: string) => {
  const urlObj = new URL(url, window.location.origin)
  if (width) {
    urlObj.searchParams.set('w', width.toString())
  }
  if (format) {
    urlObj.searchParams.set('f', format)
  }
  return urlObj.toString()
}

// Memory management for 3D scenes
export const cleanupThreeJS = (scene: any, renderer: any, camera: any) => {
  // Clear scene objects
  scene.traverse((object: any) => {
    if (object.geometry) {
      object.geometry.dispose()
    }
    if (object.material) {
      if (Array.isArray(object.material)) {
        object.material.forEach((material: any) => material.dispose())
      } else {
        object.material.dispose()
      }
    }
  })

  // Dispose renderer
  renderer.dispose()
  renderer.forceContextLoss()

  // Clear references
  scene.clear()
  camera.clear()
}

// Performance monitoring
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name} took ${end - start} milliseconds`)
}

// Reduce motion for accessibility
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Check device capabilities
export const getDeviceCapabilities = () => {
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  
  return {
    webgl: !!gl,
    cores: navigator.hardwareConcurrency || 4,
    memory: (navigator as any).deviceMemory || 4,
    connection: (navigator as any).connection?.effectiveType || '4g'
  }
}

// Adaptive quality settings based on device
export const getQualitySettings = () => {
  const capabilities = getDeviceCapabilities()
  
  if (!capabilities.webgl || capabilities.cores < 4 || capabilities.memory < 4) {
    return {
      particles: 50,
      shadows: false,
      antialias: false,
      resolution: 0.5
    }
  }
  
  if (capabilities.cores >= 8 && capabilities.memory >= 8) {
    return {
      particles: 100,
      shadows: true,
      antialias: true,
      resolution: 1
    }
  }
  
  return {
    particles: 75,
    shadows: false,
    antialias: true,
    resolution: 0.75
  }
}

// Service Worker registration for offline support
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js')
      console.log('Service Worker registered:', registration)
    } catch (error) {
      console.log('Service Worker registration failed:', error)
    }
  }
}

// Cache management
export const cacheResources = async (resources: string[], cacheName: string) => {
  if ('caches' in window) {
    const cache = await caches.open(cacheName)
    await cache.addAll(resources)
  }
}

// Background sync for form submissions
export const syncFormData = async (formData: any) => {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register('sync-form')
    // Store form data in IndexedDB for later sync
    localStorage.setItem('pendingForm', JSON.stringify(formData))
  }
}
