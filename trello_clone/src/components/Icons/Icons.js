import React from 'react';
import './Icons.css';

export function TitleIcon() {
  return (
    <div className="modal__icon modal__title-icon">
      <div className="modal__screen"></div>
      <div className="modal__bottom">
        <div className="modal__seg"></div>
        <div className="modal__dot"></div>
      </div>
    </div>
  );
}

export function DescrIcon() {
  return (
    <div className="modal__icon modal__descr-icon">
      <div className="modal__long modal__line"></div>
      <div className="modal__long modal__line"></div>
      <div className="modal__long modal__line"></div>
      <div className="modal__short modal__line"></div>
    </div>
  );
}

export function PersonIcon() {
  return (
    <div className="modal__icon modal__person-icon">
      <div className="modal__head"></div>
      <div className="modal__body"></div>
    </div>
  );
}