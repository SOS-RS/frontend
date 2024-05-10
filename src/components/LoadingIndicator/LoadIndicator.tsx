import './styles.css';

export function LoadingIndicator() {
  return (
    <div className="lds-ellipsis *:bg-red-600">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
