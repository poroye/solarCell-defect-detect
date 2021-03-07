import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

import { ComponentToPrint } from './ComponentToPrint';

const Example = ({ boxes, changeshows, imgs }) => {
    const componentRef = useRef();
    return (
        <div>
            <ReactToPrint
                trigger={() => <button>Print this out!</button>}
                content={() => componentRef.current}
            />
            <div>
            {/* <div style={{ display: "none" }} > */}
                <ComponentToPrint ref={componentRef} boxes={boxes} imgs={imgs}/>
            </div>
        </div>
    );
};

export default Example;