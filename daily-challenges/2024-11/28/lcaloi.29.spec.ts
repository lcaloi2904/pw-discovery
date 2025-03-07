//navigate vào trang https://material.playwrightvn.com/
//click vào link : xé túi mù pokemon =>
//a[@href = 'games/004-pokemon.html']
//get targetName => div#target-pokemon
//==> lặp qua những ô để click => div.bag
//continueMessage= "Tiếp tục tìm kiếm! Đây là ${currentPokemonName}"
//==> stopMessage: "Chúc mừng! Bạn đã tìm thấy ${targetPokemonName}!"
//==> div#result


import { test, expect, Locator } from '@playwright/test';

test('Solution for day 28/11/24', async ({ page }) => {

    await page.goto('https://material.playwrightvn.com/');
    await page.click(`//a[@href = 'games/004-pokemon.html']`);
    let targetName;
    let count = 5;
    while (count >= 0) {
        let tempt = await page.locator('div#target-pokemon').textContent();
        if (tempt) {
            targetName = tempt.slice(tempt.indexOf(':') + 1).trim();
            break;
        }
        if (count == 0) {
            throw new Error('Không lấy được targetName');
        }
        count--;
    }
    console.log(`targetName:${targetName}`);

    const blindBoxes: Locator[] = await page.locator('div.bag').all();

    for (const blindBox of blindBoxes) {
        await blindBox.click();
        let pokemonName = await blindBox.locator('div.pokemon-name').textContent();
        console.log(`pokemon Name:${pokemonName}`);
        if (pokemonName === targetName) {
            await expect(page.locator(`//div[@id='result']`)).toHaveText(`Chúc mừng! Bạn đã tìm thấy ${targetName}!`);
            break;
        } else {
            await expect(page.locator(`//div[@id='result']`)).toHaveText(`Tiếp tục tìm kiếm! Đây là ${pokemonName}`);
        }
    }

});