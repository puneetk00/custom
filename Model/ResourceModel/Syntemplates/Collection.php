<?php


namespace Synapse\Custom\Model\ResourceModel\Syntemplates;

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
            \Synapse\Custom\Model\Syntemplates::class,
            \Synapse\Custom\Model\ResourceModel\Syntemplates::class
        );
    }
}
