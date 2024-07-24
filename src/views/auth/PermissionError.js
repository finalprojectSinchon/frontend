import { Link } from 'react-router-dom';
import "./Error.scss";
import errorBg from '../../assets/images/background/error-bg.jpg';

const PermissionError = () => {
    return (
        <>
            <div
                className="loginBox"
                style={{ background: `url(${errorBg}) no-repeat bottom center #fff` }}
            >
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                        <h1 className='error-title2'>No permission</h1>
                        <div className="my-3">
                            <h4>권한 없음</h4>
                            <span className="text-muted d-block fs-5">
                 관리자 승인이 있어야 접근 가능합니다.{' '}
              </span>
                        </div>

                        <Link to="/" className="btn btn-danger">
                            Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PermissionError;
