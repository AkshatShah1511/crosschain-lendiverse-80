
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-md">
        <p className="text-sm font-medium">{`${payload[0].payload.name}`}</p>
        <p className="text-sm text-lending-primary font-medium">{`${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};
