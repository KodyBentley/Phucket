"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validation {
    static isValidEmail(email) {
        if (email.includes('@') && email.includes('.')) {
            console.log('valid email address');
            return true;
        }
        else {
            console.log('email enterted is not valid');
            return false;
        }
    }
    static isValidPassword(password) {
        if (password.length >= 6) {
            console.log('valid password length');
            return true;
        }
        else {
            console.log('password much contain atleast 6 characters');
            return false;
        }
    }
}
exports.default = Validation;
