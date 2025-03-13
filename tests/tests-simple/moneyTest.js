import { formatCurrency } from '../../scripts/utils/money.js';

console.log('Test suite: formartCurrency');
console.log('Converts cents to dollars');
if (formatCurrency(2095) === '20.95') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Works with 0')
if (formatCurrency(0) === '0.00') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}

console.log('Rounds down to the nearest cent');
if (formatCurrency(2000.4) === '20.00') {
  console.log('16a passed');
} else {
  console.log('16a failed');
}

console.log('Round down to the nearest negative cent');
if (formatCurrency(-2000.5) === '-20.01') {
  console.log('16b passed');
} else {
  console.log('16b failed');
}