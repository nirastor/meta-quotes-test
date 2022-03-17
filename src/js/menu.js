export default class Menu {
  constructor(parentEl, menuItems, selected, selectItem) {
    this.parentEl = parentEl;
    this.menuItems = menuItems;
    this.selected = selected;
    this.selectItem = selectItem;
    this.menuElementsCollection = {};
  }

  init() {
    this.menuItems.forEach((m) => {
      const newItem = document.createElement('div');
      newItem.textContent = m.title;
      newItem.classList.add('menu-item');
      if (this.selected === m.value) {
        newItem.classList.add('menu-item--selected');
      }
      newItem.addEventListener('click', () => this.selectItem(m.value));
      this.menuElementsCollection[m.value] = newItem;
      this.parentEl.appendChild(newItem);
    });
  }

  redraw(oldItem, newItem) {
    this.menuElementsCollection[oldItem].classList.remove('menu-item--selected');
    this.menuElementsCollection[newItem].classList.add('menu-item--selected');
  }
}
