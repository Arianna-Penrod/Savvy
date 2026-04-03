# Unit Tests

This README shows all the commands to run unit tests and install dependencies

## Install dependencies
```bash
npm install
```

## Running Unit Tests
### Run index.text.tsx by Arianna Penrod
```bash
npx jest __tests__/index.test.tsx
```
### Run searchProduct.tsx by Sadita Sadat:
```bash
npx jest __tests__/searchProduct.tsx
```
### Run searchProductEmpty.tsx by Himaghna Mandla
```bash
npx jest __tests__/searchProductEmpty.tsx
```
### Run index.loginflow.test.tsx by Carlyssa Cook
```bash
npx jest __tests__/index.loginflow.test.tsx
```
### Run loginCaseSensitivity.tsx by Madi Wallace
```bash
npx jest __tests__/loginCaseSensitivity.tsx
```
### Run testProductRecs.tsx by Sarah Haffener
```bash
npx jest_tests_/testProductRecs.tsx
```
### Run editColor.tsx by Vesa Hoxha
```bash
npx jest_tests_/editColor.tsx
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


* * testsResponseTime.tsx by Sarah Haffener
    - makes sure that the response time of login is quick
    - This ensures fast logins and Detect Performance Bottlenecks
    - Support Scalability Testing When expanded, helps evaluate:
        - How login performs under heavy traffic
        - Concurrent user handling
 
* loginCaseSensitivity.tsx by Madi Wallace
    - These tests validate that the login system correctly enforces case-sensitive authentication
    - The username and password must exactly match stored credentials, including uppercase and lowercase letters
    - Example: correct username: MadiUser, wrong case: madiuser --> should fail --> exact case should pass
 
* loginTitleStyle.tsx by Vesa Hoxha
  - Makes sure that the Login page renders with the correct font size and color according to the app’s design specifications.
  - The font size and of the "Login" title is checked to ensure it matches the expected value of 28.
  - If the font size or color changes in the future, this test will fail, alerting developers that the UI has been modified.
