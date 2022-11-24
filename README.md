# moviefy

Personal movie website for movie sharing to all devices connected to my network

## Setup

Make sure your movies are all stored in a folder. Your movies can be on the **root directory** or **inside another folder**, otherwise, it will not be found.

```
📂 root-of-movies
    └── 🎞️ movie.mp4
    └── 📂 Another the Movie
        └── 🎞️ another-movie.mp4
```

Softwares:

- git (optional)
- node

Clone the project and `cd` into it:

```bash
git clone
cd moviefy
```

Change the this values in `server.js` file:

```js
const HOST = "192.168.1.1"; // IP of your server computer
const PORT = 5555; // port number
const MOVIES_PATH = "Movies"; // directory where your movies are located
```

To run the server:

```bash
node server
```
