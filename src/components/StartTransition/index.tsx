// startTransition 是一个接收回调的函数,我们用它来告诉 react 需要推迟的 state
// 允许组件将速度慢的数据获取更新推迟到随后渲染,以便能够立即渲染更重要的更新

import React, { startTransition, useEffect, useState } from "react";

interface ISuggestionsProps {
    keyword: string;
}

type wordsType = Array<string>;

function getWords(keyword: string) {
    let words = new Array(10000).fill(0).map((_: number, index: number) => `${keyword}-${index}`);
    return Promise.resolve(words);
}


function Suggestions(props: ISuggestionsProps) {
    const { keyword } = props;
    const [words, setWords] = useState<wordsType>([]);
    useEffect(() => {
        getWords(keyword).then((words: wordsType | any) => {
            // 直接调用会很卡,之前的做法是 通过防抖实现,现在使用react内置低优操作
            // setWords(words);

            // 开启渐变更新, 本质就是偏优先级的更新
            startTransition(() => setWords(words));
        });
    }, [keyword]);
    return (
        <ul>
            {
                words.map((word: string) => <li key={word}>{word}</li>)
            }
        </ul>
    );
}


export default function () {
    const [keyword, setKeyword] = useState<string>('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }
    return (
        <div>
            <div>
                关键字: <input value={keyword} onChange={handleChange} />
            </div>
            <Suggestions keyword={keyword} />
        </div>
    );
}