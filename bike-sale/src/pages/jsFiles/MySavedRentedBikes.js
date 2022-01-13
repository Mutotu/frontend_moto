// import "../cssFiles/MysavedBikes.css";
// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";

// const MySavedRentedBikes = (props) => {
//   const [myrented, setMyRented] = useState([]);
//   const [comment, setComment] = useState("");
//   const [title, setTitle] = useState("");
//   const [load, setLoad] = useState(null);
//   const [displayForm, setDisplayForm] = useState(false);
//   const [motoId, setMotoId] = useState("");
//   let userId = localStorage.getItem("userId");
//   const rentedMotos = async () => {
//     // console.log(env);
//     const getRentedMotos = await axios(
//       `${env.BACKEND_URL}/motorcycles/rented/${userId}`
//     );
//     // console.log(getRentedMotos);
//     setMyRented(getRentedMotos.data.rented_motos);
//     setLoad(true);
//   };

//   const submitEventInfo = async (e) => {
//     e.preventDefault();
//     let user_id = localStorage.getItem("userId");
//     console.log(motoId);
//     try {
//       const submitComment = await axios.post(
//         `${env.BACKEND_URL}/comment/${user_id}/${motoId}`,
//         { title, comment },
//         {
//           headers: {
//             authorization: localStorage.getItem("userId"),
//           },
//         }
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const displayFormInputs = () => {
//     return (
//       <form onSubmit={submitEventInfo} className='commentForm'>
//         <div>
//           {" "}
//           <label htmlFor='title'>Title: </label>
//           <input
//             type='text'
//             placeholder='Enter a title'
//             value={title}
//             onChange={(e) => {
//               setTitle(e.target.value);
//             }}
//           />
//         </div>
//         <div>
//           <label htmlFor='comment'>Comment: </label>
//           <input
//             type='text'
//             placeholder='Enter a comment'
//             value={comment}
//             onChange={(e) => {
//               setComment(e.target.value);
//             }}
//           />
//         </div>
//         <input
//           type='submit'
//           value='Submit'
//           disabled={!title || !comment ? true : false}
//           onSubmit={() => {
//             setComment("");
//             setTitle("");
//             // setDisplayForm(false);
//           }}
//         />
//         <button
//           onClick={() => {
//             setDisplayForm(false);
//             setComment("");
//             setTitle("");
//           }}
//         >
//           Done
//         </button>
//       </form>
//     );
//   };
//   // const getBikes = async (moto_id) => {
//   //   console.log(moto_id);
//   //   try {
//   //     const bike = await axios.get(`${env.BACKEND_URL}/motorcycle/${moto_id}`);
//   //     // console.log(bike.data.moto.photo);
//   //     return "lol";
//   //     // return displayBikePhoto(bike.data.moto.photo);
//   //   } catch (err) {
//   //     console.log(err);
//   //   }
//   // };
//   // const displayBikePhoto = (photo) => {};
//   // console.log(myrented);

//   const display = () => {
//     return (
//       <div>
//         {myrented.map((item, i) => {
//           return (
//             <div key={item.id}>
//               <ul>
//                 {/* <li>Photo:{getBikes(item.moto_id)}</li> */}
//                 <li>Photo</li>
//                 <li>Start date: {item.start_date}</li>
//                 <li>End date: {item.end_date}</li>
//                 <li>Total paid ${item.total_price}</li>
//               </ul>
//               <button
//                 onClick={() => {
//                   setDisplayForm(true);
//                   setMotoId(item.moto_id);
//                 }}
//               >
//                 Add comment
//               </button>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };
//   useEffect(() => {
//     rentedMotos();
//   }, []);
//   return (
//     <div className='card'>
//       <div>
//         {" "}
//         {load ? display() : <p>You haven't rented any bikes, yet...</p>}
//       </div>

//       <div> {displayForm ? displayFormInputs() : false}</div>
//     </div>
//   );
// };

// export default MySavedRentedBikes;
///////////////
import "../cssFiles/MysavedBikes.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import Overlay from "react-bootstrap/Overlay";

const MySavedRentedBikes = (props) => {
  const [myrented, setMyRented] = useState([]);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(null);
  const [displayForm, setDisplayForm] = useState(false);
  const [motoId, setMotoId] = useState("");

  let userId = localStorage.getItem("userId");

  const rentedMotos = async () => {
    // console.log(motoArray);
    const getRentedMotos = await axios(
      `${env.BACKEND_URL}/motorcycles/rented/${userId}`
    );
    // console.log(getRentedMotos);

    setMyRented(getRentedMotos.data.rented_motos);

    // motos();

    setLoad(true);
  };

  const motos = async () => {
    const motosCopy = [...myrented];
    for (let i = 0; i < motosCopy.length; i++) {
      // console.log(myrented[i]);
      const motoDetails = await axios.get(
        `${env.BACKEND_URL}/motorcycle/${myrented[i].moto_id}`
      );

      motosCopy[i].motoPhoto = motoDetails.data.moto.photo;
      // motosCopy[i].motoIdRetrived = motoDetails.data.moto.id;
    }
    setMyRented(motosCopy);
  };
  useEffect(() => {
    motos();
  }, [load]);
  const submitEventInfo = async (e) => {
    e.preventDefault();
    let user_id = localStorage.getItem("userId");
    console.log(motoId);
    try {
      const submitComment = await axios.post(
        `${env.BACKEND_URL}/comment/${user_id}/${motoId}`,
        { title, comment },
        {
          headers: {
            authorization: localStorage.getItem("userId"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const displayFormInputs = () => {
    // console.log(motoId, displayForm);
    return (
      <form onSubmit={submitEventInfo} className='commentForm'>
        <div>
          {" "}
          <label htmlFor='title'>Title: </label>
          <input
            type='text'
            placeholder='Enter a title'
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor='comment'>Comment: </label>
          <input
            type='text'
            placeholder='Enter a comment'
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </div>
        <input
          type='submit'
          value='Submit'
          disabled={!title || !comment ? true : false}
          onSubmit={() => {
            setComment("");
            setTitle("");
            // setDisplayForm(false);
          }}
        />
        <button
          onClick={() => {
            setDisplayForm(false);
            setComment("");
            setTitle("");
          }}
        >
          Done
        </button>
      </form>
    );
  };

  const display = () => {
    return (
      <div>
        {myrented.map((item, i) => {
          return (
            <div key={item.id}>
              <ul>
                {/* <li>Photo:{getBikes(item.moto_id)}</li> */}
                <li>Photo: {item.motoPhoto}</li>
                <li>Start date: {item.start_date}</li>
                <li>End date: {item.end_date}</li>
                <li>Total paid ${item.total_price}</li>
              </ul>
              <button
                onClick={() => {
                  setDisplayForm(true);
                  setMotoId(item.moto_id);
                  console.log(item.id, "item id");
                }}
              >
                Add comment
              </button>

              {/* <div>
                {displayForm && item.motoIdRetrived === motoId
                  ? displayFormInputs()
                  : false}
              </div> */}
            </div>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    rentedMotos();
  }, []);
  return (
    <div className='card'>
      <div>
        {" "}
        {load ? display() : <p>You haven't rented any bikes, yet...</p>}
      </div>
      <div> {displayForm ? displayFormInputs() : false}</div>
    </div>
  );
};

export default MySavedRentedBikes;
