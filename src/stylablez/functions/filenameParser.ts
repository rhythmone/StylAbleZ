
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

const colorVariantMap: {[key: string]: string} = {
    'A': 'accent',
    'P': 'primary',
    'S': 'secondary',
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

const digitsOnly = /(^[0-9]*$)/
const styleCode = /(^[A-Z|a-z]{2})(.*)/

interface Stylable {
    layerOrder: number,
    styleMap: StylableZ
}

interface StylableZ {[styleName: string]: string | number | boolean}


export const parseStylablezFiles = (filenames: string[]): StylableZ[] => {
    const stylables = filenames.map((name) => parseStylablezFilename(name))
    stylables.sort((s1, s2) => {
        if (s1.layerOrder > s2.layerOrder) {
            return 1
        } else if (s1.layerOrder < s2.layerOrder) {
            return -1
        } else {
            return 0
        }
    })
    return stylables.map(s => s.styleMap);
}

function throwFullError(fileName: string, token: string) {
    let message = `The part of the filename: '${fileName}' containing ${token} didn't look like anything that matched codes for the default style names.\n\n`
    message += `Valid codes with numeric values following them are: ${JSON.stringify(effectTokenMap, null, 2)}\n\n`
    message += `Valid codes with T or F following them are: ${JSON.stringify(booleanTokenMap, null, 2)}\n\n`
    message += `Valid codes with palette color (A, P or S) following them are: ${JSON.stringify(colorTokenMap, null, 2)}\n\n`
    message += `Valid codes with a blend following them are: ${JSON.stringify(blendModeTokenMap, null, 2)}\n\n`
    message += `Valid blend modes are: ${JSON.stringify(blendModeMap, null, 2)}\n\n`
    message += `Consult the documentation to determine which combinations of letters and numbers are valid in the filename.`
    throw Error(message)
}

const parseStylablezFilename = (fileName: string): Stylable => {
    let layerOrder
    const stripped = fileName.replace(/\s+/g, '')
    const tokens = stripped.toUpperCase().split(tokenDelimiter)
    const styleMap: {[key: string]: number | boolean | string} = {}
    const cleanTokens = tokens.filter(token => token.indexOf('-') < 0)
    cleanTokens.forEach(token => {
        const digitsFound = token.match(digitsOnly)
        const styleCodeFound = token.match(styleCode)
        if (digitsFound) {
            layerOrder = Number.parseInt(digitsFound[1], 10)
        } else if (styleCodeFound) {
            const tokenKey = styleCodeFound[1] as string
            const tokenValue = styleCodeFound[2]
            if (effectTokenMap[tokenKey] !== undefined) {
                addEffectValue(styleMap, fileName, token, tokenKey, tokenValue);
            } else if (blendModeTokenMap[tokenKey] !== undefined) {
                addBlendMode(styleMap, fileName, token, tokenKey, tokenValue);
            } else if (booleanTokenMap[tokenKey] !== undefined) {
                addBooleanValue(styleMap, fileName, token, tokenKey, tokenValue);
            } else if (colorTokenMap[tokenKey] !== undefined) {
                addColorVariant(styleMap, fileName, token, tokenKey, tokenValue);
            } else {
                throwFullError(fileName, token);
            }
        } else {
            throwFullError(fileName, token);
        }
    })

    if (layerOrder === undefined) {
        throw Error(`The filename: '${fileName}' must begin with a number which indicates what order it should be inserted into the stack.`)
    }

    return {
        layerOrder,
        styleMap
    }
}


export const addEffectValue = (styleMap: StylableZ, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
    if (isNaN(tokenValue as any)) {
        throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a value: '${tokenValue}' that can't be converted to a number.
                    It must be a number`)
    }
    styleMap[effectTokenMap[tokenKey]] =  Number.parseInt(tokenValue, 10)
}

export const addBlendMode = (styleMap: StylableZ, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
    if (blendModeMap[tokenValue] !== undefined) {
        styleMap[blendModeTokenMap[tokenKey]] = blendModeMap[tokenValue]
    } else {
        throw Error(`The part of the filename: '${fileName}' containing the blend mode code: '${token}'
                    is followed by a value that isn't a code for a blend mode. '${tokenValue}' is not a blend mode. 
                    The allowed codes for the blend modes are: 
                    ${JSON.stringify(blendModeMap, null, 2)}`)
    }
}

export const addBooleanValue = (styleMap: StylableZ, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
    if (tokenValue !== 'T' && tokenValue !== 'F') {
        throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a code that can't be converted to true of false.  It's '${tokenValue}'. 
                    It must be either 'T' or 'F'`)
    }
    styleMap[booleanTokenMap[tokenKey]] = tokenValue === 'T'
}

function addColorVariant(styleMap: StylableZ, fileName: string, token: string, tokenKey: string, tokenValue: string) {
    if (tokenValue === 'A' || tokenValue === 'P' || tokenValue === 'S') {
        styleMap[colorTokenMap[tokenKey]] = colorVariantMap[tokenValue]
    } else {
        throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a code that can't be converted to primary, secondary or accent.
                    It must be either 'A', 'P' or 'S'`)
    }
}

export default parseStylablezFilename
