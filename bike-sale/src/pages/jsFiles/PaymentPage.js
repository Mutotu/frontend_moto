import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { useParams } from "react-router-dom";

const PaymentPage = (props) => {
  const { motoId } = useParams();
  const [moto, setMoto] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndeDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(Number);

  // const getMoto = async () => {
  //   let user_id = localStorage.getItem("userId");
  //   const motoData = await axios(`/rent/${user_id}/${motoId}`, {
  //     headers: { authorization: localStorage.getItem("userId") },
  //   });
  // setMoto(motoData.data.comments);
  // };

  const submitEventInfo = async (e) => {
    e.preventDefault();
    let user_id = localStorage.getItem("userId");
    // console.log(startDate);
    axios
      .post(
        `${env.BACKEND_URL}/rent/${user_id}/${motoId}`,
        // `http://localhost:5000/motorcycles/create/${user_id}`,
        {
          start_date: startDate,
          end_date: endDate,
          total_price: 12,
        },
        {
          headers: {
            authorization: localStorage.getItem("userId"),
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };
  const display = () => {
    return (
      <div>
        <form onSubmit={submitEventInfo} className='myForm'>
          <div>
            <label htmlFor='startDate'>startDate: </label>
            <input
              type='date'
              placeholder='startDate'
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='endDate'>endDate: </label>
            <input
              type='date'
              placeholder='Enter endDate'
              value={endDate}
              onChange={(e) => {
                setEndeDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='fullName'>Full name: </label>
            <input type='text' placeholder='Enter Full name' />
          </div>
          <div>
            <label htmlFor='creditCard'>creditCard: </label>
            <input type='text' placeholder='Enter year' />
          </div>

          <div>
            <input
              type='submit'
              value='Submit'
              disabled={!startDate || !endDate ? true : false}
            />
          </div>
        </form>
      </div>
    );
  };
  return (
    <div>
      PaymentPage
      {display()}
    </div>
  );
};

export default PaymentPage;
