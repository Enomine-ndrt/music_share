// Ecualizador.js
import React, { useState, useEffect } from 'react';

const Ecualizador = ({ frecuencias, audioPlaying }) => {
  const [niveles, setNiveles] = useState(Array(frecuencias.length).fill(0));

  const handleSliderChange = (index, value) => {
    const newNiveles = [...niveles];
    newNiveles[index] = value;
    setNiveles(newNiveles);
  };

  // UseEffect para ajustar los niveles cuando cambia el estado de reproducción del audio
  useEffect(() => {
    // Puedes realizar ajustes específicos aquí, por ejemplo, cambiar el color de los sliders cuando el audio está reproduciéndose.
  }, [audioPlaying]);

  return (
    <div>
      <h2>Ecualizador</h2>
      {frecuencias.map((frecuencia, index) => (
        <div key={index}>
          <label>{`${frecuencia} Hz:`}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={niveles[index]}
            onChange={(e) => handleSliderChange(index, parseInt(e.target.value, 10))}
            disabled={audioPlaying} // Deshabilita los sliders cuando el audio está reproduciéndose
          />
          <span>{`${niveles[index]}%`}</span>
        </div>
      ))}
    </div>
  );
};

export default Ecualizador;
