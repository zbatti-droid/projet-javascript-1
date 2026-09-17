import type { ComponentType, InputHTMLAttributes } from "react";

const WithNumberInputWrapper = <P extends InputHTMLAttributes<HTMLInputElement>>(
  Component: ComponentType<P>,
) => {
  return function NumberInputWrapper(props: P) {
    return <Component {...props} />;
  };
};

export default WithNumberInputWrapper;
