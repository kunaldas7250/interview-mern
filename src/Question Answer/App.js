
import React, { useState } from 'react';
import Mock from '../Mock DATA/Mock';
import './App.css';

const App = () => {
  const [openIndex, setOpenIndex] = useState(null); 

  const iconStyle = {
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    fontSize: '24px',
    cursor: 'pointer',
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
    <div className='parent'>
      <h1 className='HEADING'>QUESION ANSWER TOGGLE PROJECT</h1>
      {Mock.map((item, index) => (
        <div className='child' key={item.id}>
          <div className='question' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>{item.question}</div>
            
          </div>
        <div className='answer1'>
                  <span
                        onClick={() => toggle(index)}
                      style={iconStyle}
                      className="material-symbols-outlined"
                    >
                      {openIndex === index ? 'close' : 'expand_more'}
                    </span>
                    {openIndex === index && (
                    <div  className='answer2'>
                      {item.answer}
                    </div>
                  )}
        </div>
          
        </div>
      ))}
    </div>
  );
};

export default App;
