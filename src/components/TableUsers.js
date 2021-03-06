import React, { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Grid,
    Paper
} from '@material-ui/core';

// Components
import Boton from './Boton';

//CSS
import '../styles/TableUsers.css';



export const TableUsers = () => {

    // Estados
    const [user, setUser] = useState([]);
    const [songs, setSongs] = useState([]);

    const getUsers = async () => {
        const response = await fetch('https://mateify.herokuapp.com/users');
        const data = await response.json();
        setUser(data);
    }

    useEffect(() => {
        // Obtiene los Users al renderizar la pag
        getUsers();
    })

    // VIEW DE LIKED SONGS

    const handleClick = async (e, usuario) => {
        e.preventDefault();
        console.log("Se hizo click en el usaurio ", usuario);
        // Se le pega a la API que trae las canciones
        const response = await fetch("https://mateify.herokuapp.com/users");
        const data = await response.json();
        setSongs(data);
    };

    // AGREGAR USUARIO
    const addUserFromDB = async () => {
        var url = 'https://mateify.herokuapp.com/users';
        var data = {
            firstName: require.body.firstName,
            lastName: require.body.lastName,
            age: require.body.age,
            mail: require.body.mail
        };
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    }

    // ELIMINAR USUARIO
    const deleteUserFromDB = async () => {
        var url = 'https://mateify.herokuapp.com/users';
        var data = {
            firstName: require.body.firstName
        };
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data)
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => console.log('Success:', response));

    }

    return (
        <div>
            <Grid container>
                <Paper className="box_table">
                    <TableContainer className="table_box">
                        <div className="list_title">
                            <h2>Lista de Usuarios</h2>
                        </div>
                        <Grid item xs={12}>
                            <TableHead className="table_header">
                                <TableRow>
                                    <TableCell>FirstName</TableCell>
                                    <TableCell>LastName</TableCell>
                                    <TableCell>Age</TableCell>
                                    <TableCell>Mail</TableCell>
                                    <TableCell className="table_button-view">Liked Songs</TableCell>
                                </TableRow>
                            </TableHead>
                        </Grid>
                        <Grid item xs={12}>
                            <TableHead>
                                {user.length > 0 ? (
                                    user.map((usuario) => (
                                        <TableRow className="lists Usuario" key={usuario._id}>
                                            <TableCell>{usuario.firstName}</TableCell>
                                            <TableCell>{usuario.lastName}</TableCell>
                                            <TableCell>{usuario.age}</TableCell>
                                            <TableCell>{usuario.mail}</TableCell>
                                            <Boton className="button_class" onClick={(e) => handleClick(e, usuario)} button_variant="contained" button_color="default" button_name="VIEW" />
                                        </TableRow>
                                    ))
                                ) : (
                                        <p>Loading users please wait ...</p>
                                    )}
                            </TableHead>
                        </Grid>
                    </TableContainer>
                    <Grid item xs={12}>
                        <div className="button_div">
                            <Boton onClick="addUserFromDB" className="button_functions" button_variant="contained" button_color="primary" button_name="Agregar" />
                            <Boton onClick="deleteUserFromDB" className="button_functions" button_variant="contained" button_color="secondary" button_name="Eliminar" />
                        </div>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    )
}

export default TableUsers;