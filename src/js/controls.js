export default class Controls {
  constructor(parentEl, setYearValue) {
    this.parentEl = parentEl;
    this.setYearValue = setYearValue;
    this.fromEl = null;
    this.toEl = null;
    this.fromYear = 1881;
    this.toYear = 2006;
  }

  init() {
    ['from', 'to'].forEach((prefix) => {
      const elementName = `${prefix}El`;
      this[elementName] = document.createElement('select');
      for (let i = this.fromYear; i <= this.toYear; i += 1) {
        const newOption = document.createElement('option');
        newOption.textContent = i;
        newOption.value = i;
        this[elementName].appendChild(newOption);
      }
      this[elementName].addEventListener('change', () => this.setYearValue(prefix, Number(this[elementName].value)));
      this[elementName].value = this[`${prefix}Year`];
      this.parentEl.appendChild(this[elementName]);
    });
  }
}
