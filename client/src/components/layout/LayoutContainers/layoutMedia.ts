import { Theme as STheme } from "@mui/system";
import { Theme } from "@mui/material";
import _ from "lodash";
import { Capacitor } from "@capacitor/core";

export interface IHeightMedia {
  md: string;
  sm: string;
  xs: string;
}

export interface IBaseHeaderMediaOptions {
  theme: Theme | STheme;
  options: (payload: IOptions) => React.CSSProperties;
}

export type ILayoutsType =
  | "baseHeader"
  | "sideMenuLeft"
  | "sideMenuRight"
  | "header1"
  | "header2"
  | "miniSideMenu"
  | "stickyHeader1"
  | "stickyHeader2"
  | "fixedFooter1"
  | "fixedFooter2"
  | "nestedContainer";

interface IBaseLayoutType {
  height?: {
    md?: number;
    sm?: number;
    xs?: number;
  };
  width?: {
    md?: number;
    sm?: number;
    xs?: number;
  };
  visible: boolean;
  paddingTop?: number;
  paddingBottom?: number;
}

export type ILayoutConfig = {
  [key in ILayoutsType]: IBaseLayoutType;
};

// & {
//   baseHeader: IBaseLayoutType & { paddingTop: number };
//   header1: IBaseLayoutType & { paddingTop: number };
//   header2: IBaseLayoutType & { paddingTop: number };
//   fixedFooter1: IBaseLayoutType & { paddingBottom: number };
//   fixedFooter2: IBaseLayoutType & { paddingBottom: number };
// };

type IBaseOption = {
  height?: number;
  width?: number;
  paddingTop?: number;
  paddingBottom?: number;
};

export type IOptions = {
  [key in ILayoutsType]: IBaseOption;
};
// & {
//   baseHeader: IBaseOption & { paddingTop: number };
//   header1: IBaseOption & { paddingTop: number };
//   header2: IBaseOption & { paddingTop: number };
//   fixedFooter1: IBaseOption & { paddingBottom: number };
//   fixedFooter2: IBaseOption & { paddingBottom: number };
// };

export const generateMedia = (
  { theme, options }: IBaseHeaderMediaOptions,
  _layoutConfig: ILayoutConfig
) => {
  const layoutConfig = { ..._layoutConfig };
  const heightsKeys = Object.keys(layoutConfig);

  return {
    ...options(
      heightsKeys.reduce((prev, curr, _index, arr) => {
        const visible = _.get(layoutConfig, `${curr}.visible`);
        _.set(prev, curr, {
          height: visible ? _.get(layoutConfig, `${curr}.height.md`) : 0,
          width: visible ? _.get(layoutConfig, `${curr}.width.md`) : 0,
          paddingTop: _.get(layoutConfig, `${curr}.paddingTop`),
          paddingBottom: _.get(layoutConfig, `${curr}.paddingBottom`),
        });
        return prev;
      }, {}) as IOptions
    ),
    [theme.breakpoints.only("sm")]: {
      ...options(
        heightsKeys.reduce((prev, curr, _index, arr) => {
          const visible = _.get(layoutConfig, `${curr}.visible`);

          _.set(prev, curr, {
            height: visible ? _.get(layoutConfig, `${curr}.height.sm`) : 0,
            width: visible ? _.get(layoutConfig, `${curr}.width.sm`) : 0,

            paddingTop: _.get(layoutConfig, `${curr}.paddingTop`),
            paddingBottom: _.get(layoutConfig, `${curr}.paddingBottom`),
          });
          return prev;
        }, {}) as IOptions
      ),
    },
    [theme.breakpoints.only("xs")]: {
      ...options(
        heightsKeys.reduce((prev, curr, _index, arr) => {
          const visible = _.get(layoutConfig, `${curr}.visible`);

          _.set(prev, curr, {
            height: visible ? _.get(layoutConfig, `${curr}.height.xs`) : 0,
            width: visible ? _.get(layoutConfig, `${curr}.width.xs`) : 0,

            paddingTop: _.get(layoutConfig, `${curr}.paddingTop`),
            paddingBottom: _.get(layoutConfig, `${curr}.paddingBottom`),
          });
          return prev;
        }, {}) as IOptions
      ),
    },
  };
};

export const LAYOUT_CONFIG: ILayoutConfig = {
  baseHeader: {
    height: {
      md: 80,
      sm: 70,
      xs: 55,
    },
    visible: true,
  },
  sideMenuLeft: {
    width: {
      md: 240,
      sm: 200,
      xs: 200,
    },
    visible: false,
  },
  sideMenuRight: {
    width: {
      md: 280,
      sm: 100,
      xs: 100,
    },
    visible: false,
  },
  header1: {
    height: {
      md: 70,
      sm: 60,
      xs: 56,
    },
    visible: false,
  },
  header2: {
    height: {
      md: 70,
      sm: 60,
      xs: 56,
    },
    visible: false,
  },
  miniSideMenu: {
    width: {
      md: 76,
      sm: 70,
      xs: 70,
    },
    visible: true,
  },
  stickyHeader1: {
    height: {
      md: 70,
      sm: 60,
      xs: 56,
    },
    visible: false,
  },
  stickyHeader2: {
    height: {
      md: 70,
      sm: 60,
      xs: 56,
    },
    visible: false,
  },
  fixedFooter1: {
    height: {
      md: 50,
      sm: 50,
      xs: 50,
    },
    visible: false,
  },
  fixedFooter2: {
    height: {
      md: 50,
      sm: 50,
      xs: 50,
    },
    visible: false,
  },
  nestedContainer: {
    visible:
      Capacitor.getPlatform() === "ios" ||
      Capacitor.getPlatform() === "android",
  },
};
