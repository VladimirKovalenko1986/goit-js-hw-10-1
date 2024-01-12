class ElementSelect {
  constructor({ selector, isHidden = false }) {
    this.select = this.getSelect(selector);

    isHidden && this.hide();
  }

  getSelect(selector) {
    return document.querySelector(selector);
  }

  show() {
    this.select.classList.remove('hidden');
  }

  hide() {
    this.select.classList.add('hidden');
  }
}

export { ElementSelect };
