import sha1 from 'sha1';

class I18n {
  constructor() {
    this.translation = null;
  }
  init(options) {
    this.translation = options.resources[options.lng][options.defaultNS];
  }
  t(key) {
    return this.translation[key];
  }
  _(str) {
    let key = sha1(str);
    let result = this.t(key);
    return (result === '') ? str : result;
  }
  xml(dom) {
    let categories = dom.getElementsByTagName('category');
    for (let i = 0; i < categories.length; i++) {
      let child = categories[i];
      let str = child.getAttribute('i18n-text');
      let key;
      let hasTranslation = false;
      if (str === null) {
        key = child.getAttribute('i18n');
        if (key !== null) {
          hasTranslation = true;
        }
      } else {
        key = sha1(str);
        hasTranslation = true;
      }
      let result = this.t(key);
      if (hasTranslation) {
        child.setAttribute('name', (result === '') ? str : result);
      }
      if (child.childNodes.length > 0) {
        this.xml(child);
      }
    }
    return dom;
  }
}

export default new I18n();
