import React from 'react';

import type { ThemeProps } from '../types/theme';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
  theme: ThemeProps;
}

export const DetailRow: React.FC<DetailRowProps> = ({ label, value, theme }) => (
  <div className="detail-row">
    <span 
      className="detail-row-label"
      style={{
        color: theme.colors?.textColor || '#666666',
      }}
    >
      {label}
    </span>
    <div 
      className="detail-row-value"
      style={{
        color: theme.colors?.textColor || '#333333',
      }}
    >
      {value}
    </div>
  </div>
); 