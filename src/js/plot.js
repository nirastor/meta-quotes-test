export default class Plot {
  constructor(plotEl) {
    this.plotEl = plotEl;
  }

  update(text) {
    this.plotEl.textContent = text;
  }
}
