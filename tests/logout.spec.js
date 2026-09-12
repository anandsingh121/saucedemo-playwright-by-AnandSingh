import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/constructor.js';

import { loginData } from '../pages/logintestdata.js';

import fs from 'fs';
test.describe('Logout Functionality', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://www.saucedemo.com/');
    });

/* test.afterEach(async ({ page }, testInfo) => {

        const screenshotFolder = 'screenshots/logout';

        // Create folder if it doesn't exist
        fs.mkdirSync(screenshotFolder, { recursive: true });

        const fileName = testInfo.title
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();

        await page.screenshot({
            path: `${screenshotFolder}/${fileName}.png`,
            fullPage: true
        });

    }); */


test('TC001 - Get login and logout on Site',async({page})=>{
 
    await loginPage.login(
    loginData.validUser.username,
    loginData.validUser.password,
    )
     await loginPage.page.screenshot({
        path: 'screenshots/logout/before-logout.png',
        fullPage: true
    });
loginPage.logout();
await expect(loginPage.username).toBeVisible();
await expect(loginPage.password).toBeVisible();
await loginPage.page.screenshot({
        path: 'screenshots/logout/after-logout.png',
        fullPage: true
    });   
});
});
