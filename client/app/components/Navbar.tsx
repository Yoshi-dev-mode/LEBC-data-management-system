import Image from "next/image"

export default function Navbar(){
    return(
        <nav className=" py-1 ">
            <section className="flex justify-end space-left-right">
                <div className="flex items-center">
                    <p className="opacity-60 mr-3">Admin</p>
                    <Image src="/user.png" alt="Admin" width={35} height={10}/>
                </div>
            </section>
        </nav>
    )
}