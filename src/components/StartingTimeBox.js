import {useState, useEffect} from "react";
import {HiPencil, HiXCircle, HiCheckCircle} from "react-icons/hi";

function StartingTimeBox(props) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [editedStartingTime, setEditedStartingTime] = useState(props.startingTime);

    const handleEditStartingTime = (e) => {
        setEditedStartingTime(e.target.value);
    }

    const handleSubmit = () => {
        setIsDisabled(true);
        props.handleSubmitTime(editedStartingTime);
    }

    const handleButtonClick = () => {
        if (props.changesForbidden) {
            return;
        }
        setIsDisabled(prevState => !prevState);
    }

    useEffect(() => {
        if (props.changesForbidden) {
            setIsDisabled(true);
            setEditedStartingTime(props.startingTime);
        }
    }, [props.changesForbidden])

    return (
        <>
            {isDisabled || props.changesForbidden ? 
                <p>{props.startingTime}</p> :
                <>
                <input className="seconds-allowed__input" type="text" value={editedStartingTime} onChange={handleEditStartingTime} onSubmit={handleSubmit}/>
                <button className="seconds-allowed__button button--submit" onClick={handleSubmit}><HiCheckCircle /></button>
                </>
            }
            <button className="seconds-allowed__button button--edit" onClick={handleButtonClick}>
                {isDisabled ?
                    <HiPencil /> :
                    <HiXCircle />
                }
            </button>
        </>
    )
}

export default StartingTimeBox;