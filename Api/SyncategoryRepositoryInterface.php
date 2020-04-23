<?php


namespace Synapse\Custom\Api;

use Magento\Framework\Api\SearchCriteriaInterface;

interface SyncategoryRepositoryInterface
{

    /**
     * Save syncategory
     * @param \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function save(
        \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
    );

    /**
     * Retrieve syncategory
     * @param string $syncategoryId
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getById($syncategoryId);

    /**
     * Retrieve syncategory matching the specified criteria.
     * @param \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
     * @return \Synapse\Custom\Api\Data\SyncategorySearchResultsInterface
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getList(
        \Magento\Framework\Api\SearchCriteriaInterface $searchCriteria
    );

    /**
     * Delete syncategory
     * @param \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
     * @return bool true on success
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function delete(
        \Synapse\Custom\Api\Data\SyncategoryInterface $syncategory
    );

    /**
     * Delete syncategory by ID
     * @param string $syncategoryId
     * @return bool true on success
     * @throws \Magento\Framework\Exception\NoSuchEntityException
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function deleteById($syncategoryId);
}
