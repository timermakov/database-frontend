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
    const [name, setMapName] = useState('');
    const [width, setMapWidth] = useState();
    const [height, setMapHeight] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: name,
            width: width,
            height: height
        };

        fetch('http://localhost:8080/map/add', {
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
                <label htmlFor="name">MapName</label>
                <input className="form-control" id="name" value={name} onChange={e => setMapName(String(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="width">MapWidth</label>
                <input className="form-control" id="width" value={width} onChange={e => setMapWidth(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <label htmlFor="height">MapHeight</label>
                <input className="form-control" id="height" value={height} onChange={e => setMapHeight(Number(e.target.value))}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};


export default function MapTable() {
    const [data, setData] = useState([]);

    const fetchData = () => {
        fetch(`http://localhost:8080/map/all`)
            .then((response) => response.json())
            .then((actualData) => {
                console.log(actualData);
                setData(actualData.mapResponses);
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
            <p className="Table-header">Maps</p>
                <tbody>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Width</th>
                    <th>Height</th>
                </tr>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.width}</td>
                        <td>{item.height}</td>
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
    const [id, setMapId] = useState();

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const data = {
            id: id
        };

        fetch('http://localhost:8080/map/remove', {
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
                <label htmlFor="id">id</label>
                <input type={"number"} className="form-control" id="id" value={id} onChange={e => setMapId(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">Submit</button>
            </div>
        </form>
    );
};