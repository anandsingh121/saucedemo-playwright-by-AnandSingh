import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/constructor.js';

import { loginData } from '../pages/logintestdata.js';

import fs from 'fs';


test.describe('Login Functionality', () => {

    let loginPage;

    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);

        await page.goto('https://www.saucedemo.com/');

    });
   test.afterEach(async ({ page }, testInfo) => {

        const screenshotFolder = 'screenshots/login';

        // Create folder if it doesn't exist
        fs.mkdirSync(screenshotFolder, { recursive: true });

        const fileName = testInfo.title
            .replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();

        await page.screenshot({
            path: `${screenshotFolder}/${fileName}.png`,
            fullPage: true
        });

    



});


    test('TC001 - Verify user can login with valid credentials',
        async ({ page }) => {

        await loginPage.login(
            loginData.validUser.username,
            loginData.validUser.password
        );

        await expect(page).toHaveURL(/inventory.html/);
        

    });
     test('TC002 - Verify login fails with invalid password',
        async () => {

        await loginPage.login(
            loginData.invalidPassword.username,
            loginData.invalidPassword.password
        );

        await loginPage.varifyErrorMessage(
            'Username and password do not match any user in this service'
        );
        
    });


    test('TC003 - Verify validation when username is blank',
        async () => {

        await loginPage.login(
            loginData.blankUsername.username,
            loginData.blankUsername.password
        );

        await loginPage.varifyErrorMessage(
            'Username is required'
        );
        
    });


    test('TC004 - Verify validation when password is blank',
        async () => {

        await loginPage.login(
            loginData.blankPassword.username,
            loginData.blankPassword.password
        );

        await loginPage.varifyErrorMessage(
            'Password is required'
        );
       

    });
    test('TC005 - Verify validation when username and password is blank',
        async () => {

        await loginPage.login(
            loginData.blankcredentials.username,
            loginData.blankcredentials.password
        );

        await loginPage.varifyErrorMessage(
            'Username is required'
            
        );
        
    });
    test('TC006 - Verify password is masked or not',async()=>{

    await loginPage.login(
    loginData.invalidPassword.username,
    loginData.invalidPassword.password
    );
    await expect(loginPage.password)
        .toHaveAttribute('type', 'password');
     

 })
});