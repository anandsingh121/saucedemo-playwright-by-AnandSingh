import { expect } from '@playwright/test';
export class LoginPage{

    constructor(page) {

this.page = page;
this.username = page.locator('[data-test="username"]');
this.password = page.locator('[data-test="password"]');
this.loginbutton = page.locator('[data-test="login-button"]');
this.errorMessage = page.locator('[data-test="error"]');
this.menuButton = page.locator('#react-burger-menu-btn');
this.logoutbutton = page.locator('[data-test="logout-sidebar-link"]');


}
async login(username,password){

await this.username.fill(username);
await this.password.fill(password);
await this.loginbutton.click();
}
async varifyloginuser(){
await expect(this.page).toHaveURL(/inventory.html/);
}
async varifyErrorMessage(message){

    //await expect(this.page).toContainText(message);
    await expect(this.errorMessage).toContainText(message);
}
async varifyPasswordIsMasked() {
    await expect(this.password).toHaveAttribute('type', 'password');
}
async logout(){

    await this.menuButton.click();
    await this.logoutbutton.click();

    
}
};

