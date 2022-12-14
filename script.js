'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'prasanna',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'bharani',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'naresh',
  movements: [500, -500, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i, arr) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
    <div class="movements__value">${mov}???</div>
  </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, cur) {
    return acc + cur;
  }, 0);
  labelBalance.textContent = ` ${acc.balance} ???`;
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} ???`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov, i, arr) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * 1.2) / 100)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}`;
};

// const createUserNames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(function (name) {
//         return name[0];
//       })
//       .join('');
//   });
// };
// createUserNames(accounts);

const updateUi = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc.movements);
};
//event handlers
let currentAcoount;

currentAcoount = account1;
updateUi(currentAcoount);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAcoount = accounts.find(acc => acc.owner === inputLoginUsername.value);
  console.log(currentAcoount);

  if (currentAcoount?.pin === Number(inputLoginPin.value)) {
    //displaying UI
    labelWelcome.textContent = `Welcome back , ${
      currentAcoount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear inputs
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUi(currentAcoount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.owner === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if (
    amount > 0 &&
    recieverAcc &&
    currentAcoount.balance >= amount &&
    recieverAcc?.owner !== currentAcoount.owner
  ) {
    console.log(currentAcoount.movements.push(-amount));
    recieverAcc.movements.push(amount);

    //Update UI
    updateUi(currentAcoount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAcoount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAcoount.movements.push(amount);

    // Update UI
    updateUi(currentAcoount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAcoount.owner &&
    (Number(inputClosePin.value), currentAcoount.pin)
  ) {
    const index = accounts.findIndex(acc => acc.owner === currentAcoount.owner);

    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcoount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// //SLICE
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));

// //SPLICE

// console.log(arr.splice(2));
// console.log(arr); //splice mutate the array

// //REVERSE
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); //mutate

// //CONCAT

// const letters = arr.concat(arr2);
// console.log(letters);

// //JOIN

// console.log(letters.join('-'));

// //FOR-EACH METHOD

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

let credited = 0;
let debited = 0;
for (let movement of movements) {
  if (movement > 0) {
    credited += movement;
    console.log(`you deposited ${movement}`);
  } else {
    debited += Math.abs(movement);
    console.log(`you withdrew ${Math.abs(movement)}`);
  }
}
console.log(`total amount in your bank is ${credited - debited}`);

//FOR-EACH WITH ARRAY
movements.forEach(function (curEle, curIn, arr) {
  if (curEle > 0) {
    credited += curEle;
    console.log(`${curIn} you deposited ${curEle}`);
  } else {
    debited += Math.abs(curEle);
    console.log(`${curIn} you withdrew ${Math.abs(curEle)}`);
  }
});

//FOR-EACH WITH MAP

let ele = new Map([
  ['Telangana', 'Hyderabad'],
  ['TamilNadu', 'Chennai'],
  ['Karnataka', 'Bangalore'],
]);

ele.forEach(function (value, key, map) {
  console.log(key, value);
});

//FOR-EACH WITH SETS

const currenciesUnique = new Set(['USD', 'RUP', 'EUR']);
currenciesUnique.forEach(function (value, _, Map) {
  console.log(`${value}:${value}`);
});

//THE MAP METHOD

const rupToUsd = 79.82;
const movementsRup = movements.map(function (mov) {
  return mov * rupToUsd;
});
console.log(movements);
console.log(movementsRup);

// THE FILTER METHOD

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

//THE REDUCE METHOD

const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`iteration${i}: ${acc}`);
  return acc + cur;
}, 0);
console.log(balance);

//maximum value

const max = movements.reduce(function (acc, cur, i, arr) {
  if (acc > cur) {
    return acc;
  } else {
    return cur;
  }
}, movements[0]);
console.log(max);

// /Coding Challenge #2

// Let's go back to Julia and Kate's study about dogs. This time, they want to convert
// dog ages to human ages and calculate the average age of the dogs in their study.
// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's
// ages ('ages'), and does the following things in order:
// 1. Calculate the dog age in human years using the following formula: if the dog is
// <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old,
// humanAge = 16 + dogAge * 4
// 2. Exclude all dogs that are less than 18 human years old (which is the same as
// keeping dogs that are at least 18 years old)
// 3. Calculate the average human age of all adult dogs (you should already know
// from other challenges how we calculate averages ???)
// 4. Run the function for both test datasets
// Test data:
// ?? Data 1: [5, 2, 4, 1, 15, 8, 3]
// ?? Data 2: [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function (ages) {
  const humanAge = ages
    .map(dogAge => (dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4))
    .filter(mov => mov >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);
  console.log(humanAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
// Coding Challenge #3
// Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
// as an arrow function, and using chaining!
// Test data:
// ?? Data 1: [5, 2, 4, 1, 15, 8, 3]
// ?? Data 2: [16, 6, 10, 5, 6, 1, 4]

//THE Find Method

const firstWithDrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithDrawal);

console.log(accounts);

// const account = accounts.find(acc => acc.owner === 'prasanna kumar');

// for (let account of accounts) {
//   if (account.owner === 'prasanna kumar') {
//     console.log(account);
//   }
// }

//CREATE AND FILLING ARRAYS
// PROGRAMATICALLY

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));
// Emprty arrays + fill method
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('???', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
});
