import { describe, test, expect } from "vitest";
import { isHmacValid } from "./webhook";

describe('validation', () => {
    test('should return error when hmac invalid', () => {
        const hmacValue = "fksdj8sagldjgaoekandjkn8akjd8343405"
        const result = isHmacValid("test")

        expect(isHmacValid("test")).not.toEqual(hmacValue)
    });

    test('should return ok when hmac valid', () => {
        const hmacValue = "9222fdd8422d7e0ba51619f7f264cdf3b9b2df404c68396023da2eaa6993c2e2"

        expect(isHmacValid("test").toString()).toEqual(hmacValue)
    });
})