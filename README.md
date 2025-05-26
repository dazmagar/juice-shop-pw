# Playwright Automation Framework

Automated testing for the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) web application using Playwright, TypeScript, and Allure Reports.

---

## ⚠️ Prerequisite: Running Juice Shop Locally

This test framework is designed for the [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) application. **You must start the Juice Shop app locally before running any tests.**

### Quick Start with PM2

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Install PM2 globally (if not already):**
    ```bash
    npm install -g pm2
    ```
3. **Start Juice Shop with PM2:**
    ```bash
    pm2 start pm2.config.js
    ```
4. **Check status:**
    ```bash
    pm2 status
    ```
5. **Access the app:**
    - The application will be available at: [http://localhost:3000](http://localhost:3000)

#### Useful PM2 Commands

- View logs: `pm2 logs juice-shop`
- Stop: `pm2 stop juice-shop`
- Restart: `pm2 restart juice-shop`
- Remove: `pm2 delete juice-shop`
- Monitor: `pm2 monit`

#### Auto-start on System Boot

```bash
pm2 startup
pm2 save
```

#### PM2 Configuration Example (`pm2.config.js`)

```js
module.exports = {
    apps: [
        {
            name: 'juice-shop',
            cwd: '.',
            script: 'node',
            args: 'build/app',
            interpreter: 'none',
            exec_mode: 'fork',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
            },
        },
    ],
};
```

---

## 🚀 Technologies Used

- Playwright (TypeScript)
- Allure Reports
- Page Object Model (POM)
- ESLint & Prettier
- dotenv for environment configs

## 📁 Project Structure

```
.
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page objects for app screens
│   └── utils/          # Utility functions
├── tests/              # Test scenarios
├── reports/            # Reports and artifacts
│   ├── allure-report/      # Allure HTML reports
│   ├── allure-results/     # Allure raw results
│   ├── playwright-report/  # Playwright HTML reports
│   └── test-results/       # Test artifacts
├── .dev.env            # Example environment config
├── playwright.config.ts# Playwright configuration
├── tsconfig.json       # TypeScript config with path aliases
├── .eslintrc.cjs       # ESLint rules
├── .prettierrc         # Prettier formatting rules
└── package.json        # Scripts and dependencies
```

## ⚙️ Configuration

- **Environment Variables:**
    - Managed via `.dev.env`, `.qa.env`, `.prod.env` (see `.dev.env` for example)
    - Loaded automatically based on ENV variable (default: `dev`)
- **Playwright Config:**
    - Multi-browser: Chromium & Firefox
    - Headless/headed mode via `HEADLESS` env var
    - Custom viewport, workers, and output directories
    - Allure and Playwright HTML reporters
- **TypeScript:**
    - Path aliases for `@components/*`, `@pages/*`, `@utils/*`, `@tests/*`
- **Linting & Formatting:**
    - Strict ESLint and Prettier rules (see `.eslintrc.cjs`, `.prettierrc`)

## 📝 Page Object Model

- `src/components/` — reusable UI elements (e.g., forms, headers)
- `src/pages/` — page objects representing app screens
- `src/utils/` — utility functions
- **Example component:**

```typescript
export class LoginComponent {
    private readonly selectors = {
        email: '[data-test="email"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
    };

    constructor(private readonly page: Page) {}

    async login(email: string, password: string): Promise<void> {
        await allure.step('Login with credentials', async () => {
            await this.page.fill(this.selectors.email, email);
            await this.page.fill(this.selectors.password, password);
            await this.page.click(this.selectors.loginButton);
        });
    }
}
```

## 🔍 Running Tests

### Basic Commands

```bash
# Run all tests (default: dev environment)
yarn test

# Run tests in a specific environment
yarn test:dev
yarn test:qa

# Run in headed/headless mode
yarn test:headed
yarn test:headless

# Run tests in a specific browser
yarn test:project chromium

# Run tests by grep (tag or test ID)
yarn test:grep @smoke
```

### Environment Variables

- `ENV` — Environment (dev, qa, prod)
- `HEADLESS` — Run in headless mode (`true`/`false`)
- `WORKERS` — Number of parallel workers
- `VIEWPORT_WIDTH`, `VIEWPORT_HEIGHT` — Custom viewport size

### .env Example

```
BASE_URL=http://localhost:3000/#
USER_EMAIL=tester1@test.com
USER_PASSWORD=zaq1@WSX
USER_QUESTION="Mother's maiden name?"
USER_ANSWER=Mother
USER_COUNTRY=Canada
USER_NAME=Tester1
USER_MOBILE=1234567890
USER_ZIP=L3X 1K1
USER_ADDRESS=173 McCaffrey Rd
USER_CITY=Newmarket
USER_STATE=ON
```

## 📊 Reports

- **Allure Reports:**
    - Generate: `yarn allure:generate`
    - Open: `yarn allure:open`
    - Output: `reports/allure-report/`
- **Playwright HTML Reports:**
    - Open: `yarn report:playwright`
    - Output: `reports/playwright-report/`

## 🧹 Linting & Code Quality

- Run ESLint: `yarn lint`
- Auto-fix: `yarn lint:fix`
- All code must comply with ESLint/Prettier rules (see configs)

## 🏗️ CI/CD & Best Practices

- All test runs generate artifacts and reports for CI
- Use environment configs for all sensitive/test data
- Modular, DRY, and maintainable code structure
- All tests must have setup/teardown and meaningful assertions
- Tag tests for filtering in CI pipelines
