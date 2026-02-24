import i18next from 'i18next'
import { createContext, useState, useEffect } from 'react'


export const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('lang') || 'en')

  useEffect(() => {
    i18next.changeLanguage(language)
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    localStorage.setItem('lang', language)
  }, [language])

  const changeLanguage = lang => {
    setLanguage(lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
