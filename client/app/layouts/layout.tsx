import React, {FC, ReactNode} from 'react';
import Head from "next/head";
import Header from "../../widgets/header/Header";
import Footer from "../../widgets/footer/Footer";
import theme from "../../material.config";
import {ThemeProvider} from "@mui/material/styles";

interface MainLayoutProps {
    children?: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: FC<MainLayoutProps>
    = ({
           children,
           title,
           description,
           keywords
       }) => {
    return (
        <ThemeProvider theme={theme}>
            <Head>
                <title>{title + ` | купить по цене со склада продажа стоимости в Москве с доставкой`}</title>
                <meta name="description" content={description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "автозапчастию, запчасти для джип"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header/>
            {children}
            <Footer/>
        </ThemeProvider>
    );
};

export default MainLayout;


