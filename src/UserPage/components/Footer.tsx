import {
    Paper,
    SxProps,
    Typography,
  } from "@mui/material";
  
export function Footer() {
    return (
        <Paper component="footer" sx={PaperSxProps}>
        <Typography
            sx={{ color: "lightgrey", fontSize: "1rem", textAlign: "center" }}
        >
            <br />
            Copyright 2023
            <br/>
            Hanyang University Computer Software Engineering
            <br /><br/>
            mekind, juni, heegh
        </Typography>
        </Paper>
    );
}

const PaperSxProps: SxProps = {
    padding: "2rem",
    mt: 10,
    border: "none",
    backgroundColor: "black",
    color: "white",
};