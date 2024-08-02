import { Link, useNavigate } from 'react-router-dom';
import "./Error.scss";
import errorBg from '../../assets/images/background/error-bg.jpg'


const Error500 = () => {

    const navigate = useNavigate();
    return (
        <>
            <div
                className="loginBox"
                style={{ background: `url(${errorBg}) no-repeat bottom center #fff` }}
            >
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div className="text-center">
                        <h1 className='error-title'>500</h1>
                        <div className="my-3">
                        <h4>SERVER IS BROKEN</h4>
                        <span className="text-muted d-block fs-5">
                            500 오류입니다 {' '}
                        </span>
                    </div>
                    <button onClick={() => navigate(-2)} className="btn btn-danger">
                        Back to home
                    </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Error500;