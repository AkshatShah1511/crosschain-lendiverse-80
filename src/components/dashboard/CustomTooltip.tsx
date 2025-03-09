
import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-3 rounded-md shadow-lg">
        <p className="text-sm font-medium mb-1">{`${payload[0].payload.name}`}</p>
        <p className="text-lg text-lending-primary font-bold">${`${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};
