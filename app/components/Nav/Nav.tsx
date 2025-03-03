// import { getNotifications } from "@/app/actions/action";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import NavComponent from "./NavComponent";
import { generateNotifications, getNotifications } from "@/app/actions/action";
import { notificationProps } from "@/types/notification";



const Navbar = async () => {
    const session = await getServerSession(options);
    await generateNotifications();

    const res = await getNotifications(session?.user.id!);
    const notifications: notificationProps[] = res.notifications;

    return (
        <>
            {notifications ? <NavComponent notifications={notifications} /> : null}
        </>
    );
}

export default Navbar;