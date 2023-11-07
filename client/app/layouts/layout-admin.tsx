import Head from "next/head";
import Footer from "../../widgets/footer/Footer";
import {FC} from "react";
import MiniDrawer from "../../shared/mini-drawer/MiniDrawer";

interface AdminLayoutProps {
    title?: string;
}

const AdminLayout: FC<AdminLayoutProps>
    = ({
           children,
           title
       }) => {

    return (
        <>
            <Head>
                <title>{title + ` | купить по цене со склада продажа стоимости в Москве с доставкой`}</title>
                <meta name="robots" content="index, follow"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
                <MiniDrawer>
                    {children}
                </MiniDrawer>
            <Footer/>
        </>
    );
};

export default AdminLayout;

