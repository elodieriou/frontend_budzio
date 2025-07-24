import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator {
    /**
     * Check strong password
     * @param control - Password control
     */
    static strongPassword(control: AbstractControl): ValidationErrors | null {
        const password = control.value ?? '';
        if (!password) {
            return null;
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[(),.?]/.test(password);
        const isLong = password.length >= 10;

        const valid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLong;

        return valid
            ? null
            : {
                  weakPassword: {
                      hasUpperCase,
                      hasLowerCase,
                      hasNumber,
                      hasSpecialChar,
                      isLong,
                  },
              };
    }
}
