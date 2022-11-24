# moviefy

Personal movie website for sharing movies with all devices on my network. It uses [Fastify](https://www.fastify.io/) web framework and runs via [Node.js](https://nodejs.org/en/) for the web server and [Nunjucks](https://mozilla.github.io/nunjucks/) for templating.

## Setup

Make sure your movies are all stored in a folder. Your movies can be on the **root directory** or **inside another folder**, otherwise, it will not be found.

```
📂 root-of-movies
└── 🎞️ movie.mp4
└── 📂 Another the Movie
    └── 🎞️ another-movie.mp4
```

Softwares:

- Git (optional)
- Node.js

Clone the project and `cd` into it:

```bash
git clone
cd moviefy
```

Install all required `npm` packages:

```bash
npm install
```

Change this values in `server.js` file:

```js
const HOST = "192.168.1.1"; // IP of your server computer
const PORT = 5555; // port number
const MOVIES_PATH = "Movies"; // directory where your movies are located
```

To run the server:

```bash
node server
```

## Dependencies

- @fastify/static >= 6.5.1
- @fastify/view >= 7.2.0
- fastify >= 4.10.2
- fastify-qs >= 4.0.1
- nunjucks >= 3.2.3

## Regrets

I should have used PHP for this instead of Nodejs, the development would have been easier.
