import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from '../../store/slices/settingsSlice';
import SettingsForm from './SettingsForm';

const mockStore = configureStore({
  reducer: {
    settings: settingsReducer,
  },
});

export default {
  title: 'Components/SettingsForm',
  component: SettingsForm,
  decorators: [(Story) => <Provider store={mockStore}><Story /></Provider>],
};

export const Default = () => <SettingsForm />;
export const FastMode = () => <SettingsForm />;