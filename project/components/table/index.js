export default class Template {
  element; // HTMLElement;

  constructor({ data = [], configuration = [] } = {}) {
    this.data = data;
    this.configuration = configuration;

    // console.log(this.data);
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

    this.bindEvents();

    return this.element
  }

  renderSorted(data) {
    const [thead] = this.element.getElementsByTagName('thead');
    const tbody = document.createElement('tbody');
    tbody.innerHTML = this.renderTableContent(data);

    return thead.after(tbody);
  }

  renderTableHeader() {
    let emptyTableHeaderCell;
    let tableTitle = this.configuration.map(tableTitle => `<th>${tableTitle}</th>`).join('');

    if (this.data.length > 0 && this.configuration.length > 0) {
      emptyTableHeaderCell = `<th></th>`;
    } else if (this.data.length == 0 && this.configuration.length > 0) {
      emptyTableHeaderCell = null;
    } else {
      emptyTableHeaderCell = null;
      tableTitle = `<th>No configuration received</th>`;
    }

    return `
      <thead>
        <tr>
          ${emptyTableHeaderCell}
          ${tableTitle}
        </tr>
      </thead>
    `;
  }

  renderTableContent(sortedData) {
    const data = sortedData || this.data;
    let tableRow;

    if (data.length > 0 && this.configuration.length > 0) {
      tableRow = data.reduce((prev, current, index) => {
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
        return [...prev, `<tr>${rowNumber}${row}</tr>`].join('');
      }, []);
    } else if (data.length > 0 && this.configuration.length == 0) {
      tableRow = `
        <tr>
          <td>Data received but <b>no</b> configuration</td>
        </tr>
      `;
    } else {
      const colspan = this.configuration.length;

      tableRow = `
        <tr>
          <td colspan="${colspan}">No data received</td>
        </tr>
      `;
    }

    return `
      <tbody>
        ${tableRow}
      </tbody>
    `;
  }

  tableSort(elem) {
    const sortBy = elem.textContent.toLowerCase();
    const sortedArr = [...this.data].sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1);

    this.removeTableContent();
    this.renderSorted(sortedArr);
  }

  removeTableContent() {
    const [tbody] = this.element.getElementsByTagName('tbody');
    tbody.remove();
  }

  bindEvents() {
    let [thead] = this.element.getElementsByTagName('thead');

    thead.addEventListener('click', (e) => {
      // console.log(e.target);
      this.tableSort(e.target);
    })
  }

  destroy() {
    this.element.remove();
  }
}
