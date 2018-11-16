//// Router ////
const pages = [
	'main',
	'publications',
	'projects',
	'work'
];

const openPage = (target) => {
	pages.map(page => {
		if(page === target){
			document.querySelector(`#${page}`).style.display = "block";
		}else{
			document.querySelector(`#${page}`).style.display = "none";
		}
	})

	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

window.addEventListener("hashchange", () => {
	openPage(location.hash.replace("#", ""));
});

if(location.hash === "") location.hash = "#main"; // Edge case
openPage(location.hash.replace("#", "")); // First load

//// Color changer ////

const colorFrequency = 250; // milli seconds

const randomHexColorCode = () => {
	let n = ((Math.random() * 0xfffff) | 0).toString(16);
	return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n);
};

const morphColor = (selector) => {
	const DEL = 25;
	const element = document.querySelector(selector);
	const randomInt = (l, u) => Math.floor(Math.random() * (u - l + 1)) + l;

	if(!element.style.color) element.style.color = "rgb(225, 225, 225)";

	let color = element.style.color.split("(")[1].split(")")[0].split(", ")
		.map(c => parseInt(c));
	let newColor = color.map(c => {
		let change = randomInt(-DEL, DEL);
		if(c+change > 225 || c+change < 0) return randomInt(0, 225);
		return c + change;
	});
	element.style.color = `rgb(${newColor[0]}, ${newColor[1]}, ${newColor[2]})`;
}

setInterval(() => {
	document.querySelector(".name").style.color = randomHexColorCode();
}, colorFrequency);

// setInterval(() => morphColor(".name"), colorFrequency);

//// Projects updater ////

fetch("projects.json").then((response) => {
	response.json().then(data => {
		data.projects.map(project => {

			let buttons = "";

			if(project.github) buttons += `
			<a href="${project.github}" target="_blank">
		        <button class="btn">Github link</button>
		    </a>`;

		    if(project.link) buttons += `
			<a href="${project.link}" target="_blank">
		        <button class="btn">${project.linkType}</button>
		    </a>`;

			let card = `
			<div class="card">
			    <div class="card-title">${project.name}</div>
			    <p>${project.description}</p>
			    ${buttons}
			</div>`;

			document.querySelector(".pro-list").innerHTML += card;
		})
	})
})

//// Publications updater ////

fetch("publications.json").then((response) => {
	response.json().then(data => {
		data.posts.map(post => {
			let card = `
			<div class="card">
			    <div class="card-title">${post.name}</div>
			    <p>Hosted on: <a href="${post.hostLink}" target="_blank">${post.host}</a></p>
			    <p>${post.description}</p>
			    <a href="${post.link}" target="_blank">
			        <button class="btn">Read post</button>
			    </a>
			</div>`;

			document.querySelector(".pub-list").innerHTML += card;
		})
	})
})

fetch("work.json").then((response) => {
	response.json().then(data => {
		data.work.map(place => {
			let button = "";
			if(place.link) button += `<a href="${place.link}" target="_blank">
		        <button class="btn">Website</button>
		    </a>`
			let card = `
			<div class="card">
			    <div class="card-title">${place.name}</div>
			    <p>${place.timespan}</p>
			    <p>Role: ${place.role}</p>
			    <p>${place.description}</p>
			    ${button}
			</div>`;

			document.querySelector(".work-list").innerHTML += card;
		})
	})
})

Array.prototype.slice.call(document.querySelectorAll(".nav-btn")).map(button => {
	button.style.borderColor = randomHexColorCode();
	button.style.color = randomHexColorCode();
})