export default function AsyncAlert({ error, success }) {
  if (!error && !success) return null;
  return <div className={`alert ${error ? "alert-danger" : "alert-success"}`}>{error || success}</div>;
}
