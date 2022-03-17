import temperature from '../data/temperature.json';
import precipitation from '../data/precipitation.json';

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
    this.yScale = plotHeight / (data.map((f) => Math.abs(f.v)).sort((a, b) => b - a)[0]);
  }

  drawGraph(zeroLevel) {
    const {
      ctx, data, xScale, yScale,
    } = this;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    data.forEach((point, index) => ctx.lineTo(index * xScale, zeroLevel - point.v * yScale));
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  getZeroLevel(menuSelected) {
    let zeroLevel = null;
    let plotHeight = null;
    const { height } = this;
    switch (menuSelected) {
      case 'temperature':
        zeroLevel = height / 2;
        plotHeight = height / 2;
        break;
      case 'precipitation':
        zeroLevel = height;
        plotHeight = height;
        break;
      default:
        zeroLevel = height;
        plotHeight = height;
    }
    return { zeroLevel, plotHeight };
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

    const { zeroLevel, plotHeight } = this.getZeroLevel(menuSelected);
    this.calculateScale(plotHeight);
    this.drawZero(zeroLevel);
    this.drawGraph(zeroLevel);
  }
}
