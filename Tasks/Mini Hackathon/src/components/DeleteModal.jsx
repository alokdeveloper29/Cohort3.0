const DeleteModal = ({ confirmDelete, close }) => {
  return (
    <div className="deleteBox">
      <p className="cancelBtn" onClick={close}>
        Cancel
      </p>

      <p className="deleteBtn" onClick={confirmDelete}>
        Delete
      </p>
    </div>
  );
};

export default DeleteModal;