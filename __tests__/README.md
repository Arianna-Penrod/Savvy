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
