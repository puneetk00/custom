<?php


namespace Synapse\Custom\Model\ResourceModel;

class Syntemplates extends \Magento\Framework\Model\ResourceModel\Db\AbstractDb
{

    /**
     * Define resource model
     *
     * @return void
     */
    protected function _construct()
    {
        $this->_init('synapse_custom_syntemplates', 'syntemplates_id');
    }
}
