import fs from 'fs';
import path from 'path';

export async function takeScreenshot(page, folderName, screenshotName) {

    const browserName = page.context().browser()?.browserType().name() ?? 'unknown-browser';
    const folder = path.join('screenshots',folderName,browserName);

    fs.mkdirSync(folder, { recursive: true });
    const screenshotPath = path.join(
        folder,
        `${screenshotName}.png`
    );
        await page.screenshot({
        path: screenshotPath,
        fullPage: true
    });
}
