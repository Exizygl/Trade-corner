/*----- MODAL DE MAX ------*/
// supprimé car utilisation de bootstrap au lieu de tailWind

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Button } from 'reactstrap';

const SubmitForgottenPasswordModal = ({ closeModal }) => {

    return (
        <Modal className='justify-content-center text-white texte-center w-1/2 m-auto border-2 border-white' toggle={() => closeModal()} isOpen={true}>
            <ModalHeader
                close={<button className="close" onClick={() => closeModal()}>×</button>}
                toggle={() => closeModal()}>Email envoyé</ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            Un email a été envoyer pour changer de mot de passe.
                        </Col>
                    </Row>
                </Container>
            </ModalBody>
            <ModalFooter>
                <Button className="btn btn-green" onClick={() => closeModal()}> OK </Button>
            </ModalFooter>
        </Modal>
    );
};

export default SubmitForgottenPasswordModal;