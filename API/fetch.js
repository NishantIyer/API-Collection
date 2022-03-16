module.exports = (app) => {
	const fetch = require("node-fetch");

	app.get("/fetch/help", (req, res) => {
		res.send("Fetches using node-fetch. Specify a URL parameter, and an arguments parameter, passed in like `fetch(url, args)`");
	})
	app.post("/fetch", (req, res) => {
		fetch(req.body.url, req.body.args || {}).then(async response => {
			let text = await response.text();
			let json = null;
			try {
				json = JSON.parse(text);
			} catch(_){}
			let headers = Object.fromEntries([...response.headers.entries()]);
			res.json({
				headers,
				ok: response.status > 199 && response.status < 300,
				status: response.status,
				json,
				text,
			})
		}).catch(e => res.json({error: true, message: "Error: " + e.message}))
	})
}