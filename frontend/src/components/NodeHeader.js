export const NodeHeader = ({ title, description, accent }) => (
  <div className="node-header" style={{ '--node-accent': accent }}>
    <div className="node-header__icon">{title.slice(0, 1)}</div>
    <div>
      <div className="node-header__title">{title}</div>
      {description && <div className="node-header__description">{description}</div>}
    </div>
  </div>
);
