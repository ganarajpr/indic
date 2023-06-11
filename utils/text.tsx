import latinize from 'latinize';
import Sanscript from '@indic-transliteration/sanscript';


export const convertForDisplay = (text: string, from = 'hk', to = 'iast') => {
    return latinize(Sanscript.t(text, from, to));
}
