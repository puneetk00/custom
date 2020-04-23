<?php


namespace Synapse\Custom\Api\Data;

interface SyntemplatesSearchResultsInterface extends \Magento\Framework\Api\SearchResultsInterface
{

    /**
     * Get syntemplates list.
     * @return \Synapse\Custom\Api\Data\SyntemplatesInterface[]
     */
    public function getItems();

    /**
     * Set name list.
     * @param \Synapse\Custom\Api\Data\SyntemplatesInterface[] $items
     * @return $this
     */
    public function setItems(array $items);
}
