import type { AppProps } from 'next/app'
import React, {lazy, useCallback, useEffect} from "react";
import {getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import {useRouter} from "next/router";
import {theme} from "@/utils/theme";
import {CssBaseline, ThemeProvider} from "@mui/material";

// @ts-ignore
const Header = lazy(() => import('header/AppBarComponent'));

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    //signInWithEmailAndPassword(getAuth(), "gym@gym.yr", "111111");

    const auth = getAuth(firebase_app);
    const [user, setUser] = React.useState(auth.currentUser);
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user && router.pathname != '/login' && router.pathname != '/registration') {
                return router.push("/login");
            } else {
                setUser(user)
            }
        });
    }, []);

    if (user != null) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header currentUserId={user.uid}/>
                <Component {...pageProps} user={user} />
            </ThemeProvider>
        )
    } else {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        )
    }
}
