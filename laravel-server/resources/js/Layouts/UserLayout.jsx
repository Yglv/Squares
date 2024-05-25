import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

export default function UserLayout(auth) {
    return (
        <>
            <Header auth={auth}></Header>
            <Main auth={auth}></Main>
            <Footer></Footer>
        </>
    );
}
