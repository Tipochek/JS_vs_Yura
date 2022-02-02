export default class Template {
  element; // HTMLElement;
  TEXT_SORT_CONFIG = 'sortConfig';

  constructor({
      data = [],
      configuration = [],
      defaultSortConfig = {
        sortParam: 'name',
        sortDirection: 'down'
      }
    } = {}) {

    this.data = data;
    this.sortedData = null;
    this.configuration = configuration;
    this.defaultSortConfig = defaultSortConfig;
    this.dataSortingDirection = `data-sorting-direction`;
    this.sortParam = this.defaultSortConfig.sortParam;
    this.sortDirection = this.defaultSortConfig.sortDirection;

    this.render();
    this.bindEvents();
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
    this.getSortingConfigFromSessionStorage();

    const element = document.createElement('div');

    element.innerHTML = this.template;

    this.element = element.firstElementChild;

    return this.element;
  }

  update() {
    const [thead] = this.element.getElementsByTagName('thead');
    thead.innerHTML = this.renderTableHeader();
    const [tbody] = this.element.getElementsByTagName('tbody');
    tbody.innerHTML = this.renderTableContent();
  }

  renderTableHeader() {
    let emptyTableHeaderCell;
    let tableTitle = this.configuration.map(
      (elem) => `<th data-id="${elem.toLowerCase()}" ${this.dataSortingDirection}${elem.toLowerCase() === this.sortParam ? `="${this.sortDirection}"` : ''} >${elem}</th>`
    ).join('');

    if (this.data.length > 0 && this.configuration.length > 0) {
      emptyTableHeaderCell = `<th>№</th>`;
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

  renderTableContent() {
    const data = this.sortedData || this.data;
    let tableRow;

    if (!data?.length && !this.configuration?.length) {
      const colspan = this.configuration.length;

      tableRow = `
        <tr>
          <td colspan="${colspan}">No data received</td>
        </tr>
      `;
    } else if (data.length > 0 && !this.configuration.length) {
      tableRow = `
        <tr>
          <td>Data received but <b>no</b> configuration</td>
        </tr>
      `;
    } else {
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
    }

    return `
      <tbody>
        ${tableRow}
      </tbody>
    `;
  }

  setSortingConfigToSessionStorage(id, direction) {
    const sortConfig = {
      sortParam: id,
      sortDirection: direction
    }

    sessionStorage.setItem(this.TEXT_SORT_CONFIG, JSON.stringify(sortConfig));
  }

  getSortingConfigFromSessionStorage() {
    const sortConfigFromSessionStorage = JSON.parse(sessionStorage.getItem(this.TEXT_SORT_CONFIG));
    const isSortConfigSessionStorage = !!Object.keys(sortConfigFromSessionStorage || {}).length;
    this.sortParam = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortParam : this.defaultSortConfig.sortParam;
    this.sortDirection = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortDirection : this.defaultSortConfig.sortDirection;
  }

  removeSortingStatus() {
    const arrTh = this.element.querySelectorAll('th');
    arrTh.forEach(item => item.setAttribute(this.dataSortingDirection, ''));
  }

  tableSort(elem) {
    const sortDirectionUp = 'up';
    const sortDirectionDown = 'down';

    if (this.sortParam === elem.dataset.id) {
      const currentSortDirection = elem.getAttribute(this.dataSortingDirection);

      if (currentSortDirection && (currentSortDirection === sortDirectionDown)) {
        this.setSortingConfigToSessionStorage(elem.dataset.id, sortDirectionUp);
      } else {
        this.setSortingConfigToSessionStorage(elem.dataset.id, sortDirectionDown);
      }
    } else {
      this.removeSortingStatus();
      this.setSortingConfigToSessionStorage(elem.dataset.id, sortDirectionDown);
    }

    this.getSortingConfigFromSessionStorage();
    let sortedArr;

    if (this.sortParam === 'avatar') {
      return false;
    } else if (this.sortParam === 'number of episodes') {
      const sortParam = 'episode';
      if (this.sortDirection === sortDirectionDown) {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam].length > b[sortParam].length) ? 1 : -1);
      } else {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam].length > b[sortParam].length) ? -1 : 1);
      }
    } else {
      if (this.sortDirection === sortDirectionDown) {
        sortedArr = [...this.data].sort((a, b) => (a[this.sortParam] > b[this.sortParam]) ? 1 : -1);
      } else {
        sortedArr = [...this.data].sort((a, b) => (a[this.sortParam] > b[this.sortParam]) ? -1 : 1);
      }
    }

    this.sortedData = sortedArr;
    this.update();
  }

  bindEvents() {
    let [thead] = this.element.getElementsByTagName('thead');

    thead.addEventListener('click', (e) => {
      this.tableSort(e.target);
    })
  }

  destroy() {
    thead.removeEventListener('click', this.tableSort());

    this.element.remove();
  }
}
