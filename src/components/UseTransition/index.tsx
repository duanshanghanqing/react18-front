import React, { Suspense, useState, useTransition } from 'react';

function fetchUser(id: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ success: true, data: { id, name: '姓名' + id } });
            // reject({ success: true, error: '数据加载失败' }); // 触发 ErrorBoundary 组件
        }, 2000 * id);
    });
}

// React.lazy 
function createResource(promise: Promise<any>) {
    let status = 'pending';
    let result: any;
    return {
        read() {
            // console.log(status);
            if (status === 'success' || status === 'error') {
                return result;
            } else {
                // 抛出异常， Suspense 接收异常，拿到这个 promise，等待。等到promise成功后在进行渲染，在调用read方法，返回result
                throw promise.then((data: any) => {
                    status = 'success';
                    result = data;
                }, (error: any) => {
                    status = 'error';
                    result = error;
                });
            }
        }
    }
}


function User(props: any) {
    let result: any = props.resource.read();
    if (result.success) {
        let user = result.data;
        return <div>{user.id}-{user.name}</div>
    }
    return <div>失败了</div>;
}

let i: number = 1;
const initialResource = createResource(fetchUser(i));

// 目标减少 loding 状态
export default function () {
    const [resource, setResource] = useState(initialResource);
    const [isPending, startTransition] = useTransition();

    
    const next = () => {
        i = i + 1;
        // 每点以下显示 加载中, 在显示数据
        // setResource(createResource(fetchUser(i)))

        // 每点一下,直接显示数据
        startTransition(() => {
            setResource(createResource(fetchUser(i)))
        });

        // 举个例子: 不使用 startTransition: 像找工作时先离职,在找工作,中间有空闲状态(裸辞)
        //            使用 startTransition: 像找工作时不先离职,等找工作在离职,中间没有空闲状态(不裸辞)
    }

    return (
        <div>
            <Suspense fallback={<div>加载中......</div>}>
                <User resource={resource} />
            </Suspense>
            {/* 想显示 loding 就显示,不想显示不就不加,可选*/}
            { isPending ? <div>加载中....</div>: null }
            <button onClick={next}>下一个用户</button>
        </div>
    );
}

