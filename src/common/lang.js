import $ from 'jquery'
import { parseQueryString } from 'binary-common-utils/lib/tools'
import { set as setStorage, get as getStorage } from 'binary-common-utils/lib/storageManager'
import { supportedLanguages, translate, init } from './i18n'

export const getLanguage = () => {
  const queryLang = parseQueryString().l
  const lang = queryLang in supportedLanguages ?
    queryLang :
    getStorage('lang') || 'en'
  setStorage('lang', lang)
  return lang
}

const addUiLang = () => {
  $('[data-i18n-text]')
    .each(function each() {
      const el = $(this)

      el.text(translate($(this)
        .attr('data-i18n-text')))

      const contents = el.contents()
      if (contents.length &&
        contents.get(0).nodeType === Node.TEXT_NODE) {
        el.append(contents.slice(1))
      }
    })
}

export const load = () => {
  const lang = getLanguage()

  $('#select_language li:not(:first)')
    .click(function click() {
      const newLang = $(this).attr('class')
      document.location.search = `l=${newLang}`
    })

  $('.language')
    .text($(`.${lang}`)
    .hide().text())

  if (lang === 'ach') {
    window._jipt = [['project', 'binary-bot']]
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `${document.location.protocol}//cdn.crowdin.com/jipt/jipt.js`
    $('body').append(script)
  }

  init(lang)

  addUiLang()
}
