import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Button, { COLORS, VARIANTS } from './Button';
import { expect, fn } from 'storybook/test';
import styles from './Button.module.scss';

const meta = {
  component: Button,
  title: 'UI/Components/Button',
  args: { children: 'Button label' },
  argTypes: {
    variant: { control: 'radio', options: VARIANTS },
    color: { control: 'radio', options: COLORS },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const playButtonStory: Story['play'] = async ({ args, canvas, userEvent }) => {
  const button = canvas.getByRole('button', {
    name: String(args.children ?? ''),
  });
  const variant = args.variant ?? 'filled';
  const color = args.color ?? 'primary';

  await expect(button).toBeInTheDocument();
  await expect(button).toBeEnabled();
  await expect(button.className).toContain(styles.base);
  await expect(button.className).toContain(styles[`${variant}-${color}`]);

  await userEvent.click(button);
  await expect(args.onClick).toHaveBeenCalledTimes(1);
};

export const FilledPrimary: Story = {
  args: {
    children: 'Filled primary',
    color: 'primary',
    variant: 'filled',
    onClick: fn(),
  },
  play: playButtonStory,
};

export const FilledSecondary: Story = {
  args: {
    children: 'Filled secondary',
    color: 'secondary',
    variant: 'filled',
    onClick: fn(),
  },
  play: playButtonStory,
};

export const FilledDanger: Story = {
  args: {
    children: 'Filled danger',
    color: 'danger',
    variant: 'filled',
    onClick: fn(),
  },
  play: playButtonStory,
};

export const OutlinedPrimary: Story = {
  args: {
    children: 'Outlined primary',
    color: 'primary',
    variant: 'outlined',
    onClick: fn(),
  },
  play: playButtonStory,
};

export const GhostPrimary: Story = {
  args: {
    children: 'Ghost primary',
    color: 'primary',
    variant: 'ghost',
    onClick: fn(),
  },
  play: playButtonStory,
};

export const Disabled: Story = {
  args: {
    children: 'Disabled button',
    disabled: true,
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: String(args.children ?? ''),
    });

    await expect(button).toBeDisabled();
    await expect(button.className).toContain(styles.base);
    await expect(button.className).toContain(styles['filled-primary']);

    await userEvent.click(button);
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
