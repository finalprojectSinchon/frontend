import { ListGroup, ListGroupItem } from 'reactstrap';
import { CheckCircle } from 'react-feather';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApprove, notiChecked } from 'src/store/apps/approve/ContactSlice.js';

const NotificationDD = ({ clearNotifications }) => {
    const dispatch = useDispatch();
    const ApproveData = useSelector((state) => state.contacts.approveData);
    const approves = ApproveData?.data.approvalList || [];
    const [message, setMessage] = useState([]);
    const userInfo = useSelector((state) => state.userInfo);


    useEffect(() => {
        dispatch(fetchApprove());
    }, [dispatch]);

    useEffect(() => {
        const newApproveInfo = approves
            .filter((approve) => approve.status === 'N' && approve.checked === 'N' && userInfo.userRole ==="ROLE_ADMIN" )
            .map((approve) => {
                let structure = '';
                let code = null;
                if (approve.facilities) {
                    structure = '편의시설 승인 요청';
                    code = approve.approvalCode;
                } else if (approve.baggageClaim) {
                    structure = '수화물 수취대 승인 요청';
                    code = approve.approvalCode;
                } else if (approve.checkinCounter) {
                    structure = '체크인카운터 승인 요청';
                    code = approve.approvalCode;
                } else if (approve.gate) {
                    structure = '탑승구 승인 요청';
                    code = approve.approvalCode;
                } else if (approve.store) {
                    structure = '점포 승인 요청';
                    code = approve.approvalCode;
                } else if (approve.storage) {
                    structure = '창고 승인 요청';
                    code = approve.approvalCode;
                }

                return {
                    id: `${code}`,
                    iconclass: <CheckCircle />,
                    iconbg: 'warning',
                    title: `${approve.type} 승인요청 `,
                    desc: `${structure}`,
                    time: `${approve.createdDate[0]}. ${approve.createdDate[1]}. ${approve.createdDate[2]} ${approve.createdDate[3]}시 ${approve.createdDate[4]}분`,
                };
            });
        const newApproInfo = approves
            .filter((approve) => approve.status === 'Y' && approve.checked === 'N' && userInfo.userRole ==="ROLE_USER" )
            .map((approve) => {
                let structure = '';
                let code = null;
                if (approve.facilities) {
                    structure = '편의시설 승인처리 되었습니다.';
                    code = approve.approvalCode;
                } else if (approve.baggageClaim) {
                    structure = '수화물 수취대 승인처리 되었습니다.';
                    code = approve.approvalCode;
                } else if (approve.checkinCounter) {
                    structure = '체크인카운터 승인처리 되었습니다.';
                    code = approve.approvalCode;
                } else if (approve.gate) {
                    structure = '탑승구 승인처리 되었습니다.';
                    code = approve.approvalCode;
                } else if (approve.store) {
                    structure = '점포 승인처리 되었습니다.';
                    code = approve.approvalCode;
                } else if (approve.storage) {
                    structure = '창고 승인처리 되었습니다.';
                    code = approve.approvalCode;
                }

                return {
                    id: `${code}`,
                    iconclass: <CheckCircle />,
                    iconbg: 'warning',
                    title: `${approve.type}`,
                    desc: `${structure}`,
                    time: `${approve.modifiedDate[0]}. ${approve.modifiedDate[1]}. ${approve.modifiedDate[2]} ${approve.modifiedDate[3]}시 ${approve.modifiedDate[4]}분`,
                };
            });
        setMessage([...newApproveInfo,...newApproInfo]);
    }, [ApproveData]);

    useEffect(() => {
        if (clearNotifications) {
            setMessage([]);
        }
    }, [clearNotifications]);

    const onClickHandler = (code) => {

        dispatch(notiChecked({ code }));
    };

    return (
        <div>
            <ListGroup flush>
                {message.map((msg) => (
                    <ListGroupItem
                        action
                        key={msg.id}
                        tag="a"
                        href="/approve"
                        onClick={() => onClickHandler(msg.id)}
                    >
                        <div className="d-flex align-items-center gap-3 py-2">
                            <div
                                className={`circle-box md-box flex-shrink-0 bg-light-${msg.iconbg} text-${msg.iconbg}`}
                            >
                                {msg.iconclass}
                            </div>
                            <div className="col-9">
                                <h5 className="mb-0 fw-bold">{msg.title}</h5>
                                <span className="text-muted text-truncate d-block">{msg.desc}</span>
                                <small className="text-muted">{msg.time}</small>
                            </div>
                        </div>
                    </ListGroupItem>
                ))}
            </ListGroup>
        </div>
    );
};

export default NotificationDD;
