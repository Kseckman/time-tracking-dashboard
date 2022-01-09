// const intervalsElements = [...document.querySelectorAll('.btn')];
// const hoursElements = [...document.querySelectorAll('.hours')];
// const prevHoursElements = [...document.querySelectorAll('.last-time')];
// const findActive = element => element.classList.contains('active');

// const toggleClasses = (prev, next) => {
// 	prev.classList.remove('active');
// 	next.classList.add('active');
// };

// const setEachTime = (intervalsElements, cb, toggle, newElement) => {
// 	const prev = intervalsElements.findIndex(cb);
// 	toggle(intervalsElements[prev], newElement.target);
// 	getData(newElement.target);
// };

// const getData = async time => {
// 	const res = await fetch('data.json');
// 	const data = await res.json();

// 	//prettier-ignore
// 	const everyFewText = time.textContent === 'Daily' ? 'day' : time.textContent === 'Weekly' ? 'week' : 'month'

// 	const everyFew = time.textContent.toLowerCase();

// 	data.forEach((element, i) => {
// 		hoursElements[i].textContent = element.timeframes[everyFew].current + 'hrs';
// 		prevHoursElements[i].textContent = element.timeframes[everyFew].previous+ everyFewText;
// 	});
// };
// const setState = element =>
// 	element.addEventListener(
// 		'click',
// 		setEachTime.bind(this, intervalsElements, findActive, toggleClasses)
// 	);
// const App = () => intervalsElements.forEach(setState);
// App();


// ----------------------------------------------------------------


// const timeSelectors = document.querySelectorAll("button[data-timeSelector]");
// const currentHours = document.querySelector(".hours")
// const lastHours = document.querySelector(".last-time")
// const allCurrentHours = document.querySelectorAll(".hours")
// const allLastHours = document.querySelectorAll(".last-time")

// let data;
// let currentSelected = timeSelectors[0];
// console.log(currentSelected)

// fetch("data.json")
//     .then(response => response.json())
//     .then(json => data = json)
//     .then(setValuesOnCard)
	


// function clearSelected() {
//     if (currentSelected == null) return;
//     currentSelected.classList.remove("active")
// }

// function handleClick(e) {
//     clearSelected()
//     currentSelected = e.target;
//     currentSelected.classList.add("active");
//     setValuesOnCard()
// }

// function setValuesOnCard() {
//     data.forEach((time, index) => {
//         const currentData = time.timeframes[currentSelected.innerHTML.toLowerCase()]
//         const hour = currentData.current
//         const last = currentData.previous

//         allCurrentHours[index].innerHTML = hour + "hrs";
//         allLastHours[index].innerHTML = "Last " + currentSelected.innerHTML + " - " + last + "hrs";
//     })
// }



// timeSelectors.forEach(time => time.addEventListener("click", handleClick))


// ------------------------------------------------------------------------

// selectors 
const buttonTime = document.querySelectorAll('button[data-time-selectior]');
const buttonDiv = document.querySelector('.select-buttons');
const currentHour= document.querySelector('.hours');
const lastHour = document.querySelector('.last-time');
const allCurrentHours = document.querySelectorAll('.hours');
const allLastTime= document.querySelectorAll('.last-time');
const cards = document.querySelectorAll('.card');
const times = document.querySelectorAll('.time');
// not in use here yet
let currentTime = buttonTime[0] 

//fetch data
const dataObj = function (fill){
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
        // render data times in cards. wont read current with the switch on line 129. but works at start without.
           cards.forEach((item, i) => {
               item.querySelector('.hours').textContent = `${data[i].timeframes[fill].current}hrs`;

               item.querySelector('.last-time').textContent = `Last ${data[i].timeframes[fill][currentTime]} ${data[i].timeframes[fill].previous}hrs`;
           });
        });
}


dataObj('daily')

    
buttonDiv.addEventListener('click', function(e){
    // change active state of buttons
    const buttons = [...this.children]
    if(!buttons.includes(e.target)) return;

    buttons.forEach((el)=> el.classList.remove('active'));
    e.target.classList.add('active');

    // change the date and hours this section isnt working.
    const dateOption = e.target.textContent.toLowerCase();
	let newHistoryDate;
	switch (dateOption) {
		case "daily":
			newHistoryDate = "Yesterday";
			break;
		case "weekly":
		case "monthly":
			newHistoryDate = `Last ${e.target.textContent.slice(0, -2)}`;
			break;
    }
    allLastTime.forEach((el) => (el.textContent = newHistoryDate));

	dataObj(dateOption);
})