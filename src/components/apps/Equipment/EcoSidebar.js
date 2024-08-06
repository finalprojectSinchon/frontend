import React, { useEffect, useState } from 'react';
import { FormGroup, Input, Label, Button } from 'reactstrap';
import { setVisibilityFilter, fetchEquipments ,setSortFilter} from "src/store/apps/equipment/equipmentSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EcoSidebar = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('show_all');
    const [sortOption, setSortOption] = useState('');



    const equipmentList = useSelector((state) => state.equipments.equipmentList);


    useEffect(() => {
        dispatch(fetchEquipments());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setVisibilityFilter(category));
    }, [category, dispatch]);


    useEffect(() => {
        dispatch(setSortFilter(sortOption));
    }, [sortOption, dispatch]);



    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate('/equipment/regist');
    };

    return (
        <div className="p-4">
            <Button className="float-end" onClick={onClickHandler}>등록</Button>
            <h5 className="mb-4">Category</h5>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="show_all" onChange={handleCategoryChange} /> 전체
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="항공기정비장비" onChange={handleCategoryChange} /> 항공기정비장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="활주로및계류장유지보수장비" onChange={handleCategoryChange} /> 활주로및계류장유지보수장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="전기및전자장비" onChange={handleCategoryChange} /> 전기및전자장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="통신및네트워크장비" onChange={handleCategoryChange} /> 통신및네트워크장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="화재및안전장비" onChange={handleCategoryChange} /> 화재및안전장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="청소및환경관리장비" onChange={handleCategoryChange} /> 청소및환경관리장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="건설및건축장비" onChange={handleCategoryChange} /> 건설및건축장비
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="category" className="me-2" value="운송및물류장비" onChange={handleCategoryChange} /> 운송및물류장비
                </Label>
            </FormGroup>
            <br />
            <h5 className="mb-4">Sort By</h5>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="sort" className="me-2" value="quantity_low_high" onChange={handleSortChange} /> Quantity Low-High
                </Label>
            </FormGroup>
            <FormGroup>
                <Label className="cursor-pointer">
                    <Input type="radio" name="sort" className="me-2" value="quantity_high_low" onChange={handleSortChange} /> Quantity High-Low
                </Label>
            </FormGroup>
            <br />

        </div>
    );
};

export default EcoSidebar;
