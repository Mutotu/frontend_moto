import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { useParams } from "react-router-dom";

const SingleBikePage = (props) => {
  const [load, setLoad] = useState(null);
  const [moto, setMoto] = useState([]);
  const { motoId } = useParams();
  const getMoto = async () => {
    const motoData = await axios(`http://localhost:5000/comments/${motoId}`, {
      headers: { authorization: localStorage.getItem("userId") },
    });
    setMoto(motoData.data.comments);
    moto.length > 0 ? setLoad(true) : setLoad(false);
  };
  const display = () => {
    return (
      <div>
        SingleBikePage
        {moto.map((item, i) => {
          return (
            <ul key={item.id}>
              <div>
                <li>Title: {item.title}</li>
                <li>Comment: {item.comment}</li>
              </div>
            </ul>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    getMoto();
  }, []);
  return (
    <>
      {!moto.length < 1 ? (
        <div className='card'>
          {moto.length > 0 ? display() : <p>Loading...</p>}
        </div>
      ) : (
        <p>No comments</p>
      )}
    </>
  );
};

export default SingleBikePage;
