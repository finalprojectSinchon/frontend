
import { Card, CardBody } from 'reactstrap';
import TwoColumn from '../../components/twoColumn/TwoColumn';
import EquipmentListing from '../../components/apps/Equipment/EquipmentListing.js';
import EcoSidebar from '../../components/apps/Equipment/EcoSidebar';

const Equipment = () => {
    return (
        <Card>
            <CardBody>
                <TwoColumn rightContent={<EquipmentListing />} leftContent={<EcoSidebar />} />
            </CardBody>
        </Card>
    );
};

export default Equipment;
