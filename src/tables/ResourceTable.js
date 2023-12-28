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
    const [mapId, setMapId] = useState();
    const [resourceTypeId, setResourceTypeId] = useState();
    const [quantity, setQuantity] = useState();
    const [locationX, setLocationX] = useState();
    const [locationY, setLocationY] = useState();


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            mapId: mapId,
            resourceTypeId: resourceTypeId,
            quantity: quantity,
            locationX: locationX,
            locationY: locationY
        };

        fetch('http://localhost:8080/resource/add', {
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
                <label htmlFor="mapId">mapId</label>
                <input className="form-control" id="mapId" value={mapId} onChange={e => setMapId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="resourceTypeId">resourceTypeId</label>
                <input className="form-control" id="resourceTypeId" value={resourceTypeId} onChange={e => setResourceTypeId(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">quantity</label>
                <input className="form-control" id="quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="locationX">locationX</label>
                <input className="form-control" id="x" value={locationX} onChange={e => setLocationX(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="locationY">locationY</label>
                <input className="form-control" id="locationY" value={locationY} onChange={e => setLocationY(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function ResourceTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/resource/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.resourceResponses);
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
                    <th>ResourcePatchId</th>
                    <th>MapId</th>
                    <th>ResourceTypeId</th>
                    <th>Quantity</th>
                    <th>LocationX</th>
                    <th>LocationY</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.mapId}</td>
                        <td>{item.resourceTypeId}</td>
                        <td>{item.quantity}</td>
                        <td>{item.locationX}</td>
                        <td>{item.locationY}</td>
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
    const [resourcePatchId, setResourcePatchId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            resourcePatchId: resourcePatchId
        };

        fetch('http://localhost:8080/resource/remove', {
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
                <label htmlFor="resourcePatchId">ResourcePatchId</label>
                <input type={"number"} className="form-control" id="resourcePatchId" value={resourcePatchId} onChange={e => setResourcePatchId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};