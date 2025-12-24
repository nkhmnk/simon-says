import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux'; // Хуки Redux
import { updateSettings } from '../../store/slices/settingsSlice'; // Екшн
import styles from './SettingsForm.module.css';

const schema = yup.object().shape({
  playerName: yup.string().required("Ім'я обов'язкове").min(2, "Мінімум 2 символи"),
  elementsCount: yup.number().min(4).max(8),
  speed: yup.number().required()
});

const SettingsForm = () => {
  const dispatch = useDispatch();
  // Отримуємо поточні налаштування з Redux
  const settings = useSelector((state) => state.settings);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: settings // Встановлюємо значення з Redux за замовчуванням
  });

  const onSubmit = (data) => {
    // Викликаємо dispatch замість контексту
    dispatch(updateSettings(data));
    alert("Налаштування збережено в Redux!");
  };

  return (
    <form className={styles.settingsForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formGroup}>
        <label>Ім'я гравця</label>
        <input {...register("playerName")} className={errors.playerName ? styles.errorInput : ""} />
        {errors.playerName && <span className={styles.errorMsg}>{errors.playerName.message}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Кількість плиток</label>
        <input type="number" {...register("elementsCount")} />
      </div>

      <div className={styles.formGroup}>
        <label>Швидкість</label>
        <select {...register("speed")}>
          <option value={800}>Повільно</option>
          <option value={600}>Середньо</option>
          <option value={400}>Швидко</option>
        </select>
      </div>

      <button type="submit" className={styles.saveBtn}>Зберегти в Store</button>
    </form>
  );
};

export default SettingsForm;