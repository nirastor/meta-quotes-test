import Table from './table';

const table = new Table();

table.init();

table.controls.forEach((control) => control.addEventListener('click', (e) => {
  e.preventDefault();
  table.sort(control.dataset.control);
}));
