const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const availableMoney = document.querySelector('.available-money');

const lightBtn = document.querySelector('.light');
const darkBtn = document.querySelector('.dark');

const addPanel = document.querySelector('.add-transaction-panel');
const inputName = document.querySelector('#name');
const inputAmount = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const addBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const showPanel = () => {
	addPanel.style.display = 'flex';
};
const hidePanel = () => {
	addPanel.style.display = 'none';
};

const checkForm = () => {
	if (
		inputName.value !== '' &&
		inputAmount.value !== '' &&
		categorySelect.value !== 'none'
	) {
		createNewTransaction();
	} else {
		alert('Wypełnij wszystkie pola');
	}
};
const clearInputs = () => {
	inputName.value = '';
	inputAmount.value = '';
	categorySelect.selectedIndex = 0;
};

const createNewTransaction = () => {
	const newTransaction = document.createElement('div');
	newTransaction.classList.add('transaction');
	newTransaction.setAttribute('id', ID);

	checkCategory(selectedCategory);

	newTransaction.innerHTML = `<p class="transaction-name">${categoryIcon}${inputName.value}</p>
    <p class="transaction-amount">${inputAmount.value} zł<button class="delete" onclick ="deleteTransaction(${ID})">
    <i class="fas fa-times"></i></button></p>`;

	inputAmount.value < 0
		? expensesArea.appendChild(newTransaction) &&
		  newTransaction.classList.add('expenses')
		: incomeArea.appendChild(newTransaction) &&
		  newTransaction.classList.add('income');
	// if (inputAmount.value < 0) {
	// 	expensesArea.appendChild(newTransaction);
	// 	newTransaction.classList.add('expenses');
	// } else {
	// 	incomeArea.appendChild(newTransaction);
	// 	newTransaction.classList.add('income');
	// }

	moneyArr.push(parseFloat(inputAmount.value));
	countMoney(moneyArr);
	hidePanel();
	ID++;
	clearInputs();
};

const selectCategory = () => {
	selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const checkCategory = (transaction) => {
	switch (transaction) {
		case '[+] Przychód':
			categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
			break;
		case '[-] Zakupy':
			categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
			break;
		case '[-] Jedzenie':
			categoryIcon = '<i class="fas fa-hamburger"></i>';
			break;
		case '[-] Kino':
			categoryIcon = '<i class="fas fa-film"></i>';
			break;
	}
};

const countMoney = (money) => {
	const newMoney = money.reduce((x, y) => x + y);
	availableMoney.textContent = `${newMoney} zł`;
};

const deleteTransaction = (id) => {
	const transactionToDelete = document.getElementById(id);
	const transactionAmount = parseFloat(
		transactionToDelete.childNodes[2].innerText
	);
	const indexOfTransaction = moneyArr.indexOf(transactionAmount);
	moneyArr.splice(indexOfTransaction, 1);

	transactionToDelete.classList.contains('income')
		? incomeArea.removeChild(transactionToDelete)
		: expensesArea.removeChild(transactionToDelete);
	countMoney(moneyArr);
};

const deleteAllTransaction = () => {
	incomeArea.innerHTML = '<h3>Przychód:</h3>';
	expensesArea.innerHTML = '<h3>Wydatki:</h3>';
	availableMoney.textContent = `0 zł`;
	moneyArr = [0];
};

const changeStyleLight = () => {
	root.style.setProperty('--first-color', '#f9f9f9');
	root.style.setProperty('--second-color', '#14161f');
	root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)');
};
const changeStyleDark = () => {
	root.style.setProperty('--first-color', '#14161f');
	root.style.setProperty('--second-color', '#f9f9f9');
	root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.4)');
};

addBtn.addEventListener('click', showPanel);
cancelBtn.addEventListener('click', hidePanel);
saveBtn.addEventListener('click', checkForm);
deleteAllBtn.addEventListener('click', deleteAllTransaction);
lightBtn.addEventListener('click', changeStyleLight);
darkBtn.addEventListener('click', changeStyleDark);


