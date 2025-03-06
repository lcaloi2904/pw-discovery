// navigate vào trang ruy cập trang: https://material.playwrightvn.com/
//click vào bài 3: tìm vì tinh tú
//a[@href='games/003-vi-tinh-tu.html']
// Lấy tên loại sao cần tìm : span#target-name
// dựa vào target name để chọn đúng vì tinh tú:
// //span[@class='constellation-name' and  text()='${targetName}']


import { test, expect } from '@playwright/test';

test('Solution for day 27/11/24', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/');
    await page.click(`//a[@href='games/003-vi-tinh-tu.html']`);
    let targetName;
    while (true) {
        targetName = await page.locator('span#target-name').textContent();
        if (targetName) {
            break;
        }
    }

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Chúc mừng! Bạn đã tìm được vì tinh tú đúng!')
        dialog.accept();
    })

    await page.click(`//span[@class='constellation-name' and  text()='${targetName}']`);

})