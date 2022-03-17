import loadedFilms from './loadedFilms.json';
// ▲ ▼

export default class Table {
  constructor() {
    this.films = [];
    this.tableData = document.querySelector('.table__data');
    this.state = {
      sortedBy: null,
      direction: null,
    };
    this.digitalParams = ['id', 'year', 'imdb'];
    this.controls = [];
  }

  init() {
    this.load();
    this.render();
    this.controls = Array.from(document.querySelectorAll('.js-table-control'));
  }

  load() {
    this.films = loadedFilms;
  }

  clear() {
    this.tableData.innerHTML = '';
    this.clearHeader();
  }

  clearHeader() {
    this.controls.forEach((control) => {
      const text = control.innerText;
      const textLenght = text.length;
      const lastSymbol = text[textLenght - 1];
      if (lastSymbol === '▲' || lastSymbol === '▼') {
        // eslint-disable-next-line no-param-reassign
        control.innerText = text.slice(0, textLenght - 2);
      }
    });
  }

  render() {
    this.clear();
    this.films.forEach((film) => {
      this.tableData.innerHTML += `
      <div class="table__row">
        <div class="table__cell table__cell--id table__cell--digit">${film.id}</div>
        <div class="table__cell table__cell--title table__cell--text">${film.title}</div>
        <div class="table__cell table__cell--year table__cell--digit">${film.year}</div>
        <div class="table__cell table__cell--imdb table__cell--digit">${film.imdb.toFixed(2)}</div>
      </div>
      `;
    });
    this.renderHeader();
  }

  renderHeader() {
    if (!this.state.sortedBy) {
      return;
    }

    const sorted = this.controls.find((item) => item.dataset.control === this.state.sortedBy);
    if (this.state.direction === 'ASC') {
      sorted.innerText += ' ▲';
    } else {
      sorted.innerText += ' ▼';
    }
  }

  sort(sortParam) {
    this.changeState(sortParam);
    this.films.sort((a, b) => {
      if (this.digitalParams.includes(sortParam)) {
        if (a[sortParam] > b[sortParam]) return 1;
        if (a[sortParam] < b[sortParam]) return -1;
        return 0;
      }
      const collator = new Intl.Collator();
      return collator.compare(a[sortParam], b[sortParam]);
    });
    if (this.state.direction === 'DESC') {
      this.films.reverse();
    }
    this.render();
  }

  changeState(sortParam) {
    if (this.state.sortedBy !== sortParam) {
      this.state.sortedBy = sortParam;
      this.state.direction = 'ASC';
    } else {
      this.state.direction = this.state.direction === 'ASC' ? 'DESC' : 'ASC';
    }
  }
}
