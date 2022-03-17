import Menu from './menu';
import Plot from './plot';

class App {
  constructor() {
    this.appEl = document.querySelector('.app');
    this.menuEl = document.querySelector('.menu');
    this.controlsEl = document.querySelector('.controls');
    this.plotEl = document.querySelector('.plot');
    this.menuItems = [
      { title: 'Температура', value: 'temperature' },
      { title: 'Осадки', value: 'precipitation' },
    ];
    this.menuSelected = null;
  }

  setMenuSelected(value) {
    const oldValue = this.menuSelected;
    this.menuSelected = value;
    this.menu.redraw(oldValue, this.menuSelected);
    this.plot.update(`Выбран пункт: ${this.menuSelected}`);
  }

  init() {
    this.menuSelected = this.menuItems[0].value;

    this.menu = new Menu(
      this.menuEl,
      this.menuItems,
      this.menuSelected,
      this.setMenuSelected.bind(this),
    );
    this.menu.init();

    this.plot = new Plot(this.plotEl);
    this.plot.update(`Выбран пункт: ${this.menuSelected}`);
  }
}

const app = new App();
app.init();
