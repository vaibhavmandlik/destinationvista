import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { states } from "./states";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const url = `${import.meta.env.VITE_API_URL}/user`

interface profileDetails {
  firstname:string,
  lastName:string,
  email:string,
}

const Profile: React.FC = () => {
  const id = localStorage.getItem("userid");
  const token  = localStorage.getItem("token");

  if(!id || !token)
  {
    toast.error("Unauthorized User" , {
      position: "top-right",
      autoClose: 3000,
      closeOnClick: true,
      theme: "light",
      pauseOnHover: true,
    })
    return;
  } 

  const [data , setData] = useState<profileDetails | null>(null);
  try {
    useEffect(()=>{
      const fetchData = async ()=>{
        const response = await axios.get(`${url}/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`,
        }
        });

        console.log("response : ", response.data);

        if(response.status !== 200){
          toast.error("No Such User Exist",{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            theme: "light",
            pauseOnHover: true,
          })
          return;
        }
        else{
          setData(response.data);
        }
      }

      fetchData();

    },[]);

  } catch (error) {
    
  }

 

  return (
    <>
    <ToastContainer/>
      <div
        className="container bg-white my-3"
        style={{ width: "180vh", height: "100vh" }}
      >
        <p className="fs-1 p-5 text-dark">
          <strong>User Profile</strong>
        </p>
        <div className="d-flex justify-content-center gap-1">
          <div className="col">
            <Box
              sx={{ p: 4 }}
              borderRadius={5}
              boxShadow={5}
              textAlign={"center"}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxctjU21pUENIsGN1F4qY21P7GfdEbhTMp2g&s"
                className="profile-picture"
              />
              <p>
                <h2 className="my-2">{`${data?.firstname} ${data?.lastName}`}</h2>
              </p>
              <p>
                <span>{data?.email}</span>
              </p>
              <p>
                <span>Los Angeles USA</span>
              </p>
              <Button sx={{ width: "55ch" }} variant="text">
                Update profile picture
              </Button>
            </Box>
          </div>
          <div className="col">
            <Box
              border={0}
              boxShadow={5}
              borderRadius={5}
              sx={{ p: 3, width: "60ch" }}
            >
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="First Name"
                  defaultValue="First Name"
                  value={data?.firstname}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Last name"
                  defaultValue="Last Name"
                  value={data?.lastName}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Email"
                  defaultValue="Email"
                  value={data?.email}
                />
                <TextField
                  disabled
                  id="outlined-disabled"
                  label="Contact number"
                  defaultValue="Contact number"
                />
              </Box>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "52ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Address Line 1"
                  defaultValue="Address Line 1"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Address Line 2"
                  defaultValue="Address Line 2"
                />
              </Box>
              <Box
                component="form"
                sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  id="outlined-required"
                  label="Landmark"
                  defaultValue="Landmark"
                />
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select state"
                  defaultValue="select state"
                >
                  {states.map((state) => (
                    <MenuItem key={state.value} value={state.label}>
                      {state.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  required
                  id="outlined-required"
                  label="City"
                  defaultValue="City"
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Posatl code"
                  defaultValue="Postal code"
                />
                <Box textAlign={'center'}>
                  <Button sx={{mt:1}} variant="contained">Save Details</Button>
                </Box>
              </Box>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
