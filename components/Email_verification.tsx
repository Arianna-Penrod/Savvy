
// user email is test@test.com ?
// user password is test1234 ?
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
    if (password === "test1234") {
        // confirm password
    } else {
        // reject any other inputs other than test1234
        console.log("Error: Invalid email or password");
    }
}
