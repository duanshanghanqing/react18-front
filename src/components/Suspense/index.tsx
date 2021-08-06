import React, { Suspense, SuspenseList } from 'react';
import ErrorBoundary from './ErrorBoundary';

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


const reateResourceMap = {
    "1": createResource(fetchUser(1)),
    "2": createResource(fetchUser(2)),
    "3": createResource(fetchUser(3)),
}

function User(props: any) {
    const { id } = props
    let result: any = reateResourceMap[`${id}`].read();
    if (result.success) {
        let user = result.data;
        return <div>{user.id}-{user.name}</div>
    }
    return <div>失败了</div>;
}


/**
 * 其实就是3个Promise
 * revealOrder="together"：就是 Promise.all(); 都回来了在渲染
 * revealOrder="forwards": 从前往后
 * revealOrder="backwards": 从后向前
 * 
 * tail="hidden": 就是不显示 fallback
 * tail="collapsed": 加载谁显示谁
 */
export default class extends React.Component {
    render() {
        return (
            <ErrorBoundary fallback={<div>内部出错了</div>}>
                <SuspenseList revealOrder="backwards" tail="collapsed">
                    <Suspense fallback={<div>加载中...</div>}>
                        <User id={3} />
                    </Suspense>
                    <Suspense fallback={<div>加载中...</div>}>
                        <User id={2} />
                    </Suspense>
                    <Suspense fallback={<div>加载中...</div>}>
                        <User id={1} />
                    </Suspense>
                </SuspenseList>
            </ErrorBoundary>
        );
    }
}

