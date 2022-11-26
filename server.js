const fastify = require("fastify")();
const fs = require('fs');
const fsStatic = require('@fastify/static')
const hostIp = require('my-local-ip')()
const path = require('path')

// change this value to match your server setup
const HOST = ""; // leave it blank to use current IP address.
// it will fallback to 127.0.0.1 if host computer is not connected to a network
const PORT = 5555; // port number
const MOVIES_PATH = 'public/movies'
const HTML5_EXT = ['mp4', 'ogg', 'webm']

fastify.register(require("@fastify/view"), {
    engine: {
        nunjucks: require("nunjucks"),
    }
});
fastify.register(require('fastify-qs'), {})


fastify.register(fsStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public',
})

fastify.register(fsStatic, {
    root: path.join(__dirname, MOVIES_PATH),
    prefix: `/${MOVIES_PATH}`, // optional: default '/',
    decorateReply: false
})

// index
fastify.get("/", (req, reply) => {
    reply.view("src/views/index.njk", {
        movies: (function () {
            const files = fs.readdirSync(MOVIES_PATH)
            const movieList = []

            files.forEach(file => {
                try {
                    let movie = {
                        title: null,
                        path: null,
                        subtitle: null,
                        type: null,
                        supported: null
                    }
                    let movieFile = file

                    movie.path = file
                    if (fs.lstatSync(`${MOVIES_PATH}/${file}`).isDirectory()) {
                        movieFile = fs.readdirSync(`${MOVIES_PATH}/${file}`).filter((elm) => elm.match(/.*\.(mp4|mkv|avi|mov|vob?)/ig))[0]
                        movie.path = `${file}/${movieFile}`
                        movie.subtitle = fs.readdirSync(`${MOVIES_PATH}/${file}`).filter((elm) => elm.match(/.*\.(srt?)/ig))[0]
                    }

                    movie.title = movieFile.replace(/\.(mp4|mkv|mov|avi|vob)/i, '')
                    movie.type = movieFile.match(/\.(mp4|mkv|mov|avi|vob)/i, '')[1].toLowerCase()
                    movie.supported = HTML5_EXT.includes(movie.type)

                    movieList.push(movie)
                }
                catch (err) {
                    console.error(err)
                }
            });

            return movieList
        })()
    });
});

fastify.get('/player', (req, reply) => {
    reply.view('src/views/player.njk', {
        title: req.query.title,
        path: `${MOVIES_PATH}/${req.query.path}`,
        type: req.query.type,
        jar_path: `${HOST}:${PORT}/public/video-js.jar`
    })
})

// initiate server
fastify.listen({ host: HOST || hostIp || "127.0.0.1", port: PORT }, (err) => {
    if (err) throw err;
    console.dir(fastify.server.address())
    console.log(`server listening on ${fastify.server.address().address}:${fastify.server.address().port}`);
});