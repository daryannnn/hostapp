import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";

// @ts-ignore
const ProgramSurface = lazy(() => import('programs/ProgramSurface'));

const auth = getAuth(firebase_app);

export default function Program() {
    const [user, setUser] = React.useState(auth.currentUser);

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(auth.currentUser)
            }
        });
    }, []);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    const router = useRouter()
    const { programId} = useMemo(() => ({
        programId: router.query?.programId?.toString() ?? "",
    }), [router.query?.programId]);

    if (programId != "" && user != null) {
        return (
            <>
                <ProgramSurface id={programId} currentUserId={user.uid}/>
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}