export type AuthModalMode = 'signin' | 'signup'

export const openAuthModal = (mode: AuthModalMode = 'signin') => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent<AuthModalMode>('lawbridge-auth-open', { detail: mode }))
}

export const closeAuthModal = () => {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('lawbridge-auth-close'))
}