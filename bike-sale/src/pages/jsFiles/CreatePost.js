import "../cssFiles/CreatePost.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";

const CreatePost = (props) => {
  const [photo, setPhoto] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigate();

  const submitEventInfo = async (e) => {
    e.preventDefault();
    let user_id = localStorage.getItem("userId");
    // console.log(env);
    if (user_id) {
      axios
        .post(
          // `${process.env.REACT_APP_BACKEND_URL}/motorcycles/create/${user_id}`,
          `http://localhost:5000/motorcycles/create/${user_id}`,
          {
            photo,
            make,
            model,
            year,
            price,
            description,
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
    }
    navigation("/");
  };
  return (
    <div className='create-form'>
      <form onSubmit={submitEventInfo} className='myForm'>
        <div>
          <label htmlFor='photo'>Photo: </label>

          <input
            type='text'
            placeholder='Upload photo'
            value={photo}
            onChange={(e) => {
              setPhoto(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='make'>Make: </label>
          <input
            type='text'
            placeholder='Enter make'
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='model'>Model: </label>
          <input
            type='text'
            placeholder='Enter model'
            value={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='year'>Year: </label>
          <input
            type='text'
            placeholder='Enter year'
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='price'>Rental price: </label>
          <input
            type='number'
            placeholder='Enter rental price'
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='description'>Description: </label>
          <input
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>

        <div>
          <input
            type='submit'
            value='Submit'
            disabled={
              !photo || !make || !model || !year || !price || !description
                ? true
                : false
            }
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
