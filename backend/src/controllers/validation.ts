export default class Validation {
    public static isValidEmail(email:string) {
        if(email.includes('@') && email.includes('.')) {
            console.log('valid email address')
            return true;
        } else {
            console.log('email enterted is not valid');
            return false;
        }
    }

    public static isValidPassword(password:string) {
        if(password.length >= 6) {
            console.log('valid password length');
            return true;
        } else {
            console.log('password much contain atleast 6 characters')
            return false;
        }
    }
}