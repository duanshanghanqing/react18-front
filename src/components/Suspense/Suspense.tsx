// 手写Suspense的实现
import React from 'react';

interface ISuspenseProps {
    fallback: React.ReactNode;
}

interface ISuspenseState {
    loading: boolean;
}

class Suspense extends React.Component<ISuspenseProps, ISuspenseState> {
    state = { loading: false }
    // 内部捕获错误
    componentDidCatch(error: any) {
        if (typeof error.then === 'function') {
            this.setState({ loading: true });
            error.the(() => {
                this.setState({ loading: false });
            });
        }
    }
    render() {
        const { loading } = this.state;
        return loading ? this.props.fallback : this.props.children;
    }
}

export default Suspense;