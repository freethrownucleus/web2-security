const R_xss = require('./routes/xss');
const R_sde = require('./routes/sde');

const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const path = require('path');
const xss = require('xss'); 

const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
const URL_ex = process.env.REU
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/xss', R_xss)
app.use('/sde', R_sde)

app.get('/', (req, res) => {
    const idFake = process.env.FAKE_ID; 
    const alertCheck = /<script>.*alert\(.*\).*<\/script>/; 

    if (alertCheck.test(idFake)) {
        res.send('Potencionally malicious code found!');
    } else {
        res.cookie('POSSIBLE COOKIE POISONING!', `${"bug"}`, { httpOnly: false })
        res.sendFile('index.html', { root: __dirname + '/public/html' })
    }
})


let port;
if (process.env.PORT && URL_ex) {
    port = parseInt(process.env.PORT);
} else {
    port = 3000;
}


if (URL_ex) {
    const localHost = '0.0.0.0'
    app.listen(port, '0.0.0.0', () => {
        console.log(
            `Local run -> http://${localHost}:${port} / From outside -> ${URL_ex}`
        )
    })
} else {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}
