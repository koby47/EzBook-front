import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import { api } from "../../../services/api";
import Spinner from "../Spinner";
import { div } from "framer-motion/client";


const CLOUDINARY_BASE_URL ="https://res.cloudinary.com/ddsuwfx4o/image/upload/"

const FacilityDetails =()=>{
    const {id} = useParams();
    const [facility,setFacility]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        const fetchFacility = async() => {
            try{
                const data = await api.getFacilityById(id);
                setFacility(data);
            }catch (err){
                console.error("Error loading facility:", err);
            }finally {
                setLoading(false);
            }
        };
        fetchFacility();

    },[id] );

    if (loading) return <Spinner/>;
    if(!facility) return <div className="p-4  text-red-600">Facility not found </div>;

    const imageUrl =facility.pictures?.[0]?.startsWith("http")
    ? facility.pictures[0]
    :`${CLOUDINARY_BASE_URL}${facility.pictures?.[0] ||""}`;

    return(
        <div className="p-6 max-w-4xl mx-auto space-y-4">
           <img  src={imageUrl} alt={facility.name} className="w-full h-64 object-cover round "/>
           <h1 className="text-3xl font-bold text-blue-700">{facility.name}</h1>
           <p>{facility.description}</p>
           <p><strong>Type:</strong>{facility.location}</p>
           <p><strong>Price:</strong>GHS{facility.price}</p>
        </div>
    );

};

export default FacilityDetails;