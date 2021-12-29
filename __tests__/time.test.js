import {millisToMinutesAndSeconds} from "../lib/time";

describe('test Time Utils', () => {

    it('converts millis to minutes and seconds', () => {
        expect(millisToMinutesAndSeconds(0)).toBe('0:00')
        expect(millisToMinutesAndSeconds(10000)).toBe('0:10')
        expect(millisToMinutesAndSeconds(60000)).toBe('1:00')
        expect(millisToMinutesAndSeconds(100000)).toBe('1:40')
        expect(millisToMinutesAndSeconds(123456)).toBe('2:03')
    })

    it('throws error when millis is not provided', () => {
        expect(() => {
            millisToMinutesAndSeconds()
        }).toThrow()

        expect(() => {
            millisToMinutesAndSeconds(null)
        }).toThrow()
    })
})

