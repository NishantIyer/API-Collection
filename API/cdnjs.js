module.exports = (app) => {
	app.get("/c/:search", (req, res) => {
		searchFor(req.params.search).then((url) => {
			res.redirect(url);
		})
	})
}

const fetch = require("node-fetch");
var cache = {};

function searchFor(query){
	if (cache[query]){
		return cache[query];
	}
	return new Promise(resolve => {
		fetch("https://2qwlvlxzb6-2.algolianet.com/1/indexes/*/queries", {
			headers: {
				accept: "*/*",
				"content-type": "application/x-www-form-urlencoded",
				"x-algolia-api-key": `2663c73014d2e4d6d1778cc8ad9fd010`,
				"x-algolia-application-id": `2QWLVLXZB6`,
			},
			body: JSON.stringify({
				requests: [{ indexName: "libraries", params: `query=${encodeURIComponent(query)}` }],
			}),
			method: "POST",
		})
		.then((res) => res.json())
		.then(json => {
				let result = json.results[0].hits[0];
				let url = `https://cdnjs.cloudflare.com/ajax/libs/${result.objectID}/${result.version}/${result.filename}`;
				cache[query] = url;
				return url;
		}).then(resolve)
	});
}