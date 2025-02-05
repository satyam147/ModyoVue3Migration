/* Config file for i18n plugin */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
// @ts-ignore
import esCL from 'vee-validate/dist/locale/es.json'
// @ts-ignore
import enUS from 'vee-validate/dist/locale/en.json'
import liquidParser from './liquid/liquidParser.ts'
import esLocales from './locales/es.json'
import enLocales from './locales/en.json'
import TranslationsRepository from './repositories/TranslationsRepository.ts'
// @ts-ignore
Vue.use(VueI18n)

// Get page language from modyo, change to your needs
const LANG = liquidParser.parse('{{site.lang}}')
const USED_LANGUAGES = ['en', 'es']

// @ts-ignore
export const i18n = new VueI18n({
  locale: LANG,
  fallbackLocale: 'es',
  // eslint-disable-next-line no-use-before-define
  messages: loadLocaleMessages(),
  asyncLoading: false
})

function loadLocaleMessages() {
  const messages: any = {}
  messages.es = {
    ...esLocales,
    validations: esCL.messages
  }

  messages.en = {
    ...enLocales,
    validations: enUS.messages
  }
  return messages
}

export const loadLanguageAsync = async () => {
  try {
    const allPosts: any = await Promise.all(
      USED_LANGUAGES.map(async (lang) => TranslationsRepository.getTranslations(lang))
    )
    const messages: any = {
      en: {
        ...enLocales,
        validations: enUS.messages,
        ...allPosts[0].entries[0].fields
      },
      es: {
        ...esLocales,
        validations: esCL.messages,
        ...allPosts[1].entries[0].fields
      }
    }
    USED_LANGUAGES.forEach((lang) => i18n.setLocaleMessage(lang, messages[lang]))
  } finally {
    i18n.asyncLoading = true
  }
}
