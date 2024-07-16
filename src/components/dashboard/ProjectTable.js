import { Card, CardBody, CardTitle, CardSubtitle, Table } from 'reactstrap';
import user1 from '../../assets/images/users/user1.jpg';
import user2 from '../../assets/images/users/user2.jpg';
import user3 from '../../assets/images/users/user3.jpg';
import user4 from '../../assets/images/users/user4.jpg';
import user5 from '../../assets/images/users/user5.jpg';

const tableData = [
  {
    avatar: user1,
    status: '고장',
    location: "2층 C구역",
    type : "체크인 카운터 - B",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user2,
    status: '정상',
    location: "1층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user3,
    status: '점검중',
    location: "2층 B구역",
    type : "체크인 카운터 - C",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user4,
    status: '점검중',
    location: "3층 C구역",
    type : "체크인 카운터 - F",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
  {
    avatar: user5,
    status: '정상',
    location: "2층 F구역",
    type : "체크인 카운터 - A",
    airline : "대한항공",
    scheduleDateTime : "2024-07-15"
  },
];

const ProjectTables = () => {
  return (
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">비행기</CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            체크인 카운터
          </CardSubtitle>

          <Table className="no-wrap mt-3 align-middle" responsive borderless hover>
            <thead>
              <tr>
                <th>Location</th>
                <th>Type</th>

                <th>Status</th>
                <th>Airline</th>
                <th>ScheduleDate</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((tdata) => (
                <tr key={tdata.name} className="border-top">
                  <td>
                    <div className="d-flex align-items-center p-2">
                      <img
                        src={tdata.avatar}
                        className="rounded-circle"
                        alt="avatar"
                        width="45"
                        height="45"
                      />
                      <div className="ms-3">
                        <h6 className="mb-0">{tdata.location}</h6>
                        {/* <span className="text-muted">{tdata.email}</span> */}
                      </div>
                    </div>
                  </td>
                  <td>{tdata.airline}</td>
                  <td>
                    {tdata.status === '고장' ? (
                      <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                    ) : tdata.status === '점검중' ? (
                      <span className="p-2 bg-warning rounded-circle d-inline-block ms-3"></span>
                    ) : (
                      <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                    )}
                  </td>
                  <td>{tdata.type}</td>
                  <td>{tdata.scheduleDateTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProjectTables;
