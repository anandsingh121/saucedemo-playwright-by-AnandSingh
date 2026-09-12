import {test,expect} from '@playwright/test';
import {LoginPage} from'../pages/constructor.js';
import {loginData} from '../pages/logintestdata.js';
import CartPage from '../pages/addtocart.js';
//import fs from 'fs';
import { productdata } from '../pages/productsortdata.js';
import ProductSort from '../pages/product.js';
import { takeScreenshot } from '../pages/screenshothelper.js';
test.describe('Product Search Functionality',()=>{

let loginpage;
let cartpage;
let productsort;
test.beforeEach(async({page})=>{


loginpage = new LoginPage(page);
    cartpage = new CartPage(page);
productsort = new ProductSort(page);
  await page.goto('https://www.saucedemo.com/')
await loginpage.login(

loginData.validUser.username,
loginData.validUser.password
);

});

// test.afterEach(async({page}, testInfo)=>{

// const screenshotFolder = 'screenshots/add-to-cart-checkout'
// fs.mkdirSync(screenshotFolder,{recursive:true});
// const fileName = testInfo.title
// .replace(/[^a-z0-9]/gi, '-')
//             .toLowerCase();
//             await page.screenshot({
//                 path: `${screenshotFolder}/${fileName}.png`,
//                 fullPage: true
// });
// });
test('TC001 - Add Product to Cart and Checkout',async({page})=>{

    await cartpage.addtocart();
    await takeScreenshot(page,'Test1 - Step1 - add to cart without sort');
    await cartpage.opencart();
    await takeScreenshot(page,'Test1 - Step2 - Open cart without sort');
    await cartpage.checkout();
    await takeScreenshot(page,'Test1 - Step3 - Checkout without sort');
    await cartpage.fillform();
    await takeScreenshot(page,'Test1 - Step4 - Fill form without sort');


})
test('TC002 - Add first product after Z to A sorting',async({page})=>{

    await productsort.sortproduct(
    productdata.productsortztoa.productsort
);
await takeScreenshot(page,'Test2 - Step1 - Sort Product Z To A Sorting');
await cartpage.firstproduct();
await takeScreenshot(page,'Test2 - Step2 - add to cart first product Sorting');
await cartpage.opencart();
await takeScreenshot(page,'Test2 - Step3 - Open cart Sorting');
await cartpage.checkout();
await takeScreenshot(page,'Test2 - Step4 - Checkout Sorting');
await cartpage.fillform();
await takeScreenshot(page,'Test2 - Step5 - Fill form Sorting');
});
test('TC003 - Add last product after Z to A sorting',async({page})=>{

     await productsort.sortproduct(
    productdata.productsortztoa.productsort
);
await takeScreenshot(page,'Test3 - Step1 - Sort Product Z To A Sorting on Page');

await cartpage.lastproduct();
await takeScreenshot(page,'Test3 - Step2 - add to cart last product Sorting on Page');
await cartpage.opencart();
await takeScreenshot(page,'Test3 - Step3 - Open cart Sorting on Page');
await cartpage.checkout();
await takeScreenshot(page,'Test3 - Step4 - Checkout Sorting on Page');
await cartpage.fillform();
await takeScreenshot(page,'Test3 - Step5 - Fill form Sorting on Page');
})
test('TC004 - please add max lowest price product of the page',async({page})=>{

await productsort.sortproduct(
    productdata.productsorthightolow.productsort
);
await cartpage.addminpriceproduct();
await takeScreenshot(page,'Test4 - Step1 - add to cart minimum price product on page');
await cartpage.opencart();
await takeScreenshot(page,'Test4 - Step2 - Open cart on Page');
await cartpage.checkout();
await takeScreenshot(page,'Test4 - Step3 - Checkout from Page');
await cartpage.fillform();
await takeScreenshot(page,'Test4 - Step4 - Fill form on Page');

})
test('TC005 - please add max lowest price product of the page',async({page})=>{

await productsort.sortproduct(
    productdata.productsorthightolow.productsort
);
await cartpage.addmaxpriceproduct();
await takeScreenshot(page,'Test5 - Step1 - add to cart maximum price product on Page');
await cartpage.opencart();
await takeScreenshot(page,'Test5 - Step2 - Open Cart Page');
await cartpage.checkout();
await takeScreenshot(page,'Test5 - Step3 - Checkout from Page');
await cartpage.fillform();
await takeScreenshot(page,'Test5 - Step4 - Fill form on Page');

})
test('TC006 - Add multiple products to cart', async ({ page }) => {
    console.log('TC006 URL:', page.url());
    await cartpage.addtocartmultipleproducts();
    await takeScreenshot(page, 'Test6 - Step1 - Add four products to cart');
    await cartpage.opencart();
    await expect(cartpage.cartqty).toHaveCount(4);
    await takeScreenshot(page, 'Test6 - Step2 - Verify four products in cart');
});
test('TC007 - Add and remove some products from the card and checkout', async({page})=>{
await cartpage.addtocartmultipleproducts();
await takeScreenshot(page, 'TC007 - Step1 - add 4 products from the cart');
await cartpage.opencart();
await takeScreenshot(page, 'TC007 - Step3 - Open the cart');
await cartpage.removesomeprod();
await takeScreenshot(page, 'TC007 - Step4 - Remove 2 products from the cart');
await expect(cartpage.cartqty).toHaveCount(2);
await takeScreenshot(page, 'TC007 - Step4 - Verify two products remaining in cart');

});
});
