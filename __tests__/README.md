# Unit Tests

This README shows all the commands to run unit tests and install dependencies

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
### Run searchProductEmpty.tsx by Himaghna Mandla
```bash
npx jest __test__/searchProductEmpty.tsx
```
### Run index.loginflow.test.tsx by Carlyssa Cook
```bash
npx jest __test__/index.loginflow.test.tsx
```
### Run loginCaseSensitivity.tsx by Madi Wallace
```bash
npx jest __test__/loginCaseSensitivity.tsx
```
### Run testProductRecs.tsx by Sarah Haffener
```bash
npx jest_test_/testProductRecs.tsx
```
### Run editColor.tsx by Vesa Hoxha
```bash
npx jest_test_/editColor.tsx
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
 
* searchProductEmpty.tsx by Himaghna Mandla
  - Tests how findCheapest handles empty or invalid input:
    - Empty String ("")
    - Product not in database ("Dodo feathers")
    - Null or Undefined
  - Expected behavior: returns error message

* index.loginflow.test.tsx by Carlyssa Cook
    - Simulates a real user login flow by entering incorrect credentials, verifying the error message, then correcting the password and successfully logging in.
    - Verifies that an error message appears for invalid login
    - Confirms successful login after correcting credentials
    - Ensures the UI updates correctly (login screen disappears)


* testProductRecs.tsx by Sarah Haffener
    - Recommend products based on user's purchase history
    - Expected output: returns popular products if no purchase history exists
 
* loginCaseSensitivity.tsx by Madi Wallace
    - These tests validate that the login system correctly enforces case-sensitive authentication
    - The username and password must exactly match stored credentials, including uppercase and lowercase letters
    - Example: correct username: MadiUser, wrong case: madiuser --> should fail --> exact case should pass
 
* editColor.tsx by Vesa Hoxha
  - test the color of login screen

