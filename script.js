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

  //удаляю кнопки, чтобы нельзя было нажать на несколько ячеек, пока ИИ решают куда сходить
  for (var i = 0; i < 9; i++) {
    element[i].removeAttribute('onclick');
  }

  //возвращаю кнопки
  setTimeout(function () {
    for (var j = 0; j < 9; j++) {
        element[j].setAttribute('onclick', 'setX()')
    }
  }, 1100);

  //проверка на наличие крестика-нолика в ячейке
  if (!event.target.hasAttribute('who')) {
    //прибавление к счётчику, чтобы игра завершилась в случае ничьи
    count++;
    //добавляю крестик
    event.target.setAttribute('who', 'user');
    event.target.innerHTML += `
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <path class="checkmark__check" fill="none" d="M16 16 36 36 M36 16 16 36" />
        </svg>
        `;

    //логическое выражение, чтобы игра завершилась
    if (count<=4) {
      //ИИ добавляет нолик
      setTimeout(function setO() {
        let number = Math.floor(Math.random()*9);

        if (!element[number].hasAttribute('who')) {
          element[number].setAttribute('who', 'bot');
          element[number].innerHTML += `
          <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="13" fill="none" />
          </svg>
          `;
        } else {
          setO();
        };
      }, 200);
    } else {
      //конец игры, ничья
      popup.showDrawPopup();
    };

    //Здесь вот логика игры
    if (count>2) {
      //смотрю где крестики, где нолики
      setTimeout(function () {
        let one = element[0].getAttribute('who');
        let two = element[1].getAttribute('who');
        let three = element[2].getAttribute('who');
        let four = element[3].getAttribute('who');
        let five = element[4].getAttribute('who');
        let six = element[5].getAttribute('who');
        let seven = element[6].getAttribute('who');
        let eight = element[7].getAttribute('who');
        let nine = element[8].getAttribute('who');

        console.log(one, two, three, four, five, six, seven, eight, nine);

        //на самом деле вот логика игры
        const oneUser = one == 'user' && two == 'user' && three == 'user';
        const twoUser = four == 'user' && five == 'user' && six == 'user';
        const threeUser = seven == 'user' && eight == 'user' && nine == 'user';
        const fourUser = one == 'user' && four == 'user' && seven == 'user';
        const fiveUser = two == 'user' && five == 'user' && eight == 'user';
        const sixUser = three == 'user' && six == 'user' && nine == 'user';
        const sevenUser = one == 'user' && five == 'user' && nine == 'user';
        const eightUser = three == 'user' && five == 'user' && seven == 'user';

        const oneBot = one == 'bot' && two == 'bot' && three == 'bot';
        const twoBot = four == 'bot' && five == 'bot' && six == 'bot';
        const threeBot = seven == 'bot' && eight == 'bot' && nine == 'bot';
        const fourBot = one == 'bot' && four == 'bot' && seven == 'bot';
        const fiveBot = two == 'bot' && five == 'bot' && eight == 'bot';
        const sixBot = three == 'bot' && six == 'bot' && nine == 'bot';
        const sevenBot = one == 'bot' && five == 'bot' && nine == 'bot';
        const eightBot = three == 'bot' && five == 'bot' && seven == 'bot';

        if (oneUser || twoUser || threeUser || fourUser || fiveUser || sixUser || sevenUser || eightUser) {
          popup.showWinPopup();
        } else if (oneBot || twoBot || threeBot || fourBot || fiveBot || sixBot || sevenBot || eightBot) {
          setTimeout(function () {
            popup.showLosePopup();
          }, 500);
        }
      }, 500);
    }
  };
};

function removePopup() {
  location.reload();
}
