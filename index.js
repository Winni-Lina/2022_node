const http = require('http');
const fs = require('fs');
const url = require('url');

// const app = http.createServer(function (req,res) {
//     //let url = req.url;
//
//     // if (url === '/')
//     //     url = '/index.html';
//     // if (url === '/favicon.ico')
//     //     return res.writeHead(404);
//     // res.writeHead(200);
//     // res.end(fs.readFileSync(__dirname+url));
//
//     // let _url = req.url;
//     // let queryData = url.parse(_url, true).query;
//     // res.end(queryData.id);
//
//
// });
const app = http.createServer(function (request, response) {
    const _url = request.url
    const queryData = url.parse(_url, true).query
    const pathname = url.parse(_url, true).pathname
    if (pathname === '/') {
        if (queryData.id === undefined) {
            const title = 'Welcome'
            const description = 'Hello, Node.js'
            const template = `

                <!doctype html>
                <html lang="ko">
                <head>
                    <title>WEB1 - ${title}</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <h1><a href="/">WEB</a></h1>
                    
                    <ul>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                    </ul>
                    
                    <h2>${title}</h2>
                    <p>${description}</p>
                </body>
                </html>
                `
            response.writeHead(200)
            response.end(template)
        } else {
            fs.readFile(`data/${queryData.id}`, 'utf8', function (err, description) {
                const title = queryData.id
                const template = `
                    <!doctype html>
                    <html lang="ko">
                    <head>
                        <title>WEB1 - ${title}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1><a href="/">WEB</a></h1>
                        
                        <ul>
                            <li><a href="/?id=HTML">HTML</a></li>
                            <li><a href="/?id=CSS">CSS</a></li>
                            <li><a href="/?id=JavaScript">JavaScript</a></li>
                        </ul>
                        
                        <h2>${title}</h2>
                        <p>${description}</p>
                    </body>
                    </html>
                    `
                response.writeHead(200)
                response.end(template)
            })
        }
    } else {
        response.writeHead(404)
        response.end('Not found')
    }
})

app.listen(3333);


