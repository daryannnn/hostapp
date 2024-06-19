import React, {lazy, useCallback, useEffect, useMemo} from "react";
import {useRouter} from "next/router";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import firebase_app from "@/firebase/config";
import {doc, getDoc, getFirestore} from "@firebase/firestore";

// @ts-ignore
const SportsmanSettingsLayout = lazy(() => import('profile/SportsmanSettings'));
// @ts-ignore
const OrganizationSettingsLayout = lazy(() => import('profile/OrganizationSettings'));

const db = getFirestore(firebase_app)

export default function SettingsPage() {
    const auth = getAuth(firebase_app);
    const [user, setUser] = React.useState(auth.currentUser);

    const router = useRouter()
    const { userId } = useMemo(() => ({
        userId: router.query?.userId?.toString() ?? "",
    }), [router.query?.userId]);

    const [userType, setUserType] = React.useState("");
    useEffect(() => {
        async function getUser() {
            let docRef = doc(db, "Users", userId);
            let result = (await getDoc(docRef)).data();
            // @ts-ignore
            setUserType(result.userType)
        }
        if (userId != "") {
            getUser();
        }
    }, [userId])

    const isUserLoggedIn = useCallback(() => {
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                return router.push("/login");
            } else {
                setUser(user)
            }
        });
    }, []);

    useEffect(() => {
        isUserLoggedIn();
    }, [isUserLoggedIn]);

    if (userType != "" && user != null) {
        return (
            <div>
                {
                    (userType == "athlete") ? (
                        <SportsmanSettingsLayout id={userId} currentUserEmail={user.email!} />
                    ) : (
                        <OrganizationSettingsLayout id={userId} currentUserEmail={user.email!} />
                    )
                }
            </div>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}