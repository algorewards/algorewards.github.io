import React, { useState } from 'react';

export function FieldDiv(props) {
    const [field, setField] = useState(0);
    return (
        <div className="App-center App-section">
            <label className>
                { props.fieldName }
                <input value={(field >= 0) ? field : 0} onChange={e => setField(e.target.value)} min="0"/>
                ALGO        
            </label>
        </div>
    )
}