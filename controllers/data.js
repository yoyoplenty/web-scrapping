const AppError = require("../utils/appError");
const puppeteer = require("puppeteer");
const url = "https://www.jumia.com.ng/phones-tablets/";
const ScrappedData = require("../models/data");

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
            console.log(item);
            list.push({
                name: item.querySelector(".name").innerHTML,
                price: item.querySelector(".prc").innerHTML,
                link: item.querySelector(".core").href,
                img_url: item.querySelector(".img").getAttribute("data-src"),
            });
        }
        return list;
    });
    return data;
}

exports.scrapData = async (req, res, next) => {
    try {
        let page = await configureTheBrowser();
        let results = await checkDetails(page);
        await ScrappedData.insertMany(results);
        res.send(results);
    } catch (error) {
        return next(new AppError(500, "failed", "server error"));
    }
};
