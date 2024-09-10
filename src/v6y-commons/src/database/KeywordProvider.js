import { keywordStatus } from '../config/KeywordStatusConfig.js';
import AppLogger from '../core/AppLogger.js';
import DataBaseManager from './DataBaseManager.js';
import KeywordModel from './models/KeywordModel.js';

const keywordsStats = [
    {
        keyword: {
            _id: '1a1a1a1a1a1a1a1a1a1a1a1a',
            label: 'React',
            version: '16.8.0',
            status: keywordStatus.error,
            module: {
                appId: '5',
                branch: 'feature/customer-analytics',
                path: 'front-js',
            },
        },
        total: 2,
    },
    {
        keyword: {
            _id: '2a2a2a2a2a2a2a2a2a2a2a2a',
            label: 'Next.js',
            version: '13.0.0',
            status: keywordStatus.warning,
            module: {
                appId: '5',
                branch: 'feature/customer-analytics',
                path: 'front-js',
            },
        },
        total: 5,
    },
];

/**
 * Creates a new Keyword entry in the database.
 *
 * @param {Object} keyword - The Keyword data to be created.
 * @returns {Object|null} The created Keyword object or null on error or if the Keyword model is not found.
 */
const createKeyword = async (keyword) => {
    try {
        AppLogger.info(`[KeywordProvider - createKeyword] keyword label:  ${keyword?.label}`);
        AppLogger.info(`[KeywordProvider - createKeyword] keyword status:  ${keyword?.status}`);

        if (!keyword?.label?.length || !keyword?.status?.length) {
            return null;
        }

        const keywordModel = DataBaseManager.getDataBaseSchema(KeywordModel.name);

        if (!keywordModel) {
            return null;
        }

        const createdKeyword = await keywordModel.create(keyword);
        AppLogger.info(`[KeywordProvider - createKeyword] createdKeyword: ${createdKeyword?._id}`);

        return createdKeyword;
    } catch (error) {
        AppLogger.info(`[KeywordProvider - createKeyword] error:  ${error.message}`);
        return null;
    }
};

/**
 * Edits an existing Keyword entry in the database.
 *
 * @param {Object} keyword - The Keyword data with updated information.
 * @returns {Object|null} An object containing the ID of the edited Keyword or null on error or if the Keyword model is not found.
 */
const editKeyword = async (keyword) => {
    try {
        AppLogger.info(`[KeywordProvider - createKeyword] keyword _id:  ${keyword?._id}`);
        AppLogger.info(`[KeywordProvider - createKeyword] keyword label:  ${keyword?.label}`);
        AppLogger.info(`[KeywordProvider - createKeyword] keyword status:  ${keyword?.status}`);

        if (!keyword?._id || !keyword?.label?.length || !keyword?.status?.length) {
            return null;
        }

        const keywordModel = DataBaseManager.getDataBaseSchema(KeywordModel.name);

        if (!keywordModel) {
            return null;
        }

        const editedKeyword = await keywordModel.update(keyword, {
            where: {
                _id: keyword?._id,
            },
        });

        AppLogger.info(`[KeywordProvider - editKeyword] editedKeyword: ${editedKeyword?._id}`);

        return {
            _id: keyword?._id,
        };
    } catch (error) {
        AppLogger.info(`[KeywordProvider - editKeyword] error:  ${error.message}`);
        return null;
    }
};

/**
 * Deletes a Keyword from the database.
 *
 * @param {Object} params - An object containing the parameters for deletion.
 * @param {string} params.keywordId - The ID of the Keyword to delete.
 * @returns {Object|null} An object containing the ID of the deleted Keyword, or null on error or if keywordId is not provided or if the Keyword model is not found.
 */
const deleteKeyword = async ({ keywordId }) => {
    try {
        AppLogger.info(`[KeywordProvider - deleteKeyword] keywordId:  ${keywordId}`);
        if (!keywordId) {
            return null;
        }

        const keywordModel = DataBaseManager.getDataBaseSchema(KeywordModel.name);

        if (!keywordModel) {
            return null;
        }

        await keywordModel.destroy({
            where: {
                _id: keywordId,
            },
        });

        return {
            _id: keywordId,
        };
    } catch (error) {
        AppLogger.info(`[KeywordProvider - deleteKeyword] error:  ${error.message}`);
        return null;
    }
};

/**
 * Deletes all Keywords from the database
 *
 * @returns {Promise<boolean|null>} True if the deletion was successful, false otherwise
 */
const deleteKeywordList = async () => {
    try {
        const keywordModel = DataBaseManager.getDataBaseSchema(KeywordModel.name);
        if (!keywordModel) {
            return null;
        }

        await keywordModel.destroy({
            truncate: true,
        });

        return true;
    } catch (error) {
        AppLogger.info(`[KeywordProvider - deleteKeywordList] error:  ${error.message}`);
        return false;
    }
};

/**
 * Retrieves a list of keywords based on the provided appId.
 *
 * @param {Object} params - Parameters object containing the appId.
 * @param {string} params.appId - The ID of the application to retrieve keywords for.
 * @returns {Promise<Array>} A Promise resolving to an array of keywords, or an empty array in case of an error.
 */
const getKeywordListByPageAndParams = async ({ appId }) => {
    try {
        const keywordModel = DataBaseManager.getDataBaseSchema(KeywordModel.name);
        if (!keywordModel) {
            return null;
        }

        const keywordList = await keywordModel.findAll({
            where: {
                _id: appId,
            },
        });

        AppLogger.info(
            `[KeywordProvider - getKeywordListByPageAndParams] keywordList: ${keywordList?.length}`,
        );

        if (!keywordList?.length) {
            return null;
        }

        return keywordList;
    } catch (error) {
        AppLogger.info(
            `[KeywordProvider - getKeywordListByPageAndParams] error:  ${error.message}`,
        );
        return [];
    }
};

/**
 * Retrieves statistics for a list of keywords.
 *
 * @param {Object} params - Parameters object containing the keywords.
 * @param {Array<string>} params.keywords - An array of keywords to fetch statistics for.
 * @returns {Promise<Array>} A Promise resolving to an array of keyword statistics (keywordsStats)
 * or an empty array in case of an error.
 * @async
 */
const getKeywordsStatsByParams = async ({ keywords }) => {
    try {
        AppLogger.info(
            `[KeywordProvider - getKeywordsStatsByParams] keywords: ${keywords?.join('\r\n')}`,
        );

        // read from DB

        return keywordsStats;
    } catch (error) {
        AppLogger.info(`[KeywordProvider - getKeywordsStatsByParams] error:  ${error.message}`);
        return [];
    }
};

/**
 * An object that provides various operations related to Keywords.
 */
const KeywordProvider = {
    createKeyword,
    editKeyword,
    deleteKeyword,
    deleteKeywordList,
    getKeywordListByPageAndParams,
    getKeywordsStatsByParams,
};

export default KeywordProvider;
