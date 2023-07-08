import React, { useState } from 'react';
import { Button, Typography, Tooltip } from '@mui/material';
import { HelpOutline } from '@mui/icons-material';

interface QuestionMarkProps {
  instructions: string;
}

const QuestionMark: React.FC<QuestionMarkProps> = ({ instructions }) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const handleMouseEnter = () => {
    setShowInstructions(true);
  };

  const handleMouseLeave = () => {
    setShowInstructions(false);
  };

  return (
    <div>
      <Tooltip title={instructions} open={showInstructions} arrow>
        <Button
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          startIcon={<HelpOutline />}
        />
      </Tooltip>
    </div>
  );
};

export default QuestionMark;
