// 组件内部报错，提供捕获，使用react错误边界原理
// https://react.docschina.org/blog/2017/07/26/error-handling-in-react-16.html
/**
 * 内部报错，显示错误页面
 */
import React from 'react';

interface Istate {
  hasError: boolean;
  error: any;
}

interface Iprops {
  fallback: React.ReactNode;
}

class ErrorBoundary extends React.Component<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  // 从错误中映射对象
  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染可以显降级 UI
    return {
      hasError: true,
      error
    };
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
