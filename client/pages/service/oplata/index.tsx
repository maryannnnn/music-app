import '../../../app/globals.css'
import MainLayout from "../../../app/layouts/layout";

const Index = () => {

    const PageProps = {
        title: 'Главная',
        description: 'Главная',
        keywords: 'Главная'
    }

    return (
        <MainLayout title={PageProps.title} description={PageProps.description} keywords={PageProps.keywords}>
            <div className="main">
                <div className="container">
                    <h1 className="t-30b text-gray-100">Правила оплаты и безопасность платежей, конфиденциальность информации</h1>
                </div>
            </div>
        </MainLayout>
    )
}

export default Index
