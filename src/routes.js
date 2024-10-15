import Dashboard from "./components/Dashboard";
import DealsManagement from "./components/DealsManagement";
import ProductManagement from "./components/ProductManagement";

const routes =[
    {path:'/dashboard',name: 'Dashboard', component:<Dashboard/>},
    {path:'/products',name: 'Products', component:<ProductManagement/>},
    {path:'/deals',name: 'Deals', component:<DealsManagement/>}
]