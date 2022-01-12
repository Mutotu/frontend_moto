import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";

const AllBikes = (props) => {
  const [bikes, setBikes] = useState([]);

  const get_all_bikes = async () => {
    // console.log(process.env);
    const allBikes = await axios(`http://localhost:5000/motorcycles`, {
      headers: { authorization: localStorage.getItem("userId") },
    });
    // console.log(allBikes.data.bikes);
    setBikes(allBikes.data.bikes);
  };
  // console.log(bikes);
  useEffect(() => {
    get_all_bikes();
  }, []);

  return (
    <div>
      {bikes.map((item, i) => {
        return (
          <ul key={item.id}>
            <li>
              <div>
                <div>
                  <Link to={`${item.id}`}>{item.make}</Link>
                  <h4>{item.description}</h4>

                  <h4>{item.model}</h4>
                  <h4>{item.photo}</h4>
                  <h4>Daily Price ${item.price}</h4>
                </div>
              </div>
            </li>
            <div>
              <Link to={`/onebike/${item.id}`}>Rent</Link>
            </div>
          </ul>
        );
      })}
    </div>
  );
};

export default AllBikes;
