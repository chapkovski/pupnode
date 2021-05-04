#!/usr/bin/env nodejs
var http = require('http');
var axios = require('axios')
const puppeteer = require('puppeteer');
http.createServer(async function (req, res) {
    const profileId = '9b3af9d4-862b-4e28-a29a-56afe85a23e5';
    const mlaPort = 35000;
    const stringReq = `http://127.0.0.1:${mlaPort}/api/v1/profile/start?automation=true&puppeteer=true&profileId=${profileId}`
    const resp = await axios.get(stringReq)
    const data = resp.data
    const { status, value } = data;
    if (status && status === 'OK') {
        const browser = await puppeteer.connect({ browserWSEndpoint: value, defaultViewport: null });
        const page = await browser.newPage();
        const liResp = await page.goto('https://linkedin.com');
        // await page.screenshot({ path: `/home/${process.env.USER}/Desktop/multiloginScreenshot.png` });
        await browser.close();
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ statusLI: liResp.headers.status }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ errorMessage: 'Multilogin is unavailable' }));
    }

}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
