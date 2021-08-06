import React from 'react';

class Count extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    /*
        // react18 合并批更新
        let state = 0
        let updataQuery = []
        function setState(newState) {
            updataQuery.push(newState); // 加入队列
        }
        
        function handClick() {
            setState(state + 1) // updataQuery = [1]
            setState(state + 1) // updataQuery = [1, 1]
            setTimeout(() => {// 一个宏任务
                setState(state + 1) // updataQuery = [2]
                setState(state + 1) // updataQuery = [2, 2]
            });
        }
        handClick()
        state = updataQuery.pop();// 才给 state 赋值
        console.log(state); // 1，微任务异步更新，取最后一次更新
        setTimeout(() => {
            state = updataQuery.pop();// 才给 state 赋值
            console.log(state);// 2
        }, 2000);
    */
    handClick = () => {
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count);
        this.setState({
            count: this.state.count + 1
        });
        console.log(this.state.count);

        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            });
            console.log(this.state.count);
            this.setState({
                count: this.state.count + 1
            });
            console.log(this.state.count);
        }, 2000);
    }

    render() {
        const { count } = this.state;
        return (
            <div>
                <p>{count}</p>
                <button onClick={this.handClick}>+</button>
            </div>
        );
    }
}

export default Count;
