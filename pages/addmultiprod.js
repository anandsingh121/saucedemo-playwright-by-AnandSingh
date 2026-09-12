import{expect} from '@playwright/test';
export class AddMultiProduct{
constructor(page){
    this.addmultiprod = page.locator('.btn.btn_primary.btn_small.btn_inventory');
    this.removeproducts = page.getByRole('button', { name: 'Remove' });
    this.cartbadge = page.locator('.shopping_cart_badge');
    
}
async addproducts() {
    
    for(let i = 1; i<=6; i++)
        {

    await this.addmultiprod.first().click();
}
await expect(this.cartbadge).toHaveText('6');
}
async removealladdedprod(){
    const pageallproductscount = await this.removeproducts.count();
    console.log('pageallproductscount:',pageallproductscount)
for (let i = 0; i < pageallproductscount; i++) {
        await this.removeproducts.first().click();
    }
await expect(this.removeproducts).toHaveCount(0);
await expect(this.cartbadge).toHaveCount(0);

}
}export default AddMultiProduct;
