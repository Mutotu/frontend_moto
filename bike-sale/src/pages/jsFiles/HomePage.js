import "../cssFiles/HomePage.css";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import env from "react-dotenv";
import { Link } from "react-router-dom";

const HomePage = (props) => {
  const [posts, setPosts] = useState([]);
  const [bool, setBool] = useState(false);
  const [price, setPrice] = useState("");
  const [bikes, setBikes] = useState([]);
  const { userState } = useContext(AppContext);
  const [user, setUser] = userState;
  let user_id = localStorage.getItem("userId");
  //// when ready, user user.id in the axios
  // console.log(user);
  const get_all_bikes = async () => {
    // console.log(user);
    const allBikes = await axios.get(`${env.BACKEND_URL}/motorcycles`, {
      headers: { authorization: localStorage.getItem("userId") },
    });
    // console.log(allBikes.data.bikes);
    setBikes(allBikes.data.bikes);
  };
  const noUser = () => {
    return (
      <div className='home-form'>
        {bikes.map((item, i) => {
          return (
            <ul key={item.id} className='home-card'>
              <li>
                <div>
                  <div>
                    <Link to={`${`/signup`}`}>{item.make}</Link>
                    <h4>Description:{item.description}</h4>
                    <h4>Make: {item.make}</h4>
                    <h4>Model:{item.model}</h4>
                    <h4>Photo:{item.photo}</h4>
                  </div>
                </div>
              </li>
              <div>
                <Link to={`/signup`}>Rent</Link>
              </div>
            </ul>
          );
        })}
      </div>
    );
  };
  useEffect(() => {
    get_all_bikes();
  }, []);
  const get_user = async () => {
    try {
      const foundUser = await axios.get(`${env.BACKEND_URL}/user/${user_id}`);
      // console.log(foundUser);
      setUser(foundUser);
    } catch (err) {
      console.log(err);
    }
  };

  const getMyPosts = async () => {
    if (localStorage.getItem("userId")) {
      const myPosts = await axios.get(
        `http://localhost:5000/myBike/${user_id}`
      );
      // console.log(myPosts.data);
      setPosts(myPosts.data.my_posts);
    }
  };

  const update = async (motoId) => {
    try {
      if (localStorage.getItem("userId")) {
        const updatePrice = await axios.put(
          `http://localhost:5000/update/${motoId}`,
          { price },
          {
            headers: {
              authorization: localStorage.getItem("userId"),
            },
          }
        );
        setPrice("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMoto = async (moto_id) => {
    if (localStorage.getItem("userId")) {
      try {
        axios.delete(
          `http://localhost:5000/delete/${moto_id}`,
          {
            moto_id,
          },
          {
            headers: {
              authorization: localStorage.getItem("userId"),
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  const display = () => {
    if (localStorage.getItem("userId")) {
      return (
        <div className='home-form'>
          <h2>My motorcycles</h2>
          {posts.map((item, i) => {
            return (
              <div key={item.id} className='home-card'>
                {/* bring b ack the img tag */}
                <p>Photo: {item.photo}</p>
                <h4>Make: {item.make}</h4>
                <h4>Model: {item.model}</h4>
                <h4>Year: {item.year}</h4>
                <h5>Price: ${item.price}</h5>
                <button
                  className='delete-bn'
                  onClick={() => {
                    deleteMoto(item.id);
                    setBool(true);
                  }}
                >
                  Delete moto
                </button>
                <input
                  type='number'
                  placeholder='Edit price'
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <button
                  className='edit-bn'
                  onClick={() => {
                    update(item.id);
                  }}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      );
    }
  };

  useEffect(() => {
    getMyPosts();
  }, [price, bool]);
  useEffect(() => {
    get_user();
  }, []);
  return (
    <div>
      <div>
        {localStorage.getItem("userId") ? (
          <div>
            {/* <div>Welcome {user.data.user.username}</div> */}
            <h3>Welcome </h3>
            {posts.length > 0 ? (
              display()
            ) : (
              <p>
                If you'd like to rent out your motorcycle, just go to page "Post
                Bikes" Or go to all rentals page to rent a bike
              </p>
            )}
          </div>
        ) : (
          noUser()
        )}
      </div>
    </div>
  );
};

export default HomePage;

////////////////////////////

// import axios from "axios";
// import { useState, useEffect, useContext } from "react";
// import { AppContext } from "../../context/AppContext";
// import { useNavigate } from "react-router-dom";
// import env from "react-dotenv";
// import { Link } from "react-router-dom";

// const HomePage = (props) => {
//   const [posts, setPosts] = useState([]);
//   const [bool, setBool] = useState(false);
//   const [price, setPrice] = useState("");
//   const { userState } = useContext(AppContext);
//   const [user] = userState;
//   let user_id = localStorage.getItem("userId");
//   //// when ready, user user.id in the axios
//   const getMyPosts = async () => {
//     if (localStorage.getItem("userId")) {
//       const myPosts = await axios.get(
//         `http://localhost:5000/myBike/${user_id}`
//       );
//       // console.log(myPosts.data);
//       setPosts(myPosts.data.my_posts);
//     }
//   };
//   const [bikes, setBikes] = useState([]);

//   const get_all_bikes = async () => {
//     // console.log(process.env);
//     const allBikes = await axios(`http://localhost:5000/motorcycles`, {
//       // headers: { authorization: localStorage.getItem("userId") },
//     });
//     // console.log(allBikes.data.bikes);
//     setBikes(allBikes.data.bikes);
//   };
//   const update = async (motoId) => {
//     try {
//       if (localStorage.getItem("userId")) {
//         const updatePrice = await axios.put(
//           `http://localhost:5000/update/${motoId}`,
//           { price },
//           {
//             headers: {
//               authorization: localStorage.getItem("userId"),
//             },
//           }
//         );
//         setPrice("");
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const deleteMoto = async (moto_id) => {
//     if (localStorage.getItem("userId")) {
//       try {
//         axios.delete(
//           `http://localhost:5000/delete/${moto_id}`,
//           {
//             moto_id,
//           },
//           {
//             headers: {
//               authorization: localStorage.getItem("userId"),
//             },
//           }
//         );
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   const display = () => {
//     if (localStorage.getItem("userId")) {
//       return (
//         <div>
//           <p>My motorcycles</p>
//           {posts.map((item, i) => {
//             return (
//               <div key={item.id}>
//                 {/* bring b ack the img tag */}
//                 <p>{item.photo}</p>
//                 <h4>{item.make}</h4>
//                 <h4>{item.model}</h4>
//                 <h4>{item.year}</h4>
//                 <h5>{item.price}</h5>
//                 <button
//                   onClick={() => {
//                     deleteMoto(item.id);
//                     setBool(true);
//                   }}
//                 >
//                   Delete moto
//                 </button>
//                 <input
//                   type='number'
//                   placeholder='Edit price'
//                   value={price}
//                   onChange={(e) => {
//                     setPrice(e.target.value);
//                   }}
//                 />
//                 <button
//                   onClick={() => {
//                     update(item.id);
//                   }}
//                 >
//                   Edit
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       );
//     }
//   };
//   const noUser = () => {
//     return (
//       <div>
//         {bikes.map((item, i) => {
//           return (
//             <ul key={item.id}>
//               <li>
//                 <div>
//                   <div>
//                     <Link to={`${`/signup`}`}>{item.make}</Link>
//                     <h4>{item.description}</h4>

//                     <h4>item.model</h4>
//                     <h4>item.photo</h4>
//                   </div>
//                 </div>
//               </li>
//               <div>
//                 <Link to={`/signup`}>Rent</Link>
//               </div>
//             </ul>
//           );
//         })}
//       </div>
//     );
//   };
//   useEffect(() => {
//     getMyPosts();
//   }, [price, bool]);
//   useEffect(() => {
//     get_all_bikes();
//   }, []);
//   return (
//     <div>
//       <div>
//         {localStorage.getItem("userId") ? (
//           <div>
//             <div>Welcome {user}user</div>
//             {posts.length > 0 ? (
//               display()
//             ) : (
//               <p>
//                 If you'd like to rent out your motorcycle, just go to page "Post
//                 Bikes"
//               </p>
//             )}
//           </div>
//         )

//         : (
//           noUser()
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
