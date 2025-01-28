import { describe, test, expect } from "vitest";
import { isHmacValid } from "./webhook";

describe('validation', () => {
    test('should return error when hmac invalid', () => {
        const hmacValue = "fksdj8sagldjgaoekandjkn8akjd8343405"

        expect(isHmacValid(hmacValue)).toBeFalsy()
    });

    test('should return ok when hmac valid', () => {
        const hmacValue = "7252322798a42f4005596e78ab602e300acf51c13628bb4bff6b5aa929cadec4"

        expect(isHmacValid(hmacValue)).toBeFalsy()
    });
})