import * as dotenv from 'dotenv';
import * as fs from 'fs';

import { defineConfig, devices } from '@playwright/test';

const env = process.env.ENV || 'dev';

const envFilePath = `.${env}.env`;

if (fs.existsSync(envFilePath)) {
    dotenv.config({ path: envFilePath });
} else {
    throw new Error(`Env file ${envFilePath} not found`);
}

const isHeadless = process.env.HEADLESS === 'true';
const workers = parseInt(process.env.WORKERS || '1', 10);
const viewportWidth = parseInt(process.env.VIEWPORT_WIDTH || '1920', 10);
const viewportHeight = parseInt(process.env.VIEWPORT_HEIGHT || '1080', 10);

export default defineConfig({
    testDir: './tests',
    timeout: 300000,
    outputDir: './reports/test-results',
    workers,
    reporter: [
        ['html', { outputFolder: 'reports/playwright-report', open: 'never' }],
        [
            'allure-playwright',
            {
                detail: false,
                resultsDir: 'reports/allure-results',
                suiteTitle: false,
            },
        ],
    ],
    use: {
        baseURL: process.env.BASE_URL,
        headless: isHeadless,
        screenshot: 'only-on-failure',
        trace: 'on',
        video: 'off',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: viewportWidth, height: viewportHeight },
                launchOptions: {
                    headless: isHeadless,
                },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: viewportWidth, height: viewportHeight },
                launchOptions: {
                    headless: isHeadless,
                },
            },
        },
    ],
});
