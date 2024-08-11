import { Button, Col, ButtonGroup, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import SimpleBar from 'simplebar-react';
import PropTypes from 'prop-types';
import {
  ChangeTopbarColor,
  ToggleCustomizer,
  ChangeDirection,
  ChangeDarkMode,
  ChangeSidebarColor,
  ToggleTopbar,
  FixedSidebar,
  ToggleHorizontal,
} from '../../store/customizer/CustomizerSlice';
import { ColorsBg, SidebarColorsBg } from './data';

const Customizer = ({ className }) => {
  const dispatch = useDispatch();
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const direction = useSelector((state) => state.customizer.isRTL);
  const customtoggle = useSelector((state) => state.customizer.customizerSidebar);
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const activeSidebarBg = useSelector((state) => state.customizer.sidebarBg);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const isSidebarFixed = useSelector((state) => state.customizer.isSidebarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);

  return (
    <aside className={`customizerSidebar shadow ${className}`}>
      <Row>
        <Col>
          <div className="p-3 border-bottom">
            <h5 className="mb-0">설정</h5>
            <small>커스텀</small>
          </div>
          <SimpleBar style={{ height: 'calc(100vh - 85px)' }}>
            <div className="p-3">
              <br />
              <Button
                color="danger"
                className="custombtn"
                onClick={() => dispatch(ToggleCustomizer())}
              >
                {customtoggle ? <i className="bi bi-x" /> : <i className="bi bi-gear" />}
              </Button>
              <h6>색깔 선택</h6>
              <div className="button-group">
                {ColorsBg.map((colorbg) => (
                  <Button
                    color={colorbg.bg}
                    key={colorbg.bg}
                    size="sm"
                    onClick={() => dispatch(ChangeTopbarColor(`${colorbg.bg}`))}
                  >
                    {topbarColor === colorbg.bg ? (
                      <i className="bi bi-check" />
                    ) : (
                      <i className="bi bi-circle" />
                    )}
                  </Button>
                ))}
              </div>
              <br />
              <br />

              <h6>좌우 반전</h6>
              <ButtonGroup>
                <Button
                  outline={!!direction}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ChangeDirection(false))}
                >
                  LTR
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!direction}
                  onClick={() => dispatch(ChangeDirection(true))}
                >
                  RTL
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <br />
              <h6>다크 모드</h6>
              <ButtonGroup>
                <Button
                  outline={!!isDarkMode}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ChangeDarkMode(false)) && window.location.reload(false)}
                >
                  라이트
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!isDarkMode}
                  onClick={() => dispatch(ChangeDarkMode(true))}
                >
                  다크
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <h6>레이아웃</h6>
              <ButtonGroup>
                <Button
                  outline={!!LayoutHorizontal}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(ToggleHorizontal(false))}
                >
                  좌,우
                </Button>
                <Button
                  color="primary"
                  size="sm"
                  outline={!LayoutHorizontal}
                  onClick={() => dispatch(ToggleHorizontal(true))}
                >
                  상단
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <br />
              <h6>레이아웃 색깔</h6>
              <div className="button-group">
                {SidebarColorsBg.map((colorbg) => (
                  <Button
                    color={colorbg.bg}
                    key={colorbg.bg}
                    size="sm"
                    onClick={() => dispatch(ChangeSidebarColor(`${colorbg.bg}`))}
                  >
                    {activeSidebarBg === colorbg.bg ? (
                      <i className="bi bi-check" />
                    ) : (
                      <i className="bi bi-circle" />
                    )}
                  </Button>
                ))}
              </div>
              <br />
              <br />

              <h6>상단바 고정</h6>

              <ButtonGroup>

                <Button
                  color="primary"
                  size="sm"
                  outline={!topbarFixed}
                  onClick={() => dispatch(ToggleTopbar(true))}
                >
                  고정
                </Button>
                <Button
                    outline={!!topbarFixed}
                    color="primary"
                    size="sm"
                    onClick={() => dispatch(ToggleTopbar(false))}
                >
                  해체
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <h6>사이드바 고정</h6>

              <ButtonGroup>
                <Button
                    color="primary"
                    size="sm"
                    outline={!isSidebarFixed}
                    onClick={() => dispatch(FixedSidebar(true))}
                >
                  고정
                </Button>
                <Button
                  outline={!!isSidebarFixed}
                  color="primary"
                  size="sm"
                  onClick={() => dispatch(FixedSidebar(false))}
                >
                  해제
                </Button>

              </ButtonGroup>
            </div>
          </SimpleBar>
        </Col>
      </Row>
    </aside>
  );
};
Customizer.propTypes = {
  className: PropTypes.string,
};

export default Customizer;
