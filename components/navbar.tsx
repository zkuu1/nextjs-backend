import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const Navbar=  async ()  => {

    const {userId} = await auth();
    
    if (!userId) {
        redirect('/sign-in')
    }

    const stores =  await db.store.findMany({
        where: {
            userId
        }
    })

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
               <StoreSwitcher items={stores}></StoreSwitcher>
                <MainNav className="mx-6"></MainNav>
                <div className="ml-auto flex items-center space-x-4">
                    <UserButton afterSignOutUrl="/"></UserButton>
                </div>
            </div>
            
            </div>
    );
}

export default Navbar;