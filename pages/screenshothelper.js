import fs from 'fs';
import path from 'path';

export async function takeScreenshot(page, name) {

    const browserName = page.context().browser()?.browserType().name() ?? 'unknown-browser';
    const folder = path.join('screenshots', 'addtocarteachsteps', browserName);

    fs.mkdirSync(folder, { recursive: true });

    await page.screenshot({
        path: path.join(folder, `${name}.png`),
        fullPage: true
    });
}
