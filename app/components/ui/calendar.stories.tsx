import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, CalendarProps } from "./calendar";
import { useArgs } from "storybook/internal/preview-api";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  argTypes: {
    mode: {
      control: {
        type: "select",
      },
      options: ["single", "multiple", "range"],
      table: {
        readonly: true,
      },
    },
  },
  args: {
    showOutsideDays: true,
  },
  render: (args) => {
    const [{ selected }, updateArgs] = useArgs<CalendarProps>();
    const onSelect = (date: typeof selected) => updateArgs({ selected: date });

    return <Calendar {...args} onSelect={onSelect} selected={selected} />;
  },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Single: Story = {
  argTypes: {
    selected: {
      control: {
        type: "date",
      },
    },
  },
  args: {
    mode: "single",
  },
};

export const Multiple: Story = {
  argTypes: {
    selected: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    mode: "multiple",
    selected: [],
  },
};

export const Range: Story = {
  argTypes: {
    selected: {
      control: {
        type: "object",
      },
    },
  },
  args: {
    mode: "range",
    selected: {
      from: undefined,
      to: undefined,
    },
  },
};
