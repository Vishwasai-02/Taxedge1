import React from "react";
import { ServiceCard, type ServiceCardProps } from "../../../../shared/components/ServiceCard/ServiceCard";

export const GSTCard: React.FC<ServiceCardProps> = (props) => {
  return <ServiceCard {...props} />;
};

export default GSTCard;
