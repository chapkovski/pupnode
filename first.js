#!/usr/bin/env nodejs
var http = require('http');
var axios = require('axios')
const puppeteer = require('puppeteer');
http.createServer(async function (req, res) {
    const profileId = 'f662c476-7c22-43fd-9118-bb3aca8f26e2';
    const mlaPort = 35000;
    const stringReq = `http://127.0.0.1:${mlaPort}/api/v1/profile/start?automation=true&puppeteer=true&profileId=${profileId}`
    const resp = await axios.get(stringReq)
    const data = resp.data
    const { status, value } = data;

    if (status && status === 'OK') {
        const browser = await puppeteer.connect({ browserWSEndpoint: value, defaultViewport: null });
        console.debug('did we get the browser?', browser.isConnected())
        const page = await browser.newPage();
        console.debug('NEW PAGE GOT', page.url())
        const liResp = await page.goto('https://linkedin.com');
        // await page.waitForNavigation();
        console.debug('DO WE GET SOMOETHING FROM LIRESP', liResp.url())
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ statusLI: liResp.url()}));
        await browser.close();
    } else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(JSON.stringify({ errorMessage: 'Multilogin is unavailable' }));
    }

}).listen(8080, 'localhost');
console.log('Server running at http://localhost:8080/');
