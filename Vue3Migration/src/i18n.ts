/* Config file for i18n plugin */

import { createI18n } from 'vue-i18n'

import es from '@vee-validate/i18n/dist/locale/es.json'
import en from '@vee-validate/i18n/dist/locale/en.json'

import esLocales from './locales/es.json'
import enLocales from './locales/en.json'
import liquidParser from '@/liquid/liquidParser.ts'

// Get page language from modyo, change to your needs
const LANG = liquidParser.parse('{{site.lang}}')

export const i18n = createI18n({
  locale: LANG,
  fallbackLocale: 'en',
  messages: loadLocaleMessages()
})

function loadLocaleMessages() {
  const messages: any = {}
  messages.es = {
    ...es.messages,
    ...esLocales
  }
  messages.en = {
    ...en.messages,
    ...enLocales
  }
  return messages
}
export default { i18n }
