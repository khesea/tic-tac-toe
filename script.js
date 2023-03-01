let popupWin = document.querySelector('.popupWin');
let popupLose = document.querySelector('.popupLose');
let popupDraw = document.querySelector('.popupDraw');

//конец игры, где я должен реализовать попап
let popup = {
  showWinPopup: function () {
    setTimeout(function () {
      popupWin.classList.add('b-show');
    }, 500);
  },

  showLosePopup: function () {
    setTimeout(function () {
      popupLose.classList.add('b-show');
    }, 500);
  },

  showDrawPopup: function () {
    setTimeout(function () {
      popupDraw.classList.add('b-show');
    }, 500);
  },
};

//обозначаю все квадраты и устанавливаю счётчик на 0
let element = document.querySelectorAll('.square');
count = 0;

//Тут я создаю ИИ
function setX() {
    //удаляю возможность нажатия повторно
    event.target.removeAttribute('onclick');
    //прибавление к счётчику, чтобы игра завершилась в случае ничьи
    count++;
    //добавляю крестик
    event.target.setAttribute('who', 'user');
    event.target.innerHTML += `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
        </svg>
        `;

      //ИИ добавляет нолик
      if (count<=4) {
        function setO() {
          let number = Math.floor(Math.random()*8);
          if (!element[number].hasAttribute('who')) {
            //удаляю возможность нажатия повторно
            element[number].removeAttribute('onclick');
            element[number].setAttribute('who', 'bot');
            element[number].innerHTML += `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle class="checkmark__circle" cx="26" cy="26" r="13" fill="none" />
            </svg>
            `;
          } else {
            setO();
          }
        }
        setO();
      }

      //смотрю где крестики, где нолики
      let one = element[0].getAttribute('who');
      let two = element[1].getAttribute('who');
      let three = element[2].getAttribute('who');
      let four = element[3].getAttribute('who');
      let five = element[4].getAttribute('who');
      let six = element[5].getAttribute('who');
      let seven = element[6].getAttribute('who');
      let eight = element[7].getAttribute('who');
      let nine = element[8].getAttribute('who');

      //логика игры
      const oneUser = one == 'user' && ((two == 'user' && three == 'user') || (four == 'user' && seven == 'user') || (five == 'user' && nine == 'user'));
      const twoUser = nine == 'user' && ((three == 'user' && six == 'user') || (seven == 'user' && eight == 'user'));
      const threeUser = five == 'user' && ((four == 'user' && six == 'user') || (two == 'user' && eight == 'user') || (three == 'user' && seven == 'user'));

      const oneBot = one == 'bot' && ((two == 'bot' && three == 'bot') || (four == 'bot' && seven == 'bot') || (five == 'bot' && nine == 'bot'));
      const twoBot = nine == 'bot' && ((three == 'bot' && six == 'bot') || (seven == 'bot' && eight == 'bot'));
      const threeBot = five == 'bot' && ((four == 'bot' && six == 'bot') || (two == 'bot' && eight == 'bot') || (three == 'bot' && seven == 'bot'));

      if ((oneUser || twoUser || threeUser) && count>2) {
        popup.showWinPopup();
      } else if ((oneBot || twoBot || threeBot) && count>2) {
        setTimeout(function () {
          popup.showLosePopup();
        }, 500);
      } else if (count == 5) {
        popup.showDrawPopup();
        setTimeout(function () {
          popup.showDrawPopup();
        }, 500);
      }
}

function removePopup() {
  location.reload();
}
