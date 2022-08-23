/*----- MODAL DE MAX ------*/
// supprimé car utilisation de bootstrap au lieu de tailWind

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Button } from 'reactstrap';

const SubmitRegisterModal = ({ user, closeModal }) => {

    return (
        <Modal className='justify-content-center bg-black text-white' toggle={() => closeModal()} isOpen={true}>
            <ModalHeader
                close={<button className="close" onClick={() => closeModal()}>×</button>}
                toggle={() => closeModal()}>Inscription en cours</ModalHeader>
            <ModalBody>
                <Container className="bg-black text-white border-2 border-white">
                    <Row>
                        <Col>
                            {user.pseudo} il ne vous reste plus qu'à activer votre compte via un mail que vous avez reçu dans la messagerie de {user.email}.
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button className="btn-primary" onClick={() => closeModal()}> OK </Button>
            </ModalFooter>
        </Modal>
    );
};

export default SubmitRegisterModal;