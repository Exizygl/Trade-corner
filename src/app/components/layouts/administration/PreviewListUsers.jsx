import React from 'react';
import CardUser from './CardUser';
import { useState, useEffect } from 'react';
import { getAllUser } from '../../../api/backend/requestApi';
import { Link } from 'react-router-dom';
import {   URL_ADMIN_LISTUSERS} from '../../../shared/constants/urls/urlConstants';

export default function PreviewListUsers() {
    const [state, setState] = useState({ usersPreview: [] });

    useEffect(() => {
        getAllUser() //j'appelle l'api
            .then(function (res) {
                if (res.status === 200) {
                    let usersTemp = [];

                    if (res.data.length === 0) {
                        alert("Il n'y a pas d'utilisateurs dans la base de donnée !");
                    } else {
                        if (res.data.length <= 3) {
                            //Si il y a 1,2 ou 3 utilisateurs dans la BDD
                            for (let i = 0; i < res.data.length; i++) {
                                //pour la preview on récupére tous les utilisateurs
                                let name = res.data[i].name;
                                let id = res.data[i]._id;
                                let role = res.data[i].role.label;
                                let imageProfilUrl = res.data[i].imageProfilUrl;
                                let user = {
                                    name: name,
                                    id: id,
                                    role: role,
                                    imageProfilUrl: imageProfilUrl,
                                };
                                usersTemp.push(user);
                            }
                        } else {
                            for (let i = 0; i < 4; i++) {
                                //pour la preview on récupére les 4 premiers utilisateurs
                                let name = res.data[i].name;
                                let id = res.data[i]._id;
                                let role = res.data[i].role.label;
                                let imageProfilUrl = res.data[i].imageProfilUrl;
                                let user = {
                                    name: name,
                                    id: id,
                                    role: role,
                                    imageProfilUrl: imageProfilUrl,
                                };
                                usersTemp.push(user);
                            }
                        }
                    }

                    setState((state) => ({
                        usersPreview: [...state.usersPreview, ...usersTemp],
                    }));
                }
            });
    }, []);

    return (
        <div>
            <div className="flex  flex-row ml-12 flex-wrap">
                {state.usersPreview.map((user) => (
                    <Link to={`/administration/user/${user.id}`} key={user.id}>
                        <CardUser
                            key={user.id}
                            name={user.name}
                            role={user.role}
                            imageProfilUrl={user.imageProfilUrl}
                        />
                    </Link>
                ))}
            </div>
            <p>
                <Link to={URL_ADMIN_LISTUSERS} className="underline">
                    voir plus
                </Link>
            </p>
        </div>
    );
}
