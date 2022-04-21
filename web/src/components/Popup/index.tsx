import { Dispatch, SetStateAction } from "react";

import './style.css';

type PopupProps = {
    trigger: boolean;
    setTrigger: Dispatch<SetStateAction<boolean>>;
    children: React.ReactChild;
}

const Popup: React.FC<PopupProps> = (props) => {
    return props.trigger ? (

        <div className="popup">
            <div className="overlay" onClick={() => props.setTrigger(false)} ></div>
            <div className="popup-content-container">
                {props.children}
            </div>
        </div>

    ) : null
}

export default Popup;