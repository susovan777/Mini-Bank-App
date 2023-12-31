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
const inputLoginUser = document.querySelector('.login_input--user');
const inputLoginPin = document.querySelector('.login_input--pin');
const inputTransferTo = document.querySelector('.ops_transfer-to');
const inputTransferAmount = document.querySelector('.ops_transfer-amount');
const inputLoanAmount = document.querySelector('.ops_loan-amount');
const inputCloseUser = document.querySelector('.ops_close-user');
const inputClosePin = document.querySelector('.ops_close-pin');

// logout timer
const labelTimer = document.querySelector('.timer');

// /////////////////////////////////////////////////////////////////////////////////

// Computing the username
const createUsername = function (accounts) {
    accounts.forEach(acnt => {
        acnt.userName = acnt.owner
            .toLocaleLowerCase()
            .split(' ')
            .map(name => name[0])
            .join('');
    })
}
createUsername(accounts)

// global variable
const displayTransactions = function (txns, sort = false) {
    containerTransactions.innerHTML = '';

    let movs = sort ? txns.slice().sort((a, b) => a - b) : txns;

    movs.forEach((txn) => {
        const type = txn > 0 ? 'credit' : 'debit'; // if txn +ve then credit or debit

        const html = `
        <div class="txns">
            <div class="txns_type ${type}">${type}</div>
            
            <div class="txns_value">${txn} INR</div>
        </div>
        `;

        containerTransactions.insertAdjacentHTML('afterbegin', html);
    });
}


// Calculate deposits and withdrawals
const transactions = account1.txns;
const deposits = transactions.filter((txn) => txn > 0);
// console.log(deposits); 

const withdrawals = transactions.filter((txn) => txn < 0);
// console.log(withdrawals); 

// Updating the balance to the UI
function calcDispBalance(account) {
    account.balance = account.txns.reduce((acc, cv) => acc + cv, 0)
    labelBalance.textContent = `₹${account.balance}`;
}

// Calculate and update the summary to the UI
function calcDispSummary(account) {
    const incomes = account.txns
        .filter(txn => txn > 0) // only the deposits
        .reduce((acc, cv) => acc + cv, 0); // total deposits

    const expenses = account.txns
        .filter(txn => txn < 0) // only the withdrawals 
        .reduce((acc, cv) => acc + cv, 0); // total withdrawals

    const interest = account.txns
        .filter(txn => txn > 0) // only deposits
        .map(txn => txn * account.interestRate / 100) // interests on deposits
        .filter(int => int > 1) // intersts only more than 1
        .reduce((acc, int) => acc + int, 0);

    labelSumIn.textContent = `₹${incomes}`;
    labelSumOut.textContent = `₹${Math.abs(expenses)}`;
    labelSumInterest.textContent = `₹${interest.toFixed(2)}`;
}

const updateUI = function (accnt) {
    // Display transactions
    displayTransactions(accnt.txns);

    // Display balance
    calcDispBalance(accnt);

    // Display summary
    calcDispSummary(accnt);
}

// Implementing Login
console.log(accounts);

let currentAccount;

// Event handler on login button
btnLogin.addEventListener('click', e => {
    e.preventDefault(); // preventing default form submit

    currentAccount = accounts.find(acnt => inputLoginUser.value === acnt.userName);
    console.log(currentAccount);

    if (currentAccount?.pin === Number(inputLoginPin.value)) {
        // Clear input field
        inputLoginUser.value = inputLoginPin.value = '';
        inputLoginPin.blur();

        // Update UI and display message
        loginWelcome.textContent = `Welcome again, ${currentAccount.owner.split(' ')[0]}`
        containerApp.style.opacity = 1;

        updateUI(currentAccount);
    }
})

// Implementing Transfer

btnTransfer.addEventListener('click', e => {
    e.preventDefault();
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(acc => acc.userName === inputTransferTo.value);

    console.log(amount, receiverAcc);
    // 👉 Checkes: amount should be more than 0, 
    // receiver account should exist, 
    // amount should be less than or equal to the balance of current account 
    // receiver account and the current account should be different
    if (amount > 0 && receiverAcc && amount <= currentAccount.balance && receiverAcc?.userName != currentAccount.userName) {
        currentAccount.txns.push(-amount);
        receiverAcc.txns.push(amount);

        inputTransferAmount.value = '';
        inputTransferTo.value = '';

        updateUI(currentAccount);
    }
    console.log(currentAccount.txns, receiverAcc.txns);
})


// Implementing close account

btnClose.addEventListener('click', e => {
    e.preventDefault();
    // console.log('Closed');
    if(currentAccount.userName === inputCloseUser.value && currentAccount.pin === Number(inputClosePin.value)) {
        const indexCloseAcc = accounts.indexOf(currentAccount);
        accounts.splice(indexCloseAcc, 1);
        console.log('Closed', indexCloseAcc);
        containerApp.style.opacity = 0;
    }   
})

// Implementing the sort button 

let sorted = false;
btnSort.addEventListener('click', (e) => {
    e.preventDefault();
    displayTransactions(currentAccount.txns, !sorted);
    sorted = !sorted;
})