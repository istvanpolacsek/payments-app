import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Input from './Input';
import { expect } from 'storybook/test';
import styles from './Input.module.scss';

const meta = {
  component: Input,
  title: 'UI/Components/Input',
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

const playTextInputStory: Story['play'] = async ({
  args,
  canvas,
  userEvent,
}) => {
  const input = canvas.getByRole('textbox');
  const label = canvas.getByText(String(args.label ?? ''));

  await expect(label.className).toContain(styles.label);
  await expect(input.className).toContain(styles.input);
  await expect(input).toHaveAttribute('name', String(args.name ?? ''));
  await expect(input).toHaveAttribute(
    'placeholder',
    String(args.placeholder ?? ''),
  );

  await userEvent.click(input);
  await userEvent.type(input, 'Test value');

  await expect(input).toHaveValue('Test value');
};

export const Default: Story = {
  args: {
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter Text',
  },
  play: playTextInputStory,
};

export const Required: Story = {
  args: {
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter Text',
    required: true,
  },
  play: async ({ args, canvas, userEvent }) => {
    await playTextInputStory({ args, canvas, userEvent } as Parameters<
      NonNullable<Story['play']>
    >[0]);

    const input = canvas.getByRole('textbox');

    await expect(input).toBeRequired();
    await expect(canvas.getByText('*')).toHaveClass(styles.required);
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    name: 'name',
    label: 'Input label',
    placeholder: 'Enter value',
    step: '0.01',
  },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('spinbutton');

    await expect(input.className).toContain(styles.input);
    await expect(input).toHaveAttribute('type', 'number');
    await expect(input).toHaveAttribute('step', '0.01');

    await userEvent.click(input);
    await userEvent.type(input, '12.34');

    await expect(input).toHaveValue(12.34);
  },
};
