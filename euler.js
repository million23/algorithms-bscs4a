import inquirer from 'inquirer';
import pkg from 'terminal-kit';
const { createTerminal } = pkg;

const terminal = createTerminal();

let input = {
  n: 0,
  x0: 0,
  y0: 0,
  xn: 0,
  h: 0,
  yn: 0,
  slope: 0,
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

const f = (x, y) => x + y;

const euler = (e) => {
  // start timer
  const start = new Date().getTime();

  const table = [['x0', 'y0', 'slope', 'yn']];

  // calculate step size
  input.h = (input.xn - input.x0) / input.n;

  // start euler method
  for (let i = 0; i < input.n; i++) {
    input.slope = f(input.x0, input.y0);
    input.yn = input.y0 + input.h * input.slope;
    table.push([
      input.x0.toFixed(4),
      input.y0.toFixed(4),
      input.slope.toFixed(4),
      input.yn.toFixed(4),
    ]);
    input.x0 += input.h;
    input.y0 = input.yn;
  }
  console.clear();

  terminal.green('Results\n\n');
  // output the value of y
  terminal.table(table, {
    hasBorder: true,
    borderChars: 'lightRounded',
    borderAttr: { color: 'blue' },
    width: 50,
    fit: true, // Activate all expand/shrink + wordWrap
  });

  // display the value of y
  terminal('\nThe vale of ')
    .blue('y')
    .white(' at x = ')
    .blue(input.xn)
    .white(' is ')
    .blue(input.yn.toFixed(4))
    .white('.');

  // end timer
  const end = new Date().getTime();
  terminal('\nTime taken: ').blue(`${end - start}ms\n\n\n`);
};

console.clear();

inquirer.prompt(questions).then((answer) => {
  input = { ...input, ...answer };
  euler();
});
