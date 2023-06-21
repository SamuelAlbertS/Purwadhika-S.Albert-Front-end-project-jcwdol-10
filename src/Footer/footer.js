import React from "react";

function Footer(){
    return(
        <>
            <div className="fixed bottom-0 w-full h-auto">
                <div className="justify-center text-white bg-slate-600 align-middle text-center">
                    <h1 className="px-15 font-sans font-bold">Subscribe to Our Newsletter!</h1>
                    <p>By subscribe to our newsletter, get most update news and info from us, faster than anyone gets! It's free and easy!</p>
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-row grow"></div>
                        <input type="email" placeholder="Type your email here." className="flex items-center rounded-md m-2 h-8 text-black"></input>
                        <button className="flex items-center bg-gray-800 border rounded px-2 py-2 m-2 h-8">Submit</button>
                        <div className="flex flex-row grow"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;