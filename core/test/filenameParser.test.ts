import parseStylablezFilename, {parseStylablezFiles} from "../src/stylablez/functions/filenameParser";

test('A filename with one of each of the tokens is correctly parsed', () => {
  const fileName = `010_eyes-brown_UR12_VIF_CLA_BLDC`
  const styles = parseStylablezFilename(fileName)
  expect(styles).toMatchSnapshot()
})

test('A filename with one of each of the tokens is correctly parsed with no regard to casae', () => {
  const fileName = `010_EYEs-bROwn_uR12_ViF_cLa_BlDc`
  const styles = parseStylablezFilename(fileName)
  expect(styles).toMatchSnapshot()
})

test('Many filenames are correctly ordered.', () => {
  const styles = parseStylablezFiles([
    `099_eyes-brown_UR99_VIF_CLA_BLDC`,
    `010_-brown_UR10_VIF_CLA_BLDC`,
    `012_-brown_UR12_VIF_CLA_BLDC`,
    `002_-brown_UR2_VIF_CLA_BLDC`,
    `030_-brown_UR30_VIF_CLA_BLDC`,
    `100_-brown_UR100_VIF_CLA_BLDC`,
    `909__eyes-brown_UR909_VIF_CLA_BLDC`,
   ])
  expect(styles).toMatchSnapshot()
})

test('A filename with an incorrect blend mode throws an error', () => {
  const fileName = `099_eyes-brown_UR12_VIF_CLA_BLXX`
  expect(() => {
    const styles = parseStylablezFilename(fileName)
  }).toThrowErrorMatchingSnapshot();
})

test('A filename with an unrecognized token throws an error', () => {
  const fileName = `099_eyes-brown_UR12_VIF_CLA_XLDC`
  expect(() => {
    const styles = parseStylablezFilename(fileName)
  }).toThrowErrorMatchingSnapshot();
})

test('A filename with an unparseable token throws an error', () => {
  const fileName = `099_eyes-brown_d9012_VIF_CLA_XLDC`
  expect(() => {
    const styles = parseStylablezFilename(fileName)
  }).toThrowErrorMatchingSnapshot();
})

test('A filename with an incorrect boolean value throws an error', () => {
  const fileName = `099_eyes-brown_UR12_VIY_CLA_BLDC`
  expect(() => {
    const styles = parseStylablezFilename(fileName)
  }).toThrowErrorMatchingSnapshot();
})

test('A filename with an incorrect numeric value throws an error', () => {
  const fileName = `099_eyes-brown_UR1s_VIF_CLA_BLDC`
  expect(() => {
    const styles = parseStylablezFilename(fileName)
  }).toThrowErrorMatchingSnapshot();
})


/*
test('A bunch of files are parsed', () => {
    expect(1 + 2).toBe(3);
    const testNames = [z, a, b, c, d, e]
    testNames.forEach((testName) => {
        parseStylablezFilename(testName)
    })
    console.log(testNames.join('\n').toUpperCase())
});
 */
