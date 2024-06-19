import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import React, {lazy, useCallback, useEffect} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const EventsMap = lazy(() => import('events/EventsMap'));

const auth = getAuth(firebase_app);

export default function Sportsmen(props: any) {
    const [user, setUser] = React.useState(auth.currentUser);

    const router = useRouter();

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(user)
            }
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (user != null) {
        return (
            <>
                <EventsMap user={props.user.uid} />
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}