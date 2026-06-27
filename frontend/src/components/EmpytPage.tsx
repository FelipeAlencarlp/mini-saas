import { HiOutlineSwatch } from "react-icons/hi2";

export function EmpytPage({ text }: { text?: string }) {
    return (
        <div
            className="
                flex flex-col
                justify-center items-center
                text-gray-400 mt-20
            "
        >
            <HiOutlineSwatch size={65}/>

            <p
                className="
                    text-xl text-center
                "
            >
                Nenhum registro de <b>{text}</b> encontrado.
            </p>
        </div>
    );
}