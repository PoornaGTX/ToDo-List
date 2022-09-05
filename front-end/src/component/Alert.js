import React from "react";
import { useAppContext } from "../context/appContext";
import { useDispatch, useSelector } from "react-redux";

export const Alert = () => {
  // const { alertType, alertText } = useAppContext();

  const { alertType: uAlertType, alertText: uAlertText } = useSelector(
    (store) => store.user
  );

  const { alertType: todoAlertType, alertText: todoAlertText } = useSelector(
    (store) => store.todo
  );

  return (
    <div className={`alert alert-${uAlertType ? uAlertType : todoAlertType}`}>
      {uAlertText ? uAlertText : todoAlertText}
    </div>
  );
};

export default Alert;
