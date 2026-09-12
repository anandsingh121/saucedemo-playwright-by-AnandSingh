import {test,expect} from '@playwright/test';
class ProductSort{

constructor(page){

        this.page = page;
        this.productsort = page.locator('.product_sort_container');
        this.productitems = page.locator('.inventory_item');
        this.productnames = page.locator('.inventory_item_name');

}
async sortproduct(option){

await this.productsort.selectOption(option);

}
async getproductname(productname){

   return await this.productnames.allTextContents();


}
async getproductitemcount(productitems){

    await this.productitems.count();

}
}export default ProductSort;