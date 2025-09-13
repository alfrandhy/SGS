import React from 'react';
import { Link } from '@inertiajs/react';

const Pagination = ({ links, index }) => {
    return (
    //     <div className="flex justify-between items-center mt-4">
    //         <div className="flex-1 flex justify-between sm:hidden">
    //             {links.map((link, index) => (
    //                 <Link
    //                     key={link.label}
    //                     href={link.url || "#"}
    //                     className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
    //                         link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
    //                     }`}
    //                 >
    //                     {link.label}
    //                 </Link>
    //             ))}
    //         </div>
    //         <div className="hidden sm:flex-1 sm:flex sm:justify-between">
    //             <div>
    //                 <p className="text-sm text-gray-700">
    //                     Showing <span className="font-medium">{links.from}</span> to <span className="font-medium">{links.to}</span> of <span className="font-medium">{links.total}</span> results
    //                 </p>
    //             </div>
    //             <div>
    //                 <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
    //                     {links.map((link) => (
    //                         <Link
    //                             key={link.label}
    //                             href={link.url}
    //                             className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md ${
    //                                 link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
    //                             }`}
    //                         >
    //                             {link.label}
    //                         </Link>
    //                     ))}
    //                 </nav>
    //             </div>
    //         </div>
    //     </div>
                                    <div className="mt-6 flex justify-center">
                                        <div className="flex space-x-1">
                                            {links.map((link, index) => (
                                                <Link
                                                    key={index}
                                                    href={link.url || "#"}
                                                    className={`px-3 py-1 text-sm rounded-md ${
                                                        link.active
                                                            ? "bg-indigo-600 text-white"
                                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                                    } ${
                                                        !link.url
                                                            ? "cursor-not-allowed opacity-50"
                                                            : ""
                                                    }`}
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.label,
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
    );
};

export default Pagination;
