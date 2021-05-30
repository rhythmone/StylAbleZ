
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

const test = () => {

    const tokenCodes = Object.values(tokenMap).join(')_|_(').toUpperCase()
    const tokenCodeExp = `(d*)[_-][(${tokenCodes})]`
    console.log(tokenCodeExp)


    const z = 't01_n-shad1_br105_ma1_clS'
    const a = '02_n-shad2_op40_ma1_clS_blML'
    const b = '03_n-focus_op70_blML'
    const c = '04_n-eyeLiner_op50_ma1_clA'
    const d = '05_n-lash_ma1_clA'
    const e = '06_n-eye'

    const testNames = [z, a, b, c, d, e]
    console.log(testNames.join('\n').toUpperCase())

}

test()
