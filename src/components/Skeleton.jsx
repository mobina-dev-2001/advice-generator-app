import "./Skeleton.css";

export default function Skeleton({ width = "15rem", height = "2rem" }) {
  return (
    <div
      className="rect skeleton-content"
      style={{ width: `${width}`, height: `${height}` }}
      aria-hidden="true"
    ></div>
  );
}
