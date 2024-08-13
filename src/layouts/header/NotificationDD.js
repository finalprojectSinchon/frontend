import { ListGroup, ListGroupItem } from 'reactstrap';
import { CheckCircle } from 'react-feather';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApprove, notiChecked } from 'src/store/apps/approve/ContactSlice.js';

const NotificationDD = ({ clearNotifications, onNotificationCountChange }) => {

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
            .filter((approve) => approve.status === 'N' && approve.noti === 'N' && userInfo.userRole === "ROLE_ADMIN")
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

                const date = new Date(approve.createdDate);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return {
                    id: `${code}`,
                    iconclass: <CheckCircle />,
                    iconbg: 'warning',
                    title: `${approve.type} 승인요청 `,
                    desc: `${structure}`,
                    time: `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`,
                };
            });

        const newApproInfo = approves
            .filter((approve) => approve.status === 'Y' && approve.noti === 'N' && userInfo.userRole === "ROLE_USER")
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

                const date = new Date(approve.createdDate);

                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
                const day = String(date.getDate()).padStart(2, '0');
                const hours = String(date.getHours()).padStart(2, '0');
                const minutes = String(date.getMinutes()).padStart(2, '0');

                return {
                    id: `${code}`,
                    iconclass: <CheckCircle />,
                    iconbg: 'warning',
                    title: `${approve.type}`,
                    desc: `${structure}`,
                    time: `${year}년 ${month}월 ${day}일 ${hours}시 ${minutes}분`,
                };
            });

        const combinedMessages = [...newApproveInfo, ...newApproInfo];
        setMessage(combinedMessages);

        // 알림 개수 전달
        onNotificationCountChange(combinedMessages.length);

    }, [ApproveData, userInfo, dispatch, onNotificationCountChange]);

    useEffect(() => {
        if (clearNotifications) {
            setMessage([]);
            onNotificationCountChange(0); // 알림 개수를 0으로 리셋
        }
    }, [clearNotifications, onNotificationCountChange]);

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
