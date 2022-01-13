import "../cssFiles/PaymentPage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { useParams } from "react-router-dom";

const PaymentPage = (props) => {
  const navigation = useNavigate();
  const { motoId } = useParams();
  const [moto, setMoto] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndeDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(Number);
  const [fn, setFn] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [bool, setBool] = useState(false);

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
  const calculate = async () => {
    const price = await axios.get(`${env.BACKEND_URL}/motorcycle/${motoId}`);
    const calculatedTotal =
      (Number(endDate.slice(-2)) - Number(startDate.slice(-2))) *
      Number(price.data.moto.price);
    setTotalPrice(calculatedTotal);
    // console.log(calculatedTotal);
  };
  const successMessage = () => {
    timeOut();
    return (
      <>
        <div id='overlay' style={{ padding: "20px" }}>
          <div id='text'>
            <h3>Successful Payment...</h3>
          </div>
        </div>
      </>
    );
  };
  const timeOut = () => {
    setTimeout(() => {
      navigation("/myBikes");
    }, 3000);
  };
  useEffect(() => {
    calculate();
  }, [endDate]);
  const display = () => {
    return (
      <div>
        <div>{bool ? successMessage() : false}</div>
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
            <label htmlFor='totalPrice'>Total: </label>
            <input value={"$" + totalPrice} onChange={null} disabled />
          </div>
          <div>
            <label htmlFor='fullName'>Full name: </label>
            <input
              type='text'
              placeholder='Enter Full name'
              value={fn}
              onChange={(e) => {
                setFn(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor='creditCard'>Credit Card: </label>
            <input
              type='number'
              placeholder='Credit card number'
              value={creditCard}
              onChange={(e) => {
                setCreditCard(e.target.value);
              }}
            />
          </div>

          <div>
            <input
              type='submit'
              value='Submit'
              disabled={
                !startDate || !endDate || !fn || !creditCard ? true : false
              }
              onClick={() => {
                setBool(true);
              }}
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
