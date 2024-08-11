import React, { useEffect, useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEquipments } from 'src/store/apps/equipment/equipmentSlice.js';
import { maintenanceEquipment} from "src/store/apps/maintenance/maintenanceSlice.js";
import CustomModal from "src/views/CustomModal.js";

const EquipmentStock = ({ isOpen, toggle ,maintenance, onEquipmentRegistered }) => {

    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const [type,setType] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

    const equipmentList = useSelector((state) => state.equipments.equipmentList || []);
    const equipments = equipmentList.data || [];
    const result = useSelector(state => state.maintenances.result);

    const [equipment, setEquipment] = useState([{ equipment: '', quantity: '' }]);

    const handleAddField = () => {
        setEquipment([...equipment, { equipment: '', quantity: '' }]);
    };

    const handleRemoveField = (index) => {
        const values = [...equipment];
        values.splice(index, 1);
        setEquipment(values);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const values = [...equipment];
        if (name === 'equipment') {
            const isDuplicate = values.some((field, idx) => field.equipment === value && idx !== index);
            if (isDuplicate) {
                setType('등록');
                setContent('같은 장비를 두 번 선택할 수 없습니다.')
                toggleModal();

                return;
            }
        }
        values[index][name] = value;
        setEquipment(values);
    };

    const handleSubmit = () => {
        const payload = {
            maintenance,
            equipment,
        };

        const isInvalid = equipment.some(equip => {
            const foundEquip = equipments.find(e => e.equipmentCode == equip.equipment);
            return !foundEquip || foundEquip.equipmentQuantity < equip.quantity;
        });

        if (isInvalid) {
            setType('등록');
            setContent('등록된 장비의 갯수를 초과할 수 없습니다.')
            toggleModal();
            return;
        }

        setType('등록');
        setContent('정비 장비를 등록 하였습니다.')
        toggleModal();
        setTimeout(() => {
        dispatch(maintenanceEquipment(payload));
        toggle();
        onEquipmentRegistered();
        window.location.reload();
        }, 3000);
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>장비 재고 등록</ModalHeader>
            <ModalBody>
                {equipment.map((field, index) => (
                    <Row key={index} className="align-items-center mb-3">
                        <Col md="5">
                            <FormGroup>
                                <Label>사용 장비</Label>
                                <Input
                                    type="select"
                                    name="equipment"
                                    value={field.equipment}
                                    onChange={(event) => handleChange(index, event)}
                                >
                                    <option value="">장비를 선택하세요</option>
                                    {equipments.map((equipment, idx) => (
                                        <option key={idx} value={equipment.equipmentCode}>
                                            {equipment.equipmentName}
                                        </option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="3">
                            <FormGroup>
                                <Label>사용 갯수</Label>
                                <Input
                                    type="number"
                                    name="quantity"
                                    value={field.quantity}
                                    onChange={(event) => handleChange(index, event)}
                                />
                            </FormGroup>
                        </Col>
                        <Col md="2" className="d-flex align-items-center">
                            <Button color="danger" onClick={() => handleRemoveField(index)} className="me-2">
                                -
                            </Button>
                        </Col>
                    </Row>
                ))}
                <Row>
                    <Col md="12" className="d-flex justify-content-center">
                        <Button color="primary" onClick={handleAddField} className="me-2">
                            추가
                        </Button>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
            <CustomModal  isOpen={modal} toggle={toggleModal} type = {type} content={content}/>

        </Modal>
    );
};

export default EquipmentStock;
