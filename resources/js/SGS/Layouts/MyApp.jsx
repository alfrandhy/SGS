import {
    BrowserRouter, Routes, Route, Link
} from 'react-router-dom';

import Home from '../Home';
import About from '../About';
import Page from '../Page';
import CompaniesIndex from '../Companies/Index';
import CompaniesCreate from '../Companies/Create';
import CompaniesEdit from '../Companies/Edit';

function MyApp(){
    return(
        // <BrowserRouter basename="/public/">
        <BrowserRouter>
            <h1>Hello World!</h1>
            <nav>
                <ul>
                    <li><Link to="/SGS">Home</Link></li>
                    <li><Link to="/SGS/about">About</Link></li>
                    <li><Link to="/SGS/page">Page</Link></li>
                    <li><Link to="/SGS/companies">Company Client</Link>
                        <ul>
                            <li><Link to="/SGS/companies/create">Add New Company Client</Link></li>
                            {/* <li><Link to="/SGS/companies/edit/:id">Edit Company Client</Link></li> */}
                        </ul>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path="/SGS" element={<Home />} />
                <Route path="/SGS/about" element={<About />} />
                <Route path="/SGS/page" element={<Page />} />
                <Route path="/SGS/companies" element={<CompaniesIndex />} />
                <Route path="/SGS/companies/create" element={<CompaniesCreate />} />
                {/* <Route path="/SGS/companies/edit/:id" element={<CompaniesEdit />} /> */}
            </Routes>
        </BrowserRouter>
    );
}
export default MyApp;