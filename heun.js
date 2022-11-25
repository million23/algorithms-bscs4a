import inquirer from 'inquirer';
import pkg from 'terminal-kit';
const { createTerminal } = pkg;

const terminal = createTerminal();

let input = {
  x: 0,
  y: 0,
  h: 0,
  xn: 0,
  l: 0,
};

const questions = [
  {
    type: 'number',
    name: 'x',
    message: 'Enter initial value of x \n> ',
  },
  {
    type: 'number',
    name: 'y',
    message: 'Enter initial value of y \n> ',
  },
  {
    type: 'number',
    name: 'h',
    message: 'Enter step size h \n> ',
  },
  {
    type: 'number',
    name: 'xn',
    message: 'Enter value of x at which y is to be found \n> ',
  },
];

const f = (x, y) => (2 * y) / x;

const heun = () => {
  console.clear();

  // start timer
  const start = new Date().getTime();

  // end timer
  const end = new Date().getTime();

  // initialize table
  let table = [['x', 'y']];

  // start heun
  while (input.x + input.h <= input.xn) {
    input.l =
      (input.h / 2) *
      (f(input.x, input.y) +
        f(input.x + input.h, input.y + input.h * f(input.x, input.y)));
    input.y += input.l;
    input.x += input.h;
    table.push([input.x.toFixed(4), input.y.toFixed(4)]);
  }

  // print table
  terminal.table(table, {
    hasBorder: true,
    borderChars: 'lightRounded',
    borderAttr: { color: 'blue' },
    contentHasMarkup: true,
    width: 40,
  });

  // print y at xn and the time taken
  terminal(`y(${input.xn}) = ${input.y.toFixed(4)}\n`);
  terminal(`Time taken: ${end - start}ms\n`);
};

inquirer.prompt(questions).then((answers) => {
  input = { ...input, ...answers };
  heun();
});
