class Planet {
    constructor() {
        this.id = -1;
        this.name = "";
        this.disposition = "";
        this.disposition_score = -1;
        this.period = -1;
    }

    toHTML() {
		return `<div class='planet-info'><h1>${this.name}</h1><p>Disposition: ${this.disposition}</p><p>Disposition score: ${this.disposition_score}</p><p>Transit period: ${this.period}</p></div>`;
    }
}

class PlanetFinder {
	
	constructor() {
		this.search_result = [];
		this.ui = new UI();
	}
	
	search(name, min_rad, max_rad, disposition) {
		let query = "&where=";
		
		//name
		if (name !== "")
			query += "kepler_name LIKE '%25" + name + "%25' and ";

		//radius
		if (min_rad !== "")
			query += "koi_prad > " + min_rad + " and ";
		if (max_rad !== "")
			query += "koi_prad < " + max_rad + " and ";

		//disposition
		if (disposition != "any")
			query += "koi_disposition like '" + disposition + "' and ";

		////////////
		query = query.substr(0, query.length - 5);
		if (query.length == 2)
			query = "";

		let current = this;
		
		console.log("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative" + query + "&format=json");
		fetch("https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative" + query + " &format=json")
		.then(data => data.json())
		.then((json) => {
			this.search_result = [];
			console.log(json);
			json.forEach(function(obj) {
				let planet = new Planet();
				planet.id = obj.kepid;
				planet.name = obj.kepler_name;
				planet.disposition = obj.koi_disposition;
				planet.disposition_score = obj.koi_score;
				planet.period = obj.koi_period;
				
				current.search_result.push(planet);
			});
			
			this.ui.current_page = 1;
			this.ui.draw(current.search_result);
			this.ui.drawPagingButtons(current.search_result.length);
		})
		.catch(error => console.log(error));
	}
}