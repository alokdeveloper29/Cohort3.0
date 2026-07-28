const EditModal = ({ editInput, setEditInput, saveEdit }) => {
  return (
    <div className="editBox">
      <input
        type="text"
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
      />

      <button onClick={saveEdit}>
        Done
      </button>
    </div>
  );
};

export default EditModal;