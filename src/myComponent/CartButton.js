import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { A, usePath } from 'hookrouter';
import { Cart } from './Cart';
export const CartButton = () => {
    const path = usePath(); //check the path..
    const [number, setnumber] = useState(0);
    const [fetchData, setfetchData] = useState([]);
    const num = (e) => {
        setnumber(number + 1);
    }
    useEffect(() => {
        const getData = async (e) => {
            const url = 'https://fakestoreapi.com/products';
            try {
                const res = await fetch(url);
                const data = await res.json();
                setfetchData(data);
            } catch (err) {
                console.log(err);
            }
        };
        getData();
    }, []);
    return (
        <>
        <h2 className="position-absolute m-2">Shopping-Cart</h2>
            <div className="d-flex flex-row-reverse cartStyle">
                
                <div className="divStyle">
                    <span className='badge text-light bg-danger rounded-circle'>{number}</span>
                </div>
                <div className="bg-dark d-flex flex-row-reverse m-2 float-end rounded-circle">
                    <A href="/cart" className="p-3 cart">
                        <FontAwesomeIcon icon={faCartArrowDown} className="text-light fa-2x" />
                    </A>
                </div>
            </div>
            {path === '/cart' ? <Cart /> :

                <div className="d-flex flex-wrap">
                    {fetchData.map((fet , index) => (
                        <div className="card style" key={index}>
                    <img className="card-img-top" src={fet.image} alt={fet.id} />
                    <div className="card-body">
                        <h5 className="card-title">{fet.title}</h5>
                        <p>{fet.category}</p>
                        <p className="card-text">{fet.description}</p>
                        <p className="h5">{fet.price}$</p>
                        
                    </div>
                    <button onClick={num} value={number} className="btn btn-primary position-absolute">Add To Cart</button>
                </div>
                
                ))}
        </div>
                    
            }
        </>

    )
}
