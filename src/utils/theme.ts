import { createTheme } from "@mui/material/styles";
import {Roboto, Roboto_Serif} from "next/dist/compiled/@next/font/dist/google";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#CCFF90",
            dark: "#99CC60"
        },
    },
    typography: {
        fontFamily: [
            //'Arial',
            //'sans-serif',
            Roboto,
            Roboto_Serif,
        ].join(','),
    },
});