import { MIN_YEAR, MAX_YEAR } from '../refs';

export default class Controls {
  constructor(parentEl, setYearValue) {
    this.parentEl = parentEl;
    this.setYearValue = setYearValue;
    this.fromEl = null;
    this.toEl = null;
  }

  init() {
    ['from', 'to'].forEach((prefix) => {
      const elementName = `${prefix}El`;
      this[elementName] = document.createElement('select');
      for (let i = MIN_YEAR; i <= MAX_YEAR; i += 1) {
        const newOption = document.createElement('option');
        newOption.textContent = i;
        newOption.value = i;
        this[elementName].appendChild(newOption);
      }
      this[elementName].addEventListener('change', () => this.setYearValue(prefix, Number(this[elementName].value)));
      this[elementName].value = prefix === 'from' ? MIN_YEAR : MAX_YEAR;
      this.parentEl.appendChild(this[elementName]);
    });
  }
}
