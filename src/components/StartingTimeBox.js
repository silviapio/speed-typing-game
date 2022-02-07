import {useState, useEffect, useRef} from "react";
import {HiPencil, HiX, HiOutlineCheck} from "react-icons/hi";

function StartingTimeBox(props) {
    const [isInactive, setIsInactive] = useState(true);
    const [editedStartingTime, setEditedStartingTime] = useState(props.startingTime);
    const inputRef = useRef(null);

    const handleEditStartingTime = (e) => {
        setEditedStartingTime(e.target.value);
    }

    const isSubmittedTimeOk = () => {
        const time = parseFloat(editedStartingTime);
        return ((time % 1 === 0) && (time > 0));
    }

    const handleWrongInput = async () => {
        const input = inputRef.current;
        input.classList.add("seconds-allowed__input--wrong");
        setTimeout(() => {
            input.classList.remove("seconds-allowed__input--wrong");
            setEditedStartingTime(props.startingTime);
            }, 700);
    }

    const handleSubmit = () => {
        if (!isSubmittedTimeOk()) {
            handleWrongInput();
            return;
        }
        setIsInactive(true);        
        props.handleSubmitTime(editedStartingTime);
    }

    const handleButtonClick = () => {
        if (props.changesForbidden) {
            return;
        }
        setIsInactive(prevState => !prevState);
        //setIsInactive(false);
    }

    useEffect(() => {
        if (props.changesForbidden) {
            setIsInactive(true);
            setEditedStartingTime(props.startingTime);
        }
    }, [props.changesForbidden])

    return (
        <>
            {isInactive || props.changesForbidden ? 
                <p>{props.startingTime}</p> :
                <>
                <input 
                    className="seconds-allowed__input" 
                    type="number" 
                    autoFocus
                    ref={inputRef}
                    value={editedStartingTime} 
                    onChange={handleEditStartingTime} 
                    onSubmit={handleSubmit}
                />
                <button className="seconds-allowed__button button--submit" onClick={handleSubmit}><HiOutlineCheck /></button>
                </>
            }
            <button 
                className="seconds-allowed__button button--edit" 
                disabled={props.changesForbidden ? true : ""}
                onClick={handleButtonClick}
            >
                {isInactive ?
                    <HiPencil /> :
                    <HiX />
                }
            </button>
        </>
    )
}

export default StartingTimeBox;