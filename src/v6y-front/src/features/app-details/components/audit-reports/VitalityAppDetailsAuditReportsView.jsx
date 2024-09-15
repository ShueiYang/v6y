import { FormOutlined } from '@ant-design/icons';
import React from 'react';

import VitalitySectionView from '../../../../commons/components/VitalitySectionView.jsx';
import VitalityTabGrouperView from '../../../../commons/components/VitalityTabGrouperView.jsx';
import VitalityApiConfig from '../../../../commons/config/VitalityApiConfig.js';
import { AUDIT_REPORT_TYPES } from '../../../../commons/config/VitalityCommonConfig.js';
import VitalityTerms from '../../../../commons/config/VitalityTerms.js';
import {
    buildClientQuery,
    useClientQuery,
} from '../../../../infrastructure/adapters/api/useQueryAdapter.jsx';
import useNavigationAdapter from '../../../../infrastructure/adapters/navigation/useNavigationAdapter.jsx';
import GetApplicationDetailsAuditReportsByParams from '../../api/getApplicationDetailsAuditReportsByParams.js';
import VitalityCodeStatusReportsView from './auditors/VitalityCodeStatusReportsView.jsx';
import VitalityLighthouseReportsView from './auditors/VitalityLighthouseReportsView.jsx';

const VitalityAppDetailsAuditReportsView = ({}) => {
    const { getUrlParams } = useNavigationAdapter();
    const [appId] = getUrlParams(['appId']);

    const { isLoading: isAppDetailsAuditReportsLoading, data: appDetailsAuditReports } =
        useClientQuery({
            queryCacheKey: ['getApplicationDetailsAuditReportsByParams', appId],
            queryBuilder: async () =>
                buildClientQuery({
                    queryBaseUrl: VitalityApiConfig.VITALITY_BFF_URL,
                    queryPath: GetApplicationDetailsAuditReportsByParams,
                    queryParams: {
                        appId,
                    },
                }),
        });

    const auditReports = appDetailsAuditReports?.getApplicationDetailsAuditReportsByParams;

    return (
        <VitalitySectionView
            isLoading={isAppDetailsAuditReportsLoading}
            isEmpty={!auditReports?.length}
            title={VitalityTerms.VITALITY_APP_DETAILS_AUDIT_REPORTS_TITLE}
            avatar={<FormOutlined />}
        >
            <VitalityTabGrouperView
                name="audit_reports_grouper_tab"
                ariaLabelledby="audit_reports_grouper_tab_content"
                align="center"
                criteria="type"
                hasAllGroup={false}
                dataSource={auditReports}
                onRenderChildren={(group, data) => (
                    <div id="audit_reports_grouper_tab_content">
                        {group === AUDIT_REPORT_TYPES.lighthouse && (
                            <VitalityLighthouseReportsView
                                reports={data?.filter((report) => report?.auditHelp?.title)}
                            />
                        )}
                        {(group === AUDIT_REPORT_TYPES.codeModularity ||
                            group === AUDIT_REPORT_TYPES.codeComplexity ||
                            group === AUDIT_REPORT_TYPES.codeCoupling ||
                            group === AUDIT_REPORT_TYPES.codeSecurity ||
                            group === AUDIT_REPORT_TYPES.codeDuplication) && (
                            <VitalityCodeStatusReportsView
                                reports={data?.filter((report) => report?.auditHelp?.title)}
                            />
                        )}
                    </div>
                )}
            />
        </VitalitySectionView>
    );
};

export default VitalityAppDetailsAuditReportsView;
