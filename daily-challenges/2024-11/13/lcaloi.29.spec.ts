// navigate to https://material.playwrightvn.com/games/002-pikachu.html
// điền tên ->
//locator txx_input_playerName
//nhấn bắt đầu chơi //button[.='Bắt đầu chơi']

// assert người chơi hiển thị :p#playerInfo chứa tên người chơi đã nhập ở bước trước

// => lấy các giá trị của tất cả các ô. div#grid div
//==> click theo các text đã lấy //div[.='475'][1]
//=> sau khi chơi xong, xuất hiện 1 alert thông báo đã "Bạn đã thắng cuộc!" => click Ok trên alert đó

import { test, expect, Locator } from '@playwright/test';

const playerName: string = "yah sure";

test('Solution for day 13/11/24', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/games/002-pikachu.html');
    await page.fill('input.input-name', playerName);
    await page.click(`//button[.='Bắt đầu chơi']`);

    await expect(page.locator('p#playerInfo')).toHaveText(`Người chơi: ${playerName}`);

    const outers: Locator[] = await page.locator('div#grid div').all();
    const setOuters: Set<string> = new Set();
    for (const outer of outers) {
        let outerVal = await outer.textContent();
        if (outerVal) {
            setOuters.add(outerVal);
        }
    }

    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Bạn đã thắng cuộc!');
        dialog.accept();
    })

    for (const value of setOuters) {
        const outer1: string = `//div[@id='grid']/div[.='${value}'][1]`;
        const outer2: string = `//div[@id='grid']/div[.='${value}'][2]`;
        await page.click(outer1);
        await page.click(outer2);
    }

})