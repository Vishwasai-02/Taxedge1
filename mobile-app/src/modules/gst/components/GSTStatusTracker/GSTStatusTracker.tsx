import React from "react";
import { StatusTimeline, type StatusTimelineProps } from "../../../../shared/components/ProgressStepper/StatusTimeline";

export const GSTStatusTracker: React.FC<StatusTimelineProps> = (props) => {
  return <StatusTimeline {...props} />;
};

export default GSTStatusTracker;
