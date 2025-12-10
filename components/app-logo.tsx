import Image from 'next/image';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-md ">
                <Image src={"/GNS.png"} alt='logo GNS BTP' width={100} height={100} />
            </div>
            <div className=" grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-extrabold text-primary">
                    GNS-BTP
                </span>
            </div>
        </>
    );
}
