import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

const CustomModal = ({ isOpen, toggle, type , content }) => {


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{type}</ModalHeader>
            <ModalBody>
                {content}
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    닫기
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default CustomModal;
