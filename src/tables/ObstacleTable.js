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
    const [name, setName] = useState('');
    const [locationX, setLocationX] = useState();
    const [locationY, setLocationY] = useState();
    const [mapId, setMapId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            locationX: locationX,
            locationY: locationY,
            mapId: mapId
        };

        fetch('http://localhost:8080/obstacle/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
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
                <label htmlFor="locationX">locationX</label>
                <input type="number" className="form-control" id="locationX" value={locationX}
                       onChange={e => setLocationX(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="locationY">locationY</label>
                <input type="number" className="form-control" id="locationY" value={locationY}
                       onChange={e => setLocationY(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="map_id">map_id</label>
                <input type="number" className="form-control" id="map_id" value={mapId}
                       onChange={e => setMapId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function ObstacleTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/obstacle/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.obstacleResponses);
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
            <p className="Table-header">Obstacles</p>
            <tbody>
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>LocationX</th>
                <th>LocationY</th>
                <th>MapId</th>
            </tr>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.locationX}</td>
                    <td>{item.locationY}</td>
                    <td>{item.mapId}</td>
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
    const [id, setId] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            id: id
        };

        fetch('http://localhost:8080/obstacle/remove', {
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