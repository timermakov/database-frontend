import React, { useState, useEffect } from 'react';
import './Table.css';
import plusLogo from "../icons/bx-plus-circle.svg";
import minusLogo from "../icons/bx-minus-circle.svg";


const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <button onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

const FormAdd = () => {
    const [heroName, setHeroName] = useState('');
    const [healthId, setHealthId] = useState();
    const [damageId, setDamageId] = useState();
    const [raceId, setRaceId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            heroName: heroName,
            healthId: healthId,
            damageId: damageId,
            raceId: raceId,
        };

        fetch('http://localhost:8080/hero/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                alert("Успех");
                console.log('Success:', data);
            })
            .catch((error) => {
                alert('Error: ' + error);
                console.error('Error:', error);
            });    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="heroName">heroName</label>
                <input className="form-control" id="heroName" value={heroName}
                       onChange={e => setHeroName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="healthId">healthId</label>
                <input type="number" className="form-control" id="healthId" value={healthId}
                       onChange={e => setHealthId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="damageId">damageId</label>
                <input type="number" className="form-control" id="damageId" value={damageId}
                       onChange={e => setDamageId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="raceId">raceId</label>
                <input type="number" className="form-control" id="raceId" value={raceId}
                       onChange={e => setRaceId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function HeroTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/hero/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.heroResponses);
                console.log(data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const [isModalOpenFormAdd, setIsModalOpenFormAdd] = useState(false);

    const openModalFormAdd = () => {
        setIsModalOpenFormAdd(true);
        setIsModalOpenFormRemove(false);
    };

    const closeModalFormAdd = () => {
        setIsModalOpenFormAdd(false);
    };

    const [isModalOpenFormRemove, setIsModalOpenFormRemove] = useState(false);

    const openModalFormRemove = () => {
        setIsModalOpenFormRemove(true);
        setIsModalOpenFormAdd(false)
    };

    const closeModalFormRemove = () => {
        setIsModalOpenFormRemove(false);
    };

    return (
        <div className={"content-div"}>
            <div className="left-div">
            <p className="Table-header">Heroes</p>
                <tbody>
                <tr>
                    <th>HeroId</th>
                    <th>HeroName</th>
                    <th>HealthId</th>
                    <th>DamageId</th>
                    <th>RaceId</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.heroName}</td>
                        <td>{item.healthId}</td>
                        <td>{item.damageId}</td>
                        <td>{item.raceId}</td>
                    </tr>
                ))}
                </tbody>
            </div>
            <div className={"right-div"}>
                <button onClick={openModalFormAdd}><img src={plusLogo} alt="add entity"/></button>
                <button onClick={openModalFormRemove}><img src={minusLogo} alt="add entity"/></button>
                <Modal isOpen={isModalOpenFormAdd} onClose={closeModalFormAdd}>
                    <FormAdd/>
                </Modal>
                <Modal isOpen={isModalOpenFormRemove} onClose={closeModalFormRemove}>
                    <FormRemove/>
                </Modal>
            </div>
        </div>
    );

}

const FormRemove = () => {
    const [heroId, setHeroId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            heroId: heroId
        };

        fetch('http://localhost:8080/hero/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.exceptionMessage)
                    alert(data.exceptionMessage)
                else{
                    alert("Успех");
                    console.log('Success:', data);
                }
            })
            .catch((error) => {
                alert('Error: ' + error);
                console.error('Error:', error);
            });    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="heroId">heroId</label>
                <input type={"number"} className="form-control" id="heroId" value={heroId} onChange={e => setHeroId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};
