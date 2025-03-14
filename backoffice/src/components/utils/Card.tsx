import React from "react";

interface props {
  title: string;
  footer?: string;
  children?: any;
}
const Card: React.FC<props> = (props) => (
  <div className="card mb-4">
    <div className="card-header">
      <h3 className="card-title">{props.title}</h3>
    </div>
    <div className="card-body">{props.children}</div>
    {props.footer && <div className="card-footer">{props.footer}</div>}
  </div>
);

export default Card;
