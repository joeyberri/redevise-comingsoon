import { useState } from 'react';
import InquiryModal from './InquiryModal';
import Button from './Button';

export default {
  title: 'Xora/Components/InquiryModal',
  component: InquiryModal,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

const Template = (args) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center">
      <Button onClick={() => setIsOpen(true)}>Open Inquiry Modal</Button>
      <InquiryModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  initialType: '',
};

export const PreselectedInterest = Template.bind({});
PreselectedInterest.args = {
  initialType: 'Build a new product or platform',
};
