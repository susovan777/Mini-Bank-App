// Functionality for Bankist App

// Data
const account1 = {
    owner: "Susovan Sahoo",
    txns: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111
};

const account2 = {
    owner: "Dipam Mehra",
    txns: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5, // %
    pin: 2222
};

const account3 = {
    owner: "Abhishek Kumar",
    txns: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 1.3, // %
    pin: 3333
};

const account4 = {
    owner: "Osman Ashrafi",
    txns: [430, 1000, 700, 50, 90],
    interestRate: 1, // %
    pin: 4444
};

const accounts = [account1, account2, account3, account4];

// **************** Elements selections ****************
// login navbar
const loginWelcome = document.querySelector('.welcome');

const containerApp = document.querySelector('.app');

// balance section
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance_value');

// transaction section
const containerTransactions = document.querySelector('.transactions');

// summary section
const labelSumIn = document.querySelector('.summary_value--in');
const labelSumOut = document.querySelector('.summary_value--out');
const labelSumInterest = document.querySelector('.summary_value--int');

// all button sections
const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.btn-transfer');
const btnLoan = document.querySelector('.btn-loan');
const btnClose = document.querySelector('.btn-close');
const btnSort = document.querySelector('.btn_sort');

// all input field
const inputLoginUser = document.querySelector('login_input--user');
const inputLoginPin = document.querySelector('login_input--pin');
const inputTransferTo = document.querySelector('ops_transfer-to');
const inputTransferAmount = document.querySelector('ops_transfer-amount');
const inputLoanAmount = document.querySelector('ops_loan-amount');
const inputCloseUser = document.querySelector('ops_close-user');
const inputClosePin = document.querySelector('ops_close-pin');

// logout timer
const labelTimer = document.querySelector('.timer');

// /////////////////////////////////////////////////////////////////////////////////

// global variable
const displayTransactions = function (txns) {
    containerTransactions.innerHTML = '';
    txns.forEach((txn) => {
        const type = txn > 0 ? 'credit' : 'debit'; // if txn +ve then credit or debit
        
        const html = `
        <div class="txns">
            <div class="txns_type ${type}">${type}</div>
            
            <div class="txns_value">${txn}</div>
        </div>
        `;

        containerTransactions.insertAdjacentHTML('afterbegin', html);
    });
}
displayTransactions(account1.txns);

// Computing the username
const createUsername = function(accounts) {
    accounts.forEach(acnt => {
        acnt.userName = acnt.owner
            .toLocaleLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
}
createUsername(accounts)
// console.log(accounts);

// Calculate deposits and withdrawals
const transactions = account1.txns;
const deposits = transactions.filter((txn) => txn > 0);
console.log(deposits); 

const withdrawals = transactions.filter((txn) => txn < 0);
console.log(withdrawals); 

// Lession 153: The Reduce method
console.log(transactions);

function calcDispBalance(transactions) {
    const balance = transactions.reduce((acc, cv) => acc + cv, 0)
    labelBalance.textContent = `₹${balance}`;
}

calcDispBalance(transactions);

// maximum value
const max = transactions.reduce((acc, cv) => {
    if (acc > cv) return acc;
    else return cv;
}, transactions[0])
console.log(max);

