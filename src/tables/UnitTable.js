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
    const [unitName, setUnitName] = useState('');
    const [onGround, setOnGround] = useState();
    const [healthId, setHealthId] = useState();
    const [damageId, setDamageId] = useState();
    const [buildingId, setBuildingId] = useState();
    const [vespeneGas, setVespeneGas] = useState();
    const [minerals, setMinerals] = useState();
    const [supply, setSupply] = useState();
    const [raceId, setRaceId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            unitName: unitName,
            onGround: onGround,
            healthId: healthId,
            damageId: damageId,
            buildingId: buildingId,
            vespeneGas: vespeneGas,
            minerals: minerals,
            supply: supply,
            raceId: raceId
        };

        fetch('http://localhost:8080/unit/add', {
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
                <label htmlFor="unitName">unitName</label>
                <input className="form-control" id="unitName" value={unitName}
                       onChange={e => setUnitName(e.target.value)}/>
            </div>
            <div className="form-group">
                <label htmlFor="onGround">onGround</label>
                <input type="checkbox" className="form-control" id="onGround" value={onGround}
                       onChange={e => setOnGround(Boolean(e.target.value))}/>
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
                <label htmlFor="buildingId">buildingId</label>
                <input type="number" className="form-control" id="buildingId" value={buildingId}
                       onChange={e => setBuildingId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="vespeneGas">vespeneGas</label>
                <input type="number" className="form-control" id="vespeneGas" value={vespeneGas}
                       onChange={e => setVespeneGas(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="minerals">minerals</label>
                <input type="number" className="form-control" id="minerals" value={minerals}
                       onChange={e => setMinerals(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="supply">supply</label>
                <input type="number" className="form-control" id="supply" value={supply}
                       onChange={e => setSupply(Number(e.target.value))}/>
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

export default function UnitTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/unit/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.unitResponses);
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
            <p className="Table-header">Units</p>
            <tbody>
            <tr>
                <th>UnitId</th>
                <th>UnitName</th>
                <th>OnGround</th>
                <th>HealthId</th>
                <th>DamageId</th>
                <th>BuildingId</th>
                <th>VespeneGas</th>
                <th>Minerals</th>
                <th>Supply</th>
                <th>RaceId</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.unitName}</td>
                    <td>{item.onGround}</td>
                    <td>{item.healthId}</td>
                    <td>{item.damageId}</td>
                    <td>{item.buildingId}</td>
                    <td>{item.vespeneGas}</td>
                    <td>{item.minerals}</td>
                    <td>{item.supply}</td>
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
    const [unitId, setUnitId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            unitId: unitId
        };

        fetch('http://localhost:8080/unit/remove', {
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
                <label htmlFor="unitId">unitId</label>
                <input type={"number"} className="form-control" id="unitId" value={unitId} onChange={e => setUnitId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};
