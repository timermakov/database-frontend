import React, { useState, useEffect } from 'react';
import './Table.css';
import plusLogo from "../icons/bx-plus-circle.svg";
import minusLogo from "../icons/bx-minus-circle.svg"

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
    const [name, setName] = useState();
    const [health_id, setHealth_id] = useState();
    const [damage_id, setDamage_id] = useState();
    const [vespene_gas, setVespene_gas] = useState();
    const [minerals, setMinerals] = useState();
    const [supply, setSupply] = useState();
    const [race_id, setRace_id] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            health_id: health_id,
            damage_id: damage_id,
            vespene_gas: vespene_gas,
            minerals: minerals,
            supply: supply,
            race_id: race_id
        };

        fetch('http://localhost:8080/building/add', {
            method: 'POST',
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
                <label htmlFor="name">Name</label>
                <input className="form-control" id="name" value={name}
                       onChange={e => setName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="health_id">Health Id</label>
                <input type="number" className="form-control" id="health_id" value={health_id}
                       onChange={e => setHealth_id(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="damage_id">Damage Id</label>
                <input type="number" className="form-control" id="damage_id" value={damage_id}
                       onChange={e => setDamage_id(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="vespene_gas">Vespene Gas</label>
                <input type="number" className="form-control" id="vespene_gas" value={vespene_gas}
                       onChange={e => setVespene_gas(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="minerals">Minerals</label>
                <input type="number" className="form-control" id="minerals" value={minerals}
                       onChange={e => setMinerals(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="supply">Supply</label>
                <input type="number" className="form-control" id="supply" value={supply}
                       onChange={e => setSupply(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="race_id">Race Id</label>
                <input type="number" className="form-control" id="race_id" value={race_id}
                       onChange={e => setRace_id(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default function BuildingTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/building/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.buildingResponses);
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
        setIsModalOpenFormAdd(false);
    };

    const closeModalFormRemove = () => {
        setIsModalOpenFormRemove(false);
    };


    return (
        <div className={"content-div"}>
            <div className="left-div">
            <p className="Table-header">Buildings</p>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Health Id</th>
                <th>Damage Id</th>
                <th>Vespene Gas</th>
                <th>Minerals</th>
                <th>Supply</th>
                <th>Race Id</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.health_id}</td>
                    <td>{item.damage_id}</td>
                    <td>{item.vespene_gas}</td>
                    <td>{item.minerals}</td>
                    <td>{item.supply}</td>
                    <td>{item.race_id}</td>
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
    const [id, setId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            id: id
        };

        fetch('http://localhost:8080/building/remove', {
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
                <label htmlFor="id">Id</label>
                <input type={"number"} className="form-control" id="id" value={id}
                       onChange={e => setId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};
