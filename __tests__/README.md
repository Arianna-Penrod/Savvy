# Unit Tests

This shows all the commands to run unit tests and install dependencies

## Install dependencies
```bash
npm install
```

## Running Unit Tests
### Run index.text.tsx by Arianna Penrod
```bash
npx jest __test__/index.text.tsx
```
### Run searchProduct.tsx by Sadita Sadat:
```bash
npx jest __test__/searchProduct.tsx
```
## Unit Test Summary
* index.text.tsx by Arianna Penrod
  test: login username only contains characters
  if (!containsNumber(username) && !containsSpecialChar(username)):
  test pass
  
  test: password contains at least 1 number
  if containsNumber(password):
  test pass
  
  test: password > 5 characters
  if len(password) > 5:
  test pass
  
  test: password contains at least 1 special characetr
  if containsSpecialChar(password):
  test pass
  
* searchProduct.tsx by Sadita Sadat
  - validates the core price comparison logic used in the app
  - ensure it returns the cheapest store given a product
 

