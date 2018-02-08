"use strict";

const express = require('express')
const cheerio = require('cheerio')

module.exports = {
    readAll: _readAll
}

function _readAll() {
    return getContent('https://www.npr.org/')
        .then(html => {
            //emtpy object to put desired data
            let headlinesArray = []
            let $ = cheerio.load(html)
            let items = $('.story-text').toArray()

            for (let i = 0; i < items.length; i++) {
                let item = items[i]
                let article = {}

                article.headline = $('.title', item).first().text()
                article.teaser = $('.teaser', item).first().text()
               
                let urlArr = $(item).find('a')
                article.url = $(urlArr[1]).attr('href')

                if (article.teaser) {
                    headlinesArray.push(article)
                }
            }
            return headlinesArray
        })
}


const getContent = function (url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
        // select http or https module, depending on reqested url
        const lib = url.startsWith('https') ? require('https') : require('http');
        const request = lib.get(url, (response) => {
            // handle http errors
            if (response.statusCode < 200 || response.statusCode > 299) {
                reject(new Error('Failed to load page, status code: ' + response.statusCode));
            }
            // temporary data holder
            const body = [];
            // on every content chunk, push it to the data array
            response.on('data', (chunk) => body.push(chunk));
            // we are done, resolve promise with those joined chunks
            response.on('end', () => resolve(body.join('')));
        });
        // handle connection errors of the request
        request.on('error', (err) => reject(err))
    })
};
