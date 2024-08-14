import { Col, Form, Row, Select, Typography } from 'antd';
import React, { useEffect } from 'react';

import useDataGrouper from '../hooks/useDataGrouper.jsx';
import VitalityEmptyView from './VitalityEmptyView.jsx';

const VitalitySelectGrouperView = ({
    dataSource,
    criteria,
    placeholder,
    label,
    helper,
    name,
    hasAllGroup,
    onRenderChildren,
}) => {
    const [selectGroupForm] = Form.useForm();
    const { groupedDataSource, selectedCriteria, criteriaGroups, setSelectedCriteria } =
        useDataGrouper({
            dataSource,
            criteria,
            hasAllGroup,
        });

    useEffect(() => {
        selectGroupForm?.setFieldsValue({
            criteria_grouper_select: null,
        });
    }, [groupedDataSource]);

    if (!dataSource?.length || !criteria?.length) {
        return <VitalityEmptyView />;
    }

    if (!Object.keys(groupedDataSource || {})?.length) {
        return <VitalityEmptyView />;
    }

    const valuesByGroup =
        (selectedCriteria?.value !== 'All'
            ? groupedDataSource?.[selectedCriteria?.value]
            : dataSource) || [];

    return (
        <Row wrap gutter={[16, 24]} justify="center" align="middle">
            <Col span={24}>
                <Form
                    layout="vertical"
                    form={selectGroupForm}
                    onValuesChange={(values) =>
                        setSelectedCriteria({
                            value: values?.[name || 'criteria_grouper_select'],
                        })
                    }
                >
                    <Form.Item
                        name={name || 'criteria_grouper_select'}
                        label={<Typography.Text>{label}</Typography.Text>}
                        help={<Typography.Text>{helper}</Typography.Text>}
                        initialValue="All"
                    >
                        <Select
                            placeholder={placeholder}
                            options={criteriaGroups}
                            style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}
                        />
                    </Form.Item>
                </Form>
            </Col>
            <Col span={23}>
                {valuesByGroup?.length ? (
                    <>{onRenderChildren?.(selectedCriteria?.value, valuesByGroup)}</>
                ) : (
                    <VitalityEmptyView />
                )}
            </Col>
        </Row>
    );
};

export default VitalitySelectGrouperView;
