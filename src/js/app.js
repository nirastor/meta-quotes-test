import Menu from './menu';
import Plot from './plot';
import Controls from './controls';

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
    this.fromYearValue = null;
    this.toYearValue = null;
  }

  setYearValue(prefix, value) {
    this[`${prefix}YearValue`] = value;
    this.plot.update(this.menuSelected, this.fromYearValue, this.toYearValue);
  }

  setMenuSelected(value) {
    const oldValue = this.menuSelected;
    this.menuSelected = value;
    this.menu.redraw(oldValue, this.menuSelected);
    this.plot.update(this.menuSelected, this.fromYearValue, this.toYearValue);
  }

  init() {
    this.menuSelected = this.menuItems[0].value;
    this.fromYearValue = 1881;
    this.toYearValue = 1881;

    this.menu = new Menu(
      this.menuEl,
      this.menuItems,
      this.menuSelected,
      this.setMenuSelected.bind(this),
    );
    this.menu.init();

    this.plot = new Plot(this.plotEl);
    this.plot.init();
    this.plot.update(this.menuSelected, this.fromYearValue, this.toYearValue);

    this.controls = new Controls(this.controlsEl, this.setYearValue.bind(this));
    this.controls.init();
  }
}

const app = new App();
app.init();
