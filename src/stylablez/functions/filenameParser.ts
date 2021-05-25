
const tokenDelimiter = '_';

const effectTokenMap: {[key: string]: string} = {
    'UR': 'blur',
    'BR': 'brightness',
    'CN': 'contrast',
    'GR': 'grayscale',
    'HU': 'hueRotate',
    'IN': 'invert',
    'OP': 'opacity',
    'SA': 'saturate',
    'SP': 'sepia'
}

const blendModeTokenMap: {[key: string]: string} = {
    'BL': 'mixBlendMode',
    'BB': 'backgroundBlendMode',
}

const booleanTokenMap: {[key: string]: string} = {
    'VI': 'visible',
    'MA': 'mask',
}

const colorTokenMap: {[key: string]: string} = {
    'CL': 'backgroundColor',
}

export const blendModeMap: {[key: string]: string} = {
    'NM': 'normal',
    'ML': 'multiply',
    'SC': 'screen',
    'OL': 'overlay',
    'DK': 'darken',
    'DC': 'darker-color',
    'LI': 'lighten',
    'CD': 'color-dodge',
    'CB': 'color-burn',
    'HL': 'hard-light',
    'SL': 'soft-light',
    'PL': 'pin-light',
    'DF': 'difference',
    'EX': 'exclusion',
    'HU': 'hue'
}

const digitsOnly = /^[0-9]*$/.compile()
const firstCharacters = /(^[A-Z|a-z]{2})(.*)/.compile()

const parseStylablezFilename = (fileName: string) => {
    const stripped = fileName.replace(/\s+/g, '')
    const tokens = stripped.toUpperCase().split(tokenDelimiter)
    const styleMap: {[key: string]: number | boolean | string} = {}
    let tokenConfigIndex = 0
    const cleanTokens = tokens.filter(token => token.indexOf('-') < 0)
    cleanTokens.forEach(token => {
        const found = token.match(digitsOnly)
        if (found) {
            const tokenKey = found[1] as string
            const tokenValue = found[1]
            if (effectTokenMap[tokenKey] !== undefined) {
                const parsedValue = Number.parseInt(tokenValue, 10)
                if (Number.isNaN(parsedValue)) {
                    throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a value: '${tokenValue}' that can't be converted to a number.
                    It must be a number`)
                }
                styleMap[effectTokenMap[tokenKey]] = parsedValue
            } else if (blendModeTokenMap[tokenKey] !== undefined) {
                if (blendModeMap[tokenValue] !== undefined) {
                    styleMap[effectTokenMap[tokenKey]] = blendModeMap[tokenValue]
                } else {
                    throw Error(`The part of the filename: '${fileName}' containing the blend mode code: '${token}'
                    is followed by a value that isn't a code for a blend mode. 
                    The allowed codes for the blend modes are: 
                    ${JSON.stringify(blendModeMap, null, 2)}`)
                }
            } else if (booleanTokenMap[tokenKey] !== undefined) {
                if (tokenValue !== 'T' && tokenValue !== 'F') {
                    throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a code that can't be converted to true of false.  It's ${tokenValue}. 
                    It must be either 'T' or 'F'`)
                }
                styleMap[tokenKey] = tokenValue === 'T'
            } else if (colorTokenMap[tokenKey] !== undefined) {
            } else {
                throw Error(`The part of the filename: '${fileName}' containing ${token} isn't a valid code in the filename. '. 
                It should be one of these: ${tokens}.  Consult the documentation to
                determine which combinations of letters and numbers are valid in the filename.`)
            }

            tokenConfigIndex = parseInt(token, 10)
        } else if (token.match(firstCharacters)) {
            throw Error(`The part of the filename: '${fileName}' containing ${token} didn't look like anything that
            matched the default style names. The are: ${tokens}.  Consult the documentation to
            determine which combinations of letters and numbers are valid in the filename.`)
        }
    })
}

export default parseStylablezFilename
