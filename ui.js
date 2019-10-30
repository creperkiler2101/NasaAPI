const search_result_container = document.getElementById("search-result");
const paging_buttons_container = document.getElementById("paging-buttons");
const backward_paging_buttons = document.getElementById("backward-paging-buttons");
const forward_paging_buttons = document.getElementById("forward-paging-buttons");

const per_page = 10;
const additional_page_buttons = 3;

class UI {
	
	constructor() {
		this.current_page = 1;
		this.search_result = [];
	}
	
	draw(planet_array) {
		this.search_result = planet_array;
		if (planet_array.length === 0) {
			search_result_container.innerHTML = "nothing founded!";
			return;
		}
		
		let current = this;
		
		let html_string = "";
		for (let i = (this.current_page - 1) * per_page; i < (this.current_page - 1) * per_page + 10 && i < this.search_result.length; i++) {
			html_string += this.search_result[i].toHTML();
		}

		search_result_container.innerHTML = html_string;
	}
	
	drawPagingButtons(planet_count) {
		if (planet_count === 0) {
			backward_paging_buttons.classList.add("disabled");
			forward_paging_buttons.classList.add("disabled");
			paging_buttons_container.innerHTML = "";
			return;
		}
		else {
			backward_paging_buttons.classList.remove("disabled");
			forward_paging_buttons.classList.remove("disabled");
		}
		
		let page_count = Math.ceil(planet_count / per_page);
		let i = this.current_page;
		
		let html = "";
		let current_page_button = "<a href='#' class='current' onclick='page(" + i + ")'>" + i + "</a>"
		
		if (i === 1) {
			html += current_page_button;
			for (let j = i + 1; j < i + additional_page_buttons * 2 + 1; j++) {
				if (j > page_count)
					break;
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
		}
		else if (i - additional_page_buttons >= 1 && i + additional_page_buttons <= page_count) {
			for (let j = i - additional_page_buttons; j < i; j++) {
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
			html += current_page_button;
			for (let j = i + 1; j < i + additional_page_buttons + 1; j++) {
				if (j > page_count)
					break;
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
		}
		else if (i - additional_page_buttons <= 0) {
			let difference = i - additional_page_buttons;
			for (let j = i - additional_page_buttons - difference + 1; j < i; j++) {
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
			html += current_page_button;
			for (let j = i + 1; j < i + additional_page_buttons - difference + 2; j++) {
				if (j > page_count)
					break;
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
		}
		else if (i === page_count) {
			for (let j = i - additional_page_buttons * 2; j < i; j++) {
				if (j < 1)
					continue;
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
			html += current_page_button;
		}
		else if (i === page_count - 1) {
			for (let j = i - 5; j < i; j++) {
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
			html += current_page_button;
			html += "<a href='#' onclick='page(" + (i + 1) + ")'>" + (i + 1) + "</a>"
		}
		else if (i === page_count - 2) {
			for (let j = i - 4; j < i; j++) {
				html += "<a href='#' onclick='page(" + j + ")'>" + j + "</a>"
			}
			html += current_page_button;
			html += "<a href='#' onclick='page(" + (i + 1) + ")'>" + (i + 1) + "</a>"
			html += "<a href='#' onclick='page(" + (i + 2) + ")'>" + (i + 2) + "</a>"
		}
		
		paging_buttons_container.innerHTML = html;
	}
	
	first() {
		this.current_page = 1;
		this.draw(this.search_result);
		this.drawPagingButtons(this.search_result.length);
	}
	
	last() {
		this.current_page = Math.ceil(this.search_result.length / per_page);
		this.draw(this.search_result);
		this.drawPagingButtons(this.search_result.length);
	}
	
	previus() {
		this.current_page = this.current_page - 1;
		if (this.current_page < 1)
			this.current_page = 1;
		this.draw(this.search_result);
		this.drawPagingButtons(this.search_result.length);
	}
	
	next() {
		this.current_page = this.current_page + 1;
		if (this.current_page > Math.ceil(this.search_result.length / per_page))
			this.current_page = Math.ceil(this.search_result.length / per_page);
		this.draw(this.search_result);
		this.drawPagingButtons(this.search_result.length);
	}
	
	page(id) {
		this.current_page = id;
		this.draw(this.search_result);
		this.drawPagingButtons(this.search_result.length);
	}
}


