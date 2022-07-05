import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col, Button } from 'reactstrap';

const SubmitRegisterModal = ({ user, closeModal }) => {

    return (
        <Modal className='justify-content-center' toggle={() => closeModal()} isOpen={true}>
            <ModalHeader
                close={<button className="close" onClick={() => closeModal()}>×</button>}
                toggle={() => closeModal()}>Inscription en cours</ModalHeader>
            <ModalBody>
                <Container>
                    <Row>
                        <Col>
                            {user.pseudo} il ne vous reste plus qu'à activer votre compte via un mail que vous avez reçu dans la messagerie de {user.email}.
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

export default SubmitRegisterModal;