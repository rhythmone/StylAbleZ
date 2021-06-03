import {StyleAbleZMap} from "../model/types";

const tokenDelimiter = '_';


/**
 * Parses filenames into default component styles that can be applied to layers
 */
export class FilenameParser {

    private filenames: string[]

    constructor(filenames: string[]) {
        this.filenames = filenames
    }


    /**
     * Given a list of filenames, this will extract tokens that are delimed by '_' characters.
     * any tokens that contain a '-' will be ignored.
     * @param filenames filenames that will be parsed to return a corresponding map of styles
     * @param lenientFilenames set this to true to prevent errors from being thrown when files
     * may be provided with names that could not be parsed
     */
    public parseStylablezFiles = (lenientFilenames: boolean = false): StyleAbleZMap[] => {
        const stylables = this.filenames.map((filename) => this.parseStylablezFilename(filename, lenientFilenames))
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


    /*
     * @param filename filename that will be parsed to return a corresponding map of styles
     * @param lenientFilenames set this to true to prevent errors from being thrown when files
     * may be provided with names that could not be parsed
     */
    public parseStylablezFilename = (fileName: string, lenientFilenames: boolean = false): Stylable => {
        let layerOrder
        const extensionIdx = fileName.lastIndexOf('.')
        let strippedOfExtension = fileName
        if (extensionIdx >= 0) {
            strippedOfExtension = fileName.substring(0, extensionIdx)
        }
        const stripped = strippedOfExtension.replace(/\s+/g, '')
        const tokens = stripped.toUpperCase().split(tokenDelimiter)
        const styleMap: StyleAbleZMap = {}
        const cleanTokens = tokens.filter(
            token => token.indexOf('-') < 0
        )
        cleanTokens.forEach((token) => {
            try {
                const digitsFound = token.match(digitsOnly)
                const styleCodeFound = token.match(styleCode)
                if (digitsFound) {
                    layerOrder = Number.parseInt(digitsFound[1], 10)
                } else if (styleCodeFound) {
                    const tokenKey = styleCodeFound[1] as string
                    const tokenValue = styleCodeFound[2]
                    if (effectTokenMap[tokenKey] !== undefined) {
                        this.addEffectValue(styleMap, fileName, token, tokenKey, tokenValue);
                    } else if (blendModeTokenMap[tokenKey] !== undefined) {
                        this.addBlendMode(styleMap, fileName, token, tokenKey, tokenValue);
                    } else if (booleanTokenMap[tokenKey] !== undefined) {
                        this.addBooleanValue(styleMap, fileName, token, tokenKey, tokenValue);
                    } else if (colorTokenMap[tokenKey] !== undefined) {
                        this.addColorVariant(styleMap, fileName, token, tokenKey, tokenValue);
                    } else {
                        throwFullError(fileName, token);
                    }
                } else {
                    throwFullError(fileName, token);
                }
            } catch (e) {
                if (!lenientFilenames) {
                    throw e
                }
            }
        })

        if (layerOrder === undefined && !lenientFilenames) {
            throw Error(`The filename: '${fileName}' must begin with a number which indicates what order it should be inserted into the stack.`)
        }
        layerOrder = layerOrder || 0

        return {
            layerOrder,
            styleMap
        }
    }


    public addEffectValue = (styleMap: StyleAbleZMap, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
        if (isNaN(tokenValue as any)) {
            throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a value: '${tokenValue}' that can't be converted to a number.
                    It must be a number`)
        }
        styleMap[effectTokenMap[tokenKey]] =  Number.parseInt(tokenValue, 10)
    }

    public addBlendMode = (styleMap: StyleAbleZMap, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
        if (blendModeMap[tokenValue] !== undefined) {
            styleMap[blendModeTokenMap[tokenKey]] = blendModeMap[tokenValue]
        } else {
            throw Error(`The part of the filename: '${fileName}' containing the blend mode code: '${token}'
                    is followed by a value that isn't a code for a blend mode. '${tokenValue}' is not a blend mode. 
                    The allowed codes for the blend modes are: 
                    ${JSON.stringify(blendModeMap, null, 2)}`)
        }
    }

    public addBooleanValue = (styleMap: StyleAbleZMap, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
        if (tokenValue !== 'T' && tokenValue !== 'F' && tokenValue !== '0' && tokenValue !== '1') {
            throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a code that can't be converted to true of false.  It's '${tokenValue}'. 
                    It must be either 'T' or 'F'`)
        }

        styleMap[booleanTokenMap[tokenKey]] = (tokenValue === 'T' || tokenValue === '1')
    }

    public addColorVariant = (styleMap: StyleAbleZMap, fileName: string, token: string, tokenKey: string, tokenValue: string) => {
        if (tokenValue === 'A' || tokenValue === 'P' || tokenValue === 'S') {
            styleMap[colorTokenMap[tokenKey]] = colorVariantMap[tokenValue]
        } else {
            throw Error(`The part of the filename: '${fileName}' containing the code: '${token}'
                    is followed by a code that can't be converted to primary, secondary or accent.
                    It must be either 'A', 'P' or 'S'`)
        }
    }
}

/**
 * The keys in this object can be provided in a filename followed by a numeric value that will be used to set a
 * numeric value (1 - 100) for the corresponding style attribute on the layer image.
 */
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

/**
 * The keys in this object can will be embedded in a filename to set look up a blend mode in the
 * blendModeMap which will be set on the layer for that image.  The allowable values that follow
 * the characters are found in blendModeMap
 */
const blendModeTokenMap: {[key: string]: string} = {
    'BL': 'mixBlendMode',
    'BB': 'backgroundBlendMode',
}

/**
 * Filenames with these tokens in them will be used to set a value of T or F (true or false) for
 * the corresponding style attribute on the layer image.
 */
const booleanTokenMap: {[key: string]: string} = {
    'VI': 'visible',
    'MA': 'mask',
}

/**
 * The keys of this object can be included in a fielename to be used
 * to lookup a color from a palette
 * that corresponds to a primary, accent or secondary color.
 */
const colorTokenMap: {[key: string]: string} = {
    'CL': 'backgroundColor',
}

/**
 * These are the characters that can follow a CL token. The color value is looked up
 * in the palette
 */
const colorVariantMap: {[key: string]: string} = {
    'A': 'accent',
    'P': 'primary',
    'S': 'secondary',
}

/**
 * The keys in this map are valid blend modes that can follow a blend mode key
 *[Blend Modes]{@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation}
 */
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
    styleMap: StyleAbleZMap
}

function throwFullError(fileName: string, token: string) {
    let message = `If you don't need strict error checking, you can disable this message with the parameter: 'lenientFilenames' to most methods.\n\n`
    message += `The part of the filename: '${fileName}' containing ${token} didn't look like anything that matched codes for the default style names.\n\n`
    message += `Valid codes with numeric values following them are: ${JSON.stringify(effectTokenMap, null, 2)}\n\n`
    message += `Valid codes with T or F following them are: ${JSON.stringify(booleanTokenMap, null, 2)}\n\n`
    message += `Valid codes with palette color (A, P or S) following them are: ${JSON.stringify(colorTokenMap, null, 2)}\n\n`
    message += `Valid codes with a blend following them are: ${JSON.stringify(blendModeTokenMap, null, 2)}\n\n`
    message += `Valid blend modes are: ${JSON.stringify(blendModeMap, null, 2)}\n\n`
    message += `Consult the documentation to determine which combinations of letters and numbers are valid in the filename.`
    throw Error(message)
}


export default FilenameParser
