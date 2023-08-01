

const ConfirmationModal = ({ title, message, onConfirm, onCancel}) => {
  return (
    <div className='modal'>
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button className="delete-button" onClick={onConfirm}>Yes (Delete Spot)</button>
        <button className="cancel-button" onClick={onCancel}>No (Delete Spot)</button>
      </div>
    </div>
  )
}

export default ConfirmationModal
