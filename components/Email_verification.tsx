
// user email is test@test.com ?
// user password is 123456 ?
// this first one is to test the set email if the eamil changes
// then this code will need to change

// read in email

type emailVerificationProps = {
    email: string;
};

export default function EmailVerification({ email }: emailVerificationProps) {
    if (email === "test@test.com") {
        // confirm email
    } else {
        // reject any other inputs other than test@test.com
        console.log("Error: Invalid email or password");
    }
}

//read in password

type passwordVerificationProps = {
    password: string;
};

export function PasswordVerification({ password }: passwordVerificationProps) {
    if (password === "123456") {
        // confirm password
    } else {
        // reject any other inputs other than 123456
        console.log("Error: Invalid email or password");
    }
}
