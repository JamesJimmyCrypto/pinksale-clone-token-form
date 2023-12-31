const InputNote = ({ note, styles }) => (
  <div className={`-mt-3 ${styles} flex-1`}>
    <span className="text-blue-500 text-sm">{note}</span>
  </div>
);

export default InputNote;
