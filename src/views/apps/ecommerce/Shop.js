import { Card, CardBody } from 'reactstrap';
import TwoColumn from '../../../components/twoColumn/TwoColumn';
import ShopListing from '../../../components/apps/Equipment/EquipmentListing.js';
import EcoSidebar from '../../../components/apps/Equipment/EcoSidebar';

const Shop = () => {
  return (
    <Card>
      <CardBody>
        <TwoColumn rightContent={<ShopListing />} leftContent={<EcoSidebar />} />
      </CardBody>
    </Card>
  );
};

export default Shop;
