import {lazy} from "react";

// @ts-ignore
//const RegistrationForm = lazy(() => import('auth/RegistrationForm'));
const RegistrationForm = lazy(() => import('profile/RegistrationForm'));

export default function Registration() {

    return (
        <>
            <RegistrationForm />
        </>
    )
}