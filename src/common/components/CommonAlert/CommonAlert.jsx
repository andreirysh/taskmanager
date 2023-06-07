import React, { useMemo, useContext } from 'react';
import './CommonAlert.css';
import { AlertContext } from "../../context/alert/AlertContext";


export function CommonAlert() {
  const { alert } = useContext(AlertContext)

  const classes = useMemo(() => {
    return `alert alert-${alert?.variant}`;
  }, [alert]);

  if (!alert) {
    return null;
  }

  return (
    <div className="alert-container">
      <div className={classes} role="alert">
        {alert.text}
      </div>
    </div>
  );
}
