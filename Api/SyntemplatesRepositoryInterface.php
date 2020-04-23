<?php


namespace Synapse\Custom\Api;

use Magento\Framework\Api\SearchCriteriaInterface;

interface SyntemplatesRepositoryInterface
{

    /**
     * Save syntemplates
     * @param \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function save(
        \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
    );

    /**
     * Retrieve syntemplates
     * @param string $syntemplatesId
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getById($syntemplatesId);

    /**
     * Retrieve syntemplates matching the specified criteria.
     * @param \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
     * @return \Synapse\Custom\Api\Data\SyntemplatesSearchResultsInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
    );

    /**
     * Delete syntemplates
     * @param \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
     * @return bool true on success
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function delete(
        \Synapse\Custom\Api\Data\SyntemplatesInterface $syntemplates
    );

    /**
     * Delete syntemplates by ID
     * @param string $syntemplatesId
     * @return bool true on success
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function deleteById($syntemplatesId);
}
