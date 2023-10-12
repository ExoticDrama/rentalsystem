import "../components/Login/Login.jsx"
import {Login} from "../components/Login/Login.jsx";
import { Management } from "../components/Management/Management.jsx";
import { ManageDetail } from "../components/ManageDetail/ManageDetail.jsx";
import { ManageUserContent } from "../components/ManageUserContent/ManageUserContent.jsx";
import { ManageInstrument } from "../components/ManageInstrument/ManageInstrument.jsx";
import { ManageLend } from "../components/ManageLend/ManageLend.jsx";

export default [
    {
        path:"/*",
        element:<Login/>
    },
    {
        path: "/manage",
        element: <Management/>
    },
    {
        path: "/manageDetail",
        element: <ManageDetail/>,
        children:[
            {
                path:"用户管理",
                element:<ManageUserContent/>
            },
            {
                path:"器材管理",
                element:<ManageInstrument/>
            },
            {
                path:"借还管理",
                element:<ManageLend/>
            }
        ]
    }
]
