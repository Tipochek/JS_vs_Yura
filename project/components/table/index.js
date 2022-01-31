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
    //TODO:
    const sortConfigFromSessionStorage = JSON.parse(sessionStorage.getItem(this.TEXT_SORT_CONFIG));
    const isSortConfigSessionStorage = !!Object.keys(sortConfigFromSessionStorage || {}).length;
    let sortParam = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortParam : this.defaultSortConfig.sortParam;
    let sortDirection = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortDirection : this.defaultSortConfig.sortDirection;

    let emptyTableHeaderCell;

    console.log(this.sortParam)

    let tableTitle = this.configuration.map(
      (elem) => `<th data-id="${elem.toLowerCase()}" ${this.dataSortingDirection}${elem.toLowerCase() === this.sortParam ? `="${sortDirection}"` : ''} >${elem}</th>`
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

  getSortingConfigToSessionStorage() {
    //TODO:
  }

  removeSortingStatus() {
    const arrTh = this.element.querySelectorAll('th');
    arrTh.forEach(item => item.setAttribute(this.dataSortingDirection, ''));
  }

  tableSort(elem) {
    const sortDirectionUp = 'up';
    const sortDirectionDown = 'down';

    //TODO:
    const sortConfigFromSessionStorage = JSON.parse(sessionStorage.getItem(this.TEXT_SORT_CONFIG));
    const isSortConfigSessionStorage = !!Object.keys(sortConfigFromSessionStorage || {}).length;
    let sortParam = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortParam : this.defaultSortConfig.sortParam;
    let sortDirection = isSortConfigSessionStorage ? sortConfigFromSessionStorage.sortDirection : this.defaultSortConfig.sortDirection;
    let sortedArr;

    // console.log(elem)
    // console.log(elem.dataset.id)

    // console.log({isSortConfigSessionStorage})
    // console.log({sortConfigFromSessionStorage})
    // console.log(this.defaultSortConfig)
    // console.log({sortParam})
    // console.log({sortDirection})

    // this.sortParam = elem.dataset.id;

    if (sortParam === 'avatar') {
      return false;
    } else if (sortParam === 'number of episodes') {
      sortParam = 'episode';
      if (sortDirection === sortDirectionDown) {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam].length > b[sortParam].length) ? 1 : -1);
        sortDirection = sortDirectionUp;
      } else {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam].length > b[sortParam].length) ? -1 : 1);
        sortDirection = sortDirectionDown;
      }
    } else {
      if (sortDirection === sortDirectionDown) {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam] > b[sortParam]) ? 1 : -1);
        sortDirection = sortDirectionUp;
      } else {
        sortedArr = [...this.data].sort((a, b) => (a[sortParam] > b[sortParam]) ? -1 : 1);
        sortDirection = sortDirectionDown;
      }
    }

    this.sortedData = sortedArr;
    this.setSortingConfigToSessionStorage(sortParam, sortDirection);
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
