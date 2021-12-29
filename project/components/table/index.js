export default class Template {
  element; // HTMLElement;

  // TODO: show empty message
  constructor({ data = [], configuration = [] } = {}) {
    this.data = data;
    this.configuration = configuration;

    console.log(this.data);
    this.render();
  }

  get template() {
    return `
      <table>
        ${this.renderTableHeader()}
        ${this.renderTableContent()}
      </table>
    `;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    // bindEvent();

    return this.element
  }

  renderTableHeader() {
    const emptyTableHeaderCell = `<th></th>`;
    const tableTitle = this.configuration.map(tableTitle => `<th>${tableTitle}</th>`).join('');

    return `
      <thead>
        <tr>
          ${emptyTableHeaderCell}
          ${tableTitle}
        </tr>
      </thead>
    `;
  }

  renderTableContent() {
    const tableRow = this.data.reduce((prev, current, index) => {
      const rowNumber = `<td>${++index}</td>`

      let row = this.configuration.map(td => {
        if (td === 'Number of episodes'){
          return `<td>${current.episode.length}</td>`
        }
        if (td === 'Avatar'){
          const imageSize = 60;
          return `<td><img width="${imageSize}" height="${imageSize}" src=${current.image} /></td>`
        }

        return `<td>${current[td.toLowerCase()]}</td>`;
      }).join('');
      return [...prev, `<tr>${rowNumber}${row}</tr>`];
    }, []);

    return `${tableRow}`;
  }

  destroy() {
    this.element.remove();
  }
}
