import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userDetailsList } from './AuthReducer';
import { useNavigate } from 'react-router-dom';

function UserLogin() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        userApiHandler();
    }, []);

    const userApiHandler = () => {
        let baseUrl = 'https://randomuser.me/api/?results=5';

        axios.get(baseUrl)
            .then((response) => {
                console.log(response.data.results, "====>");
                setUserData(response.data.results);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    };

    const renderHead = () => {
        if (userData.length === 0) return null; 

        const header = Object.keys(userData[0]);

        return header.map((key) => {
            if (key === 'gender' || key === 'email') {
                return <th key={key}>{key}</th>;
            }
            return null;
        });
    };

    const renderDetails = (keyValue) => {
        if (!keyValue) return null; 

        return Object.keys(keyValue).map((key) => {
            if (key === 'gender' || key === 'email') {
                let value = keyValue[key];
                return <td key={key}>{value}</td>;
            }
            return null;
        });
    };

    return (
        <>
            {userData.length > 0 && (
                <table>
                    <thead>
                        <tr>{renderHead()}</tr>
                    </thead>
                    <tbody>
                        {userData.map((item, index) => (
                            <tr key={index} onClick={() => {
                                dispatch(userDetailsList(item));
                                navigate('/userList');
                            }}>
                                {renderDetails(item)}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    );
}

export { UserLogin };
