import temperature from '../data/temperature.json';
import precipitation from '../data/precipitation.json';

import { GRAPH_SETTINGS } from '../refs';

function getMaxAbs(arr) {
  return arr.reduce((res, val) => {
    const mod = Math.abs(val.v);
    return mod > res ? mod : res;
  }, Math.abs(arr[0].v));
}

export default class Plot {
  constructor(plotEl) {
    this.plotEl = plotEl;
    this.temperature = temperature.map((t) => ({ ...t, year: parseInt(t.t, 10) }));
    this.precipitation = precipitation.map((t) => ({ ...t, year: parseInt(t.t, 10) }));
    this.height = 600;
    this.width = 900;
    this.canvas = null;
    this.messageBox = null;
    this.ctx = null;
    this.data = null;
    this.xScale = null;
    this.yScale = null;
  }

  init() {
    this.messageBox = document.createElement('div');
    this.plotEl.appendChild(this.messageBox);

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.plotEl.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
  }

  setBackground() {
    const { ctx, width, height } = this;
    ctx.fillStyle = '#999999';
    ctx.fillRect(0, 0, width, height);
  }

  filterData(menuSelected, fromYear, toYear) {
    this.data = this[menuSelected].filter((t) => (t.year >= fromYear && t.year <= toYear));
  }

  drawZero(zeroLevel) {
    const { ctx, width } = this;
    ctx.beginPath();
    ctx.moveTo(0, zeroLevel);
    ctx.lineTo(width, zeroLevel);
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }

  calculateScale(plotHeight) {
    const { width, data } = this;
    this.xScale = width / data.length;
    this.yScale = plotHeight / getMaxAbs(data);
  }

  drawGraph(zeroLevel) {
    const {
      ctx, data, xScale, yScale,
    } = this;
    ctx.beginPath();
    ctx.moveTo(0, zeroLevel);
    data.forEach((point, index) => ctx.lineTo(index * xScale, zeroLevel - point.v * yScale));
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  update(menuSelected, fromYear, toYear) {
    this.setBackground();

    if (fromYear > toYear) {
      this.messageBox.textContent = 'Год «от» не должен быть больше года «до»';
      return;
    }
    this.messageBox.textContent = `${menuSelected} ${fromYear}—${toYear}`;

    this.filterData(menuSelected, fromYear, toYear);
    this.calculateScale();

    const { height } = this;
    const zeroLevel = GRAPH_SETTINGS[menuSelected].getZeroLevel(height);
    const plotHeight = GRAPH_SETTINGS[menuSelected].getPlotHeight(height);

    this.calculateScale(plotHeight);
    this.drawZero(zeroLevel);
    this.drawGraph(zeroLevel);
  }
}
