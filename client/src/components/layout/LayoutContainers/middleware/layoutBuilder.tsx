import React from "react";
import { ILayoutsType } from "../layoutMedia";
import { useLayoutConfig } from "../providers";
import { IPageLayoutProps } from "../types";

export default function layoutBuilder<T extends IPageLayoutProps>(
  Layout: React.FC<T>,
  name: ILayoutsType
) {
  const ComposedComponent = (props: T) => {
    const { layoutConfig } = useLayoutConfig();

    if (!layoutConfig[name].visible) {
      return <>{props.children}</>;
    }
    return <Layout {...props} />;
  };

  return ComposedComponent;
}
