type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
/*
    https://unicode-table.com/en/#basic-latin

    Need to find better documentation to support others languages and in a better way

*/
const LANGUAGES = {
    "arabic" : /[\u0600-\u06FF]/,
    "persian" : /[\u0750-\u077F]/,
    "hebrew" : /[\u0590-\u05FF]/,
    "syriac" : /[\u0700-\u074F]/,
    "bengali" : /[\u0980-\u09FF]/,
    "ethiopic" : /[\u1200-\u137F]/,
    "greek" : /[\u0370-\u03FF]/,
    "coptic": /[\u0370-\u03FF]/,
    "georgian" : /[\u10A0-\u10FF]/,
    "thai" : /[\u0E00-\u0E7F]/,
    "latin" : /^[a-zA-Z]+$/
}

type LanguagesMap = typeof LANGUAGES;
type SupporedLanguages = keyof LanguagesMap;

function detectLanguage(languagesMap: LanguagesMap, script: string): SupporedLanguages[]  {
    const supportedLanguages = Object.keys(languagesMap) as SupporedLanguages[];

    return supportedLanguages
        .filter(language => languagesMap[language].test(script))
}

function isLanguage(languagesMap: LanguagesMap, script: string, language: SupporedLanguages) {
    return detectLanguage(languagesMap, script).includes(language)
}

export const is = isLanguage.bind(null, LANGUAGES) as OmitFirstArg<typeof isLanguage>;
export const detect = detectLanguage.bind(null, LANGUAGES) as OmitFirstArg<typeof detectLanguage>;

export default { is, detect }

