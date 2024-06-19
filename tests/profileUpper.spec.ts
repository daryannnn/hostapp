import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveURL('http://localhost:3000/login')
    await expect(page.getByRole('button', { name: 'войти' })).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByLabel('Пароль')).toBeVisible();
});

test.describe('Testing logging in', () => {
    test('going to own profile page', async ({ page }) => {
        await page.getByLabel('Email *').fill('gym@gym.yr');
        await page.getByLabel('Пароль').fill('111111');
        await page.getByRole('button', { name: 'войти' }).click();
        await expect(page).toHaveURL('http://localhost:3000/')
        await page.getByTestId("profile-button").click();
        await expect(page).toHaveURL('http://localhost:3000/profile/uwQpIREuHGY1b2Mu4EjXfEDw6eW2')
        await expect(page.getByTestId('name')).toContainText("Тренажерный зал");

    })
});

