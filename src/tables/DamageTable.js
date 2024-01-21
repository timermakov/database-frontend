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
    const [value, setValue] = useState();
    const [splash, setSplash] = useState();
    const [ground, setGround] = useState();
    const [air, setAir] = useState();
    const [range, setRange] = useState();


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            value: value,
            splash: splash,
            ground: ground,
            air: air,
            range: range
        };

        fetch('http://localhost:8080/damage/add', {
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
            });
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="form-group">
                <label htmlFor="value">Value</label>
                <input className="form-control" id="value" value={value} onChange={e => setValue(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="splash">Splash</label>
                <input className="form-control" id="splash" value={splash} onChange={e => setSplash(Boolean(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="ground">Ground</label>
                <input className="form-control" id="ground" value={ground} onChange={e => setGround(Boolean(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="air">Air</label>
                <input className="form-control" id="air" value={air} onChange={e => setAir(Boolean(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="range">Range</label>
                <input className="form-control" id="range" value={range} onChange={e => setRange(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function DamageTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/damage/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.damageResponses);
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
                <p className="Table-header">Resources</p>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Value</th>
                    <th>Splash</th>
                    <th>Ground</th>
                    <th>Air</th>
                    <th>Range</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.value}</td>
                        <td>{item.splash.toString()}</td>
                        <td>{item.ground.toString()}</td>
                        <td>{item.air.toString()}</td>
                        <td>{item.range}</td>
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

        fetch('http://localhost:8080/damage/remove', {
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
                <input type={"number"} className="form-control" id="id" value={id} onChange={e => setId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};