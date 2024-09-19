import ApplicationResolvers from './application/ApplicationResolvers.js';
import AuditHelpResolvers from './audit/AuditHelpResolvers.js';
import DeprecatedDependencyResolvers from './dependency/deprecated-status/DeprecatedDependencyResolvers.js';
import DependencyStatusHelpResolvers from './dependency/status-help/DependencyStatusHelpResolvers.js';
import EvolutionHelpResolvers from './evolutions/EvolutionHelpResolvers.js';
import FaqResolvers from './faq/FaqResolvers.js';
import NotificationsResolvers from './notifications/NotificationsResolvers.js';

const VitalityResolvers = {
    Query: {
        ...ApplicationResolvers.Query,
        ...FaqResolvers.Query,
        ...NotificationsResolvers.Query,
        ...EvolutionHelpResolvers.Query,
        ...AuditHelpResolvers.Query,
        ...DependencyStatusHelpResolvers.Query,
        ...DeprecatedDependencyResolvers.Query,
    },
    Mutation: {
        ...ApplicationResolvers.Mutation,
        ...FaqResolvers.Mutation,
        ...NotificationsResolvers.Mutation,
        ...EvolutionHelpResolvers.Mutation,
        ...AuditHelpResolvers.Mutation,
        ...DependencyStatusHelpResolvers.Mutation,
        ...DeprecatedDependencyResolvers.Mutation,
    },
};

export default VitalityResolvers;
