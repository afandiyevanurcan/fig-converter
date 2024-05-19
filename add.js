// fetch('https://v6.exchangerate-api.com/v6/f042570fb25bb227b790b7fb/latest/USD')
fetch('https://v6.exchangerate-api.com/v6/4cc69025a87a6dc24c827879/latest/USD')
.then(res => res.json())
.then(data =>{
    console.log(data);
})


// let apiUrl = 'https://v6.exchangerate-api.com/v6/f042570fb25bb227b790b7fb/latest/USD';
let apiUrl = 'https://v6.exchangerate-api.com/v6/4cc69025a87a6dc24c827879/latest/RUB';
let a = document.getElementById('giveAmount');
let giveButtons = document.querySelectorAll('#giveButtons .currencies');
let getButtons = document.querySelectorAll('#getButtons .currencies');


async function myFunc(amount, give, buy) {
    let isOnline = navigator.onLine;
    if (!isOnline) {
        throw  Error('No internet connection');
    }
  
       let response = await fetch(apiUrl);
       let data = await response.json();
       let rates = data.conversion_rates;

       let give_rate = rates[give];
       let buy_rate = rates[buy];

       let result = (amount / give_rate) * buy_rate;
        return result.toFixed(2); 

    }

    a.addEventListener('input', async () => {
   let amount = parseFloat(document.getElementById('giveAmount').value);
   let give = document.querySelector('#giveButtons .currencies.active').getAttribute('data-rate');
   let buy = document.querySelector('#getButtons .currencies.active').getAttribute('data-rate');

   let result = await myFunc(amount, give, buy);
    if (result !== null) {
        document.getElementById('getAmount').value = result;
    } else {
        document.getElementById('getAmount').value = '';
    }
});

function activeFunc(btns, chooseBtn) {
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
    chooseBtn.classList.add('active');
   let b =  document.getElementById('giveAmount');
   //    let buton = document.querySelector('.currencies');
//    b.click(buton);
let event = new Event ('input');
   b.dispatchEvent(event);



}

giveButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        activeFunc(giveButtons, btn);
    });
});

getButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        activeFunc(getButtons, btn);
    });
});