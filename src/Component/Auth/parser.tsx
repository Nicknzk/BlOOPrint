import React from 'react';

const Parser = () => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const sourceCode = e.target?.result;
        const extractedInfo = extractInfo(sourceCode as string);
        console.log('Extracted Info:', extractedInfo);
      };
      reader.onerror = (e) => {
        console.error('File reading error:', e.target?.error);
      };
      reader.readAsText(file);
    }
  };

  const extractInfo = (sourceCode: string) => {
    // Add your parsing logic here
    // This is just a sample implementation to extract class, variable, method, and attribute information
    const classes = sourceCode.match(/class\s+(\w+)/g) || [];
    const variables = sourceCode.match(/(?<=(var|let|const)\s+)(\w+)/g) || [];
    const methods = sourceCode.match(/(?<=(function)\s+)(\w+)/g) || [];
    const attributes = sourceCode.match(/(?<=this\.)(\w+)/g) || [];

    return {
      classes,
      variables,
      methods,
      attributes,
    };
  };

  return (
    <div>
      <input type="file"  onChange={handleFileChange} />
    </div>
  );
};

export default Parser;
