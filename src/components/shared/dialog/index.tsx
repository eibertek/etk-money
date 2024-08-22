import { useContext } from "react";
import { ModalContext } from "./modalContext";
import styles from "./dialog.module.scss";

interface IDialogProps {
    children: any;
    setModalOpen: any;
};

export const Dialog = ({ children, setModalOpen }: IDialogProps) => {
    const modal = useContext(ModalContext);

    return modal && (
        <div className={styles["dialog"]}>
            <button className={styles["dialog_button--close"]} onClick={()=>setModalOpen(false)}>[X] Cerrar</button>
            <div className={styles["dialog_content"]} >{children}</div>
        </div>
    );
}


export default Dialog;