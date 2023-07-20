const dayInput = document.getElementById('day-input');
const monthInput = document.getElementById('month-input');
const yearInput = document.getElementById('year-input');

const allInput = document.querySelectorAll('.form-container input');

const resultYear = document.getElementById('result-years');
const resultMonth = document.getElementById('result-months');
const resultDay = document.getElementById('result-days');

const error = document.querySelectorAll('.error');
const generateButton = document.getElementById('generate-button');

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function addErrorClassess(index,message) {
     error[index].innerHTML = message;
     error[index].classList.add('active');
     allInput[index].classList.add('active')
}

function actionGenerate() {
    const dayInMonth = daysInMonth(Number(monthInput.value),Number(yearInput.value));
    const fullMonth = 12;
    const currentYear = new Date().getFullYear();

    resultYear.innerHTML = currentYear - Number(yearInput.value);
    resultMonth.innerHTML = fullMonth - Number(monthInput.value);
    resultDay.innerHTML = dayInMonth - Number(dayInput.value);
}

function generateBirthday() {
   
   for(let i = 0; i < error.length; i++) {
       if(allInput[i].value === '') {
           addErrorClassess(i,'field is required');
       }   
       else {
           allInput[i].classList.remove('active');
           error[i].classList.remove('active');
           error[i].innerHTML = '';
       }
   }

   const validDate = {
    day: {
        value:31,
        index:0
    },
    month: {
        value:12,
        index:1
    },
    past: {
        value:new Date().getFullYear(),
        index:2
    }
}

   if(allInput[0].value !== '' && allInput[1].value !== '' && allInput[2].value !== '') {
        const objInputUser = {
            day:Number(dayInput.value) ,
            month: Number(monthInput.value),
            past: Number(yearInput.value)
      }

      for(let i in objInputUser) {
         if(objInputUser[i] > validDate[i].value) {
             addErrorClassess(validDate[i].index,`must be a valid ${i}`);
         } else {
             error[validDate[i].index].innerHTML = '';
             error[validDate[i].index].classList.remove('active');
             allInput[validDate[i].index].classList.remove('active');

             validDate[i].isValid = true;
         }
      }

      if(validDate['past'].isValid && validDate['month'].isValid && validDate['day'].isValid) {
        actionGenerate();
      }
   }

}

generateButton.addEventListener('click',generateBirthday);