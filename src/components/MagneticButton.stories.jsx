import MagneticButton from './MagneticButton';

export default {
  title: 'Xora/Components/MagneticButton',
  component: MagneticButton,
  tags: ['autodocs'],
  argTypes: {
    strength: { control: { type: 'range', min: 0, max: 1, step: 0.1 } },
    withBeam: { control: 'boolean' },
  },
};

export const Default = {
  args: {
    children: 'Hover Me',
    strength: 0.2,
    withBeam: true,
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '4rem', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const HighStrength = {
  args: {
    children: 'Extra Magnetic',
    strength: 0.5,
    withBeam: false,
    variant: 'secondary',
  },
};
