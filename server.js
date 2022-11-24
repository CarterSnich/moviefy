const fastify = require("fastify")();
const fs = require('fs');
const path = require('path')

// change this value to match your server setup
const HOST = "192.168.254.119";
const PORT = 5555
const MOVIES_PATH = 'Movies'


fastify.register(require("@fastify/view"), {
    engine: {
        nunjucks: require("nunjucks"),
    },
});
fastify.register(require('fastify-qs'), {})

fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, MOVIES_PATH),
    prefix: `/${MOVIES_PATH}`, // optional: default '/'
})



// index
fastify.get("/", (req, reply) => {
    reply.view("templates/index.njk", {
        movies: (function () {
            const files = fs.readdirSync(MOVIES_PATH)
            const movieList = []

            files.forEach(file => {
                try {
                    let movie = {
                        path: file,
                        title: file
                    }

                    if (fs.lstatSync(`${MOVIES_PATH}/${file}`).isDirectory()) {
                        let movieFile = fs.readdirSync(`${MOVIES_PATH}/${file}`).filter((elm) => elm.match(/.*\.(mp4|mkv|avi|mov?)/ig))[0]
                        movie.title = movieFile.replace(/\.(mp4|mkv|mov|avi)/i, '')
                        movie.path = `${MOVIES_PATH}/${file}/${movieFile}`
                    }

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
    reply.view('templates/player.njk', {
        title: req.query.title,
        path: `${MOVIES_PATH}/${req.query.path}`,
    })
})

// initiate server
fastify.listen({ host: HOST, port: PORT }, (err) => {
    if (err) throw err;
    console.log(`server listening on ${fastify.server.address().port}`);
});