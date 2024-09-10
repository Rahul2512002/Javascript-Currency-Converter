const amountEl = document.getElementById('amount');
const fromCurrencyEl = document.getElementById('from-currency');
const toCurrencyEl = document.getElementById('to-currency');
const convertBtn = document.getElementById('convert-btn');
const resultEl = document.getElementById('result');

async function fetchCurrencies() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const option = document.createElement('option');
            option.value = currency;
            option.textContent = currency;

            fromCurrencyEl.appendChild(option.cloneNode(true));
            toCurrencyEl.appendChild(option);
        });

        fromCurrencyEl.value = 'USD';
        toCurrencyEl.value = 'EUR';
    } catch (error) {
        console.error('Error fetching currencies:', error);
    }
}

async function convertCurrency() {
    const amount = amountEl.value;
    const fromCurrency = fromCurrencyEl.value;
    const toCurrency = toCurrencyEl.value;

    if (amount === '') {
        resultEl.textContent = 'Please enter an amount.';
        return;
    }

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await res.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        resultEl.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        resultEl.textContent = 'Error converting currency. Please try again.';
    }
}

convertBtn.addEventListener('click', convertCurrency);
fetchCurrencies();
