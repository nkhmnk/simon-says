import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SettingsContext } from '../../context/SettingsContext';
import './SettingsForm.css';

// Схема валідації Yup
const schema = yup.object().shape({
  playerName: yup
    .string()
    .required("Ім'я обов'язкове")
    .min(2, "Мінімум 2 символи")
    .max(15, "Максимум 15 символів"),
  elementsCount: yup
    .number()
    .typeError("Має бути числом")
    .min(4, "Мінімум 4 плитки")
    .max(8, "Максимум 8 плиток"),
  speed: yup
    .number()
    .required()
});

const SettingsForm = () => {
  const { settings, updateSettings } = useContext(SettingsContext);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings
  });

  const onSubmit = (data) => {
    updateSettings(data);
    alert("Налаштування збережено!");
  };

  return (
    <form className="settings-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label>Ім'я гравця:</label>
        <input {...register("playerName")} className={errors.playerName ? "error-input" : ""} />
        {errors.playerName && <span className="error-msg">{errors.playerName.message}</span>}
      </div>

      <div className="form-group">
        <label>Кількість елементів (4-8):</label>
        <input type="number" {...register("elementsCount")} />
        {errors.elementsCount && <span className="error-msg">{errors.elementsCount.message}</span>}
      </div>

      <div className="form-group">
        <label>Швидкість (мс):</label>
        <select {...register("speed")}>
          <option value={800}>Повільно (800мс)</option>
          <option value={600}>Середньо (600мс)</option>
          <option value={400}>Швидко (400мс)</option>
        </select>
      </div>

      <button type="submit" className="save-btn">Зберегти налаштування</button>
    </form>
  );
};

export default SettingsForm;