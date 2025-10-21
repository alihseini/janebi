import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

interface RangeSliderProps {
  minRange: number;
  maxRange: number;
  step?: number;
  minGap?: number;
  onChange?: (minValue: number, maxValue: number) => void;
}

const TwoRangeSlider: React.FC<RangeSliderProps> = ({
  minRange,
  maxRange,
  step = 1,
  minGap = 1,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(minRange);
  const [maxValue, setMaxValue] = useState(maxRange);

  useEffect(() => {
    onChange?.(minValue, maxValue);
  }, [minValue, maxValue]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // کلَمپ کردن: minValue نباید از maxValue - minGap بیشتر باشه
    const clamped = Math.min(value, maxValue - minGap);
    setMinValue(clamped);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    // کلَمپ کردن: maxValue نباید از minValue + minGap کمتر باشه
    const clamped = Math.max(value, minValue + minGap);
    setMaxValue(clamped);
  };

  // درصدها برای نمایش خط آبی
  const minPercent = ((minValue - minRange) / (maxRange - minRange)) * 100;
  const maxPercent = ((maxValue - minRange) / (maxRange - minRange)) * 100;

  return (
    <>
      <p className={styles.title}>محدوده قیمت مورد نظر</p>
      <div className={styles.sliderWrapper}>
        {/* خط آبی بین دو مقدار */}
        <div
          className={styles.sliderRange}
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* دو ورودی مستقل */}
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={minValue}
          step={step}
          onChange={handleMinChange}
          className={`${styles.range} ${styles.rangeMin}`}
        />
        <input
          type="range"
          min={minRange}
          max={maxRange}
          value={maxValue}
          step={step}
          onChange={handleMaxChange}
          className={`${styles.range} ${styles.rangeMax}`}
        />
      </div>

      {/* ورودی عددی */}
      <div className={styles.inputsWrapper}>
        <div className={styles.inputGroup}>
          <label>تا</label>
          <input
            type="number"
            value={maxValue}
            min={minRange}
            max={maxRange}
            onChange={handleMaxChange}
            className={styles.numberInput}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>از</label>
          <input
            type="number"
            value={minValue}
            min={minRange}
            max={maxRange}
            onChange={handleMinChange}
            className={styles.numberInput}
          />
        </div>
      </div>
    </>
  );
};

export default TwoRangeSlider;
