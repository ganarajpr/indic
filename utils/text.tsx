import latinize from 'latinize';
import Sanscript from '@indic-transliteration/sanscript';

export const convertForDisplay = (text: string, from = 'hk', to = 'iast') => {
    return latinize(Sanscript.t(text, from, to));
}

export type Context = {
    L1?: number;
    L2?: number;
    L3?: number;
    L4?: number;
    L5?: number;
}

export const convertToBookContext = (context: Context) => {
    const keys = Object.keys(context);
    let i: number =0;
    const ctx:number[] = [];
    while(i< keys.length) {
        ctx.push(context[`L${i+1}`]);
        i++;
    }
    return ctx.join('.');
};


export const convertToQueryFormat = (context: Context, root: String) => {
    const keys = Object.keys(context);
    const query = keys.reduce((prev, cur) => {
        prev[`${root}.${cur}`] = context[cur];
        return prev;
    }, {});
    return query;
};

export const extractBookContext = (bookContext:String): Context => {
    const context = bookContext.split('.');
    const levels: Context = context.reduce((prev,cur,index) => {
        prev[`L${index+1}`] = +cur;
        return prev;
    },{});
    return levels;    
};

const contextify = (a:string[]) => {
    const pows = [12, 10, 7, 4, 0];
    return a.reduce((prev,cur,index) => {
        const i = pows.length - a.length + index;
        prev = prev + ( (+cur) * Math.pow(10,pows[i]) );
        return prev;
    },0);
};

export const extractSequence = (bookContext:string) => {
    const context = bookContext.split('.');
    return contextify(context);
};
