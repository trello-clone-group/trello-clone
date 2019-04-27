import React from 'react';
import './Icons.css';

export function TitleIcon() {
  return (
    <div className="icon title-icon">
      <div className="screen"></div>
      <div className="bottom">
        <div className="seg"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
}

export function DescrIcon() {
  return (
    <div className="icon descr-icon">
      <div className="long line"></div>
      <div className="long line"></div>
      <div className="long line"></div>
      <div className="short line"></div>
    </div>
  );
}

export function PersonIcon() {
  return (
    <div className="icon person-icon">
      <div className="head"></div>
      <div className="body"></div>
    </div>
  );
}

export function CancelIcon(){
  return (
    <div className="icon cancel-icon">
      <div className="one long line"></div>
      <div className="two long line"></div>
    </div>
  );
}

export function SettingsIcon(){
  return (
    <div className="icon settings-icon">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}