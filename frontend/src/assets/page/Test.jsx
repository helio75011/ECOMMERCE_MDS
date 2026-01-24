import React from 'react';
import { useState, useEffect } from 'react';

const Test = () => {
  const [titre, setTitre] = useState("")

  useEffect(() => {
    setTitre("bonjour")
  }, []);

  return (
    <div>
      <h2>{titre}</h2>
    </div>
  );
};

export default Test;