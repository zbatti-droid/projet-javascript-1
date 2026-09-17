import type { ComponentType, SelectHTMLAttributes } from "react";

const WithSelectInputWrapper = <P extends SelectHTMLAttributes<HTMLSelectElement>>(
  Component: ComponentType<P>,
) => {
  return function SelectInputWrapper(props: P) {
    return <Component {...props} />;
  };
};

export default WithSelectInputWrapper;
