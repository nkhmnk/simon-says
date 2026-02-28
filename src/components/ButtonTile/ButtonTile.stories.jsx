import ButtonTile from './ButtonTile';

export default {
  title: 'Components/ButtonTile',
  component: ButtonTile,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['green', 'red', 'yellow', 'blue'],
    },
    onClick: { action: 'clicked' },
  },
};

const Template = (args) => <ButtonTile {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'green',
  isActive: false,
  isDisabled: false,
};

export const Active = Template.bind({});
Active.args = {
  color: 'red',
  isActive: true,
  isDisabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  color: 'blue',
  isActive: false,
  isDisabled: true,
};