import {Card, CardBody} from "reactstrap";
import ThreeColumn from "src/components/threeColumn/ThreeColumn.js";
import ContactSearch from "src/components/apps/approve/ContactSerch.js";
import ContactList from "src/components/apps/approve/ContactList.js";
import ContactDetails from "src/components/apps/approve/ContactDetails.js";
import CreateQRFilter from "src/components/apps/qrCode/leftContent/CreateQRFilter.js";
import CreateQRList from "src/components/apps/qrCode/middleContent/CreateQRList.js";
import CreateQRDetails from "src/components/apps/qrCode/rightContent/CreateQRDetails.js";


const CreateQRCode = () => {


    return(
        <>
            <Card>
                <CardBody>
                    <ThreeColumn
                        leftContent={<CreateQRFilter />}
                        middleContent={
                            <>
                                <ContactSearch />
                                <CreateQRList/>
                            </>
                        }
                        rightContent={<CreateQRDetails/>}
                    />
                </CardBody>
            </Card>
        </>
    )
}

export default CreateQRCode