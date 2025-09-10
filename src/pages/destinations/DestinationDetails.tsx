import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function DestinationDetails() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [destination, setDestination] = useState([]);
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`${apiUrl}/destination/${id}`);
                if (response.status === 200) {
                    setDestination(response.data);
                    const packageResponse = await axios.get(
                        `${apiUrl}/package?destination=${response.data.city_id}`,
                    );
                    if (packageResponse.status === 200) {
                        setPackages(packageResponse.data);
                        console.log(packages);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchDestination();
    }, []);
    return (
        <>
            <div className="container">

                <div className="text-center p-5 row">
                    <h6
                        className="text-primary text-uppercase"
                        style={{ letterSpacing: "5px", fontSize: "20px" }}
                    >
                        Destination
                    </h6>

                    <h1 className="text-uppercase " style={{ letterSpacing: "5px" }}>
                        {destination.title}
                    </h1>
                    <div>
                        {destination.imagePath != null ? (
                            <img src={`${apiUrl}${destination.imagePath}`} />
                        ) : (
                            <div />
                        )}
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: destination.description }} />
                </div>
                <div className="row w-100 justify-content-center ">
                    {packages.map((p:any,index:any)=>(
                     <div className="col-md-3 m-3 ">
                     <div className="card p-0" style={{width: "18rem"}}>
                        {p.imagePath != null ? (
                            <img src={`${apiUrl}${p.imagePath}`} className="card-img-top"/>
                        ) : (
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQasKPDCewT1v2j4mJjfCN1rqH2SczejiwkoA&s" className="card-img-top" alt="" />
                        )}
                        <div className='card-body'>
                            <h4 className="card-title text-center">{p.title}</h4>  
                            <div className="card-text " dangerouslySetInnerHTML={{__html:p.description}}/>
                            <button className='mx-5 px-4 btn btn-success' onClick={()=>{
                                navigate(`/packages/${p.id}`);
                            }}>More Details</button>           
                        </div>
                      </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default DestinationDetails;
