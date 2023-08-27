import { useState } from 'react';
import Modal from 'react-modal';
function ModalExercise({exerciseModalIsOpen, closeExerciseModal, addExerciseToDB}) {
    let [name, setName] = useState("")
    let [time, setTime] = useState(0)
    let [calories, setCalories] = useState(0)  // state for calories

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };
    const addEx = () => {
        addExerciseToDB(name, time, calories)  // Added calories
        closeExerciseModal()
    }

    return ( 
        <Modal
        isOpen={exerciseModalIsOpen}
        onRequestClose={closeExerciseModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <h3>Exercise</h3>
                <form>
                    <label>
                        <p>Name: </p>
                        <input type="text" onChange={e => setName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Calories per minute: </p>
                        <input type="number" onChange={e => setCalories(e.target.value)}/>
                    </label>
                    <label>
                        <p>Time: </p>
                        <input type="number" onChange={e => setTime(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit" onClick={addEx}>Submit</button>
                    </div>
                </form>
        </Modal>
     );
}

export default ModalExercise;