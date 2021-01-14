const SetLengths = (props) => {
  return (
    <div className="row">
      <div className="row-block">
        <h2 id="break-label">Break Length</h2>
        <div className="row">
          <button
            id="break-decrement"
            value="decrease"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Down
          </button>
          <p id="break-length" className="length-setted">
            {props.breakLength}
          </p>
          <button
            id="break-increment"
            value="increase"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Up
          </button>
        </div>
      </div>
      <div className="row-block">
        <h2 id="session-label">Session Length</h2>
        <div className="row">
          <button
            id="session-decrement"
            value="decrease"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Down
          </button>
          <p id="session-length" className="length-setted">
            {props.sessionLength}
          </p>
          <button
            id="session-increment"
            value="increase"
            onClick={props.handleSetLength}
            className="set-length-btn"
          >
            Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLengths;
