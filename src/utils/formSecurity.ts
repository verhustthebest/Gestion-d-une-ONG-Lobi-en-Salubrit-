const defaultMaxLength = 1200

export type ValidationResult = {
  ok: boolean
  message?: string
}

export function sanitizeText(value: FormDataEntryValue | null, maxLength = defaultMaxLength) {
  return String(value || '')
    .replace(/[<>]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value)
}

export function isValidPhone(value: string) {
  return /^\+?[0-9\s().-]{7,22}$/.test(value)
}

export function validateRequired(fields: Array<[string, string]>) {
  const missing = fields.find(([, value]) => value.length < 2)
  if (missing) {
    return { ok: false, message: `Veuillez completer le champ "${missing[0]}".` }
  }
  return { ok: true }
}

export function checkHoneypot(form: FormData) {
  return sanitizeText(form.get('website'), 80).length === 0
}

export function checkRateLimit(key: string, seconds = 45): ValidationResult {
  if (typeof window === 'undefined') return { ok: true }

  const storageKey = `onglobi.rate.${key}`
  const now = Date.now()
  const last = Number(window.localStorage.getItem(storageKey) || 0)

  if (last && now - last < seconds * 1000) {
    return {
      ok: false,
      message: `Merci de patienter ${seconds} secondes entre deux envois.`,
    }
  }

  window.localStorage.setItem(storageKey, String(now))
  return { ok: true }
}
