import React, {lazy, useMemo} from "react";
import {useRouter} from "next/router";

// @ts-ignore
const ExerciseSurface = lazy(() => import('programs/ExerciseSurface'));

export default function Exercise() {
    const router = useRouter()
    const { programId, exerciseId } = useMemo(() => ({
        programId: router.query?.programId?.toString() ?? "",
        exerciseId: router.query?.exerciseId?.toString() ?? "",
    }), [router.query?.programId, router.query?.exerciseId]);

    if (programId != null && exerciseId != null) {
        return (
            <>
                <ExerciseSurface programId={programId} exerciseId={exerciseId} />
            </>
        );
    } else {
        return (
            <div>
            </div>
        )
    }
}