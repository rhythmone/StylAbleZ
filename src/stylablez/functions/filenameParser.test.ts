import parseStylablezFilename from "./filenameParser";

const z = 't01_n-shad1_br105_ma1_clS'
const a = '02_n-shad2_op40_ma1_clS_blML'
const b = '03_n-focus_op70_blML'
const c = '04_n-eyeLiner_op50_ma1_clA'
const d = '05_n-lash_ma1_clA'
const e = '06_n-eye'

test('Token splitting gices tonkens', () => {
    expect(1 + 2).toBe(3);
    const testNames = [z, a, b, c, d, e]
    testNames.forEach((testName) => {
        parseStylablezFilename(testName)
    })
    console.log(testNames.join('\n').toUpperCase())
});
