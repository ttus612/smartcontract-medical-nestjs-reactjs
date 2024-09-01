import React, { useEffect, useRef } from "react";
import "./alert.css";
import { useSelector } from "react-redux";
import { use } from "chai";
import { myEventSelector } from "../../store/selectors";
import config from "../../config.json";

const Alert = () => {
  const alertRef = useRef(null);
  const overlayRef = useRef(null);
  const event = useSelector(myEventSelector);
  const isPending = useSelector((state) => state.medical.transaction.isPending);
  const isError = useSelector((state) => state.medical.transaction.isError);
  const chainId = useSelector((state) => state.provider.chainId);
  const removeHandler = async (e) => {
    alertRef.current.className = "alertBox--remove";
    overlayRef.current.className = "overlay--remove";
  };
  useEffect(() => {
    if (isPending) {
      alertRef.current.className = "alertBox";
      overlayRef.current.className = "overlay";
    }
  }, [isPending]);
  return (
    <div>
      {isPending ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Alert Pending...</h2>
          </div>
        </div>
      ) : isError ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Action will fail</h2>
          </div>
        </div>
      ) : !isPending && event[0] ? (
        <div className="alert" onClick={removeHandler}>
          <div className="overlay--remove" ref={overlayRef}></div>
          <div className="alertBox--remove" ref={alertRef}>
            <h2>Action Success full</h2>
            <div className="transactionHashOut">
              <a
                className="transactionHash"
                href={
                  config[chainId]
                    ? `${config[chainId].explorerURL}tx/${event[0].transactionHash}`
                    : `#`
                }
              >
                {event[0].transactionHash.slice(0, 6) +
                  "..." +
                  event[0].transactionHash.slice(60, 66)}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Alert;
