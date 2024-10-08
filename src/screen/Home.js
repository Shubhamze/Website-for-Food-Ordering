import React, { useState, useEffect } from 'react'
import Footer from '../componants/Footer'
import Navbar from '../componants/Navbar'
import Card from '../componants/Card'


export default function Home() {
    const [foodcatagory, setfoodcatagory] = useState([]);
    const [fooditems, setfooditems] = useState([]);
    const [Search, setSearch]=useState("");
    const loadData = async () => {
        let response = await fetch('http://localhost:5000/api/foodData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });
        response = await response.json();
        setfoodcatagory(response[1]);
        setfooditems(response[0]);
    }

    useEffect(() => {
        loadData();
    }, [])
    return (
        <div>
            <Navbar />
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>

                    <div className="carousel-inner" id='carousel'>
                        <div class="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div class="d-flex justify-content-center">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={Search} onChange={(e)=>{setSearch(e.target.value)}} />
                                {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://source.unsplash.com/random/900×700/?pastry" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?burger" style={{ filter: "brightness(30%" }} className="d-block w-100" alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://source.unsplash.com/random/900×700/?barbeque" style={{ filter: "brightness(30%" }} className="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodcatagory !== [] ? foodcatagory.map((data) => {
                        return (
                            <div className='row mb-3'>
                                <div key={data._id}
                                    className="fs-3 m-3">{data.CategoryName}
                                </div>
                                <hr />
                                {
                                    fooditems !== [] ? fooditems.filter((item) => item.CategoryName === data.CategoryName&&(item.name.toLowerCase().includes(Search.toLocaleLowerCase())))
                                        .map((filteredItems) => {
                                            // console.log(filteredItems.description)
                                            return (
                                                <div key={filteredItems._id} className='col-12 col-md-6 col-lg-4 mb-5 '>
                                                    <Card
                                                        foodItem={filteredItems}
                                                        
                                                        options={filteredItems.options[0]}
                                                        

                                                    />
                                                </div>
                                            );
                                        })
                                        : <div>No Such Data available</div>
                                }
                            </div>

                        )
                    }) : <div>"""""""""</div>
                }


            </div>
            <Footer />
        </div>
    )
}
