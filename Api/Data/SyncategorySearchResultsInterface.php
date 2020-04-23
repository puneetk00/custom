<?php


namespace Synapse\Custom\Api\Data;

interface SyncategorySearchResultsInterface extends \Magento\Framework\Api\SearchResultsInterface
{

    /**
     * Get syncategory list.
     * @return \Synapse\Custom\Api\Data\SyncategoryInterface[]
     */
    public function getItems();

    /**
     * Set name list.
     * @param \Synapse\Custom\Api\Data\SyncategoryInterface[] $items
     * @return $this
     */
    public function setItems(array $items);
}
