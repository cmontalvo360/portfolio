window.onload = function () {
	const hamburger = document.querySelector(".hamburger");
	const navList = document.getElementById("nav-list");
	const form = document.querySelector("form");
	const navScroll = document.querySelector("nav");

	function toggleButton() {
		hamburger.classList.toggle("active");
		navList.classList.toggle("active");
	}

	function scroller() {
		if (window.scrollY >= 20)
			navScroll.classList.toggle("active");
		else {
			navScroll.classList.toggle("active");
		}
	}

	hamburger.addEventListener("click", toggleButton);
	navList.addEventListener("click", toggleButton);
	form.addEventListener("submit", sendEmail);
	navScroll.addEventListener("scroll", scroller);

	//sends data to lamda function that sends me an email
	function sendEmail(e) {
		//prevent the form from refreshing the page
		e.preventDefault();

		const { name, email, message } = e.target;

		const endpoint = "https://cy7y2gyxpg.execute-api.us-west-2.amazonaws.com/default/Email-sender";
		// We use JSON.stringify here so the data can be sent as a string via HTTP
		const body = JSON.stringify({
			senderName: name.value,
			senderEmail: email.value,
			message: message.value
		});
		const requestOptions = {
			method: "POST",
			body: body
		};

		fetch(endpoint, requestOptions)
			.then((response) => {
				if (!response.ok) throw new Error("Error in fetch");
				console.log("check");
				return response.json();
			})
			.then(response => {
				document.getElementById("result-text").innerText =
					"Email sent successfully! ";
			})
			.catch((error) => {
				document.getElementById("result-text").innerText =
					"An unkown error occured: " + error;
			});
	};
}


// Amount of Snowflakes
var snowMax = 35;

// Snowflake Colours
var snowColor = ["#DDD", "#EEE"];

// Snow Entity
var snowEntity = "&#x2022;";

// Falling Velocity
var snowSpeed = 0.75;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

// Refresh Rate (in milliseconds)
var snowRefresh = 30;

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";


var snow = [],
	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;

function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;

	for (i = 0; i <= snowMax; i++) {
		coords[i] = 0;
		lefr[i] = Math.random() * 15;
		pos[i] = 0.03 + Math.random() / 10;
		snow[i] = document.getElementById("flake" + i);
		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = 1000;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth - 15;
}

function moveSnow() {
	for (i = 0; i <= snowMax; i++) {
		coords[i] += pos[i];
		snow[i].posY += snow[i].sink;
		snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
		snow[i].style.top = snow[i].posY + "px";

		if (snow[i].posY >= marginBottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
			snow[i].posX = randomise(marginRight - snow[i].size);
			snow[i].posY = 0;
		}
	}

	setTimeout("moveSnow()", snowRefresh);
}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);