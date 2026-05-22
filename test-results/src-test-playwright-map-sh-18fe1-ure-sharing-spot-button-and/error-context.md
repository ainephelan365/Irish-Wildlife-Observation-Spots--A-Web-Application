# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: src\test\playwright\map-share-button-test.spec.js >> Testing the basic Map feature, sharing spot button and
- Location: src\test\playwright\map-share-button-test.spec.js:3:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('link', { name: 'Country Map' })

```

```
Error: browserContext.close: Target page, context or browser has been closed
```