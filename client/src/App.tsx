import { Routes, Route } from "react-router-dom";
import {} from "antd";
import Regiter from "./components/Regiter/Regiter";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/login/Login";
import ReConfirm from "./components/Regiter/ReConfirm";
import HeaderContent from "./components/header/Header";
import PageContent from "./components/body/PageContent";
import SiderMenu from "./components/body/SiderMenu";
import FooterContent from "./components/footer/FooterContent";
import Profile from "./components/profile/Profile";
import Chat from "./components/chat/Socket";
import MessagesTable from "./components/messages/MessagesTable";
import Board from "./components/boardCard/_id"

function App() {
  const HomePage = () => (
    <>
      <HeaderContent />
      <PageContent />
    </>
  );
  return (
    <>
      {/* <PageContent /> */}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/chat" element={<Chat />}></Route>
        <Route path="/:userId/myboard/:boardId" element={<Board/>}/>
        <Route path="register" element={<Regiter />} />
        <Route path="reconfirm" element={<ReConfirm />} />
        <Route path="login" element={<Login />} />
        <Route path="user/:userID" element={<Profile />} />
        <Route path="user/:userID/messages" element={<MessagesTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
