
const tokenDelimiter = '_';

export const tokenMap = {
    'normal': 'NM',
    'multiply': 'ML',
    'screen': 'SC',
    'overlay': 'OL',
    'darken': 'DK',
    'darker-color': 'DC',
    'lighten': 'LI',
    'color-dodge': 'CD',
    'color-burn': 'CB',
    'hard-light': 'HL',
    'soft-light': 'SL',
    'pin-light': 'PL',
    'difference': 'DF',
    'exclusion': 'EX',
    'hue': 'HU'
}

const digitsOnly = /^[0-9]*$/.compile()
const firstCharacters = /(^[A-Z|a-z]{2})(.*)/.compile()

const parseStylablezFilename = (fileName: string) => {
    const tokens = fileName.toUpperCase().split(tokenDelimiter)
    let tokenConfigIndex = 0
    const cleanTokens = tokens.filter(token => token.indexOf('-') < 0)
    cleanTokens.forEach(token => {
        const found = token.match(digitsOnly)
        if (found) {
            tokenConfigIndex = parseInt(token, 10)
        } else if (token.match(firstCharacters)) {
            throw Error(`The part of the filename containing ${token} didn't look like anything that
            matched the default style names. The are: ${tokens}.  Consult the documentation to
            determine which combinations of letters and numbers are valid in the filename.`)
        }
    })
}

export default parseStylablezFilename
