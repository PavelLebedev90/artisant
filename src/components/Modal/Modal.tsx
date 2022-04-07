import {DetailedHTMLProps, HTMLAttributes} from 'react';
import {useDispatch} from 'react-redux';
import ReactModal from 'react-modal';
ReactModal.setAppElement('#root')

type DefaultModalPropsType = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
type ModalType = DefaultModalPropsType & {
    closing: () => void
    modalIsOpen: boolean
    setModalIsOpen: (value: boolean) => void
}

const Modal = ({closing, modalIsOpen, ...props}: ModalType) => {


    function onRequestClose() {
        closing()
    }

    function close() {
        props.setModalIsOpen(false)
    }

    return (
        <ReactModal isOpen={modalIsOpen}
                    closeTimeoutMS={100}
                    preventScroll={true}
                    onRequestClose={close}
                    style={{
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 1000,
                            backgroundColor: 'rgba(0,0,0,0.15)'
                        },
                        content: {
                            position: 'absolute',
                            width: `250px`,
                            height: `200px`,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            border: '1px solid #ccc',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '10px',
                            outline: 'none',
                            padding: '10px'
                        }
                    }}

        >
            <>
                <div onClick={onRequestClose}>

                </div>
                {props.children}
            </>
        </ReactModal>
    );
};

export default Modal;
