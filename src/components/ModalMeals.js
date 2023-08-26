import { useState } from 'react';
import Modal from 'react-modal';
function ModalMeals({mealModalIsOpen, closeMealModal, addMealToDB}) {
    let [name, setName] = useState("")
    let [amount, setAmount] = useState(0)
    let [calories, setCalories] = useState(0)
    
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
    const addMeal = () => {
        addMealToDB(name, amount, calories)
        closeMealModal()
    }
    return ( 
        <Modal
        isOpen={mealModalIsOpen}
        onRequestClose={closeMealModal}
        style={customStyles}
        contentLabel="Example Modal"
        >
            <h3>Meal</h3>
                <form>
                    <label>
                        <p>Name: </p>
                        <input type="text" onChange={e => setName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Amount: </p>
                        <input type="number" onChange={e => setAmount(e.target.value)}/>
                    </label>
                    <label>
                        <p>Calories: </p>
                        <input type="number" onChange={e => setCalories(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit" onClick={addMeal}>Submit</button>
                    </div>
                </form>
        </Modal>
     );
}

export default ModalMeals;