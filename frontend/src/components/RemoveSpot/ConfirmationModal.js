
import "./ConfirmationModal.css";

const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="delete-confirmation">{title}</h2>
        <p>{message}</p>
        <div className="button-container">
          <button className="delete-button" onClick={onConfirm}>
            Yes (Delete Spot)
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
