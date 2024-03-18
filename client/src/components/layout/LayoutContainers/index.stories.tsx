import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StickyHeader1, StickyHeader2 } from "./components/StickyHeader";
import LayoutWrapper from "./LayoutWrapper";
import { ILayoutWrapperProps } from "./types";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Layout/LayoutContainers",
  component: LayoutWrapper,
} as ComponentMeta<typeof LayoutWrapper>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LayoutWrapper> = (args) => {
  return <LayoutWrapper {...args} />;
};

export const Sample = Template.bind({});

const args: ILayoutWrapperProps = {
  config: {
    layout: (defaultConfig) => ({
      ...defaultConfig,
      baseHeader: {
        ...defaultConfig.baseHeader,
        visible: false,
      },
      fixedFooter1: {
        ...defaultConfig.fixedFooter1,
        visible: true,
      },
      fixedFooter2: {
        ...defaultConfig.fixedFooter2,
        visible: true,
      },
      sideMenuLeft: {
        ...defaultConfig.sideMenuLeft,
        visible: true,
      },
      sideMenuRight: {
        ...defaultConfig.sideMenuRight,
        visible: true,
      },
      header1: {
        ...defaultConfig.header1,
        visible: true,
      },
      stickyHeader1: {
        ...defaultConfig.stickyHeader1,
        visible: true,
      },
      // nestedContainer: {
      //   visible: false,
      // },
    }),
    FixedFooter2Component: () => (
      <div style={{ background: "green" }}>Fixed Footer 1</div>
    ),
    FixedFooter1Component: () => (
      <div style={{ background: "red" }}>Fixed Footer 1</div>
    ),
    SideMenuLeftComponent: () => (
      <div style={{ background: "yellow" }}>Side Menu Left</div>
    ),
    SideMenuRightComponent: () => (
      <div style={{ background: "yellow" }}>Side Menu Right</div>
    ),
    StickyHeader1Component: () => (
      <div style={{ background: "black" }}>Sticky Header 1</div>
    ),
    FixedHeader1Component: () => (
      <div style={{ background: "yellow" }}>Fixed Header 1</div>
    ),
  },
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Sample.args = args;
