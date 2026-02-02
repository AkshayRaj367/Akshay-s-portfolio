// Service Worker for offline support and caching

const CACHE_NAME = 'akshay-portfolio-v1'
const urlsToCache = [
  '/',
  '/about',
  '/skills',
  '/projects',
  '/certifications',
  '/achievements',
  '/experience',
  '/contact',
  '/resume.pdf'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }

        // Clone the request
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })

          return response
        })
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-form') {
    event.waitUntil(syncForm())
  }
})

async function syncForm() {
  const formData = localStorage.getItem('pendingForm')
  if (formData) {
    try {
      // Send form data to server
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData
      })
      
      // Clear pending form data
      localStorage.removeItem('pendingForm')
    } catch (error) {
      console.log('Form sync failed:', error)
    }
  }
}
