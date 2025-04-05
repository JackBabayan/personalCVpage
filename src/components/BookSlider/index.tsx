"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./style.module.scss"; // Стиль слайдера

interface BookSliderProps {
  images: string[];
}

const BookSlider: React.FC<BookSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0); // Хранение текущего слайда
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({ paused: true });

      // Добавляем анимации для каждого слайда
      images.forEach((image, index) => {
        tl.fromTo(
          containerRef.current.children[index], 
          { rotationY: 180, opacity: 0 }, 
          { rotationY: 0, opacity: 1, duration: 1, ease: "power2.out" }
        );
      });

      tl.play(); // Запускаем анимацию при рендере
    }
  }, [images]);

  // Функции для переключения слайдов
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length); // Переход к следующему слайду
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length); // Переход к предыдущему слайду
  };

  return (
    <div className={styles.sliderWrapper} ref={containerRef}>
      {/* Оборачиваем слайды в контейнер, который будет анимироваться */}
      <div className={styles.pagesWrapper}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`${styles.page} ${index === currentSlide ? styles.active : ""}`}
          >
            <img src={image} alt={`slide-${index}`} className={styles.image} />
          </div>
        ))}
      </div>

      {/* Кнопки переключения слайдов */}
      <div className={styles.navigation}>
        <button onClick={goToPrevSlide} className={styles.navButton}>{"<"} </button>
        <button onClick={goToNextSlide} className={styles.navButton}>{">"}</button>
      </div>
    </div>
  );
};

export default BookSlider;
