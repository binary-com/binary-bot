import $ from 'jquery'

export default class LanguageDropdown {
    constructor() {
        $('ul#select_language li')
            .click(function onClick() {
                const id = $(this).attr('class')
                $('.language')
                    .trigger('change_language', id)
            })
    }
}

export const languageDropdown = new LanguageDropdown()
