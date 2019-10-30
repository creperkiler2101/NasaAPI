const name_input = document.getElementById("planet-name");
const min_rad_input = document.getElementById("min-radius");
const max_rad_input = document.getElementById("max-radius");
const disposition_input = document.getElementById("disposition");

let finder = new PlanetFinder();

//https://exoplanetarchive.ipac.caltech.edu/docs/API_kepcandidate_columns.html
document.getElementById("search-button").onclick = function() {
	finder.search(name_input.value, min_rad_input.value, max_rad_input.value, disposition_input.value);
	
    return false;
}

function last() {
	finder.ui.last();
}

function first() {
	finder.ui.first();
}

function next() {
	finder.ui.next();
}

function previus() {
	finder.ui.previus();
}

function page(id) {
	finder.ui.page(id);
}