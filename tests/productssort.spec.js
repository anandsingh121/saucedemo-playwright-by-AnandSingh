import {test,expect} from '@playwright/test';
import {LoginPage} from'../pages/constructor.js';
import {loginData} from '../pages/logintestdata.js';
import ProductSort from '../pages/product.js';
import { productdata } from '../pages/productsortdata.js';
import fs from 'fs';

test.describe('Product Search Functionality',()=>{

let loginpage;
let productsort;
test.beforeEach(async({page})=>{


loginpage = new LoginPage(page);
productsort = new ProductSort(page);
await page.goto('https://www.saucedemo.com/')
await loginpage.login(

loginData.validUser.username,
loginData.validUser.password
);

});

test.afterEach(async({page}, testInfo)=>{

const screenshotFolder = 'screenshots/productsearch'
fs.mkdirSync(screenshotFolder,{recursive:true});
const fileName = testInfo.title
.replace(/[^a-z0-9]/gi, '-')
            .toLowerCase();
            await page.screenshot({
                path: `${screenshotFolder}/${fileName}.png`,
                fullPage: true
});
});

test('TC0001 - Product Sort A to Z',async({page})=>{


await productsort.sortproduct(
    productdata.productsortatoz.productsort
);
 const actualNames = await productsort.getproductname();

    const expectedNames = [...actualNames].sort();

    expect(actualNames).toEqual(expectedNames);


});
test('TC0002 - Product Sort Z to A',async({page})=>{


await productsort.sortproduct(
    productdata.productsortztoa.productsort
);
const actualNames = await productsort.getproductname();
console.log(actualNames);
    const expectedNames = [...actualNames].sort().reverse();
    console.log(expectedNames);

    expect(actualNames).toEqual(expectedNames);
});
test('TC0003 - Product Sort high to low',async({page})=>{


await productsort.sortproduct(
   productdata.productsorthightolow.productsort
    
);

});
test('TC0004 - Product Sort low to high', async({page})=>{

await productsort.sortproduct(


productdata.productsortlowtohigh.productsort


)

});
});