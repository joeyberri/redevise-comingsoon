import Button from './Button';

export default {
  title: 'Xora/Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
    },
    onClick: { action: 'clicked' },
  },
};

export const Primary = {
  args: {
    children: 'Get Started',
    variant: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Learn More',
    variant: 'secondary',
  },
};

export const Ghost = {
  args: {
    children: 'Sign In',
    variant: 'ghost',
  },
};
