import { HiOutlineSwatch } from "react-icons/hi2";

export function EmpytPage({ text }: { text?: string }) {
    return (
        <div
            className="
                flex flex-col
                justify-center items-center
                text-gray-400
            "
        >
            <HiOutlineSwatch size={65}/>

            <p
                className="
                    text-xl text-center
                "
            >
                Sem registro de <b>{text}</b> ainda.
            </p>
        </div>
    );
}