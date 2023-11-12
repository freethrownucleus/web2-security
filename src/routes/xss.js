const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.vulnerability === 'on') {
        const sourceImg = req.query.imageSrc;

        const scriptCheck = /<script>.*alert\(.*\).*<\/script>/; 

        if (scriptCheck.test(sourceImg)) {
            return res.send(`
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <link rel="stylesheet" href="/css/xss.css" />
                        <link rel="stylesheet" href="/css/main.css" />
                        <title>XSS</title>
                        <link rel="icon" type="image/png" href="/images/project.png">
                    </head>
                    <body>
                        <div class="container">
                            <a href="/" class="button" title="Return to Homepage">Back</a>
                            <h1>Reflected XSS</h1>
                            <p class="instructions">
                                <span>Instructions<br /></span>
                                Test the application by entering, for example, either
                                <span>&lt;script&gt;alert("Attack!")&lt;/script&gt;</span>

                                or
                                <span>&lt;img src="https://www.ebay.com/accordion.png" onerror="alert(document.cookie)" /&gt;</span>

                                in the text field, with and without using the vulnerability option.
                            </p>
                            <div class="separator"></div>
                            <form action="/xss" method="get">
                                <div class="vulnerability-input">
                                    <input
                                        type="checkbox"
                                        id="vulnerability"
                                        name="vulnerability"
                                        id="vulnerability"
                                        checked
                                    />
                                    <label for="vulnerability">Vulnerability</label>
                                </div>
                                <div class="image-input">
                                    <label for="imageSrc" title="Enter the URL of the image you want to check">Enter a script or an image URL you want to check:</label>
                                    <input type="text" name="imageSrc" id="imageSrc" title="Enter the URL of the image you want to check" />
                                    <button type="submit" title="Display Image">Check</button>
                                </div>
                            </form>
                        </div>
                        <div id="warning">MALICIOUS CODE!</div>
                    </body>
                </html>
            `);
        } else if (!sourceImg || sourceImg.trim() === '') {
            return res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="/css/xss.css" />
                    <link rel="stylesheet" href="/css/main.css" />
                    <title>XSS</title>
                    <link rel="icon" type="image/png" href="/images/project.png">
                </head>
                <body>
                    <div class="container">
                        <a href="/" class="button" title="Return to Homepage">Back</a>
                        <h1>Reflected XSS</h1>
                        <p class="instructions">
                            <span>Instructions<br /></span>
                            Test the application by entering, for example, either
                            <span>&lt;script&gt;alert("Attack!")&lt;/script&gt;</span>

                            or
                            <span>&lt;img src="https://www.ebay.com/accordion.png" onerror="alert(document.cookie)" /&gt;</span>

                            in the text field, with and without using the vulnerability option.
                        </p>
                        <div class="separator"></div>
                        <form action="/xss" method="get">
                            <div class="vulnerability-input">
                                <input
                                    type="checkbox"
                                    id="vulnerability"
                                    name="vulnerability"
                                    id="vulnerability"
                                    checked
                                />
                                <label for="vulnerability">Vulnerability</label>
                            </div>
                            <div class="image-input">
                                <label for="imageSrc" title="Enter the URL of the image you want to check">Enter a script or an image URL you want to check:</label>
                                <input type="text" name="imageSrc" id="imageSrc" title="Enter the URL of the image you want to check" />
                                <button type="submit" title="Display Image">Check</button>
                            </div>
                        </form>
                    </div>
                    <img src="${req.query.imageSrc}" alt="Perhaps benevolent script. / Cannot load the image ... Please try again!" />
                </body>
            </html>
            `);
        } else {
            return res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <link rel="stylesheet" href="/css/xss.css" />
                    <link rel="stylesheet" href="/css/main.css" />
                    <title>XSS</title>
                    <link rel="icon" type="image/png" href="/images/project.png">
                </head>
                <body>
                    <div class="container">
                        <a href="/" class="button" title="Return to Homepage">Back</a>
                        <h1>Reflected XSS</h1>
                        <p class="instructions">
                            <span>Instructions<br /></span>
                            Test the application by entering, for example, either
                            <span>&lt;script&gt;alert("Attack!")&lt;/script&gt;</span>

                            or
                            <span>&lt;img src="https://www.ebay.com/accordion.png" onerror="alert(document.cookie)" /&gt;</span>

                            in the text field, with and without using the vulnerability option.
                        </p>
                        <div class="separator"></div>
                        <form action="/xss" method="get">
                            <div class="vulnerability-input">
                                <input
                                    type="checkbox"
                                    id="vulnerability"
                                    name="vulnerability"
                                    id="vulnerability"
                                    checked
                                />
                                <label for="vulnerability">Vulnerability</label>
                            </div>
                            <div class="image-input">
                                <label for="imageSrc" title="Enter the URL of the image you want to check">Enter a script or an image URL you want to check:</label>
                                <input type="text" name="imageSrc" id="imageSrc" title="Enter the URL of the image you want to check" />
                                <button type="submit" title="Display Image">Check</button>
                            </div>
                        </form>
                    </div>
                    <img src="${req.query.imageSrc}" alt="Perhaps benevolent script. / Cannot load the image ... Please try again!" />
                </body>
            </html>
            `);
        }
    } else if (req.query.vulnerability === undefined) {
        return res.render('xss', { imageSrc: req.query.imageSrc });
    }
    return res.sendStatus(400);
});

module.exports = router;
