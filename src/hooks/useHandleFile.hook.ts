import React from "react";

const useHandleFile = () => {
  const [file, setFile] = React.useState<File | null>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let file = e.target.files[0];
      setFile(file);
    }
  };
  const handleClearFile = () => {
    setFile(null);
  };
  return {
    file,
    handleFile,
    handleClearFile,
  };
};

export default useHandleFile;
