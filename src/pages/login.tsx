import {lazy, useCallback, useEffect} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import {useRouter} from "next/router";

// @ts-ignore
//const LoginForm = lazy(() => import('auth/LoginForm'));
const LoginForm = lazy(() => import('profile/LoginForm'));
//const EventsMap = lazy(() => import('events/EventsMap'));

const auth = getAuth(firebase_app);

export default function Login() {
    const router = useRouter();

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                return router.push("/");
            }
            console.log(user)
        });
    }, [router]);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    return (
        <>
            <LoginForm />
        </>
    )
}