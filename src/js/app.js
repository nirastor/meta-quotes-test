import Menu from './menu';
import Plot from './plot';
import Controls from './controls';

import {
  TEMPERATURE, PRECIPITATION, MIN_YEAR, MAX_YEAR,
} from '../refs';

class App {
  constructor() {
    this.appEl = document.querySelector('.app');
    this.menuEl = document.querySelector('.menu');
    this.controlsEl = document.querySelector('.controls');
    this.plotEl = document.querySelector('.plot');
    this.menuItems = [
      { title: 'Температура', value: TEMPERATURE },
      { title: 'Осадки', value: PRECIPITATION },
    ];
    this.menuSelected = TEMPERATURE;
    this.fromYearValue = MIN_YEAR;
    this.toYearValue = MAX_YEAR;
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
