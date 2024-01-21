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
    const [map_id, setMap_id] = useState();
    const [resource_type_id, setResource_type_id] = useState();
    const [quantity, setQuantity] = useState();
    const [x, setX] = useState();
    const [y, setY] = useState();


    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            map_id: map_id,
            resource_type_id: resource_type_id,
            quantity: quantity,
            x: x,
            y: y
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
                <label htmlFor="map_id">Map Id</label>
                <input className="form-control" id="map_id" value={map_id} onChange={e => setMap_id(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="resource_type_id">Resource Type Id</label>
                <input className="form-control" id="resource_type_id" value={resource_type_id} onChange={e => setResource_type_id(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input className="form-control" id="quantity" value={quantity} onChange={e => setQuantity(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="x">X</label>
                <input className="form-control" id="x" value={x} onChange={e => setX(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="y">Y</label>
                <input className="form-control" id="y" value={y} onChange={e => setY(Number(e.target.value))}/>
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
                    <th>Id</th>
                    <th>MapId</th>
                    <th>ResourceTypeId</th>
                    <th>Quantity</th>
                    <th>X</th>
                    <th>Y</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.map_id}</td>
                        <td>{item.resource_type_id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.x}</td>
                        <td>{item.y}</td>
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
                <label htmlFor="id">Id</label>
                <input type={"number"} className="form-control" id="id" value={id} onChange={e => setId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};