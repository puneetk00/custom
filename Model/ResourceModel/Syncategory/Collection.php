<?php


namespace Synapse\Custom\Model\ResourceModel\Syncategory;

class Collection extends \Magento\Framework\Model\ResourceModel\Db\Collection\AbstractCollection
{

    /**
     * Define resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init(
            \Synapse\Custom\Model\Syncategory::class,
            \Synapse\Custom\Model\ResourceModel\Syncategory::class
        );
    }
}
