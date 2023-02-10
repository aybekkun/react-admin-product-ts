import React from "react";
import Grid from "@mui/material/Grid";
import BotInfo from "./components/BotInfo";
import {Paper, Box} from "@mui/material";
import CreateBot from "./components/CreateBotItem";
import CreateInfoItem from "./components/CreateInfoItem";
import useAppDispatch from "../../hooks/useAppDispatch.hook";
import useAppSelector from "../../hooks/useAppSelector.hook";
import StatusItem from "./components/StatusItem";

const SettingsPage = () => {
    const dispatch = useAppDispatch();
    const {isLoading, data} = useAppSelector((state) => state.settings);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Box height={"16rem"} component={Paper} elevation={1} p={2}>
                        <BotInfo/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Box height={"16rem"} component={Paper} elevation={1} p={2}>
                        <CreateInfoItem/>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={6} lg={4} xl={3}>
                    <Box flexWrap={"wrap"} component={Paper} elevation={1} p={2}>
                        <CreateBot/>
                    </Box>
                </Grid>

                <Grid item>
                    <Box component={Paper} elevation={1} p={2}>
                        <StatusItem/>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};

export default SettingsPage;
