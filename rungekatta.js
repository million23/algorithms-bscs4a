import inquirer from 'inquirer';
import pkg from 'terminal-kit';
const { createTerminal } = pkg;

const terminal = createTerminal();

let input = {
  x0: 0,
  y0: 0,
  xn: 0,
  h: 0,
  yn: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  k: 0,
  n: 0,
};

const questions = [
  {
    type: 'number',
    name: 'x0',
    message: 'Enter initial value of x \n> ',
  },
  {
    type: 'number',
    name: 'y0',
    message: 'Enter initial value of y \n> ',
  },
  {
    type: 'number',
    name: 'xn',
    message: 'Enter calculation limit \n> ',
  },
  {
    type: 'number',
    name: 'n',
    message: 'Enter number of steps \n> ',
  },
];

const f = (x, y) => {
  return (y * y - x * x) / (y * y + x * x);
};

const rungekutta = () => {
  console.clear();

  // start timer
  const start = new Date().getTime();

  const table = [['x0', 'y0', 'yn', 'k1', 'k2', 'k3', 'k4', 'k']];

  // calculate step size
  input.h = (input.xn - input.x0) / input.n;

  // start euler method
  for (let i = 0; i < input.n; i++) {
    input.k1 = input.h * f(input.x0, input.y0);
    input.k2 = input.h * f(input.x0 + input.h / 2, input.y0 + input.k1 / 2);
    input.k3 = input.h * f(input.x0 + input.h / 2, input.y0 + input.k2 / 2);
    input.k4 = input.h * f(input.x0 + input.h, input.y0 + input.k3);
    input.k = (input.k1 + 2 * input.k2 + 2 * input.k3 + input.k4) / 6;
    input.yn = input.y0 + input.k;
    table.push([
      input.x0.toFixed(4),
      input.y0.toFixed(4),
      input.yn.toFixed(4),
      input.k1.toFixed(4),
      input.k2.toFixed(4),
      input.k3.toFixed(4),
      input.k4.toFixed(4),
      input.k.toFixed(4),
    ]);
    input.x0 += input.h;
    input.y0 = input.yn;
  }

  // end timer
  const end = new Date().getTime();
  const time = end - start;

  // print table
  terminal.table(table, {
    hasBorder: true,
    borderChars: 'lightRounded',
    borderAttr: { color: 'blue' },
    contentHasMarkup: true,
    textAttr: { bgColor: 'default' },
    width: 60,
  });

  // print value of y at xn
  terminal(`
  Value of y at x = ${input.xn} is ${input.yn.toFixed(4)}
  Time taken: ${time}ms
  `);
};

const main = async () => {
  // get input from user
  input = await inquirer.prompt(questions);

  // start euler method
  rungekutta();
};

main();
