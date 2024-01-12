class ElementsStatusLoading {
  constructor({ selector, isHidden = false }) {
    this.div = this.getLoader(selector);

    isHidden && this.hide();
  }

  getLoader(selector) {
    return document.querySelector(selector);
  }

  show() {
    this.div.classList.remove('hidden');
  }

  hide() {
    this.div.classList.add('hidden');
  }
}

export { ElementsStatusLoading };
