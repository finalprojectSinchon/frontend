import { Card, CardBody } from 'reactstrap';
import ContactList from '../../components/apps/approve/ContactList';
import ContactSearch from '../../components/apps/approve/ContactSerch';
import ContactDetails from '../../components/apps/approve/ContactDetails';
import ThreeColumn from '../../components/threeColumn/ThreeColumn';
import ContactFilter from '../../components/apps/approve/ContactFilter';

const Contacts = () => {

  
  return (
    <Card>
      <CardBody>
        <ThreeColumn
          leftContent={<ContactFilter />}
          middleContent={
            <>
              <ContactSearch />
              <ContactList />
            </>
          }
          rightContent={<ContactDetails />}
        />
      </CardBody>
    </Card>
  );
};

export default Contacts;
