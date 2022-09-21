import React, { useState } from 'react';
import { get, useForm } from 'react-hook-form';
import { Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material'
import axios from 'axios'
import { useEffect } from 'react';

const UsersForm = ({getUsers, userSelected, deselectUser}) => {
    const {register, handleSubmit, reset} = useForm();

    const [isUserSelected, setIsUserSelected] = useState(false);

    useEffect(() =>{
        if(userSelected){
            reset(userSelected);
            setIsUserSelected(true);
        }
    }, [userSelected])

    const submit = (data) => {
        if(userSelected){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, data)
                .then(() => {
                    clear();
                    getUsers();
                    setIsUserSelected(false);
                })
                .catch((error) => console.log(error.response))
        }else{
            axios.post(`https://users-crud1.herokuapp.com/users/`, data)
                .then(() => {
                    getUsers()
                    clear()  
                    setIsUserSelected(false);  
                })
                .catch((error) => console.log(error.response))
        }
    }

    const clear = () =>{
        reset({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            birthday: ""
        })
        deselectUser();
    } 

    return (
        <div>
            <Typography gutterBottom variant="h3" align = "center">
                Crud-App
            </Typography>

            <Card style={{maxWidth:450, margin:"0 auto", padding:"20px 5px"}}>
                <CardContent>
                <form onSubmit={handleSubmit(submit)}>
                    <Grid container spacing={1}>
                    <Grid xs={12} sm={6} item>
                        <TextField label="First Name" placeholder='Enter First Name' variant='outlined' fullWidth required id='first_name' {...register("first_name")}></TextField>
                    </Grid>
                    <Grid xs={12} sm={6} item>
                        <TextField label="Last Name" placeholder='Enter Last Name' variant='outlined' fullWidth required id='last_name' {...register("last_name")}></TextField>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type="email" label="Email" placeholder="Enter Email" variant = "outlined" fullWidth required id='email' {...register("email")}/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type="password" label="Password" placeholder="Enter password" variant = "outlined" fullWidth required id='password' {...register("password")}/>
                    </Grid>
                    <Grid xs={12} item>
                        <TextField type="date" label="Date" placeholder="Enter your birthday" variant = "outlined" fullWidth id='birthday' {...register("birthday")}/>
                    </Grid>
                    <Grid xs={12} item>
                        <Button type='submit' variant='contained' color="primary" fullWidth>{isUserSelected ? "Edit User" : "Submit"}</Button>
                    </Grid>
                    </Grid>
                </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersForm;