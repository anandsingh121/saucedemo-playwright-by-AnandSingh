import{test,expect} from 'playwright/test';
import{loginData} from '../pages/logintestdata.js';
import { LoginPage } from '../pages/constructor.js';
import {AddMultiProduct} from '../pages/addmultiprod.js'
import { takeScreenshot } from '../pages/screenshothelper.js';

test.describe("for to manage each test",()=>{


let loginpage;
let addmultiprod;
test.beforeEach("it will run this before each test",async({page})=>{
loginpage = new LoginPage(page);
addmultiprod = new AddMultiProduct(page);
//cartpage = new cartpage
await page.goto('https://www.saucedemo.com/');
await loginpage.login(
    loginData.validUser.username,
    loginData.validUser.password
)});
test("TC001 - add And remove the product from the page to check add remove is working or not",async({page})=>{


await addmultiprod.addproducts();
await takeScreenshot(page, 'addmultipleproducts', 'TC001 - Step1 - Add multiple products from the page');
await addmultiprod.removealladdedprod()
await takeScreenshot(page, 'addmultipleproducts', 'TC001 - Step2 - Remove multiple products from the page');
}
);


});