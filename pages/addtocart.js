import {test,expect} from '@playwright/test';
import { parse } from 'path';
class cartpage{
    constructor(page){
this.page = page;
this.addcartbtn = page.locator('.btn.btn_primary.btn_small.btn_inventory');
this.carticon = page.locator('.shopping_cart_link');
this.cartqty = page.locator('.cart_quantity');
this.checkoutbtn = page.locator('.btn.btn_action.btn_medium.checkout_button');
this.firstname = page.locator('[data-test="firstName"]');
this.lastname = page.locator('[data-test="lastName"]');
this.postalcode = page.locator('[data-test="postalCode"]');
this.continue = page.locator('[data-test="continue"]');
this.finish = page.locator('[data-test="finish"]');
this.thankyou = page.locator('[data-test="complete-header"]');
this.backtohome = page.locator('[data-test="back-to-products"]');
this.productPrices = page.locator('.inventory_item_price');
this.remvprod = page.getByRole('button', { name: 'Remove' });
this.cartbadge = page.locator('.shopping_cart_badge');
    }
async addtocart()
{ const count = await this.addcartbtn.count(); const randomIndex = Math.floor(Math.random() * count); await this.addcartbtn.nth(randomIndex).click(); await expect(this.carticon).toHaveCount(1); }
async opencart()
{ await this.carticon.click(); await expect(this.cartqty.first()).toBeVisible(); }
async checkout()
{ await this.checkoutbtn.click(); }
async fillform()
{ await this.firstname.fill("Anand"); await this.lastname.fill("Singh"); await this.postalcode.fill("908076"); await this.continue.click(); await this.finish.click(); await expect(this.thankyou).toHaveText("Thank you for your order!"); }
async firstproduct()
{ await this.addcartbtn.first().click(); await expect(this.carticon).toHaveCount(1); }
async lastproduct()
{ await this.addcartbtn.last().click(); await expect(this.carticon).toHaveCount(1); }
async addmaxpriceproduct()
{ const prices = await this.productPrices.allTextContents(); const numericPrices = prices.map(price => parseFloat(price.replace('$', ''))); const maxValue = Math.max(...numericPrices); const maxIndex = numericPrices.indexOf(maxValue); console.log('All prices:', numericPrices); console.log('Maximum price:', maxValue); await this.addcartbtn.nth(maxIndex).click(); }
async addminpriceproduct()
{ const prices = await this.productPrices.allTextContents(); const numericPrices = prices.map(price => parseFloat(price.replace('$', ''))); const minValue = Math.min(...numericPrices); const minIndex = numericPrices.indexOf(minValue); console.log('All prices:', numericPrices); console.log('Maximum price:', minValue); await this.addcartbtn.nth(minIndex).click(); }
async addtocartmultipleproducts() {
    const productCount = await this.addcartbtn.count();
    const productsToAdd = Math.min(4, productCount);

    for (let i = 1; i <= productsToAdd; i++) {
        await this.addcartbtn.first().click();
    }

    await expect(this.cartbadge).toHaveText(String(productsToAdd));
}
async removesomeprod()
{ const initialProductCount = await this.remvprod.count();
    const productsToRemove = Math.min(2, initialProductCount);

    for (let i = 0; i < productsToRemove; i++) {
        await this.remvprod.first().click();
    }

    const remainingProducts = initialProductCount - productsToRemove;

    if (remainingProducts === 0) {
        await expect(this.cartbadge).not.toBeVisible();
    } else {
        await expect(this.cartbadge).toHaveText(String(remainingProducts));
    }
    }
}
export default cartpage;
