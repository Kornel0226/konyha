import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../contexts/AppContex";

const ErrorModal = () => {
    const { modalMessage, closeModal, isModalOpen } = useContext(AppContext);
    const modal = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (modal.current) {
            if (isModalOpen) {
                modal.current.showModal();
            } else {
                modal.current.close();
            }
        }
    },);

    return (
        <dialog className="bg-yellow-500 rounded-md shadow-2xl shadow-black lg:w-[40%]" ref={modal}>
            <div className="flex flex-col">
                <button className="self-end p-2 rounded-lg bg-red-700 m-5" onClick={closeModal}>
                    Bezárás
                </button>
                <h1 className="text-center text-red-700 text-4xl">Hiba</h1>
                <h2 className="text-red-700 text-center text-2xl mb-5">{modalMessage}</h2>
            </div>
        </dialog>
    );
};

export default ErrorModal;