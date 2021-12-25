export default class Template {
  element; // HTMLElement;

  constructor() {
    this.render();
  }

  get template() {
    return `
      <div>TEST</div>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    return this.element
  }

  destroy() {
    this.element.remove();
  }
}
