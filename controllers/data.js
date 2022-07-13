const AppError = require("../utils/appError");
const fetch = require("node-fetch");
const puppeteer = require("puppeteer");

// /* (async () => {
//     const browser = await puppeteer.launch({ headless: false });
//     page = await browser.newPage();
//     await page.goto("https://www.jumia.com.ng/phones-tablets/");

//     /* Run javascript inside the page */
//     const data = await page.evaluate(() => {
//         const list = [];
//         const items = document.querySelectorAll("div.itm");

//         for (const item of items) {
//             list.push({
//                 name: item.querySelector(".name").innerHTML,
//                 price: item.querySelector(".prc").innerHTML,
//                 // link: "https://jumia.com.ng" + item.getAttribute("data-href"),
//             });
//         }

//         return list;
//     });
//     console.log(data);
//     await browser.close();
// })();

const url = "https://www.jumia.com.ng/phones-tablets/";

async function configureTheBrowser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "load", timeout: 0 });
    return page;
}

async function checkDetails(page) {
    let data = await page.evaluate(() => {
        const list = [];
        const items = document.querySelectorAll("div.itm");

        for (const item of items) {
            list.push({
                //  name: item.querySelector(".name").innerHTML,
                //                 price: item.querySelector(".prc").innerHTML,
                link: item.querySelector("a.core").getAttribute("data-src"),
                //img: link.getAttribute("data-src"),
                img1: item.getAttribute("data-src"),
                // img2: link.getAttribute("data-src"),
                // link: "https://jumia.com.ng" + item.getAttribute("data-href"),
            });
        }
        return list;
    });
    console.log(data);
}

exports.scrapData = async (req, res, next) => {
    try {
        let page = await configureTheBrowser();
        let results = await checkDetails(page);
        res.send(results);
    } catch (error) {
        return next(new AppError(500, "failed", "server error"));
    }
};
