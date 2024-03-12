import { messaging } from '../Config'
import React, { useEffect } from 'react'
import { getToken, onMessage } from "firebase/messaging"
import { useDispatch } from 'react-redux'
import { FCM_TOKEN } from '@Utils'
import { getFcmToken } from '@Redux'

const GetToken = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        pushNotification()
    }, [])

    const pushNotification = async () => {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker
                    .register("../firebase-messaging-sw.js")
                    .then(async function (registration) {
                        console.log("Registration successful, scope is:", registration.scope);
                        await getToken(messaging, { vapidKey: "BBdf8D3BQs5WFddd3w5YGd7NHHMEOtaQxk2e5_ZYNZK3XvAoR7xjqY-ixdg9_E12rjcjzXpEq598v7dz6MOP9RQ", serviceWorkerRegistration: registration })
                            .then((currentToken) => {
                                if (currentToken) {
                                    console.log('current token for client: ', currentToken);
                                    localStorage.setItem(FCM_TOKEN, currentToken);
                                    dispatch(getFcmToken(currentToken))
                                } else {
                                    console.log('No registration token available. Request permission to generate one.');
                                }
                            }).catch((err) => {
                                console.log('An error occurred while retrieving token. ', err);
                            });
                    })
                    .catch(function (err) {
                        console.log("Service worker registration failed, error:", err);
                    });
            }
        }
        else if (permission === "denied") {
            console.log("Denied Notifications")
        }
    }

    return (
        <div></div>
    )
}

export { GetToken };