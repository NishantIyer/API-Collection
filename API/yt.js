module.exports = (app) => {
	app.get("/yt", (req, res) => {
		const {getInfo} = require("ytdl-core");
		getInfo(req.query.q).then(r => res.json(r)).catch(r => res.json({error: true, ...r}))
	})
	app.get("/yt/audio", (req, res) => {
		const {getInfo} = require("ytdl-core");
		
	})
}